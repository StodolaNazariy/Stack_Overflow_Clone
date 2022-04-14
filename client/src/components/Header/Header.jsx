import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.scss';
import { Button } from '../index';

const Header = () => {
	const navigate = useNavigate();

	return (
		<div className='header'>
			<hr />
			<div className='header_content'>
				<div className='nav_buttons'>
					<div>Logo</div>
					<div>Menu</div>
				</div>

				<div>Search</div>

				<div className='auth_buttons'>
					<Button
						value='Sign in'
						type='auth'
						width={80}
						onClick={() => navigate('/sign-in')}
					/>
					<Button
						value='Sign up'
						type='auth'
						width={80}
						onClick={() => navigate('sign-up')}
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
