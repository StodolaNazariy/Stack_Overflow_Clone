import React, { useState, useEffect, Fragment } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from 'config';
import { Header, Footer } from 'components';
import { Fetch } from 'utils';
import SagaActions from 'store/sagas/actions';
import {
	HomePage,
	NoMatchPage,
	BookMarksPage,
	SettingsPage,
	TagsPage,
	MyProfilePage,
	LoginPage,
	RegistrationPage,
	CreateQuestionPage,
	UserPage,
	QuestionPage,
} from 'pages';

const authURL = ['/sign-in', '/sign-up'];

const App = () => {
	const [isAuthPage, setIsOnAuthPage] = useState(false);
	const auth = useSelector(state => state.auth);
	const [theme, setTheme] = useState('light');
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		authURL.includes(location.pathname) ? setIsOnAuthPage(true) : setIsOnAuthPage(false);
	}, [location]);

	useEffect(() => {
		console.log('define auth');
		dispatch({
			type: SagaActions.DEFINE_AUTH,
		});
	}, [location]);

	console.log('auth ---> ', auth);

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<GlobalStyles />
			<div className='app app_bg'>
				<hr className='base_line' />

				{!isAuthPage && <Header />}

				<Routes>
					<Route path='/sign-in' element={<LoginPage />} />
					<Route path='/sign-up' element={<RegistrationPage />} />
					<Route path='/' element={<HomePage />} />
					<Route path='/tags' element={<TagsPage />} />
					<Route path='/questions' element={<HomePage />} />
					<Route path='/questions/:id' element={<QuestionPage />} />
					<Route path='/users/:id' element={<UserPage />} />

					{auth.isAuth && (
						<Fragment>
							<Route path='/questions/create' element={<CreateQuestionPage />} />
							<Route path='/settings' element={<SettingsPage />} />
							<Route path='/bookmarks' element={<BookMarksPage />} />
							<Route path='/profile' element={<MyProfilePage />} />
						</Fragment>
					)}

					<Route path='*' element={<NoMatchPage />} />
				</Routes>

				{!isAuthPage && <Footer />}
			</div>
		</ThemeProvider>
	);
};

export default App;
