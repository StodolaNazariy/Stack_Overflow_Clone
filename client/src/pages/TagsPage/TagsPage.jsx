import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TagCard } from 'components';
import SagaActions from 'store/sagas/actions';
import './TagsPage.scss';

const TagsPage = () => {
	const { count, tags } = useSelector(state => state.tags);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch({
			type: SagaActions.GEG_ALL_TAGS,
		});
	}, []);

	return (
		<div className='tags_page'>
			<div className='tags_page_title color_1'>All tags: {count}</div>
			<div className='tags_page_list'>
				{tags.map(tag => (
					<TagCard
						key={tag.id}
						tag={tag}
						handleClick={() => navigate(`/questions?tag=${tag.name}`)}
					/>
				))}
			</div>
		</div>
	);
};

export default TagsPage;
