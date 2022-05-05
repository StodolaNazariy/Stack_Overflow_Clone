import { call, put, takeLatest } from 'redux-saga/effects';

import { Fetch } from 'utils';
import { QuestionsCreator } from 'store/slices/questions.slice';
import SagaActions from './actions';

const apiFetchQuestions = async () => {
	const { data } = await Fetch('/');
	console.log('fetch questions --->', data);
	return data.rows;
};

function* fetchQuestions() {
	const questions = yield call(apiFetchQuestions);

	yield put(QuestionsCreator.fethedQuestions(questions));
}

export function* fetchQuestionsWatcher() {
	yield takeLatest(SagaActions.GET_ALL_QUESTIONS, fetchQuestions);
}

const apiCreateQuestion = async payload => {
	const { data } = await Fetch('/questions/create', 'POST', payload);
	console.log('posted ----> ', data);
	return data;
};

function* createQuestion(action) {
	yield call(apiCreateQuestion, action.payload);
}

export function* createQuestionWatcher() {
	yield takeLatest(SagaActions.CREATE_QUESTION, createQuestion);
}

export const questionSagas = [fetchQuestionsWatcher, createQuestionWatcher];
