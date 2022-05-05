import React, { useState, useEffect } from 'react';

import { FilterPanel, QuestionShort } from 'components';
import { Fetch } from 'utils';

import './HomePage.scss';

const HomePage = () => {
	const [questions, setQuestions] = useState([]);
	const endPoint = `${window.location.pathname}${window.location.search}`;

	useEffect(async () => {
		const { data, errMessage } = await Fetch(endPoint);
		if (errMessage) {
			return;
		}
		console.log('fetched questions -----> ', data);
		setQuestions(data);
	}, [endPoint]);

	return (
		<div className='home_page color_1'>
			<FilterPanel />
			<div className='question_list'>
				{questions.map(question => (
					<QuestionShort key={question.id} question={question} />
				))}
			</div>
		</div>
	);
};

export default HomePage;
