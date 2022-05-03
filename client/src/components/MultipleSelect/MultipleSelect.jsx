import React from 'react';
import Select from 'react-select';

import './MultipleSelect.scss';

const MultipleSelect = ({ optionsToSelect, value, onChange, placeholder }) => {
	return (
		<div className='multiple_select_container'>
			<Select
				value={value}
				onChange={onChange}
				isMulti
				name='tags'
				className='multiple_select'
				classNamePrefix='select'
				options={optionsToSelect}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default MultipleSelect;
