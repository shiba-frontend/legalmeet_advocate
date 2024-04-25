import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
const Stack = createStackNavigator();
function isEmpty(item) {
  if (item == null || item == '' || item == undefined) return true;
  return false;
}
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: '',
    verifyUserIdData: '',
    loading: false,
    status: '',
    authToken: null,
    verifyOTPResponse: '',
    isFlag: true,
    cmsData: '',
  },
  reducers: {
    verifyUserIdRequest(state, action) {
      state.status = action.type;
      state.loading = true;
      state.userId = action.payload.mobile_number;
    },
    verifyUserIdSuccess(state, action) {
      state.status = action.type;
      state.verifyUserIdData = action.payload?.data;
      state.loading = false;
    },
    verifyUserIdFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.loading = false;
    },
    loginRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.status = action.type;
      state.verifyOTPResponse = action.payload?.data;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.loading = false;
    },
    updateAuthToken(state, action) {
      state.status = action.type;
      state.authToken = action?.payload?.authToken;
      state.isFlag = false;
    },
    cmsDataRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    cmsDataSuccess(state, action) {
      state.status = action.type;
      state.cmsData = action.payload?.data;
      state.loading = false;
    },
    cmsDataFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  cmsDataRequest,
  cmsDataSuccess,
  cmsDataFailure,

  verifyUserIdRequest,
  verifyUserIdSuccess,
  verifyUserIdFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  updateAuthToken,
} = authSlice.actions;
export default authSlice.reducer;
