import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryParams } from 'utils';

import { Button, NavMenu } from 'components/index';
import MainLogo from './MainLogo/MainLogo';
import OpenSearch from './OpenSearch/OpenSearch';
import SagaActions from 'store/sagas/actions';
import './Header.scss';

const Header = () => {
	const [isHiddenSearch, setIsHiddenSearch] = useState(true);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuth } = useSelector(state => state.auth);
	const Search = useRef(null);
	const [query] = useQueryParams();

	console.log('header is auth --> ', isAuth);
	const userName = localStorage.getItem('user_name');

	const handleOutsideClick = event => {
		event.stopPropagation();
		setIsHiddenSearch(true);
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
			const queryParams = createSearchParams({
				...query,
				search: search,
			});

			navigate({
				pathname: '/questions',
				search: `?${queryParams}`,
			});
			setIsHiddenSearch(true);
			setSearch('');
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

	const handleLogOut = () => {
		console.log('logout');
		localStorage.clear();
		dispatch({
			type: SagaActions.LOG_OUT,
		});
		navigate('/sign-in');
	};

	return (
		<div className='header shadow_bottom_1'>
			<div className='header_content'>
				<div className='flex_row'>
					<MainLogo size={35} />
					<NavMenu />
					<OpenSearch onClick={handleShowingSearch} />
				</div>

				{isAuth ? (
					<div className='flex_row auth_btns' style={{ marginTop: '3px' }}>
						<div className='color_1 welcome_user'>Hello {userName}</div>
						<Button value='Log out' width='80px' onClick={handleLogOut} type='primary' />
					</div>
				) : (
					<div className='flex_row auth_btns' style={{ marginTop: '3px' }}>
						<Button
							value='Sign in'
							width='80px'
							onClick={() => navigate('/sign-in')}
							type='primary'
						/>
						<Button value='Sign up' width='80px' onClick={() => navigate('/sign-up')} />
					</div>
				)}

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
