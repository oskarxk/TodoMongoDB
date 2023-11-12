import React, { useEffect, useState } from 'react';
// import jwt from 'jsonwebtoken';
import * as jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {};

type Todo = {
	_id: string;
	text: string;
	isDone: boolean;
	user: string;
	createdAt: Date;
	updatedAt: Date;
};

export const Todos = (props: Props) => {
	const navigate = useNavigate();

	const [todos, setTodos] = useState<Todo[]>()
	const [inputTodo, setInputTodo] = useState<string>();

	const getTodos = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/getTodos', {
				headers: {
					'x-access-token': localStorage.getItem('token'),
				},
			});
			const data = response.data;
			setTodos(data.todos);
			console.log(todos);
		} catch (error) {
			console.error('Error', error);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log(token);
		if (token) {
			const user = jwt_decode.jwtDecode(token);
			console.log(user);
			if (!user) {
				localStorage.removeItem('token');
				navigate('/login');
			} else {
				getTodos();
			}
		}
	}, []);

	const addTodo = async () => {
		try {
			const response = await axios.post(
				'http://localhost:5000/api/addTodos',
				{
					text: inputTodo,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': localStorage.getItem('token'),
					},
				}
			);
			const data = response.data;
			console.log(data);
			getTodos();
			setInputTodo('')
		} catch (error) {
			console.error('Error', error);
		}
	};

	return (
		<div>
			<h2>Your Todos</h2>
			<ul>
				{todos?.map((todo) => (
					<li className=' text-white' key={todo._id}>{todo.text}</li>
				))}
			</ul>
			<input
				type='text'
				value={inputTodo}
				onChange={(e) => setInputTodo(e.target.value)}
			/>
			<button className=' bg-white' onClick={addTodo}>
				Add Todo
			</button>
		</div>
	);
};
