import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
} from 'pages';

const App = () => {
	const [theme, setTheme] = useState('light');
	//console.log(setTheme);

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<GlobalStyles />
			<div className='app app_bg'>
				<hr className='base_line' />

				<Header />

				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/questions' element={<HomePage />} />
					<Route path='/tags' element={<TagsPage />} />
					<Route path='/settings' element={<SettingsPage />} />
					<Route path='/followings' element={<FollowingsPage />} />
					<Route path='/bookmarks' element={<BookMarksPage />} />
					<Route path='/profile' element={<MyProfilePage />} />
					<Route path='*' element={<NoMatchPage />} />
				</Routes>

				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default App;
