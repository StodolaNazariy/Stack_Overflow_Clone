import { all, call } from 'redux-saga/effects';

import { questionSagas } from './questions';
import { tagsSagas } from './tags';
import { userSagas } from './user';
import { authSagas } from './auth';

export function* rootSaga() {
	yield all([...questionSagas, ...tagsSagas, ...userSagas, ...authSagas].map(call));
}
