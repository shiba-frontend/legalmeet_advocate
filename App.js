import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkAuthTokenPresent,
  updateAuthToken,
} from './src/redux/reducer/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MODE, TOKEN} from './src/utils/helpers/Constant';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuthToken();
    setTimeout(() => {
      
    }, 1500);
  }, []);
  function isEmpty(item) {
    if (item == null || item == '' || item == undefined) return true;
    return false;
  }
  const checkAuthToken = async () => {
    let token = await AsyncStorage.getItem(TOKEN);
    let mode = await AsyncStorage.getItem(MODE);
    console.log('TOKEN: ', token);
    dispatch(
      updateAuthToken({authToken: isEmpty(token) ? null : token, mode: mode}),
    );
  };
  return <Navigation />;
}

export default App;
