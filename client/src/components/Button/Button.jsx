import React from 'react';
import './Button.scss';

const buttonStyles = {
	primary: 'primary_btn',
	secondary: 'secondary_btn',
	third: 'third_btn',
};

const Button = ({ width = 150, value, onClick, height = 25, type = 'primary' }) => {

	const style = buttonStyles[type];

	return (
		<button
			className={`button ${style}`}
			style={{ width: width, height: height }}
			onClick={onClick}>
			{value}
		</button>
	);
};

export default Button;
