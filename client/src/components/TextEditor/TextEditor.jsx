import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './TestEditor.scss';

const TextEditor = ({ editorRef, value, setValue }) => {
	return (
		<Editor
			onInit={(evt, editor) => (editorRef.current = editor)}
			initialValue='<p>This is the initial content of the editor.</p>'
			value={value}
			onEditorChange={(newValue, editor) => setValue(newValue)}
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
				content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
			}}
		/>
	);
};

export default TextEditor;
