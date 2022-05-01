import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import FilterTabs from './FilterTabs/FilterTabs';

import './FIlterPanel.scss';

const FilterPanel = () => {
	const navigate = useNavigate();

	return (
		<div className='filter_panel shadow_bottom_1'>
			<div className='f_title'>
				<span className='color_1'>All questions</span>
				<span className='color_1'>51, 642</span>
			</div>

			<div className='f_btn'>
				<Button
					value='Ask question'
					onClick={() => navigate('/questions/create')}
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
