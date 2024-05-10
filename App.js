import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';


import notifee, {
  AndroidImportance,
  EventType,
  AndroidColor,
  AndroidStyle,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MODE, TOKEN } from './src/utils/helpers/Constant';
import Navigation from './src/navigation/Navigation';
import { navigate } from './src/utils/helpers/RootNavigation';
import { updateAuthToken } from './src/redux/reducer/AuthReducer';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getPermission();
    checkAuthToken();
    requestUserPermission()
    setTimeout(() => { }, 1500);
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
      updateAuthToken({ authToken: isEmpty(token) ? null : token, mode: mode }),
    );
  };

  useEffect(() => {
    const unsubscribe = () => {
      return notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('DISMISSED', detail);
            notifee.cancelNotification(detail.notification.id);
            break;
          case EventType.PRESS:
            console.log('PRESSED', detail);
            console.log('type', type);
            // navigate('Consultation');
            // if (!_.isEmpty(detail.notification.data)) {
            //   navigate('Job Datails', {
            //     jobsDetails: detail.notification.data,
            //   });
            // }
            break;
          default:
            break;
        }
      });
    };
    unsubscribe();
  }, []);

  async function onDisplayNotification(data) {
    console.log("dsssssss", data)

    //   Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      // importance: AndroidImportance.HIGH,
      imageUrl: data?.notification?.android?.imageUrl,
      smallIcon: 'ic_launcher',
    });

    // Display a notification
    await notifee.displayNotification({
      title: data?.notification?.title,
      body: data?.notification?.body?.split("###")[0],
      // imageUrl: data?.notification?.android?.imageUrl,
      android: {
        channelId,
      },


    });


  }

  async function notificationListeners() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);

      onDisplayNotification(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification route',
        remoteMessage?.notification?.body?.split("###")[1],
      );

      if (remoteMessage?.notification?.body) {

        navigate(remoteMessage?.notification?.body?.split("###")[1]);
      }
    });

    // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {

    //               console.log(
    //                 'Notificationhjhj',
    //                 remoteMessage.notification,
    //               );

    //     navigate('Feed');


    //     if (remoteMessage) {
    //       dispatch(getNotificationData(remoteMessage.data));
    //     }
    //   });

    return unsubscribe;
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      notificationListeners()
    }
  }

  useEffect(() => {
    const subscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', remoteMessage);
      onDisplayNotification(remoteMessage);

    });

    return subscribe;
  }, []);
  return <Navigation />;
}

async function getPermission() {
  await notifee.requestPermission();
}
if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;
export default App;
