import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';

import { TextInput, MultipleSelect, Button } from 'components';
import SagaActions from 'store/sagas/actions';
import './CreateQuestionPage.scss';

const joinTags = selected => {
	const tags = selected.map(item => item.value);
	return tags.join(' ');
};

const formatTagsToOptions = tags => {
	return tags.map(tag => {
		return { value: tag.name, label: tag.name };
	});
};

const CreateQuestionPage = () => {
	const [questionContent, setQuestionContent] = useState('');
	const [questionTitle, setQuestionTitle] = useState('');
	const [selectedTags, setSelectedTags] = useState(null);

	const { tags } = useSelector(state => state.tags);
	const dispatch = useDispatch();
	const editorRef = useRef(null);

	useEffect(() => {
		dispatch({
			type: SagaActions.GEG_ALL_TAGS,
		});
	}, []);

	const handleChangeTags = selectedOption => {
		setSelectedTags(selectedOption);
	};

	const handleTitleChange = event => {
		setQuestionTitle(event.target.value);
	};

	const submitSubmit = () => {
		const newQuestion = {
			tags: joinTags(selectedTags),
			title: questionTitle,
			content: questionContent,
		};
		dispatch({
			type: SagaActions.CREATE_QUESTION,
			payload: newQuestion,
		});
	};

	return (
		<div className='create_question_page'>
			<MultipleSelect
				value={selectedTags}
				optionsToSelect={formatTagsToOptions(tags)}
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

			<Button value='Publish' onClick={submitSubmit} type='secondary' height='35px' />
		</div>
	);
};

export default CreateQuestionPage;
