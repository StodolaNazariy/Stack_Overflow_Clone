import React, { useState } from 'react';
import { Button, TextInput } from 'components';
import './MyProfilePage.scss';

const MyProfilePage = () => {
	const [avatar, setAvatar] = useState('');
	const default_avatar = process.env.PUBLIC_URL + '/icons/avatar_default.png';

	const handleSave = () => {
		console.log('SAVED');
		const formData = new FormData();
		formData.append('file', avatar);
		console.log(formData);
	};

	return (
		<div className='my_profile_page'>
			<div className='my_profile_avatar'>
				<img src={default_avatar} alt='' />
				<input
					type='file'
					value={avatar}
					onChange={event => setAvatar(event.target.files[0])}
				/>
			</div>
			<div className='my_profile_info'>
				<div className='my_profile_info_item'>
					<span className='color_1'>Name</span>
					<TextInput placeholder='Name' disabled={true} />
				</div>
				<div className='my_profile_info_item'>
					<span className='color_1'>Employement</span>
					<TextInput placeholder='Employement' />
				</div>
				<div className='my_profile_info_item'>
					<span className='color_1'>Residence</span>
					<TextInput placeholder='Residence' />
				</div>
			</div>
			<div className='my_profile_about'>
				<span className='color_1'>About me</span>
				<textarea
					name=''
					id=''
					cols='30'
					rows='5'
					className='color_1 border_1'
					maxLength='160'
					placeholder='About me'
				/>
				<Button value='Save' onClick={handleSave} type='secondary' height='40px' />
			</div>
		</div>
	);
};

export default MyProfilePage;
