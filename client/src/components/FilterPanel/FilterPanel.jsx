import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'components';
import FilterTabs from './FilterTabs/FilterTabs';

import './FIlterPanel.scss';

const FilterPanel = () => {
	const navigate = useNavigate();
	const { isAuth } = useSelector(state => state.auth);

	const handleNavigate = () => {
		isAuth ? navigate('/questions/create') : navigate('/sign-in');
	};

	return (
		<div className='filter_panel shadow_bottom_1'>
			<div className='f_title'>
				<span className='color_1'>All questions</span>
				<span className='color_1'>51, 642</span>
			</div>

			<div className='f_btn'>
				<Button
					value='Ask question'
					onClick={handleNavigate}
					type='secondary'
					height='30px'
				/>
			</div>

			<div className='f_tabs'>
				<FilterTabs />
			</div>
		</div>
	);
};

export default FilterPanel;
