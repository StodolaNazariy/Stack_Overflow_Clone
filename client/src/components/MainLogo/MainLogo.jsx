import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainLogo = ({ size = 35 }) => {
	const navigate = useNavigate();
	const logoPath = process.env.PUBLIC_URL + '/icons/logo.png';

	return (
		<div>
			<img
				src={logoPath}
				alt=''
				className='logo'
				onClick={() => {
					navigate('/');
				}}
				style={{ width: size, height: size }}
			/>
		</div>
	);
};

export default MainLogo;
