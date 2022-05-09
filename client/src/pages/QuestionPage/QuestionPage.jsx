import React, { useEffect, useState, Fragment, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'components';
import SagaActions from 'store/sagas/actions';
import { Fetch } from 'utils';
import './QuestionPage.scss';

const QuestionPage = () => {
	const [question, setQuestion] = useState(null);
	const [answers, setAnswers] = useState([]);
	const [stats, setStats] = useState(null);
	const [author, setAuthor] = useState(null);
	const [errorQuestion, setErrorQuestion] = useState(null);
	const [newAnswer, setNewAnswer] = useState('');
	const editorRef = useRef(null);

	const { isAuth } = useSelector(state => state.auth);

	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
		setAuthor(data.author);
		setErrorQuestion(null);
	}, [endPoint]);

	useEffect(async () => {
		const { data } = await Fetch(`/questions/answers/${id}`);

		setAnswers(data);
	}, [endPoint]);
	console.log('question ---> ', question);
	console.log('error ---> ', errorQuestion);
	console.log('author ---> ', author);
	console.log('stats ---> ', stats);
	console.log('answers ----> ', answers);

	const handleNavigateToAuthor = () => {
		navigate(`/users/${question.userId}`);
	};

	const checkStateExist = () => {
		return question && stats && author;
	};

	const handleSubmitNewAnswer = () => {
		console.log('submit ---> ', newAnswer);
		if (!isAuth) {
			navigate('/sign-in');
			return;
		}

		dispatch({
			type: SagaActions.CREATE_ANSWER,
			payload: {
				id: question.id,
				answer: newAnswer,
			},
		});
	};

	return (
		<div className='question_page'>
			<div className='question_page_question'>
				{checkStateExist() ? (
					<Fragment>
						<div className='question_full'>
							<div className='question_full_author'>
								<div className='question_full_author_info'>
									<img
										src={default_avatar}
										alt=''
										style={{ width: '24px', height: '24px' }}
										onClick={handleNavigateToAuthor}
									/>
									<div className='color_1' onClick={handleNavigateToAuthor}>
										{author.name}
									</div>
								</div>

								<div className='color_2'>{convertDate(question.createdAt)}</div>
							</div>
							<div className='question_full_tags'>
								{question.tags.split(' ').map(tag => (
									<div key={tag} className='q_tag color_1'>
										{tag}
									</div>
								))}
							</div>
							<div className='question_full_title color_1'>{question.title}</div>
							<div className='question_full_stats color_2 shadow_bottom_1'>
								<div className='flex_row'>
									<div>{stats.answersCount} answers</div>
									<div>{stats.likesCount} likes</div>
								</div>

								<div className='flex_row'>
									<div>B</div>
									<div>L</div>
								</div>
							</div>
							<div
								className='question_full_content color_1  shadow_bottom_1'
								dangerouslySetInnerHTML={{ __html: question.content }}
							/>
						</div>
						<div className='question_page_answers'>
							{answers.map(answer => {
								return (
									<div key={answer.createdAt} className='answer_full shadow_bottom_1'>
										<div className='answer_full_author'>
											<div className='answer_full_author_info'>
												<img
													src={default_avatar}
													alt=''
													style={{ width: '24px', height: '24px' }}
													onClick={() => navigate(`/users/${answer.user.id}`)}
												/>
												<div className='color_1' onClick={handleNavigateToAuthor}>
													{answer.user.name}
												</div>
											</div>

											<div className='color_2'>{convertDate(question.createdAt)}</div>
										</div>
										<div
											className='answer_full_content color_1'
											dangerouslySetInnerHTML={{ __html: answer.answer }}
										/>
									</div>
								);
							})}
						</div>
						<div className='create_new_answer'>
							<Editor
								onInit={(evt, editor) => (editorRef.current = editor)}
								initialValue='<p>This is the initial content of the editor.</p>'
								value={newAnswer}
								onEditorChange={(newValue, editor) => setNewAnswer(newValue)}
								apiKey='rn3dllt0qp3av8bbha4p4jo7rktjhrnwtlfu0f2pjl5ska38'
								init={{
									height: 500,
									menubar: true,
									statusbar: true,
									toolbar:
										'undo redo | formatselect | fontsizeselect | code |' +
										'bold italic backcolor | alignleft aligncenter ' +
										'alignright alignjustify | bullist numlist outdent indent | ' +
										'removeformat | help',

									fontsize_formats:
										'8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
									content_style:
										'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
								}}
							/>

							<Button
								value='Publish'
								onClick={handleSubmitNewAnswer}
								type='secondary'
								height='35px'
							/>
						</div>
					</Fragment>
				) : (
					<div>Opps</div>
				)}
			</div>
		</div>
	);
};

export default QuestionPage;
