import { configureStore, Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';

import { rootReducer } from './root.reducer';
import { rootSaga } from './root.saga';

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, process.env.NODE_ENV !== 'production' && logger].filter(
    (middleware): middleware is Middleware => Boolean(middleware),
  ),
});

sagaMiddleware.run(rootSaga);
