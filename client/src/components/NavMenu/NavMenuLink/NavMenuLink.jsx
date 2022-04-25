import React from 'react';
import { useNavigate } from 'react-router-dom';

import QuizIcon from '@mui/icons-material/Quiz';
import StyleIcon from '@mui/icons-material/Style';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './NavMenuLink.scss';

const navLinksIcons = {
	questions: QuizIcon,
	tags: StyleIcon,
	bookmarks: BookmarkIcon,
	followings: GroupIcon,
	settings: SettingsIcon,
	profile: AccountCircleIcon,
};

const NavMenuLink = ({ link, isActive }) => {
	const navigate = useNavigate();
	const Icon = navLinksIcons[link];

	const handleNavigate = () => {
		link === 'questions' ? navigate('/') : navigate(`/${link}`);
	};

	const activeStyle = isActive ? 'bg_3' : null;
	const hoverStyle = isActive ? null : 'color_hover_1';

	return (
		<div className={`nav_menu_link ${activeStyle}`} onClick={handleNavigate}>
			<Icon sx={{ fontSize: 20 }} className='icon_fill_1' />
			<span className={`color_1  ${hoverStyle}`}>{link}</span>
		</div>
	);
};

export default NavMenuLink;
