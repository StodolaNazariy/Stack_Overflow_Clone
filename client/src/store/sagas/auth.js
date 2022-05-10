import { call, put, takeLatest } from 'redux-saga/effects';
import { Fetch } from 'utils';
import { AuthCreator } from 'store/slices';
import SagaActions from './actions';

const Unauthorized = {
	user: {
		id: null,
		name: null,
		email: null,
	},
	isAuth: false,
	role: 'User',
};

const apiFetchDefineAuth = async () => {
	const { data, errMessage } = await Fetch('/define-auth', 'POST', {}, true);

	if (data.access_token) {
		localStorage.setItem('access_token', data.access_token);
		delete data['access_token'];
	}

	return !errMessage ? data : Unauthorized;
};

function* fetchDefineAuth() {
	const auth = yield call(apiFetchDefineAuth);
	// console.log('define auth --> ', auth);
	yield put(AuthCreator.defineAuth(auth));
}

function* fetchDefineAuthWatcher() {
	yield takeLatest(SagaActions.DEFINE_AUTH, fetchDefineAuth);
}

const apiFetchLogOut = async () => {
	const { status } = await Fetch('/define-auth', 'POST', {}, true);
	return Unauthorized;
};

function* fetchLogOut() {
	const auth = yield call(apiFetchLogOut);
	// console.log('log out auth --> ', auth);
	yield put(AuthCreator.defineAuth(auth));
}

export function* fetchLogOutWathcer() {
	yield takeLatest(SagaActions.LOG_OUT, fetchLogOut);
}

export const authSagas = [fetchDefineAuthWatcher, fetchLogOutWathcer];
