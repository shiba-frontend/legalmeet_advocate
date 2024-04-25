import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';


import notifee, {
  AndroidImportance,
  EventType,
  AndroidColor,
  AndroidStyle,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MODE, TOKEN} from './src/utils/helpers/Constant';
import Navigation from './src/navigation/Navigation';
import {navigate} from './src/utils/helpers/RootNavigation';
import {updateAuthToken} from './src/redux/reducer/AuthReducer';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getPermission();
    checkAuthToken();
    setTimeout(() => {}, 1500);
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

  useEffect(() => {
    const unsubscribe = () => {
      return notifee.onForegroundEvent(({type, detail}) => {
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
    // Request permissions (required for iOS)

    //   Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: data?.notification.title,
      body: data?.notification.body,
      data: data.data,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
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
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      // dispatch(getNotificationData(remoteMessage.data));

      //Notification caused app to open from background state:
      // if (!_.isEmpty(remoteMessage.data)) {
      //   setTimeout(() => {
      //     navigate('Job Datails', {
      //       jobsDetails: remoteMessage.data,
      //     });
      //   }, 1200);
      // }

      navigate('Consultation');

      // if (!!remoteMessage?.data) {
      //     setTimeout(() => {
      //         navigate("Profile", { data: remoteMessage?.data })
      //     }, 1200);
      // }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          //Notification caused app to open from quit state:
          dispatch(getNotificationData(remoteMessage.data));
          // setTimeout(() => {
          //   navigate('ServiceRequest');
          //   // navigate('ProductDetail', {data: remoteMessage?.data});
          // }, 4000);
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    return unsubscribe;
  }

  useEffect(() => {
    const subscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', remoteMessage);
      // Get the message body
      // let message_body = remoteMessage.notification.body;

      // // Get the message title
      // let message_title = remoteMessage.notification.title;

      // // Get message image
      // let avatar = remoteMessage.notification.android.imageUrl;

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
