const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Todo = require('./models/todo');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200' 
}));

app.use(express.json());

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error('Hiba a Todo-k lekérésekor:', error);
    res.status(500).json({ message: 'Szerver hiba' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const { description, expiryDate } = req.body;
    const todo = await Todo.create({ description, expiryDate });
    res.status(201).json(todo);
  } catch (error) {
    console.error('Hiba a Todo létrehozásakor:', error);
    res.status(500).json({ message: 'Szerver hiba' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, done, expiryDate } = req.body;
    const todo = await Todo.findByPk(id);
    if (todo) {
      todo.description = description;
      todo.done = done;
      todo.expiryDate = expiryDate;
      await todo.save();
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo nem található' });
    }
  } catch (error) {
    console.error('Hiba a Todo frissítésekor:', error);
    res.status(500).json({ message: 'Szerver hiba' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.destroy();
      res.json({ message: 'Todo törölve' });
    } else {
      res.status(404).json({ message: 'Todo nem található' });
    }
  } catch (error) {
    console.error('Hiba a Todo törlésekor:', error);
    res.status(500).json({ message: 'Szerver hiba' });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Az Express app a http://localhost:${port} címen fut`);
  });
});