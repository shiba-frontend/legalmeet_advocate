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
    cases: '',
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
    hearingList: [],
    dashboard: '',
    services: [],
    advocateList: [],
    myBills: [],
    serviceAppointments: [],
    helpCenter: [],
    consultationList: [],
    servicePaymentData: '',
    allKeys: '',
    consultNowPaymentData: '',
    enquiryList: [],
    subscriptionData: '',
    notificationList: [],
    paymentRequestData: '',
    favouriteArtist: '',
    favouriteList: [],
    ratingList: [],
    serviceResponse: '',
    serviceDetail: '',
    myServiceDetail: '',
    categoryList: [],
    ebook: [],
    memberShipPlans: [],
    message: [],
    invoices: [],
    enquiryCategoryList: [],
    generateInvoiceList: [],
    allCaseList: [],
    ebookcatList: [],
    requestList: [],
    getWallet: '',
    getCause:[],
   TentativeCause:'',
   caseHearingPdfLinkResponse:[],
   getFreeTrialResponse:null,
   assignedenquiryList:[]
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
      state.allCaseList = action.payload.data;
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
      // state.caseDetail = action.payload;
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
    },
    allHearingSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.hearingList = action.payload?.data;
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
    dashboardRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    dashboardSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.dashboard = action?.payload;
    },
    dashboardFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    serviceListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    serviceListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.services = action?.payload;
    },
    serviceListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    advocateListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    advocateListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.advocateList = action?.payload;
    },
    advocateListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    consultNowRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    consultNowSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.consultNowPaymentData = action.payload;
    },
    consultNowFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    myTransactionHistoryRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    myTransactionHistorySuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.myBills = action?.payload;
    },
    myTransactionHistoryFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    assignServiceRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    assignServiceSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.serviceResponse = action?.payload;
    },
    assignServiceFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    serviceAppointmentListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    serviceAppointmentListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.serviceAppointments = action?.payload;
    },
    serviceAppointmentListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    helpCenterRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    helpCenterSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.helpCenter = action?.payload;
    },
    helpCenterFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    consultationListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    consultationListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.consultationList = action?.payload;
    },
    consultationListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    servicePaymentRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    servicePaymentSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.servicePaymentData = action?.payload;
    },
    servicePaymentFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    allApiKeyRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    allApiKeySuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.allKeys = action?.payload;
    },
    allApiKeyFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    servicePaymentDataRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    servicePaymentDataSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    servicePaymentDataFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    consultNowDataRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    consultNowDataSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    consultNowDataFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    enquiryListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    enquiryListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.enquiryList = action?.payload;
    },
    enquiryListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    addEnquiryRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    addEnquirySuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.enquiryList = action?.payload;
    },
    addEnquiryFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    doSubscriptionRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    doSubscriptionSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.subscriptionData = action.payload;
    },
    doSubscriptionFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    paymentResponseSaveRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    paymentResponseSaveSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    paymentResponseSaveFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    notificationRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    notificationSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.notificationList = action.payload;
    },
    notificationFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    markNotificationRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    markNotificationSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    markNotificationFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    caseChargeRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    caseChargeSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.paymentRequestData = action.payload;
    },
    caseChargeFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    casePaymentResponseRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    casePaymentResponseSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    casePaymentResponseFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    favouriteAddRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    favouriteAddSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.favouriteArtist = action.payload;
    },
    favouriteAddFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    favouriteListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    favouriteListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.favouriteList = action.payload;
    },
    favouriteListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    ratingReviewRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    ratingReviewSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      // state.favouriteList = action.payload;
    },
    ratingReviewFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    serviceDetailRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    serviceDetailSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.serviceDetail = action.payload;
    },
    serviceDetailFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    serviceDocumentAddRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    serviceDocumentAddSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    serviceDocumentAddFailure(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    myServiceDetailRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    myServiceDetailSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.myServiceDetail = action?.payload;
    },
    myServiceDetailFailure(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    myServiceDocumentDeleteRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    myServiceDocumentDeleteSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    myServiceDocumentDeleteFailure(state, action) {
      state.status = action.type;
      state.loading = false;
    },

    categoryListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    categoryListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.categoryList = action.payload;
    },
    categoryListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
    },

    ebookRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    ebookSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.ebook = action.payload;
    },
    ebookFailure(state, action) {
      state.status = action.type;
      state.loading = false;
    },

    servicePartPaymentRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    servicePartPaymentSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.paymentRequestData = action.payload;
    },
    servicePartPaymentFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    servicePartPaymentSaveRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    servicePartPaymentSAveSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    servicePartPaymentSaveFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    //
    memberShipPlansRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    memberShipPlansSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.memberShipPlans = action.payload;
    },
    memberShipPlansFailure(state, action) {
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

    enquiryReplyRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    enquiryReplySuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    enquiryReplyFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    enquiryReplyListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    enquiryReplyListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.message = action?.payload?.data;
    },
    enquiryReplyListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    invoiceListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    invoiceListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.invoices = action?.payload?.data;
    },
    invoiceListFailure(state, action) {
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
      state.subscriptionData = action?.payload?.data;
    },
    subscriptionAddFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    subscriptionPaymentRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    subscriptionPaymentSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    subscriptionPaymentFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    enqueryCategoryListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    enqueryCategoryListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.enquiryCategoryList = action?.payload;
    },
    enqueryCategoryListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    generateInvoiceListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    generateInvoiceListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.generateInvoiceList = action?.payload;
    },
    generateInvoiceListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    generateInvoiceRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    generateInvoiceSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    generateInvoiceFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    updateInvoiceRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    updateInvoiceSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    updateInvoiceFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },
    ebookCategoryRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    ebookCategorySuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.ebookcatList = action.payload.data;
    },
    ebookCategoryFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    hearingDocumentAddRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    hearingDocumentAddSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    hearingDocumentAddFailure(state, action) {
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

    getWalletRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    getWalletSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.getWallet = action?.payload?.data;
    },
    getWalletFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    walletRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    walletSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
    },
    walletFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    CauseListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    CauseListRequestSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.getCause = action?.payload?.data;
    },
    CauseListRequestFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    TentativeCauseListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    TentativeCauseListRequestSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.TentativeCause = action?.payload;
    },
    TentativeCauseListRequestFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    caseHearingPdfLinkRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    caseHearingPdfLinkSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.caseHearingPdfLinkResponse = action?.payload;
    },
    caseHearingPdfLinkFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },


    getFreeTrialRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    getFreeTrialSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.getFreeTrialResponse = action?.payload;
    },
    getFreeTrialFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    assignedenquiryListRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    assignedenquiryListSuccess(state, action) {
      state.status = action.type;
      state.loading = false;
      state.assignedenquiryList = action?.payload;
    },
    assignedenquiryListFailure(state, action) {
      state.status = action.type;
      state.loading = false;
      state.error = action.payload;
    },



  },
});

