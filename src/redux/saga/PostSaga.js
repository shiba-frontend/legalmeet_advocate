import {call, put, takeLatest, select} from 'redux-saga/effects';

import {
  getApi,
  getApiCustomer,
  getApiWithParam,
  postApi,
  postApiCustomer,
} from '../../utils/helpers/ApiRequest';
import {ToastMessage} from '../../utils/helpers/Toast';
import PostReducer, {
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
  dashboardSuccess,
  dashboardFailure,
  serviceListSuccess,
  serviceListFailure,
  advocateListSuccess,
  advocateListFailure,
  consultNowSuccess,
  consultNowFailure,
  myTransactionHistorySuccess,
  myTransactionHistoryFailure,
  assignServiceSuccess,
  assignServiceFailure,
  serviceAppointmentListSuccess,
  serviceAppointmentListFailure,
  helpCenterSuccess,
  helpCenterFailure,
  consultationListFailure,
  consultationListSuccess,
  servicePaymentSuccess,
  servicePaymentFailure,
  allApiKeySuccess,
  allApiKeyFailure,
  servicePaymentDataSuccess,
  servicePaymentDataFailure,
  consultNowDataSuccess,
  consultNowDataFailure,
  enquiryListSuccess,
  enquiryListFailure,
  addEnquirySuccess,
  doSubscriptionSuccess,
  doSubscriptionFailure,
  paymentResponseSaveSuccess,
  paymentResponseSaveFailure,
  markNotificationSuccess,
  markNotificationFailure,
  caseChargeSuccess,
  caseChargeFailure,
  casePaymentResponseSuccess,
  casePaymentResponseFailure,
  favouriteAddSuccess,
  favouriteAddFailure,
  favouriteListSuccess,
  favouriteListFailure,
  ratingReviewSuccess,
  ratingReviewFailure,
  serviceDetailSuccess,
  serviceDetailFailure,
  serviceDocumentAddSuccess,
  serviceDocumentAddFailure,
  myServiceDetailSuccess,
  myServiceDetailFailure,
  myServiceDocumentDeleteSuccess,
  myServiceDocumentDeleteFailure,
  categoryListSuccess,
  categoryListFailure,
  ebookSuccess,
  ebookFailure,
  servicePartPaymentSuccess,
  servicePartPaymentFailure,
  servicePartPaymentSAveSuccess,
  servicePartPaymentSaveFailure,
  memberShipPlansSuccess,
  memberShipPlansFailure,
  judgementSuccess,
  judgementFailure,
  draftListSuccess,
  draftListFailure,
  draftLanguageSuccess,
  draftLanguageFailure,
  draftSuccess,
  draftFailure,
  draftRequest,
  enquiryReplySuccess,
  enquiryReplyFailure,
  enquiryReplyListSuccess,
  enquiryReplyListFailure,
  invoiceListSuccess,
  invoiceListFailure,
  subscriptionAddFailure,
  subscriptionAddSuccess,
  subscriptionPaymentSuccess,
  subscriptionPaymentFailure,
  enqueryCategoryListSuccess,
  enqueryCategoryListFailure,
  generateInvoiceListSuccess,
  generateInvoiceListFailure,
  generateInvoiceSuccess,
  generateInvoiceFailure,
  updateInvoiceSuccess,
  updateInvoiceFailure,
  ebookCategorySuccess,
  ebookCategoryFailure,
  hearingDocumentAddSuccess,
  hearingDocumentAddFailure,
  requestListSuccess,
  requestListFailure,
  requestAddSuccess,
  requestAddFailure,
  getWalletSuccess,
  getWalletFailure,
  walletSuccess,
  walletFailure,
  CauseListRequestSuccess,
  CauseListRequestFailure,
  TentativeCauseListRequestSuccess,
  TentativeCauseListRequestFailure,
  caseHearingPdfLinkSuccess,
  caseHearingPdfLinkFailure,
  getFreeTrialSuccess,
  getFreeTrialFailure
} from '../reducer/PostReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAuthToken} from '../reducer/AuthReducer';
import {TOKEN} from '../../utils/helpers/Constant';
import {goBack, navigate, replace} from '../../utils/helpers/RootNavigation';
import {COLORS} from '../../utils/Theme';
import RazorpayCheckout from 'react-native-razorpay';
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
    let response = yield call(
      postApiCustomer,
      'case-list',
      action.payload,
      header,
    );
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
    let response = yield call(
      postApiCustomer,
      'case-add',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(addCaseSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(addCaseFailure(response?.data));
      ToastMessage(response?.data?.message);
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
      postApiCustomer,
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
    let response = yield call(
      postApiCustomer,
      'case-delete',
      action.payload,
      header,
    );
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
    console.log('Case detail: ', data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApiCustomer,
      'case-details',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(caseDetailSuccess(response.data));
      navigate('CasesDetails');
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
      postApiCustomer,
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
      postApiCustomer,
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
    let response = yield call(
      postApiCustomer,
      'case-hearing',
      action.payload,
      header,
    );
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
/** Dashboard */
export function* dashboardRequestSaga(action) {
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
    let response = yield call(getApiCustomer, 'dashboard', header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(dashboardSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(dashboardFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(dashboardFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Service list */
export function* serviceListRequestSaga(action) {
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
      postApiCustomer,
      'service-list',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(serviceListSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(serviceListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(serviceListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** Advocatw list */
export function* advocateListRequestSaga(action) {
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
    let response = yield call(postApiCustomer, 'service-list', header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(advocateListSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(advocateListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(advocateListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** consultNowRequestSaga */
export function* consultNowRequestSaga(action) {
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
      postApiCustomer,
      'consult-now',
      action?.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(consultNowSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(consultNowFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(consultNowFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** myTransactionHistoryRequestSaga */
export function* myTransactionHistoryRequestSaga(action) {
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
      postApiCustomer,
      'transaction-history',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(myTransactionHistorySuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(myTransactionHistoryFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(myTransactionHistoryFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}

/** assignServiceRequestSaga */
export function* assignServiceRequestSaga(action) {
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
      postApiCustomer,
      'service-appointment',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(assignServiceSuccess(response?.data?.data));
      if (action?.payload?.mode != 'pay_now')
        ToastMessage(response?.data?.message);
      // else
      // navigate('ServiceRequest');mode: ''
    } else {
      yield put(assignServiceFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(assignServiceFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** serviceAppointmentListRequestSaga */
export function* serviceAppointmentListRequestSaga(action) {
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
    let response = yield call(
      getApiCustomer,
      'service-appointment-list',
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(serviceAppointmentListSuccess(response?.data?.data));

      // ToastMessage(response?.data?.message);
    } else {
      yield put(serviceAppointmentListFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(serviceAppointmentListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** helpCenterRequestSaga */
export function* helpCenterRequestSaga(action) {
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
      postApiCustomer,
      'help-center',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(helpCenterSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(helpCenterFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(helpCenterFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** consultationListRequestSaga */
export function* consultationListRequestSaga(action) {
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
      postApiCustomer,
      'consult-list',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(consultationListSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(consultationListFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(consultationListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** servicePaymentRequestSaga */
export function* servicePaymentRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.PostReducer;
    const data = yield select(AuthReducer);
    const PostReducerData = yield select(PostReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApiCustomer,
      'service-payment',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(servicePaymentSuccess(response?.data?.data));
    } else {
      yield put(servicePaymentFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(servicePaymentFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** servicePaymentDataRequestSaga */
export function* servicePaymentDataRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.PostReducer;
    const data = yield select(AuthReducer);
    const PostReducerData = yield select(PostReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApiCustomer,
      'service-payment-response',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(servicePaymentDataSuccess(response?.data?.data));
      yield call(serviceAppointmentListRequestSaga);
      replace('TabBottomNavigation');
    } else {
      yield put(servicePaymentDataFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(servicePaymentDataFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** consultNowDataRequestSaga */
export function* consultNowDataRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.PostReducer;
    const data = yield select(AuthReducer);
    const PostReducerData = yield select(PostReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(
      postApiCustomer,
      'consult-payment-response',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(consultNowDataSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(consultNowDataFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(consultNowDataFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** allApiKeyRequestSaga */
export function* allApiKeyRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      'get-all-api-keys',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(allApiKeySuccess(response?.data?.data));

      // ToastMessage(response?.data?.message);
    } else {
      yield put(allApiKeyFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(allApiKeyFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** enquiryListRequestSaga */
export function* enquiryListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'enquiry-list',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(enquiryListSuccess(response?.data?.data));

      // ToastMessage(response?.data?.message);
    } else {
      yield put(enquiryListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(enquiryListFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** addEnquiryRequestSaga */
export function* addEnquiryRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'enquiry-add',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(addEnquirySuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
      yield call(enquiryListRequestSaga, action?.payload);
    } else {
      yield put(addEnquiryFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(addEnquiryFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** doSubscriptionRequestSaga */
export function* doSubscriptionRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'membership-add-payment',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(doSubscriptionSuccess(response?.data?.data));
    } else {
      yield put(doSubscriptionFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(doSubscriptionFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** paymentResponseSaveRequestSaga */
export function* paymentResponseSaveRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'membership-payment-response',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(paymentResponseSaveSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(paymentResponseSaveFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(paymentResponseSaveFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** notificationRequestSaga */
export function* notificationRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'notification',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(paymentResponseSaveSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(paymentResponseSaveFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(paymentResponseSaveFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Mark notification */
export function* markNotificationRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'mark-notification',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(markNotificationSuccess(response?.data?.data));
      yield call(getProfileRequestSaga, action);
      // ToastMessage(response?.data?.message);
    } else {
      yield put(markNotificationFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(markNotificationFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** caseChargeRequestSaga */
export function* caseChargeRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'case-payment',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(caseChargeSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(caseChargeFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(caseChargeFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** casePaymentResponseRequestSaga */
export function* casePaymentResponseRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'case-payment-response',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(casePaymentResponseSuccess(response?.data?.data));
      yield call(caseDetailRequestSaga, action);
      // ToastMessage(response?.data?.message);
    } else {
      yield put(casePaymentResponseFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(casePaymentResponseFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Favourite add, remove
 */
export function* favouriteAddRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'add-and-remove-favourite',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(favouriteAddSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(favouriteAddFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(favouriteAddFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Favourite List
 */
export function* favouriteListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'my-favourite',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(favouriteListSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(favouriteListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(favouriteListFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
//
/** Rating review */
export function* ratingReviewRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'rating-review-add',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(ratingReviewSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(ratingReviewFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(ratingReviewFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** ServiceDetail */
export function* serviceDetailRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'service-detail',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(serviceDetailSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(serviceDetailFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(ratingReviewFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}

/** Service Document Add */
export function* serviceDocumentAddRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'appointment-document-add',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(serviceDocumentAddSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
      // yield call(getProfileRequestSaga, action?.payload);
      // goBack();
    } else {
      yield put(serviceDocumentAddFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(serviceDocumentAddFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** My Service Detail */
export function* myServiceDetailRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'service-appointment-detail',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(myServiceDetailSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(myServiceDetailFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(myServiceDetailFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** My Service Document Delete */
export function* myServiceDocumentDeleteRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'appointment-document-remove',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(myServiceDocumentDeleteSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(myServiceDocumentDeleteFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(myServiceDocumentDeleteFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Category List */
export function* categoryListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(getApi, 'service-category-list', header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(categoryListSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(categoryListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(categoryListFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Ebook Call */
export function* ebookRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log('ebook', action.payload);
    let response = yield call(postApi, 'ebook', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(ebookSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(ebookFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(ebookFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Partial Payment */
export function* servicePartPaymentRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'service-payment',
      action?.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(servicePartPaymentSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(servicePartPaymentFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(servicePartPaymentFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Partial Payment Data Save*/
export function* servicePartPaymentSaveRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'service-payment-response',
      action?.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(servicePartPaymentSAveSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(servicePartPaymentSaveFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(servicePartPaymentSaveFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}
/** Get Membership Plans */
export function* memberShipPlansRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      postApiCustomer,
      'subscription-list',
      action?.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(memberShipPlansSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(memberShipPlansFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(memberShipPlansFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}

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
    console.log('draft-list', action.payload);
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
/** Enquery Reply  */
export function* enquiryReplyRequestSaga(action) {
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
    let response = yield call(postApi, 'enquiry-reply', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(enquiryReplySuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(enquiryReplyFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(enquiryReplyFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Enquery Message List */
export function* enquiryReplyListRequestSaga(action) {
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
    let response = yield call(postApi, 'enquiry-chat', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(enquiryReplyListSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(enquiryReplyListFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(enquiryReplyListFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Enquery Invoice List */
export function* invoiceListRequestSaga(action) {
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
    let response = yield call(postApi, 'enquiry-chat', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(invoiceListSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(invoiceListFailure(response?.data));
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(invoiceListFailure(e));
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
      'subscription-add-payment',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(subscriptionAddSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(subscriptionAddFailure(response?.data));
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(subscriptionAddFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** Add Subscription payment data*/
export function* subscriptionPaymentRequestSaga(action) {
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
      'subscription-payment-response',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(subscriptionPaymentSuccess(response.data));
      ToastMessage(response?.data?.message);
      goBack();
    } else {
      yield put(subscriptionPaymentFailure(response?.data));
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(subscriptionPaymentFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/**Enquiry Category List */
export function* enqueryCategoryListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      'enquiry-category-list',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(enqueryCategoryListSuccess(response?.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(enqueryCategoryListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(enqueryCategoryListFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}

/**Generate Invoice List */
export function* generateInvoiceListRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    console.log(data);
    console.log('Auth token value: ', data?.authToken);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    console.log(action.payload);
    let response = yield call(postApi, 'invoice-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(generateInvoiceListSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(generateInvoiceListFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(generateInvoiceListFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}

/**Generate Invoice */
export function* generateInvoiceRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      'invoice-generate',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(generateInvoiceSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
      yield call(generateInvoiceListRequestSaga, action?.payload);
      goBack();
    } else {
      yield put(generateInvoiceFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(generateInvoiceFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}

/**Update Invoice */
export function* updateInvoiceRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const PostReducer = state => state.AuthReducer;
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
      'invoice-mark-status',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(updateInvoiceSuccess(response?.data?.data));
      ToastMessage(response?.data?.message);
      yield call(generateInvoiceListRequestSaga, action?.payload);
    } else {
      yield put(updateInvoiceFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(updateInvoiceFailure(e));
    // ToastMessage(e?.response?.data?.message);
  }
}

/** Ebook category List */
export function* ebookCategoryRequestSaga(action) {
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
      'ebook-category',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(ebookCategorySuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(ebookCategoryFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(ebookCategoryFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** Hearing Document List */
export function* hearingDocumentAddRequestSaga(action) {
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
      'case-hearing-document-add',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(hearingDocumentAddSuccess(response.data));
      ToastMessage(response?.data?.message);
    } else {
      yield put(hearingDocumentAddFailure(response?.data));
      ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(hearingDocumentAddFailure(e));
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
/** Get Wallet */
export function* getWalletRequestSaga(action) {
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
    let response = yield call(postApi, 'wallet-log', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(getWalletSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(getWalletFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(getWalletFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
/** Wallet Request */
export function* walletRequestSaga(action) {
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
      'wallet-request',
      action.payload,
      header,
    );
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(walletSuccess(response.data));
      yield call(getWalletRequestSaga, {});
      ToastMessage(response?.data?.message);
    } else {
      yield put(walletFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(walletFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}




/** Get Csuse List */
export function* CauseListRequestSaga(action) {
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
    let response = yield call(postApi, 'cause-list', action.payload, header);
    console.log(response?.data);
    if (response?.data?.response_code == 200) {
      yield put(CauseListRequestSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(CauseListRequestFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(CauseListRequestFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}

/** Get tentative Cause List */
export function* TentativeCauseListRequestSaga(action) {
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
    console.log("case pdf",action.payload);
    let response = yield call(postApi, 'case-hearing-pdf', action.payload, header);
    console.log("calenser===", response);
    if (response) {
      yield put(TentativeCauseListRequestSuccess(response.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(TentativeCauseListRequestFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(TentativeCauseListRequestFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}


export function* caseHearingPdfLinkRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    let response = yield call(postApi, 'case-hearing-pdf-link', action.payload, header);
    console.log("link pdf ===", response?.data);
    if (response) {
      yield put(caseHearingPdfLinkSuccess(response.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(caseHearingPdfLinkFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(caseHearingPdfLinkFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}
export function* getFreeTrialRequestSaga(action) {
  try {
    const AuthReducer = state => state.AuthReducer;
    const data = yield select(AuthReducer);
    let header = {
      Accept: 'application/json',
      contenttype: 'application/json',
      Authorization: data?.authToken,
    };
    let response = yield call(postApi, 'get-free-subscription', action.payload, header);
    console.log("free subscription ===", response?.data);
    if (response) {
      yield put(getFreeTrialSuccess(response.data?.data));
      // ToastMessage(response?.data?.message);
    } else {
      yield put(getFreeTrialFailure(response?.data));
      // ToastMessage(response?.data?.message);
    }
  } catch (e) {
    // yield put(updateAppStateFailure(action.payload));
    yield put(getFreeTrialFailure(e));
    ToastMessage(e?.response?.data?.message);
  }
}



const watchFunction = [

  (function* () {
    yield takeLatest('post/TentativeCauseListRequest', TentativeCauseListRequestSaga);
  })(),

  (function* () {
    yield takeLatest('post/CauseListRequest', CauseListRequestSaga);
  })(),

  (function* () {
    yield takeLatest('post/walletRequest', walletRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/getWalletRequest', getWalletRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/requestListRequest', requestListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/requestAddRequest', requestAddRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/hearingDocumentAddRequest',
      hearingDocumentAddRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/ebookCategoryRequest', ebookCategoryRequestSaga);
  })(),

  (function* () {
    yield takeLatest('post/draftLanguageRequest', draftLanguageRequestSaga);
  })(),

  (function* () {
    yield takeLatest('post/draftRequest', draftRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/updateInvoiceRequest', updateInvoiceRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/generateInvoiceRequest', generateInvoiceRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/generateInvoiceListRequest',
      generateInvoiceListRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'post/enqueryCategoryListRequest',
      enqueryCategoryListRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'post/subscriptionPaymentRequest',
      subscriptionPaymentRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/subscriptionAddRequest', subscriptionAddRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/enquiryReplyListRequest',
      enquiryReplyListRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/enquiryReplyRequest', enquiryReplyRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/draftListRequest', draftListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/judgementRequest', judgementRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/memberShipPlansRequest', memberShipPlansRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/servicePartPaymentSaveRequest',
      servicePartPaymentSaveRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'post/servicePartPaymentRequest',
      servicePartPaymentRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/ebookRequest', ebookRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/categoryListRequest', categoryListRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/markNotificationRequest',
      markNotificationRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'post/myServiceDocumentDeleteRequest',
      myServiceDocumentDeleteRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/myServiceDetailRequest', myServiceDetailRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/serviceDocumentAddRequest',
      serviceDocumentAddRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/serviceDetailRequest', serviceDetailRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/ratingReviewRequest', ratingReviewRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/favouriteListRequest', favouriteListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/favouriteAddRequest', favouriteAddRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/casePaymentResponseRequest',
      casePaymentResponseRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/caseChargeRequest', caseChargeRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/caseChargeRequest', caseChargeRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/notificationRequest', notificationRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/paymentResponseSaveRequest',
      paymentResponseSaveRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/doSubscriptionRequest', doSubscriptionRequestSaga);
  })(),
  (function* () {
    yield takeLatest(
      'post/myTransactionHistoryRequest',
      myTransactionHistoryRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'post/serviceAppointmentListRequest',
      serviceAppointmentListRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'post/consultationListRequest',
      consultationListRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'post/servicePaymentDataRequest',
      servicePaymentDataRequestSaga,
    );
  })(),
  (function* () {
    yield takeLatest('post/addEnquiryRequest', addEnquiryRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/enquiryListRequest', enquiryListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/consultNowDataRequest', consultNowDataRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/allApiKeyRequest', allApiKeyRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/servicePaymentRequest', servicePaymentRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/helpCenterRequest', helpCenterRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/consultNowRequest', consultNowRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/advocateListRequest', advocateListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/serviceListRequest', serviceListRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/dashboardRequest', dashboardRequestSaga);
  })(),
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
    yield takeLatest('post/assignServiceRequest', assignServiceRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/caseHearingPdfLinkRequest', caseHearingPdfLinkRequestSaga);
  })(),
  (function* () {
    yield takeLatest('post/getFreeTrialRequest', getFreeTrialRequestSaga);
  })(),
];

export default watchFunction;
