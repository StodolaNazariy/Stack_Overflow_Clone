import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';

import { NavMenuLink } from 'components';

import './NavMenu.scss';

const navLinks = ['questions', 'tags', 'bookmarks', 'followings', 'profile', 'settings'];

const NavMenu = () => {
	const [currentRoute, setCurrentRoute] = useState('');
	const location = useLocation();

	const checkActiveRoute = () => {
		if (location.pathname === '/') {
			setCurrentRoute('questions');
		} else {
			const thisRoute = location.pathname.slice(1);
			setCurrentRoute(thisRoute);
		}
	};

	useEffect(() => {
		checkActiveRoute();
	}, [location]);

	return (
		<div className='nav_menu'>
			<div className='nav_menu_trigger'>
				<ListIcon sx={{ fontSize: 38 }} className='icon_fill_1' />
				<div className='nav_menu_items shadow_all_1 '>
					{navLinks.map(link => {
						return (
							<NavMenuLink
								key={link}
								link={link}
								isActive={currentRoute === link ? true : false}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default NavMenu;
