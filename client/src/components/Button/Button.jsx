import React from 'react';
import './Button.scss';

const Button = ({ width = 200, value, type, onClick }) => {
	const buttonStyle = `button ${type}_btn`;

	return (
		<div className='button' style={{ width: width }}>
			<input
				type='button'
				className={buttonStyle}
				style={{ width: width }}
				value={value}
				onClick={onClick}
			/>
		</div>
	);
};

export default Button;
