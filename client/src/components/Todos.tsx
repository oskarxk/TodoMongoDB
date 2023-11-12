import React, { useEffect, useState } from 'react';
// import jwt from 'jsonwebtoken';
import * as jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SingleTodo } from './SingleTodo';

export type Todo = {
	_id: string;
	text: string;
	isDone: boolean;
};

export const Todos = () => {
	const navigate = useNavigate();

	const [todos, setTodos] = useState<Todo[]>();
	const [inputTodo, setInputTodo] = useState<string>();
	const [user, setUser] = useState<any>();

	const getTodos = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/getTodos', {
				headers: {
					'x-access-token': localStorage.getItem('token'),
				},
			});
			const data = response.data;
			setTodos(data.todos);
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
			if (user) {
				setUser(user);
				getTodos();
			}
		} else {
			localStorage.removeItem('token');
			navigate('/');
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
			setInputTodo('');
		} catch (error) {
			console.error('Error', error);
		}
	};

	return (
		<div className='container mx-auto mt-8 p-4 bg-gray-100 max-w-md rounded-md shadow-md'>
			{user && (
				<div>
					<h1 className='text-3xl font-bold mb-4'>Witaj, {user.name}!</h1>
					<p className='text-lg mb-4'>Liczba zadań: {todos?.length}</p>

					<div className='flex items-center mb-4'>
						<input
							type='text'
							value={inputTodo}
							onChange={(e) => setInputTodo(e.target.value)}
							placeholder='Dodaje zadanie...'
							className='flex-1 p-2 border border-gray-300 rounded-md mr-2'
						/>
						<button
							onClick={addTodo}
							className='bg-blue-500 text-white p-2 rounded-md'
						>
							Dodaj
						</button>
					</div>
					{todos?.map((todo) => (
						<SingleTodo key={todo._id} todo={todo} getTodos={getTodos} />
					))}
				</div>
			)}
		</div>
	);
};
