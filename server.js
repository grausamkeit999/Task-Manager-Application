const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  const savedTask = await newTask.save();
  res.json(savedTask);
});

app.delete('/tasks/:id', async (req, res) => {
  const result = await Task.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.patch('/tasks/:id', async (req, res) => {
  const task = await Task.updateOne({_id: req.params.id}, {$set: req.body});
  res.json(task);
});

app.listen(5000, () => console.log('Server started on port 5000'));
