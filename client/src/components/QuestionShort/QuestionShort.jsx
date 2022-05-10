import React from 'react';
import { useNavigate } from 'react-router-dom';
import { convertDate } from 'utils';
import { Tag, UserAvatar } from 'components';
import { splittedTags } from 'utils';

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

	const Tags = splittedTags(tags);

	const handleNavigateToAuthor = () => {
		navigate(`/users/${userId}`);
	};

	const handleNavigateToQuestion = () => {
		navigate(`/questions/${id}`);
	};

	return (
		<div className='question_short shadow_bottom_1'>
			<div className='question_short_info'>
				<div className='qsi_user'>
					<UserAvatar onClick={handleNavigateToAuthor} avatar={avatar} />
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
					<Tag key={tag} tag={tag} />
				))}
			</div>
			<div className='question_short_title color_3' onClick={handleNavigateToQuestion}>
				{title}
			</div>
		</div>
	);
};

export default QuestionShort;
