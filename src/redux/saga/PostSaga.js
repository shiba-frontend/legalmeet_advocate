import {call, put, takeLatest, select} from 'redux-saga/effects';

import {getApi, getApiWithParam, postApi} from '../../utils/helpers/ApiRequest';
import {ToastMessage} from '../../utils/helpers/Toast';
import {
  getProfileSuccess,
  getProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  imageUploadUpdateProfileSuccess,
  imageUploadUpdateProfileFailure,
  clientListSuccess,
  clientListFailure,
  clientAddSuccess,
  clientAddFailure,
  caseListSuccess,
  caseListFailure,
  courtListSuccess,
  courtListFailure,
  stateListSuccess,
  stateListFailure,
  addCaseSuccess,
  addCaseFailure,
  caseTypeSuccess,
  caseTypeFailure,
  caseDocumentAddSuccess,
  caseDocumentAddFailure,
  clientDocumentAddSuccess,
  clientDocumentAddFailure,
  clientDetailSuccess,
  clientDetailFailure,
  clientDeleteSuccess,
  clientDeleteFailure,
  caseDeleteSuccess,
  caseDeleteFailure,
  clientDeleteDocumentSuccess,
  clientDeleteDocumentFailure,
  caseDetailSuccess,
  caseDetailFailure,
  caseDocumentDeleteSuccess,
  caseDocumentDeleteFailure,
  memberListSuccess,
  memberListFailure,
  memberAddSuccess,
  memberAddFailure,
  memberDeleteSuccess,
  memberDeleteFailure,
  memberListRequest,
  otpValidationSuccess,
  otpValidationFailure,
  allHearingSuccess,
  allHearingFailure,
  feedListSuccess,
  feedListFailure,
  caseStatusChangeSuccess,
  caseStatusChangeFailure,
  requestListSuccess,
  requestListFailure,
  requestAddSuccess,
  requestAddFailure,
  subscriptionSuccess,
  subscriptionFailure,
  subscriptionAddSuccess,
  subscriptionAddFailure,
  judgementSuccess,
  judgementFailure,
  draftListSuccess,
  draftListFailure,
  draftLanguageSuccess,
  draftLanguageFailure,
  draftSuccess,
  draftFailure,
  draftRequest,
} from '../reducer/PostReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAuthToken} from '../reducer/AuthReducer';
import {TOKEN} from '../../utils/helpers/Constant';

