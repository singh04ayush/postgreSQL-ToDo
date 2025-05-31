const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

// Environment variables
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: '*', // Allow requests from everywhere
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true
}));
app.use(express.json());

// Routes

// Root route to show API is working
app.get("/", (req, res) => {
  res.json({ message: "Todo API is up and running!" });
});

// Auth routes
app.use("/api/auth", require("./routes/auth"));

// Todo routes
app.use("/api/todos", require("./routes/todos"));





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API is up and running! Visit http://localhost:${PORT} to see the welcome message.`);
})