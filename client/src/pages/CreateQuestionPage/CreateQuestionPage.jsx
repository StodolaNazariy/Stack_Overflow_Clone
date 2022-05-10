import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared';
import { formatTagsToOptions, joinTags } from 'utils';
import { TextInput, MultipleSelect, Button, TextEditor } from 'components';
import SagaActions from 'store/sagas/actions';
import './CreateQuestionPage.scss';

const CreateQuestionPage = () => {
	const [questionContent, setQuestionContent] = useState('');
	const [questionTitle, setQuestionTitle] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);

	const { tags } = useSelector(state => state.tags);
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
		navigate(ROUTES.HOME);
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
				placeholder='Title...'
				value={questionTitle}
				onChange={handleTitleChange}
				maxLength={100}
				styles='text_input_title'
			/>

			<TextEditor
				editorRef={editorRef}
				value={questionContent}
				setValue={setQuestionContent}
			/>

			<Button value='Publish' onClick={submitSubmit} type='secondary' height='35px' />
		</div>
	);
};

export default CreateQuestionPage;
