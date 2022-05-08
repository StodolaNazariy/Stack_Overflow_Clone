import { call, put, takeLatest } from 'redux-saga/effects';

import { Fetch } from 'utils';
import { QuestionsCreator } from 'store/slices';
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

const apiFetchCreateAnswer = async payload => {
	console.log('payload _ .', payload);
	const { data } = await Fetch(
		`/questions/answers/${payload.id}`,
		'POST',
		{ answer: payload.answer },
		true,
	);
	console.log('created Answer --->', data);
	return data;
};

function* fetchCreateAnswer(action) {
	console.log('action _ .', action);
	yield call(apiFetchCreateAnswer, action.payload);
}

export function* fetchCreateAnswerWatcher() {
	yield takeLatest(SagaActions.CREATE_ANSWER, fetchCreateAnswer);
}

export const questionSagas = [
	fetchQuestionsWatcher,
	createQuestionWatcher,
	fetchCreateAnswerWatcher,
];
