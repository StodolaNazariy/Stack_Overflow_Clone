import React from 'react';

import { FilterPanel, QuestionShort } from 'components';
import { questions } from './test';

import './HomePage.scss';

const HomePage = () => {
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
