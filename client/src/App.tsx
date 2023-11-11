import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegistrationForm } from './components/RegistrationForm';
import { Todos } from './components/Todos';

function App() {
	return (
		<div className=' flex justify-center items-center w-full h-screen bg-black'>
			<Routes>
				<Route path='/' element={<LoginForm />} />
				<Route path='/register' element={<RegistrationForm />} />
				<Route path='/todos' element={<Todos />} />
			</Routes>
		</div>
	);
}

export default App;
