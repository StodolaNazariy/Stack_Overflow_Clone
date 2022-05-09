import React from 'react';
import './TextInput.scss';

const TextInput = ({
	styles,
	value,
	onChange,
	width = 200,
	height = 30,
	placeholder,
	maxLength = 30,
	disabled = false,
}) => {
	return (
		<input
			type='text'
			className={`custom_text_input ${styles}`}
			value={value}
			onChange={onChange}
			// style={{ width: `${width}px`, height: `${height}px` }}
			placeholder={placeholder}
			maxLength={maxLength}
			disabled={disabled}
		/>
	);
};

export default TextInput;
