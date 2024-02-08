import NetInfo from '@react-native-community/netinfo';

export default function IsInternetConnected() {
  return new Promise(function (resolve, reject) {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        resolve(state.isConnected);
      } else {
        reject(state.isConnected);
      }
    });
  });
}