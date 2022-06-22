import React, { useState } from 'react';
import Switch from '@mui/material/Switch';

import './SettingsPage.scss';
const getDefaultTheme = () => {
	if (localStorage.getItem('theme') === 'light') {
		return true;
	}
	if (localStorage.getItem('theme') === 'light') {
		return false;
	} else {
		return false;
	}
};

const SettingsPage = () => {
	const [lightTheme, setLightTheme] = useState(getDefaultTheme());

	const label = { inputProps: { 'aria-label': 'Switch demo' } };

	const handleTheme = ({ target }) => {
		setLightTheme(target.checked);
		if (target.checked) {
			localStorage.setItem('theme', 'light');
		} else {
			localStorage.setItem('theme', 'dark');
		}
		console.log(localStorage.getItem('theme'));
	};

	return (
		<div className='settings_page'>
			<div className='settings_panel'>
				<div className='settings_panel_title color_1'>Settings</div>
				<div className='settings_panel_item'>
					<span className='color_1'>Light mode</span>
					<Switch
						{...label}
						checked={lightTheme}
						onChange={handleTheme}
					/>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
