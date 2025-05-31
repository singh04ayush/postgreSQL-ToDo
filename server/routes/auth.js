const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config();

// Register route
router.post("/register", async (req, res) => {
  try {
    // Destructure request body
    const { email, password } = req.body;

    // Check if user already exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length > 0) {
      return res.status(401).json({ msg: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, bcryptPassword]
    );

    // Generate JWT token
    const token = jwt.sign(
      { user: { id: newUser.rows[0].user_id } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and user info
    res.json({ 
      token,
      user: {
        id: newUser.rows[0].user_id,
        email: newUser.rows[0].email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    // Destructure request body
    const { email, password } = req.body;

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user: { id: user.rows[0].user_id } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and user info
    res.json({ 
      token,
      user: {
        id: user.rows[0].user_id,
        email: user.rows[0].email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Verify route - to check if user is authenticated
router.get("/verify", auth, async (req, res) => {
  try {
    // Get user from database
    const user = await pool.query("SELECT user_id, email FROM users WHERE user_id = $1", [req.user.id]);
    
    // Return user info
    res.json({
      user: {
        id: user.rows[0].user_id,
        email: user.rows[0].email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
