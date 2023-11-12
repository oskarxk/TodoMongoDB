import React, { useEffect, useState } from 'react';
import { AuthForm } from './AuthForm';
import { useFormik } from 'formik';

import { Input } from './Input';
import { useNavigate } from 'react-router-dom';
import { initialValues, registerSchema } from './registerData';
import axios from 'axios';

type Props = {};

type Register = {
	name: string;
	email: string;
	password: string;
};

export const RegistrationForm = (props: Props) => {
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const response = await axios.post('http://localhost:5000/api/register', {
				name: register.name,
				email: register.email,
				password: register.password,
			});
			console.log(response);
			navigate('/');
		} catch (error) {
			console.error('Error sending order:', error);
		}
	};

	const formik = useFormik({
		initialValues,
		validationSchema: registerSchema,
		onSubmit: handleLogin,
		isInitialValid: false,
		enableReinitialize: false,
	});

	const [register, setRegister] = useState<Register>({
		name: formik.values.name,
		email: formik.values.email,
		password: formik.values.password,
	});

	useEffect(() => {
		setRegister((prevRegisterInfo) => ({
			...prevRegisterInfo,
			name: formik.values.name,
			email: formik.values.email,
			password: formik.values.password,
		}));
	}, [formik.values]);

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='flex flex-col justify-center items-center w-1/4 bg-white rounded-md'
		>
			<AuthForm />
			<div className='w-3/4 flex flex-col'>
				<Input
					name={'name'}
					error={!!(formik.errors.name && formik.touched.name)}
					errorText={formik.errors.name ? formik.errors.name : ''}
					value={formik.values.name}
					label={'Name'}
					onChange={formik.handleChange}
					type={'text'}
				/>
				<Input
					name={'email'}
					error={!!(formik.errors.email && formik.touched.email)}
					errorText={formik.errors.email ? formik.errors.email : ''}
					value={formik.values.email}
					label={'Email'}
					onChange={formik.handleChange}
					type={'text'}
				/>
				<Input
					name={'password'}
					error={!!(formik.errors.password && formik.touched.password)}
					errorText={formik.errors.password ? formik.errors.password : ''}
					value={formik.values.password}
					label={'Password'}
					onChange={formik.handleChange}
					type={'password'}
				/>
			</div>
			<div className='flex w-3/4 justify-center items-center py-4'>
				<button
					className=' bg-[#44c767] w-full py-2 px-8 rounded-md font-bold'
					type='submit'
				>
					REGISTER
				</button>
			</div>
		</form>
	);
};
