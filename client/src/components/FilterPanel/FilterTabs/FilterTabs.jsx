import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useQueryParams } from 'utils';
import { ROUTES, Tabs } from 'shared';
import './FilterTabs.scss';

const FilterTabs = () => {
	const [activeTab, setActiveTab] = useState('newest');
	const navigate = useNavigate();

	const [query] = useQueryParams();

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
			pathname: ROUTES.QUESTIONS,
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
