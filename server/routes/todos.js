const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

// Create a todo (with authentication)
router.post("/", auth, async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user.id;
    
    const newTodo = await pool.query(
      "INSERT INTO todo (user_id, description) VALUES($1, $2) RETURNING *", 
      [userId, description]
    );
    
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Get all todos for a user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const allTodos = await pool.query(
      "SELECT * FROM todo WHERE user_id = $1 ORDER BY created_at DESC", 
      [userId]
    );
    
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Get a specific todo
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2", 
      [id, userId]
    );
    
    if (todo.rows.length === 0) {
      return res.status(404).json({ msg: "Todo not found or not authorized" });
    }
    
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Update a todo
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const userId = req.user.id;
    
    // Check if todo exists and belongs to user
    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2", 
      [id, userId]
    );
    
    if (todo.rows.length === 0) {
      return res.status(404).json({ msg: "Todo not found or not authorized" });
    }
    
    // Update todo
    await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 AND user_id = $3", 
      [description, id, userId]
    );
    
    res.json({ msg: "Todo updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Delete a todo
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Check if todo exists and belongs to user
    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2", 
      [id, userId]
    );
    
    if (todo.rows.length === 0) {
      return res.status(404).json({ msg: "Todo not found or not authorized" });
    }
    
    // Delete todo
    await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 AND user_id = $2", 
      [id, userId]
    );
    
    res.json({ msg: "Todo deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
