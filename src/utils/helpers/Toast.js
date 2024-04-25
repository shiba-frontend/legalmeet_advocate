import Toast from 'react-native-simple-toast';

export const ToastMessage = (item) =>{
    Toast.show(item, Toast.LONG, {});
}