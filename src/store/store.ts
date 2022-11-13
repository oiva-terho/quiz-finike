import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer } from './root.reducer';
import { rootSaga } from './root.saga';

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({ reducer: rootReducer, middleware: [sagaMiddleware] });

sagaMiddleware.run(rootSaga);
