import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'shared';

export const initialState = {
	user: {
		id: null,
		name: null,
		email: null,
	},
	isAuth: true,
	role: 'User',
};

const { reducer, actions } = createSlice({
	name: REDUCER_NAMES.AUTH,
	initialState,
	reducers: {
		defineAuth: (state, action) => {
			state.user = action.payload.user;
			state.isAuth = action.payload.isAuth;
			state.role = action.payload.role;
			console.log('state after', state.user);
		},
	},
});

const AuthCreator = { ...actions };
export { AuthCreator, reducer };
