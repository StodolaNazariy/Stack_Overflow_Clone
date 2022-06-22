import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryParams } from 'utils';
import { ROUTES, CONTENT } from 'shared';
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
				pathname: ROUTES.QUESTIONS,
				search: `?${queryParams}`,
			});
			setIsHiddenSearch(true);
			setSearch('');
		}
		if (event.key === 'Escape') {
			setIsHiddenSearch(true);
		}
	};

	const handleShowingSearch = () => {
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
		navigate(ROUTES.SIGN_IN);
	};

	const { button } = CONTENT;

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
						<Button
							value={button.log_out}
							width='80px'
							onClick={handleLogOut}
							type='primary'
						/>
					</div>
				) : (
					<div className='flex_row auth_btns' style={{ marginTop: '3px' }}>
						<Button
							value={button.sign_in}
							width='80px'
							onClick={() => navigate(ROUTES.SIGN_IN)}
							type='primary'
						/>
						<Button
							value={button.sign_up}
							width='80px'
							onClick={() => navigate(ROUTES.SIGN_UP)}
						/>
					</div>
				)}

				<input
					value={search}
					ref={Search}
					type='text'
					className={`search_panel color_1 app_bg border_3 ${
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
