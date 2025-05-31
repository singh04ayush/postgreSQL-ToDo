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
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}));

// Add headers for additional CORS support
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, token');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});
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