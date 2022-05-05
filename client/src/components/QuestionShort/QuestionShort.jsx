import React from 'react';
import { useNavigate } from 'react-router-dom';

import './QuestionShort.scss';

const QuestionShort = ({
	question: {
		id,
		likesCount,
		answersCount,
		title,
		createdAt,
		tags,
		userId,
		user: { name, avatar },
	},
}) => {
	const navigate = useNavigate();

	const default_avatar = process.env.PUBLIC_URL + '/icons/avatar_default.png';
	const convertDate = dateISO => new Date(dateISO).toDateString();
	const Tags = tags.split(' ');

	const handleNavigateToAuthor = event => {
		event.stopPropagation();
		navigate(`/users/${userId}`);
	};

	const handleNavigateToQuestion = () => {
		navigate(`/questions/${id}`);
	};

	return (
		<div className='question_short border_2'>
			<div className='question_short_info'>
				<div className='qsi_user'>
					<img
						src={avatar || default_avatar}
						alt=''
						style={{ width: '24px', height: '24px' }}
						onClick={handleNavigateToAuthor}
					/>
					<div className='color_1' onClick={handleNavigateToAuthor}>
						{name}
					</div>
				</div>
				<div className='qsi_stats'>
					<div className='color_2'>{answersCount} answers</div>
					<div className='color_2'>{likesCount} likes</div>
					<div className='color_2'>{convertDate(createdAt)}</div>
				</div>
			</div>
			<div className='question_short_tags'>
				{Tags.map(tag => (
					<div key={tag} className='q_tag color_1'>
						{tag}
					</div>
				))}
			</div>
			<div className='question_short_title color_3' onClick={handleNavigateToQuestion}>
				{title}
			</div>
		</div>
	);
};

export default QuestionShort;
