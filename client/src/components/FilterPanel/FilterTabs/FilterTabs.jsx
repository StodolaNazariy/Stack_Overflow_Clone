import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useQueryParams } from 'utils';
import './FilterTabs.scss';

const FilterTabs = () => {
	const [activeTab, setActiveTab] = useState('newest');
	const navigate = useNavigate();

	const [query] = useQueryParams();

	const Tabs = ['newest', 'popular', 'unanswered', 'last week', 'last month'];
	const activeStyle = 'bg_3';
	const passiveStyle = 'color_1 border_2';

	const handleTabClick = event => {
		const currentTab = event.target.innerText;
		setActiveTab(currentTab);

		const queryParams = createSearchParams({
			...query,
			tab: currentTab.split(' ').join('_'),
		});

		navigate({
			pathname: '/questions',
			search: `?${queryParams}`,
		});
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
