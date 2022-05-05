import { call, put, takeLatest } from 'redux-saga/effects';
import { Fetch } from 'utils';
import { UserProfileActionCreator } from 'store/slices';
import SagaActions from './actions';

const apiFetchUserProfile = async payload => {
	console.log('payload ----> ', payload);
	const { data } = await Fetch(`/users/${payload}`);
	console.log('fetched profile ---> ', data);
	return data;
};

function* fetchUserProfile(action) {
	const profile = yield call(apiFetchUserProfile, action.payload);

	yield put(UserProfileActionCreator.fetchedUserProfile(profile));
}

export function* fetchUserProfileWatcher() {
	yield takeLatest(SagaActions.GET_USER_PROFILE, fetchUserProfile);
}

export const userSagas = [fetchUserProfileWatcher];
