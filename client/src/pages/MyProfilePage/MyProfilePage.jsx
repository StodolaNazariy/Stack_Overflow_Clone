import React, { useState } from 'react';
import { Button, TextInput } from 'components';
import './MyProfilePage.scss';

const MyProfilePage = () => {
	const [avatar, setAvatar] = useState('');
	const [name, setName] = useState('');
	const [empoyement, setEmployement] = useState('');
	const [residence, setResidence] = useState('');
	const [aboutMe, setAboutMe] = useState('');

	const default_avatar = process.env.PUBLIC_URL + '/icons/avatar_default.png';

	const handleSave = () => {
		const formData = new FormData();
		console.log('SAVED');
		formData.append('avatar', avatar);
		formData.append('name', name);
		formData.append('employement', empoyement);
		formData.append('residence', residence);
		formData.append('aboutMe', aboutMe);
	};

	const handleAddFile = event => {
		event.preventDefault();
		setAvatar(event.target.files[0]);
	};

	return (
		<div className='my_profile_page'>
			<div className='my_profile_avatar'>
				<img src={default_avatar} alt='' />
				<input type='file' onChange={handleAddFile} />
			</div>
			<div className='my_profile_info'>
				<div className='my_profile_info_item'>
					<span className='color_1'>Name</span>
					<TextInput placeholder='Name' disabled={true} styles='input_size_standard' />
				</div>
				<div className='my_profile_info_item'>
					<span className='color_1'>Employement</span>
					<TextInput
						placeholder='Employement'
						value={empoyement}
						onChange={event => setEmployement(event.target.value)}
						styles='input_size_standard'
					/>
				</div>
				<div className='my_profile_info_item'>
					<span className='color_1'>Residence</span>
					<TextInput
						placeholder='Residence'
						value={residence}
						onChange={event => setResidence(event.target.value)}
						styles='input_size_standard'
					/>
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
					value={aboutMe}
					onChange={event => setAboutMe(event.target.value)}
				/>
				<Button value='Save' onClick={handleSave} type='secondary' height='40px' />
			</div>
		</div>
	);
};

export default MyProfilePage;
