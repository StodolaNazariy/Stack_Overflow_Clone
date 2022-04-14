import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages';
import { Header, Footer } from './components';

const App = () => {
	return (
		<div className='app'>
			<Header />

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='*' element={<HomePage />} />
			</Routes>

			<Footer />
		</div>
	);
};

export default App;
