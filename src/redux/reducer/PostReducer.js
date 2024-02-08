import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';
const Stack = createStackNavigator();
function isEmpty(item) {
  if (item == null || item == '' || item == undefined) return true;
  return false;
}
const postSlice = createSlice({
  name: 'post',
  initialState: {
    message: 'Initial message',
    status: '',
    error: '',
    loading: false,
    profileData: '',
    clients: [],
    cases: [],
    caseWin: [],
    caseLost: [],
    courtLists: [],
    stateList: [],
    addData: '',
    caseTypes: [],
    pageName: '',
    caseDetail: '',
    clientDetail: '',
    memberList: [],
    memberAdded: '',
    todayhearing: [],
    allHearing: [],
    feedList: [],
    hearings: [],
    enqueryList: [],
    requestList: [],
    subscription: [],
    judgement: [],
    draftList: [],
    draftLanguage: [],
    drafts: [],
  },
  reducers: {
    getProfileRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    getProfileSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.profileData = action.payload?.data;
    },
    getProfileFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.profileData = action.payload?.data;
    },
    updateProfileFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    imageUploadUpdateProfileRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    imageUploadUpdateProfileSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.profileData = action.payload?.data;
    },
    imageUploadUpdateProfileFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    clientListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    clientListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.clients = action.payload?.data;
    },
    clientListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    clientAddRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    clientAddSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.clientDetail = action.payload?.data;
    },
    clientAddFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    caseListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
      state.caseWin = [];
      state.caseLost = [];
      state.cases = [];
    },
    caseListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      action.payload.data.forEach(element => {
        if (element?.final_report == 0) {
          state.cases.push(element);
        } else if (element?.final_report == 1) {
          state.caseWin.push(element);
        } else {
          state.caseLost.push(element);
        }
      });
      // state.cases = action.payload.data;
    },
    caseListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    courtListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    courtListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.courtLists = action.payload.data;
    },
    courtListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    stateListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    stateListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.stateList = action.payload.data;
    },
    stateListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    caseData(state, action) {
      state.addData = action.payload;
    },
    addCaseRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    addCaseSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.caseDetail = action.payload.data;
    },
    addCaseFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    caseTypeRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    caseTypeSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.caseTypes = action.payload?.data;
    },
    caseTypeFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    updatePageName(state, action) {
      state.pageName = action.payload.pagename;
    },
    caseDocumentAddRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    caseDocumentAddSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      // state.caseTypes = action.payload?.data;
    },
    caseDocumentAddFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    clientDocumentAddRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    clientDocumentAddSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      // state.caseTypes = action.payload?.data;
    },
    clientDocumentAddFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    clientDetailUpdate(state, action) {
      state.clientDetail = action.payload;
    },
    clientDetailRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    clientDetailSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.clientDetail = action.payload?.data;
    },
    clientDetailFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    clientDeleteRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    clientDeleteSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.clientDetail = action.payload?.data;
    },
    clientDeleteFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    caseDeleteRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    caseDeleteSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      // state.clientDetail = action.payload?.data;
    },
    caseDeleteFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    clientDeleteDocumentRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    clientDeleteDocumentSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      // state.clientDetail = action.payload?.data;
    },
    clientDeleteDocumentFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    caseDetailRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    caseDetailSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.caseDetail = action.payload?.data;
    },
    caseDetailFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    caseDocumentDeleteRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    caseDocumentDeleteSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      // state.caseDetail = action.payload?.data;
    },
    caseDocumentDeleteFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    memberListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    memberListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.memberList = action.payload.data;
      // state.caseDetail = action.payload?.data;
    },
    memberListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    memberAddRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    memberAddSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.memberAdded = action.payload.data;
    },
    memberAddFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    memberDeleteRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    memberDeleteSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    memberDeleteFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    otpValidationRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    otpValidationSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    otpValidationFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    allHearingRequest(state, action) {
      state.status = action.type;
      state.loading = true;
      state.todayhearing = [];
      state.allHearing = [];
      state.hearings = [];
    },
    allHearingSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.hearings = action.payload?.data;
      action.payload?.data.forEach(element => {
        if (element?.date_original == moment(new Date()).format('YYYY-MM-DD')) {
          state.todayhearing.push(element);
        } else {
          state.allHearing.push(element);
        }
      });
      // state.todayhearing = action.payload?.data;
    },
    allHearingFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    feedListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    feedListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.feedList = action.payload?.data;
    },
    feedListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    caseStatusChangeRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    caseStatusChangeSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    caseStatusChangeFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    enqueryListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    enqueryListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.enqueryList = action;
    },
    enqueryListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    requestListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    requestListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.requestList = action?.payload?.data;
    },
    requestListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    requestAddRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    requestAddSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.requestList.push(action?.payload?.data);
      // state.requestList = action;
    },
    requestAddFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    subscriptionRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    subscriptionSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.subscription = action.payload.data;
    },
    subscriptionFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    subscriptionAddRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    subscriptionAddSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      // state.subscription = action.payload.data;
    },
    subscriptionAddFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    judgementRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    judgementSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.judgement = action.payload.data;
    },
    judgementFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    draftListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    draftListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.draftList = action.payload.data;
    },
    draftListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    draftLanguageRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    draftLanguageSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.draftLanguage = action.payload.data;
    },
    draftLanguageFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    draftRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    draftSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.drafts = action.payload.data;
    },
    draftFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  draftRequest,
  draftSuccess,
  draftFailure,

  draftLanguageRequest,
  draftLanguageSuccess,
  draftLanguageFailure,
  draftListRequest,
  draftListSuccess,
  draftListFailure,
  enqueryListRequest,
  enqueryListSuccess,
  enqueryListFailure,
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  imageUploadUpdateProfileRequest,
  imageUploadUpdateProfileSuccess,
  imageUploadUpdateProfileFailure,
  clientListRequest,
  clientListSuccess,
  clientListFailure,
  clientAddRequest,
  clientAddSuccess,
  clientAddFailure,
  caseListRequest,
  caseListSuccess,
  caseListFailure,
  courtListRequest,
  courtListSuccess,
  courtListFailure,
  stateListRequest,
  stateListSuccess,
  stateListFailure,
  caseData,
  addCaseRequest,
  addCaseSuccess,
  addCaseFailure,
  caseTypeRequest,
  caseTypeSuccess,
  caseTypeFailure,
  updatePageName,
  caseDocumentAddRequest,
  caseDocumentAddSuccess,
  caseDocumentAddFailure,
  clientDocumentAddRequest,
  clientDocumentAddSuccess,
  clientDocumentAddFailure,
  clientDetailUpdate,
  clientDetailRequest,
  clientDetailSuccess,
  clientDetailFailure,
  clientDeleteRequest,
  clientDeleteSuccess,
  clientDeleteFailure,
  caseDeleteRequest,
  caseDeleteSuccess,
  caseDeleteFailure,
  clientDeleteDocumentRequest,
  clientDeleteDocumentSuccess,
  clientDeleteDocumentFailure,
  caseDetailRequest,
  caseDetailSuccess,
  caseDetailFailure,
  caseDocumentDeleteRequest,
  caseDocumentDeleteSuccess,
  caseDocumentDeleteFailure,
  memberListRequest,
  memberListSuccess,
  memberListFailure,
  memberAddRequest,
  memberAddSuccess,
  memberAddFailure,
  memberDeleteRequest,
  memberDeleteSuccess,
  memberDeleteFailure,
  otpValidationRequest,
  otpValidationSuccess,
  otpValidationFailure,
  allHearingRequest,
  allHearingSuccess,
  allHearingFailure,
  feedListRequest,
  feedListSuccess,
  feedListFailure,
  caseStatusChangeRequest,
  caseStatusChangeSuccess,
  caseStatusChangeFailure,
  requestListRequest,
  requestListSuccess,
  requestListFailure,
  requestAddRequest,
  requestAddSuccess,
  requestAddFailure,
  subscriptionRequest,
  subscriptionSuccess,
  subscriptionFailure,
  subscriptionAddRequest,
  subscriptionAddSuccess,
  subscriptionAddFailure,
  judgementRequest,
  judgementSuccess,
  judgementFailure,
} = postSlice.actions;
export default postSlice.reducer;
