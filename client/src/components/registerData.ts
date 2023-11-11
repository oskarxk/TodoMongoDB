import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper name'),
	email: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper email'),
	password: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please provide a proper password'),
});

export const initialValues = {
	name: '',
	email: '',
	password: '',
};
