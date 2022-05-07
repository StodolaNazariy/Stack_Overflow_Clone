import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'shared';
import createSagaMiddleware from '@redux-saga/core';

import SagaActions from './sagas/actions';
import { rootSaga } from './sagas';

import { questionsReducer, tagsReducer, userReducer, authReducer } from './slices';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		[REDUCER_NAMES.TAGS]: tagsReducer,
		[REDUCER_NAMES.QUESTIONS]: questionsReducer,
		[REDUCER_NAMES.USER_PROFILE]: userReducer,
		[REDUCER_NAMES.AUTH]: authReducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [SagaActions.CREATE_TAG, 'tags/createTag'],
			},
		}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export { store };
