import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import PostSaga from './PostSaga';
const combinedSaga = [...AuthSaga, ...PostSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
