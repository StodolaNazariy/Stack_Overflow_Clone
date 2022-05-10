import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'components';
import { CONTENT, ROUTES } from 'shared';
import FilterTabs from './FilterTabs/FilterTabs';

import './FIlterPanel.scss';

const FilterPanel = () => {
	const navigate = useNavigate();
	const { isAuth } = useSelector(state => state.auth);

	const handleNavigate = () => {
		isAuth ? navigate(ROUTES.QUESTION_CREATE) : navigate(ROUTES.SIGN_IN);
	};

	return (
		<div className='filter_panel shadow_bottom_1'>
			<div className='f_title'>
				<span className='color_1'>All questions</span>
				<span className='color_1'>51, 642</span>
			</div>

			<div className='f_btn'>
				<Button
					value={CONTENT.button.ask_question}
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
