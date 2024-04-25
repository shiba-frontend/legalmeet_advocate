import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashImage from '../../assets/splash.png';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import InputText from '../../components/InputText';
import {ToastMessage} from '../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {verifyUserIdRequest} from '../../redux/reducer/AuthReducer';
import Loader from '../../utils/helpers/Loader';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import messaging from '@react-native-firebase/messaging';
var status = '';
const Login = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  if (status == '' || status != AuthReducer?.status) {
    switch (AuthReducer?.status) {
      case 'auth/verifyUserIdRequest':
        status = AuthReducer?.status;
        break;
      case 'auth/verifyUserIdSuccess':
        status = AuthReducer?.status;
        navigation.navigate('EnterOTP');
        break;
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar
        // barStyle={'dark-content'}
        backgroundColor={COLORS.themeColor}
      />
      <Loader visible={AuthReducer.loading} />
      <ScrollView style={{flex: 1, backgroundColor: COLORS?.themeColor}}>
        <View
          style={{
            width: Dimensions?.get('window')?.width,
            height: Dimensions?.get('window')?.height / 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={ICON?.logo}
            style={{height: normalize(70), width: normalize(200)}}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
      <View
        style={{
          height: Dimensions?.get('window')?.height / 1.6,
          width: Dimensions?.get('window')?.width,
          backgroundColor: COLORS?.WHITE,
          borderTopLeftRadius: normalize(40),
          position: 'absolute',
          bottom: normalize(0),
        }}>
        <View style={{margin: normalize(25)}}>
          <Text
            style={{
              color: COLORS.themeColor,
              fontSize: normalize(32),
              fontWeight: '800',
            }}>
            Welcome
          </Text>
          <Text
            style={{
              color: 'rgba(91, 91, 91, 1)',
              fontSize: normalize(14),
              fontWeight: '600',
            }}>
            Login or Create Your Account
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={{marginTop: normalize(20), width: '90%'}}>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeHolderText="Enter Mobile Number"
              beforeIcon={ICON?.india}
              keyboardType={'phone-pad'}
              maxLength={10}
              value={phoneNumber}
              onChangingText={item => {
                setPhoneNumber(item);
              }}
            />
          </View>
          <View
            style={{
              marginTop: normalize(20),
              width: '90%',
            }}>
            <TouchableOpacity
              style={{
                padding: normalize(16),
                backgroundColor: COLORS.STATUS_BAR,
                borderRadius: normalize(6),
                alignItems: 'center',
              }}
              onPress={() => {
                // var emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var phoneno = /^\d{10}$/;
                if (phoneNumber == '') {
                  ToastMessage('Phone number required');
                } else if (!phoneNumber.match(phoneno)) {
                  ToastMessage('Enter valid phone number');
                } else {
                  IsInternetConnected()
                  .then(() => {
                    dispatch(
                      verifyUserIdRequest({
                        mobile_number: phoneNumber,
                        user_type: '2',

                      }),
                    );
                  })
                  .catch(() => {
                    Toast('Network connection error');
                  });
                  // messaging()
                  //   .getToken()
                  //   .then(device_token => {
                  //     console.log('Device token: ', device_token);
                  //     IsInternetConnected()
                  //       .then(() => {
                  //         dispatch(
                  //           verifyUserIdRequest({
                  //             mobile_number: phoneNumber,
                  //             user_type: '2',
                  //             device_type: Platform.OS,
                  //             fcm_token: device_token,
                  //           }),
                  //         );
                  //       })
                  //       .catch(() => {
                  //         Toast('Network connection error');
                  //       });
                  //   })
                  //   .catch(err => {
                  //     console.log(err);
                  //   });
                }
              }}>
              <Text
                style={{
                  color: COLORS.WHITE,
                  letterSpacing: normalize(2),
                  fontSize: 18,
                }}>
                CONTINUE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <ImageBackground
        source={IMAGE.app_background}
        resizeMode="cover"
        style={styles.imgbg}>
        <View
          style={{
            width: Dimensions.get('screen').width - 50,
            height: Dimensions.get('screen').height / 2.7,
            backgroundColor: 'rgba(0,0,0, 0.3)',
            borderRadius: normalize(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView style={{width: '100%'}}>
            <View style={{marginTop: normalize(10), alignItems: 'center'}}>
              <Image
                source={IMAGE.logo}
                style={{
                  height: normalize(50),
                  width: normalize(120),
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
              <View>
                <Text
                  style={{
                    color: COLORS.PINK,
                    fontSize: normalize(20),
                    fontWeight: '800',
                    textAlign: 'center',
                  }}>
                  Welcome
                </Text>
                <Text
                  style={{
                    color: COLORS.ASH,
                    fontSize: normalize(12),
                    fontWeight: '400',
                    textAlign: 'center',
                  }}>
                  Please Enter Your Mobile Number
                </Text>
              </View>
              <View style={{marginTop: normalize(20), width: '90%'}}>
                <InputText
                  inputStyle={{
                    backgroundColor: '#FFF',
                    width: '100%',
                    borderRadius: 10,
                    paddingLeft: 10,
                  }}
                  placeHolderText="Enter Mobile Number"
                  beforeIcon={ICON.india}
                  keyboardType={'phone-pad'}
                  maxLength={10}
                  value={phoneNumber}
                  onChangingText={item => {
                    setPhoneNumber(item);
                  }}
                />
              </View>
              <View style={{marginTop: normalize(20), width: '90%'}}>
                <TouchableOpacity
                  style={{
                    padding: normalize(10),
                    backgroundColor: COLORS.STATUS_BAR,
                    borderRadius: normalize(10),
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    // var emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    var phoneno = /^\d{10}$/;
                    if (phoneNumber == '') {
                      ToastMessage('Phone number required');
                    } else if (!phoneNumber.match(phoneno)) {
                      ToastMessage('Enter valid phone number');
                    } else {
                      //
                      IsInternetConnected()
                        .then(() => {
                          dispatch(
                            verifyUserIdRequest({
                              mobile_number: phoneNumber,
                              user_type: '2',
                            }),
                          );
                        })
                        .catch(() => {
                          ToastMessage('Network connection issue');
                        });
                    }
                  }}>
                  <Text
                    style={{color: COLORS.WHITE, letterSpacing: normalize(2)}}>
                    GET OTP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground> */}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
