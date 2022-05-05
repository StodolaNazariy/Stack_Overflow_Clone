import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'shared';

const initialState = {
	profile: {},
};

const { reducer, actions } = createSlice({
	name: REDUCER_NAMES.USER_PROFILE,
	initialState,
	reducers: {
		fetchedMyProfile: (state, action) => {
			state.profile = action.payload;
		},
		fetchedUserProfile: (state, action) => {
			state.profile = action.payload;
		},
	},
});

const UserProfileActionCreator = { ...actions };

export { UserProfileActionCreator, reducer };
