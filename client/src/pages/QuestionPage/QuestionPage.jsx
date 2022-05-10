import React, { useEffect, useState, Fragment, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tag, UserAvatar, TextEditor } from 'components';
import SagaActions from 'store/sagas/actions';
import { Fetch } from 'utils';
import { ROUTES } from 'shared';
import { convertDate } from 'utils';
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

	const handleNavigateToAuthor = () => {
		navigate(`/users/${question.userId}`);
	};

	const checkStateExist = () => {
		return question && stats && author;
	};

	const handleSubmitNewAnswer = () => {
		console.log('submit ---> ', newAnswer);
		if (!isAuth) {
			navigate(ROUTES.SIGN_IN);
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
									<UserAvatar onClick={handleNavigateToAuthor} avatar={author.avatar} />
									<div className='color_1' onClick={handleNavigateToAuthor}>
										{author.name}
									</div>
								</div>

								<div className='color_2'>{convertDate(question.createdAt)}</div>
							</div>
							<div className='question_full_tags'>
								{question.tags.split(' ').map(tag => (
									<Tag key={tag} tag={tag} />
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
												<UserAvatar
													onClick={() => navigate(`/users/${answer.user.id}`)}
													avatar={answer.user.avatar}
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
							<TextEditor
								editorRef={editorRef}
								value={newAnswer}
								setValue={setNewAnswer}
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
