import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducer/AuthReducer';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import RootSaga from './saga/RootSaga';
import PostReducer from './reducer/PostReducer';
let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];
export const Store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    PostReducer: PostReducer
  },
  middleware,
});
sagaMiddleware.run(RootSaga)