export const {

  assignedenquiryListRequest,
  assignedenquiryListSuccess,
  assignedenquiryListFailure,

  caseHearingPdfLinkRequest,
  caseHearingPdfLinkSuccess,
  caseHearingPdfLinkFailure,


  TentativeCauseListRequest,
  TentativeCauseListRequestSuccess,
  TentativeCauseListRequestFailure,

  CauseListRequest,
  CauseListRequestSuccess,
  CauseListRequestFailure,


  walletRequest,
  walletSuccess,
  walletFailure,

  getWalletRequest,
  getWalletSuccess,
  getWalletFailure,

  requestListRequest,
  requestListSuccess,
  requestListFailure,

  requestAddRequest,
  requestAddSuccess,
  requestAddFailure,

  hearingDocumentAddRequest,
  hearingDocumentAddSuccess,
  hearingDocumentAddFailure,

  ebookCategoryRequest,
  ebookCategorySuccess,
  ebookCategoryFailure,

  updateInvoiceRequest,
  updateInvoiceSuccess,
  updateInvoiceFailure,

  generateInvoiceRequest,
  generateInvoiceSuccess,
  generateInvoiceFailure,

  generateInvoiceListRequest,
  generateInvoiceListSuccess,
  generateInvoiceListFailure,

  enqueryCategoryListRequest,
  enqueryCategoryListSuccess,
  enqueryCategoryListFailure,

  subscriptionPaymentRequest,
  subscriptionPaymentSuccess,
  subscriptionPaymentFailure,

  subscriptionAddRequest,
  subscriptionAddSuccess,
  subscriptionAddFailure,

  invoiceListRequest,
  invoiceListSuccess,
  invoiceListFailure,

  enquiryReplyListRequest,
  enquiryReplyListSuccess,
  enquiryReplyListFailure,

  enquiryReplyRequest,
  enquiryReplySuccess,
  enquiryReplyFailure,

  draftRequest,
  draftSuccess,
  draftFailure,

  draftLanguageRequest,
  draftLanguageSuccess,
  draftLanguageFailure,

  draftListRequest,
  draftListSuccess,
  draftListFailure,

  judgementRequest,
  judgementSuccess,
  judgementFailure,

  memberShipPlansRequest,
  memberShipPlansSuccess,
  memberShipPlansFailure,

  servicePartPaymentSaveRequest,
  servicePartPaymentSAveSuccess,
  servicePartPaymentSaveFailure,

  servicePartPaymentRequest,
  servicePartPaymentSuccess,
  servicePartPaymentFailure,

  ebookRequest,
  ebookSuccess,
  ebookFailure,

  categoryListRequest,
  categoryListSuccess,
  categoryListFailure,

  myServiceDocumentDeleteRequest,
  myServiceDocumentDeleteSuccess,
  myServiceDocumentDeleteFailure,

  myServiceDetailRequest,
  myServiceDetailSuccess,
  myServiceDetailFailure,

  serviceDocumentAddRequest,
  serviceDocumentAddSuccess,
  serviceDocumentAddFailure,

  serviceDetailRequest,
  serviceDetailSuccess,
  serviceDetailFailure,

  ratingReviewRequest,
  ratingReviewSuccess,
  ratingReviewFailure,

  favouriteListRequest,
  favouriteListSuccess,
  favouriteListFailure,

  favouriteAddRequest,
  favouriteAddSuccess,
  favouriteAddFailure,

  casePaymentResponseRequest,
  casePaymentResponseSuccess,
  casePaymentResponseFailure,

  caseChargeRequest,
  caseChargeSuccess,
  caseChargeFailure,

  markNotificationRequest,
  markNotificationSuccess,
  markNotificationFailure,

  notificationRequest,
  notificationSuccess,
  notificationFailure,

  paymentResponseSaveRequest,
  paymentResponseSaveSuccess,
  paymentResponseSaveFailure,

  doSubscriptionRequest,
  doSubscriptionSuccess,
  doSubscriptionFailure,

  addEnquiryRequest,
  addEnquirySuccess,
  addEnquiryFailure,

  enquiryListRequest,
  enquiryListSuccess,
  enquiryListFailure,

  consultNowDataRequest,
  consultNowDataSuccess,
  consultNowDataFailure,

  servicePaymentDataRequest,
  servicePaymentDataSuccess,
  servicePaymentDataFailure,

  allApiKeyRequest,
  allApiKeySuccess,
  allApiKeyFailure,

  servicePaymentRequest,
  servicePaymentSuccess,
  servicePaymentFailure,

  consultationListRequest,
  consultationListSuccess,
  consultationListFailure,

  helpCenterRequest,
  helpCenterSuccess,
  helpCenterFailure,

  serviceAppointmentListRequest,
  serviceAppointmentListSuccess,
  serviceAppointmentListFailure,

  assignServiceRequest,
  assignServiceSuccess,
  assignServiceFailure,

  myTransactionHistoryRequest,
  myTransactionHistorySuccess,
  myTransactionHistoryFailure,

  consultNowRequest,
  consultNowSuccess,
  consultNowFailure,

  advocateListRequest,
  advocateListSuccess,
  advocateListFailure,

  serviceListRequest,
  serviceListSuccess,
  serviceListFailure,

  dashboardRequest,
  dashboardSuccess,
  dashboardFailure,

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


  getFreeTrialRequest,
  getFreeTrialSuccess,
  getFreeTrialFailure,


} = postSlice.actions;
export default postSlice.reducer;
