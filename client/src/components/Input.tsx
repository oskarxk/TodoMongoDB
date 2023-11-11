type InputType = {
	name: string;
	error: boolean;
	errorText: string;
	value: string;
	onChange: any;
	label: string;
	type: string;
};

export const Input: React.FC<InputType> = ({
	name,
	error,
	label,
	errorText,
	value,
	onChange,
	type,
}) => {
	return (
		<>
			<label className='text-left font-semibold py-2' htmlFor={name}>
				{label}
			</label>
			<input
				className={`py-4 border-2 rounded-md outline-none pl-4 ${
					error ? ' border-red-600' : 'border-[#F1F1F1]'
				}`}
				type={type}
				value={value}
				onChange={onChange}
				id={name}
				name={name}
			/>
			{error && <p className='text-left'>{errorText}</p>}
		</>
	);
};
