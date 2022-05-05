import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from 'components';
import { Fetch } from 'utils';

import './LoginPage.scss';

const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
});

const LoginPage = () => {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			const { data, status, errMessage } = await Fetch('/sign-in', 'POST', values);
			if (status) {
				localStorage.setItem('user_name', data.user.name);
				localStorage.setItem('user_email', data.user.email);
				localStorage.setItem('user_id', data.user.id);
				navigate('/');
				return;
			} else {
				alert(errMessage);
			}
		},
	});

	return (
		<div className='login_page'>
			<form className='login_page_form' onSubmit={formik.handleSubmit}>
				<div className='login_page_form_title color_1'>Sign In</div>
				<TextField
					id='email'
					name='email'
					label='Email'
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<TextField
					id='password'
					name='password'
					label='Password'
					type='password'
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>
				<div className='forgot_password_link'>
					<Link to='/forgot-password' className='color_1'>
						Forgot Password ?
					</Link>
				</div>

				<div className='login_page_form_submit'>
					<Button value='Login' width='320px' type='secondary' height='40px' />
				</div>

				<div className='color_1 sign_up_link'>
					Not a member?{' '}
					<Link to='/sign-up' className='color_1'>
						Sign up
					</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
