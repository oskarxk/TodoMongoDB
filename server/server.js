// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

// MEN

// E - Express

const connectDB = require('./config/db');
const express = require('express');
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Todo = require('./models/todosModel');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());


app.post('/api/register', async (req, res) => {
	try {
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		res.json({ status: 'ok' });
		console.log(req.body);
	} catch (err) {
		console.log(err);
		res.json({ status: 'error', error: 'Duplicated email' });
	}
});

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	});

	if (user) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'privateKey123'
		);
		return res.json({ status: 'ok', user: token });
	} else {
		return res.json({ status: 'error', user: false });
	}
	res.json({ status: 'ok' });
});

app.get('/api/getTodos', async (req, res) => {
	const token = req.headers['x-access-token'];
  
	try {
	  const decoded = jwt.verify(token, 'privateKey123');
	  const email = decoded.email;
	  const user = await User.findOne({ email: email }).populate('todos');
  
	  if (user) {
		return res.json({ status: 'ok', todos: user.todos });
	  } else {
		return res.json({ status: 'error', error: 'User not found' });
	  }
	} catch (error) {
	  console.log(error);
	  res.json({ status: 'error', error: 'Invalid token' });
	}
  });

app.post('/api/addTodos', async (req, res) => {
	const token = req.headers['x-access-token'];

	try {
		const decoded = jwt.verify(token, 'privateKey123');
		const email = decoded.email;
		const user = await User.findOne({ email: email });

		if (user) {
			const newTodo = await Todo.create({
				text: req.body.text,
				user: user._id,
			});

			return res.json({ status: 'ok' });
		} else {
			return res.json({ status: 'error', error: 'User not found' });
		}
	} catch (error) {
		console.log(error);
		return res.json({ status: 'error', error: 'invalid token' });
	}
});

app.listen(port, () => {
	console.log('Server started on port', port);
});
