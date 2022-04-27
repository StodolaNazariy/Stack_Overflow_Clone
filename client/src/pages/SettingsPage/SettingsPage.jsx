import React, { useState } from 'react';
import Switch from '@mui/material/Switch';

import './SettingsPage.scss';

const SettingsPage = () => {
	const [darkTheme, setDarkTheme] = useState(true);

	const label = { inputProps: { 'aria-label': 'Switch demo' } };

	const handleTheme = event => {
		setDarkTheme(event.target.checked);
		console.log(event.target.checked);
	};

	return (
		<div className='settings_page'>
			<div className='settings_panel'>
				<div className='settings_panel_title color_1'>Settings</div>
				<div className='settings_panel_item'>
					<span className='color_1'>Light mode</span>
					<Switch {...label} checked={darkTheme} onChange={handleTheme} />
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
