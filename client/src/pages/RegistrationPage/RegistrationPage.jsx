import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from 'components';
import { Fetch } from 'utils';

import './RegistrationPage.scss';

const validationSchema = yup.object({
	name: yup
		.string('Enter your name')
		.min(3, 'Name should be of minimum 3 characters length')
		.required('Name is required'),
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegistrationPage = () => {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			passwordConfirmation: '',
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			delete values['passwordConfirmation'];
			console.log('this req data ---> ', values);
			const { data, status, errMessage } = await Fetch('/sign-up', 'POST', values, false);
			if (status) {
				navigate('/');
				return;
			} else {
				alert(errMessage);
			}
		},
	});

	return (
		<div className='reqistration_page'>
			<form className='reqistration_page_form' onSubmit={formik.handleSubmit}>
				<div className='reqistration_page_form_title color_1'>Sign up</div>
				<TextField
					className='reqistration_page_input'
					id='name'
					name='name'
					label='Name'
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>
				<TextField
					className='reqistration_page_input'
					id='email'
					name='email'
					label='Email'
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<TextField
					className='reqistration_page_input'
					id='password'
					name='password'
					label='Password'
					type='password'
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>
				<TextField
					className='reqistration_page_input'
					id='passwordConfirmation'
					name='passwordConfirmation'
					label='Repeat Password'
					type='password'
					value={formik.values.passwordConfirmation}
					onChange={formik.handleChange}
					error={
						formik.touched.passwordConfirmation &&
						Boolean(formik.errors.passwordConfirmation)
					}
					helperText={
						formik.touched.passwordConfirmation && formik.errors.passwordConfirmation
					}
				/>

				<div className='reqistration_page_input'>
					<Button value='Submit' width='320px' type='secondary' height='40px' />
				</div>

				<div className='color_1 sign_up_link'>
					Already have account?{' '}
					<Link to='/sign-in' className='color_1'>
						Sign in
					</Link>
				</div>
			</form>
		</div>
	);
};

export default RegistrationPage;
