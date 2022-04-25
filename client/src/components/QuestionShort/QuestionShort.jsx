import React from 'react';

import './QuestionShort.scss';

const QuestionShort = ({
	question: { id, likes, user_name, user_avatar, answers, title, createdAt, tags },
}) => {
	const default_avatar = process.env.PUBLIC_URL + '/icons/avatar_default.png';

	const convertDate = dateISO => new Date(dateISO).toDateString();

	const Tags = tags.split(' ');

	return (
		<div className='question_short border_2'>
			<div className='question_short_info'>
				<div className='qsi_user'>
					<img src={default_avatar} alt='' style={{ width: '24px', height: '24px' }} />
					<div className='color_1'>{user_name}</div>
				</div>
				<div className='qsi_stats'>
					<div className='color_2'>{answers} answers</div>
					<div className='color_2'>{likes} likes</div>
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
			<div className='question_short_title color_3'>{title}</div>
		</div>
	);
};

export default QuestionShort;
