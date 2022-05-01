import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme, GlobalStyles } from 'config';
import { Header, Footer } from 'components';
import {
	HomePage,
	NoMatchPage,
	FollowingsPage,
	BookMarksPage,
	SettingsPage,
	TagsPage,
	MyProfilePage,
	LoginPage,
	RegistrationPage,
	CreateQuestionPage,
} from 'pages';

const authURL = ['/sign-in', '/sign-up'];

const App = () => {
	const [theme, setTheme] = useState('light');
	const location = useLocation();
	const [isAuthPage, setIsOnAuthPage] = useState(false);

	useEffect(() => {
		authURL.includes(location.pathname) ? setIsOnAuthPage(true) : setIsOnAuthPage(false);
	}, [location]);

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<GlobalStyles />
			<div className='app app_bg'>
				<hr className='base_line' />

				{isAuthPage ? null : <Header />}

				<Routes>
					<Route path='/sign-in' element={<LoginPage />} />
					<Route path='/sign-up' element={<RegistrationPage />} />
					<Route path='/' element={<HomePage />} />
					<Route path='/questions' element={<HomePage />} />
					<Route path='/questions/create' element={<CreateQuestionPage />} />
					<Route path='/tags' element={<TagsPage />} />
					<Route path='/settings' element={<SettingsPage />} />
					<Route path='/followings' element={<FollowingsPage />} />
					<Route path='/bookmarks' element={<BookMarksPage />} />
					<Route path='/profile' element={<MyProfilePage />} />
					<Route path='*' element={<NoMatchPage />} />
				</Routes>

				{isAuthPage ? null : <Footer />}
			</div>
		</ThemeProvider>
	);
};

export default App;
