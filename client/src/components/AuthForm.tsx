import React from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN, REGISTER } from './routes';

type Props = {};

export const AuthForm = (props: Props) => {
	return (
		<div className=' flex flex-col justify-center items-center w-full bg-white rounded-md py-4'>
			<div className='flex justify-around w-full'>
				<NavLink
					to={LOGIN}
					aria-label='Home'
					className='text-lg font-bold'
					style={({ isActive }) => ({
						color: isActive ? '#D87D4A' : 'black',
					})}
				>
					SIGN IN
				</NavLink>
				<NavLink
					to={REGISTER}
					aria-label='Home'
					className='text-lg font-bold'
					style={({ isActive }) => ({
						color: isActive ? '#D87D4A' : 'black',
					})}
				>
					SIGN UP
				</NavLink>
			</div>
		</div>
	);
};
