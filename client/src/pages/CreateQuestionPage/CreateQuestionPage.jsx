import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { TextInput, MultipleSelect, Button } from 'components';

import './CreateQuestionPage.scss';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const joinTags = selected => {
	const tags = selected.map(item => item.value);
	console.log('tags ---->', tags);
	return tags.join(' ');
};

const CreateQuestionPage = () => {
	const [questionContent, setQuestionContent] = useState('');
	const [questionTitle, setQuestionTitle] = useState('');
	const [selectedTags, setSelectedTags] = useState(null);

	const editorRef = useRef(null);

	const handleChangeTags = selectedOption => {
		setSelectedTags(selectedOption);
	};

	const handleTitleChange = event => {
		setQuestionTitle(event.target.value);
	};
	// const log = () => {
	// 	if (editorRef.current) {
	// 		console.log(editorRef.current.getContent());
	// 	}
	// };

	const submitSubmit = () => {
		console.log('########################################');
		const formData = new FormData();
		formData.append('tags', joinTags(selectedTags));
		formData.append('title', questionTitle);
		formData.append('content', questionContent);
		console.log('SUBMIT');
		console.log(formData.get('tags'));
		console.log(formData.get('title'));
		console.log(formData.get('content'));
	};

	console.log(selectedTags);

	return (
		<div className='create_question_page'>
			<MultipleSelect
				value={selectedTags}
				optionsToSelect={options}
				onChange={handleChangeTags}
				placeholder='Tags...'
			/>
			<TextInput
				placeholder='Title'
				value={questionTitle}
				onChange={handleTitleChange}
				maxLength={100}
			/>
			<Editor
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue='<p>This is the initial content of the editor.</p>'
				value={questionContent}
				onEditorChange={(newValue, editor) => setQuestionContent(newValue)}
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

			{/* <button onClick={log}>Log editor content</button> */}
			<Button value='Publish' onClick={submitSubmit} type='secondary' height='35px' />
		</div>
	);
};

export default CreateQuestionPage;
