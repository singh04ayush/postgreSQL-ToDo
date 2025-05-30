const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./db');
require('dotenv').config();

// Environment variables
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors({
  origin: '*', // Allow requests from everywhere
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true
}));
app.use(express.json());



//Routes

// Root route to show API is working
app.get("/", (req, res) => {
  res.json({ message: "Todo API is up and running!" });
});

// 1. Create a Todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})


// 2. Get all Todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * from todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})



// 3. Get a Todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * from todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})


// 4. Update a Todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 ", [description, id]);
        res.json("Updated Done");
    } catch (error) {
        console.log(error.message);
    }
})

// 5. Delete a Todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo Deleted");
    } catch (error) {
        console.log(error.message);
    }

})




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API is up and running! Visit http://localhost:${PORT} to see the welcome message.`);
})