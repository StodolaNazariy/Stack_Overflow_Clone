import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SagaActions from 'store/sagas/actions';
import './UserPage.scss';

const UserPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const {
		profile: { user, user_profile, likesCount, questionsCount, answersCount },
	} = useSelector(state => state.user_profile);

	const default_avatar = process.env.PUBLIC_URL + '/icons/avatar_default.png';

	useEffect(() => {
		if (Number(id)) {
			dispatch({
				type: SagaActions.GET_USER_PROFILE,
				payload: id,
			});
		}
	}, [id]);

	return (
		<div className='user_profile_page'>
			{Number(id) && user ? (
				<div className='user_profile'>
					<div className='user_profile_header'>
						<div>
							<img
								src={default_avatar}
								alt=''
								style={{ width: '100px', height: '100px' }}
							/>
						</div>
						<div className='user_profile_info'>
							<div className='color_1'>{user.name}</div>
							<div className='color_2'>{user_profile.employement || 'not specified'}</div>
							<div className='color_2'>{user_profile.residence || 'not specified'}</div>
						</div>
					</div>
					{user_profile.about && (
						<div className='user_profile_about color_1'>{user_profile.about}</div>
					)}

					<div className='user_profile_details border_3'>
						<div className='color_2'>{likesCount} score</div>
						<div className='color_2'>{questionsCount} questions</div>
						<div className='color_2'>{answersCount} answers</div>
					</div>
				</div>
			) : (
				<div className='user_profile_invalid color_1'>
					{Number(id)
						? `User with id == ${id} not found`
						: `Oops! Invalid user ID == ${id}`}
				</div>
			)}
		</div>
	);
};

export default UserPage;
