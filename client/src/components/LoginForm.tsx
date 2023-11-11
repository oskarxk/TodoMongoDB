import React, { useEffect, useState } from 'react';
import { AuthForm } from './AuthForm';
import { initialValues, loginSchema } from './loginData';
import { useFormik } from 'formik';
import { Input } from './Input';
import axios from 'axios';

type Props = {};

type Login = {
	email: string;
	password: string;
};

export const LoginForm = (props: Props) => {
	const handleLogin = async () => {
		try {
			const response = await axios.post('http://localhost:5000/api/login', {
				email: login.email,
				password: login.password,
			});
			console.log(response.data);

			if (response.data.user) {
				localStorage.setItem('token', response.data.user);
				alert('Login Succesfull');
				window.location.href = '/todos';
			} else {
				alert('Please check your username and password');
			}
			// window.location.href = response.data.url;
		} catch (error) {
			console.error('Error sending order:', error);
		}
	};

	const formik = useFormik({
		initialValues,
		validationSchema: loginSchema,
		onSubmit: handleLogin,
		isInitialValid: false,
		enableReinitialize: false,
	});

	const [login, setLogin] = useState<Login>({
		email: formik.values.email,
		password: formik.values.password,
	});

	useEffect(() => {
		setLogin((prevLoginInfo) => ({
			...prevLoginInfo,
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
					LOGIN
				</button>
			</div>
		</form>
	);
};
