import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterTabs.scss';

const FilterTabs = () => {
	const [activeTab, setActiveTab] = useState('popular');
	const navigate = useNavigate();

	const Tabs = ['popular', 'unanswered', 'newest', 'last week', 'last month'];
	const activeStyle = 'bg_3';
	const passiveStyle = 'color_1 border_2';

	const handleTabClick = event => {
		console.log(event.target.innerText);
		setActiveTab(event.target.innerText);
		navigate(`/questions?tab=${event.target.innerText}`);
	};

	return (
		<div className='filter_tabs'>
			<div className='filter_tabs_container border_1'>
				{Tabs.map(tab => (
					<div
						key={tab}
						onClick={handleTabClick}
						name={tab}
						className={`f_tab ${tab === activeTab ? activeStyle : passiveStyle}`}>
						{tab}
					</div>
				))}
			</div>
		</div>
	);
};

export default FilterTabs;
