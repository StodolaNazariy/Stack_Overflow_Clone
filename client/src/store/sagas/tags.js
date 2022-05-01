import { call, put, takeEvery } from 'redux-saga/effects';

import { Fetch } from 'utils';
import { TagsCreator } from 'store/slices/tags.slice';
import SagaActions from './actions';

const apiFetchTags = async () => {
	const { data } = await Fetch('/tags');
	console.log('fetch tags --->', data);
	return data;
};

function* fetchTags() {
	const tags = yield call(apiFetchTags);

	yield put(TagsCreator.fetchedTags(tags));
}

export function* fetchTagsWatcher() {
	yield takeEvery(SagaActions.GEG_ALL_TAGS, fetchTags);
}

export const tagsSagas = [fetchTagsWatcher];
