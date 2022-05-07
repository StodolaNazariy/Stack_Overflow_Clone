import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import NavMenuLink from './NavMenuLink/NavMenuLink';

import './NavMenu.scss';

const navLinks = ['questions', 'tags'];
const authorizedLinks = ['bookmarks', 'profile', 'settings'];
const adminLinks = ['admin'];

const NavMenu = () => {
	const [currentRoute, setCurrentRoute] = useState('');
	const { isAuth, role } = useSelector(state => state.auth);
	const location = useLocation();

	const navLinks = ['questions', 'tags'];
	const authorizedLinks = ['bookmarks', 'profile', 'settings'];
	const adminLinks = ['admin'];

	if (isAuth) {
		navLinks.push(...authorizedLinks);
	}
	if (role === 'Admin') {
		navLinks.push(...adminLinks);
	}

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