/** Get Profile */
export function* getProfileRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(header);
    let response = yield call(postApi, 'profile', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(getProfileSuccess(response.data));
    } else {
      yield put(getProfileFailure(response?.data));
    }
  } catch (e) {
    yield put(getProfileFailure(e));
    yield call(AsyncStorage.removeItem, TOKEN);
    yield put(
      updateAuthToken({
        authToken: null,
      }),
    );
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Update Profile */
export function* updateProfileRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'update-profile',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(updateProfileSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(updateProfileFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(updateProfileFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Update Profile For Image */
export function* imageUploadUpdateProfileRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'multipart/form-data',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'update-profile',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(imageUploadUpdateProfileSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(imageUploadUpdateProfileFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(imageUploadUpdateProfileFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Client List */
export function* clientListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'client-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(clientListSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(clientListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(clientListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Client Add */
export function* clientAddRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'client-add', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(clientAddSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(clientAddFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(clientAddFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Case List */
export function* caseListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'case-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(caseListSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(caseListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(caseListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Court List */
export function* courtListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'court-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(courtListSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(courtListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(courtListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** State List */
export function* stateListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'state-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(stateListSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(stateListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(stateListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Add Case */
export function* addCaseRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'case-add', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(addCaseSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(addCaseFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(addCaseFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Case Type List */
export function* caseTypeRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'case-type-list',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(caseTypeSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(caseTypeFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(caseTypeFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Case Document Add */
export function* caseDocumentAddRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'multipart/form-data',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'case-details-add',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(caseDocumentAddSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(caseDocumentAddFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(caseDocumentAddFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Client Document Add */
export function* clientDocumentAddRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'multipart/form-data',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'client-document-add',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(clientDocumentAddSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(clientDocumentAddFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(clientDocumentAddFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Client Detail */
export function* clientDetailRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'client-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(clientDetailSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(clientDetailFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(clientDetailFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Client Delete */
export function* clientDeleteRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'client-delete', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(clientDeleteSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(clientDeleteFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(clientDeleteFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Case Delete */
export function* caseDeleteRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'case-delete', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(caseDeleteSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(caseDeleteFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(caseDeleteFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Client Delete */
export function* clientDeleteDocumentRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'client-document-delete',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(clientDeleteDocumentSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(clientDeleteDocumentFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(clientDeleteDocumentFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Case Detail */
export function* caseDetailRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'case-details', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(caseDetailSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(caseDetailFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(caseDetailFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Case Document Delete */
export function* caseDocumentDeleteRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'case-details-delete',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(caseDocumentDeleteSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(caseDocumentDeleteFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(caseDocumentDeleteFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Member List */
export function* memberListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'member-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(memberListSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(memberListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(memberListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Member Add */
export function* memberAddRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'member-add', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(memberAddSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(memberAddFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(memberAddFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Member Delete */
export function* memberDeleteRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'member-delete', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(memberDeleteSuccess(response.data));
      yield put(memberListRequest());
      // ToastMessage(response?.data?.message);
    } else {
      yield put(memberDeleteFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(memberDeleteFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** OTP validation */
export function* otpValidationRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'member-verification',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(otpValidationSuccess(response.data));
      yield put(memberListRequest());
      // ToastMessage(response?.data?.message);
    } else {
      yield put(otpValidationFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(otpValidationFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Case Hearing List */
export function* allHearingRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'case-hearing', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(allHearingSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(allHearingFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(allHearingFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Feed List */
export function* feedListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'feed-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(feedListSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(feedListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(feedListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Change Case Status */
export function* caseStatusChangeRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'case-status-change',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(caseStatusChangeSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(caseStatusChangeFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(caseStatusChangeFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Request List */
export function* requestListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'request-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(requestListSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(requestListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(requestListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Add Request */
export function* requestAddRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'request-add', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(requestAddSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(requestAddFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(requestAddFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Subscription List */
export function* subscriptionRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'subscription-list',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(subscriptionSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(subscriptionFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(subscriptionFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Add Subscription */
export function* subscriptionAddRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'subscription-add',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(subscriptionAddSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(subscriptionAddFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(subscriptionAddFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Judgement */
export function* judgementRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'judgment-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(judgementSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(judgementFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(judgementFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Draft List */
export function* draftListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'draft-category',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(draftListSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(draftListFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(draftListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Draft Language */
export function* draftLanguageRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApi,
      'draft-language',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(draftLanguageSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(draftLanguageFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(draftLanguageFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Draft */
export function* draftRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'draft-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(draftSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(draftFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(draftLanguageFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
const watchFunction = [
  (function* () {
    yield takeLatest('post/getProfileRequest', getProfileRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/updateProfileRequest', updateProfileRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/imageUploadUpdateProfileRequest',
      imageUploadUpdateProfileRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/clientListRequest', clientListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/clientAddRequest', clientAddRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/caseListRequest', caseListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/courtListRequest', courtListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/stateListRequest', stateListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/addCaseRequest', addCaseRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/caseTypeRequest', caseTypeRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/caseDocumentAddRequest', caseDocumentAddRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/clientDocumentAddRequest',
      clientDocumentAddRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/clientDetailRequest', clientDetailRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/clientDeleteRequest', clientDeleteRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/caseDeleteRequest', caseDeleteRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/clientDeleteDocumentRequest',
      clientDeleteDocumentRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/caseDetailRequest', caseDetailRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/caseDocumentDeleteRequest',
      caseDocumentDeleteRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/memberListRequest', memberListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/memberAddRequest', memberAddRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/memberDeleteRequest', memberDeleteRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/otpValidationRequest', otpValidationRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/allHearingRequest', allHearingRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/feedListRequest', feedListRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/caseStatusChangeRequest',
      caseStatusChangeRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/requestListRequest', requestListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/requestAddRequest', requestAddRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/subscriptionRequest', subscriptionRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/subscriptionAddRequest', subscriptionAddRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/judgementRequest', judgementRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/draftListRequest', draftListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/draftLanguageRequest', draftLanguageRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/draftRequest', draftRequestSaga);
  })(),
];

export default watchFunction;
