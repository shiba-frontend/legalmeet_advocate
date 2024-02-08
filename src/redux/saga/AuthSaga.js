import {call, takeEvery, put, takeLatest, select} from 'redux-saga/effects';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {postApi} from '../../utils/helpers/ApiRequest';
import {
  
  loginFailure,
  loginSuccess,
  updateAuthToken,
  verifyUserIdFailure,
  verifyUserIdSuccess,
} from '../reducer/AuthReducer';
import {ToastMessage} from '../../utils/helpers/Toast';
import {MODE, TOKEN} from '../../utils/helpers/Constant';
import { getProfileRequest } from '../reducer/PostReducer';

/** Verify User Name */
export function* verifyUserIdRequestSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'login',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.status == 200 && response?.data?.status) {
      yield put(verifyUserIdSuccess(response.data));
    } else {
      yield put(verifyUserIdFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    console.log('From error: ', e);
    yield put(verifyUserIdFailure(e?.response?.data));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Verify through OTP */
export function* loginRequestSaga(action) {
  try {
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'otp-verify',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.status == 200 && response?.data?.status) {
      yield put(loginSuccess(response.data));
      console.log('Token: ', response?.data?.data['token']);
      yield call(
        AsyncStorage.setItem,
        TOKEN,
        response?.data?.data['token'],
      );
      yield put(
        updateAuthToken({
          authToken: response?.data?.data['token'],
        }),
      );
    } else {
      yield put(loginFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    console.log('From error: ', e);
    yield put(loginFailure(e?.response?.data));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Check User Login or not */
export function* checkLogedIn(action) {
  try {
    console.log(action.payload);
    if (action?.payload?.authToken != null) {
      yield put(getProfileRequest());
    }
  } catch (e) {
    console.log('From error: ', e);
    // yield put(loginFailure(e?.response?.data));
    // ToastMessage(e?.response?.data?.message);
  }
}
const watchFunction = [
  (function* () {
    yield takeLatest(
      'auth/verifyUserIdRequest',
      verifyUserIdRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'auth/loginRequest',
      loginRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'auth/updateAuthToken',
      checkLogedIn,
    );
  })(),
];

export default watchFunction;
