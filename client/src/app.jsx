import React, { useState, useEffect, Fragment } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from 'config';
import { Header, Footer } from 'components';
import SagaActions from 'store/sagas/actions';
import { ROUTES } from 'shared';
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

const authURL = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];

const App = () => {
	const [isAuthPage, setIsOnAuthPage] = useState(false);
	const [theme, setTheme] = useState('light');
	const auth = useSelector(state => state.auth);
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		authURL.includes(location.pathname) ? setIsOnAuthPage(true) : setIsOnAuthPage(false);
	}, [location]);

	useEffect(() => {
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
					<Route path={ROUTES.SIGN_IN} element={<LoginPage />} />
					<Route path={ROUTES.SIGN_UP} element={<RegistrationPage />} />
					<Route path={ROUTES.HOME} element={<HomePage />} />
					<Route path={ROUTES.TAGS} element={<TagsPage />} />
					<Route path={ROUTES.QUESTIONS} element={<HomePage />} />
					<Route path={ROUTES.QUESTION} element={<QuestionPage />} />
					<Route path={ROUTES.USER_PROFILE} element={<UserPage />} />

					{auth.isAuth && (
						<Fragment>
							<Route path={ROUTES.QUESTION_CREATE} element={<CreateQuestionPage />} />
							<Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
							<Route path={ROUTES.BOOKMARKS} element={<BookMarksPage />} />
							<Route path={ROUTES.MY_PROFILE} element={<MyProfilePage />} />
						</Fragment>
					)}

					<Route path={ROUTES.NO_MATCH_PAGE} element={<NoMatchPage />} />
				</Routes>

				{!isAuthPage && <Footer />}
			</div>
		</ThemeProvider>
	);
};

export default App;
