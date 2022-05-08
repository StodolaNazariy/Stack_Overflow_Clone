import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'shared';

const initialState = {
	questions: [],
};

const { reducer, actions } = createSlice({
	name: REDUCER_NAMES.QUESTIONS,
	initialState,
	reducers: {
		fethedQuestions: (state, action) => {
			state.questions = action.payload;
		},
		createQuestion: (state, action) => {
			state.questions.push(action.payload);
		},
		createAnswer: (state, action) => {
			return state.questions;
		},
	},
});

const QuestionsCreator = { ...actions };
export { QuestionsCreator, reducer };
