import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'shared';

const initialState = {};

const { reducer, actions } = createSlice({
	name: REDUCER_NAMES.USER_PROFILE,
	initialState,
	reducers: {
		fetchedProfile: (state, action) => {
			state.profile = action.payload;
		},
	},
});

const UserProfileActionCreator = { ...actions };

export { UserProfileActionCreator, reducer };
