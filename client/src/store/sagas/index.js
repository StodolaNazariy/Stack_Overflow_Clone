import { all, call } from 'redux-saga/effects';

import { questionSagas } from './questions';
import { tagsSagas } from './tags';

export function* rootSaga() {
	yield all([...questionSagas, ...tagsSagas].map(call));
}
