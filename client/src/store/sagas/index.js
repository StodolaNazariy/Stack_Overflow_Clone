import { all, call } from 'redux-saga/effects';

import { questionSagas } from './questions';
import { tagsSagas } from './tags';
import { userSagas } from './user';

export function* rootSaga() {
	yield all([...questionSagas, ...tagsSagas, ...userSagas].map(call));
}
