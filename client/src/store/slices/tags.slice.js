import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'shared';

const initialState = {
	tags: [],
	count: 0,
};

const { reducer, actions } = createSlice({
	name: REDUCER_NAMES.TAGS,
	initialState,
	reducers: {
		fetchedTags: (state, action) => {
			state.tags = action.payload.rows;
			state.count = action.payload.count;
		},
		addTag: (state, action) => {
			state.tags.push(action.payload);
		},
	},
});

const TagsCreator = { ...actions };
export { TagsCreator, reducer };
