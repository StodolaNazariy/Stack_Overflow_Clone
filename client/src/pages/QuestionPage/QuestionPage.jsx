import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fetch } from 'utils';
import './QuestionPage.scss';

const QuestionPage = () => {
	const [question, setQuestion] = useState(null);
	const [answers, setAnswers] = useState(null);
	const [stats, setStats] = useState(null);
	const [errorQuestion, setErrorQuestion] = useState(null);
	const { id } = useParams();

	const endPoint = `${window.location.pathname}${window.location.search}`;
	const default_avatar = process.env.PUBLIC_URL + '/icons/avatar_default.png';
	const convertDate = dateISO => new Date(dateISO).toDateString();

	useEffect(async () => {
		const { data, errMessage } = await Fetch(endPoint);

		if (errMessage) {
			setQuestion(null);
			setErrorQuestion(errMessage);
			return;
		}
		setQuestion(data.question);
		setStats(data.stats);
		setErrorQuestion(null);
	}, [endPoint]);

	useEffect(async () => {
		const { data } = await Fetch(`/questions/answers/${id}`);

		setAnswers(data);
	}, [endPoint]);
	console.log('question ---> ', question);
	console.log('error ---> ', errorQuestion);
	console.log('stats ---> ', stats);
	console.log('answers ----> ', answers);

	// const Tags = question.tags.split(' ');

	return (
		<div className='question_page'>
			<div className='question_page_question'>
				<div className='question_full'>
					<div className='question_full_title color_1'>{question.title || null}</div>
					<div className='question_full_author'></div>
					<div className='question_full_stats'></div>
					<div className='question_full_content'></div>
				</div>
			</div>
			<div className='question_page_answers'>Answers</div>
		</div>
	);
};

export default QuestionPage;
