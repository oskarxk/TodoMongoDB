import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './Todos';

import { MdDone } from 'react-icons/md';
import { FiDelete } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';

type Props = {
	todo: Todo;
	getTodos: () => void;
};

export const SingleTodo = ({ todo, getTodos }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>(todo.text);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const markAsDone = async (id: string, isDone: boolean) => {
		try {
			const newStatus = !isDone; // Zmiana statusu: jeśli jest true, staje się false, i vice versa
			await axios.patch(
				`http://localhost:5000/api/toggleTodoStatus/${id}`,
				{ isDone: newStatus },
				{
					headers: {
						'x-access-token': localStorage.getItem('token'),
					},
				}
			);
			console.log(`Toggled Todo Status for ID ${id}`);
			getTodos();
		} catch (error) {
			console.error('Error', error);
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			await axios.delete(`http://localhost:5000/api/deleteTodos/${id}`, {
				headers: {
					'x-access-token': localStorage.getItem('token'),
				},
			});
			getTodos();
		} catch (error) {
			console.error('Error', error);
		}
	};

	const editTodo = async (id: string, newText: string) => {
		try {
			await axios.put(
				`http://localhost:5000/api/editTodo/${id}`,
				{ newText: newText },
				{
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': localStorage.getItem('token'),
					},
				}
			);
			console.log(`Edited Todo Text for ID ${id}`);
			getTodos();
		} catch (error) {
			console.error('Error', error);
		}
	};

	return (
		<form
			className='flex justify-between bg-gray-300 w-full my-2 py-2 rounded-md'
			onSubmit={(e) => {
				e.preventDefault();
				editTodo(todo._id, inputValue);
				setEdit(false);
			}}
		>
			{edit ? (
				<input
					ref={inputRef}
					className='w-2/3 flex justify-center'
					placeholder={todo.text}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			) : todo.isDone ? (
				<p
					className='w-2/3 flex justify-center line-through
                '
				>
					{todo.text}
				</p>
			) : (
				<p className='w-2/3 flex justify-center'>{todo.text}</p>
			)}

			<div className='flex justify-around items-center w-1/3 text-xl'>
				<MdDone onClick={() => markAsDone(todo._id, todo.isDone)} />
				{todo.isDone ? (
					<AiOutlineEdit className=' cursor-pointer' />
				) : (
					<AiFillEdit
						className=' cursor-pointer'
						onClick={() => {
							if (!edit && !todo.isDone) {
								setEdit(!edit);
							}
						}}
					/>
				)}
				<FiDelete
					onClick={() => deleteTodo(todo._id)}
					className=' cursor-pointer'
				/>
			</div>
		</form>
	);
};
