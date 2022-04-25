import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.scss';
import { Button, MainLogo, NavMenu, OpenSearch } from 'components/index';

const Header = () => {
	const [isHiddenSearch, setIsHiddenSearch] = useState(true);
	const [search, setSearch] = useState('');
	const Search = useRef(null);
	const navigate = useNavigate();

	const handleOutsideClick = event => {
		if (Search.current.contains(event.target)) {
			console.log('click on');
		} else {
			setIsHiddenSearch(true);
		}
	};

	useEffect(() => {
		if (!isHiddenSearch) {
			document.addEventListener('click', handleOutsideClick);
			return () => document.removeEventListener('click', handleOutsideClick);
		}
	});

	const handleSearchChange = event => {
		setSearch(event.target.value);
	};

	const handleSubmitSearch = event => {
		if (event.key === 'Enter') {
			setIsHiddenSearch(true);
			setSearch('');
			console.log('submit search ---> ', search);
		}
		if (event.key === 'Escape') {
			setIsHiddenSearch(true);
		}
	};

	const handleShowingSearch = event => {
		setIsHiddenSearch(!isHiddenSearch);
		if (setIsHiddenSearch) {
			setTimeout(() => {
				Search.current.focus();
			}, 200);
		}
	};

	return (
		<div className='header shadow_bottom_1'>
			<div className='header_content'>
				<div className='flex_row'>
					<MainLogo size={35} />
					<NavMenu />
					<OpenSearch onClick={handleShowingSearch} />
				</div>

				<div className='flex_row auth_btns' style={{ marginTop: '3px' }}>
					<Button
						value='Sign in'
						width='80px'
						onClick={() => navigate('/sign-in')}
						type='primary'
					/>
					<Button value='Sign up' width='80px' onClick={() => navigate('/sign-up')} />
				</div>
				<input
					value={search}
					ref={Search}
					type='text'
					className={`search_panel color_1 bg_dark border_3 ${
						isHiddenSearch ? 'hide_search' : 'show_search'
					}`}
					onChange={handleSearchChange}
					onKeyDown={handleSubmitSearch}
					autoFocus={true}
				/>
			</div>
		</div>
	);
};

export default Header;
