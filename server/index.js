const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());
env.config();
// console.log(process);

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Route to add a new task
app.post("/add", async (req, res) => {
  try {
    const task = req.body.task;
    console.log("Received task:", task);
    const result = await TodoModel.create({ task });
    console.log("Created task:", result); // Debugging: log created task
    res.status(200).json(result);
  } catch (err) {
    console.error("Error creating task:", err); // Debugging: log error
    res.status(500).json({ error: err.message });
  }
});

// Route to get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TodoModel.find().sort({ createdAt: -1 }); // Retrieve all tasks
    console.log("Retrieved tasks:", tasks); // Debugging: log retrieved tasks
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks:", err); // Debugging: log error
    res.status(500).json({ error: err.message });
  }
});

// Route to update an existing task
app.put("/update/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { done } = req.body;
    const result = await TodoModel.findByIdAndUpdate(taskId, { done });
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating task:", err); // Debugging: log error
    res.status(500).json({ error: err.message });
  }
});

// Route to delete an existing task
app.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const taskId = req.params.id;
    const result = await TodoModel.findByIdAndDelete(taskId);
    if (result) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    console.error("Error deleting task:", err); // Debugging: log error
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000...");
});
