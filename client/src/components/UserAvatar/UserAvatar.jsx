import React from 'react';
import { default_avatar } from 'shared';

import './UserAvatar.scss';

const UserAvatar = ({ avatar, onClick, size = 'small' }) => {
	const sizes = {
		small: { width: '24px', height: '24px' },
		big: { width: '128px', height: '128px' },
	};

	return (
		<img
			className='user_avatar'
			src={avatar || default_avatar}
			alt=''
			onClick={onClick}
			style={sizes[size]}
		/>
	);
};

export default UserAvatar;
