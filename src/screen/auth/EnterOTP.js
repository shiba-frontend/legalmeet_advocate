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
  TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import SplashImage from '../../assets/splash.png';
import { COLORS, ICON, IMAGE } from '../../utils/Theme';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import InputText from '../../components/InputText';
import { ToastMessage } from '../../utils/helpers/Toast';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import { loginRequest, verifyUserIdRequest } from '../../redux/reducer/AuthReducer';
import messaging from '@react-native-firebase/messaging';
const EnterOTP = ({ navigation }) => {
  const [otp1, setotp1] = useState('');
  const [otp2, setotp2] = useState('');
  const [otp3, setotp3] = useState('');
  const [otp4, setotp4] = useState('');
  const textInput1 = useRef(null);
  const textInput2 = useRef(null);
  const textInput3 = useRef(null);
  const textInput4 = useRef(null);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }
  useEffect(() => {
    // if (!isEmpty(AuthReducer?.verifyUserIdData?.verification_code)) {
    //   setotp1(AuthReducer?.verifyUserIdData?.verification_code[0]);
    //   setotp2(AuthReducer?.verifyUserIdData?.verification_code[1]);
    //   setotp3(AuthReducer?.verifyUserIdData?.verification_code[2]);
    //   setotp4(AuthReducer?.verifyUserIdData?.verification_code[3]);
    // }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.themeColor}
      />
      <Loader visible={AuthReducer.loading} />
      {/* <ImageBackground
        source={IMAGE.app_background}
        resizeMode="cover"
        style={styles.imgbg}>
        <View
          style={{
            width: Dimensions.get('screen').width - 50,
            height: Dimensions.get('screen').height / 2.4,
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
                  Verify OTP
                </Text>
                <Text
                  style={{
                    color: COLORS.ASH,
                    fontSize: normalize(12),
                    fontWeight: '400',
                    textAlign: 'center',
                  }}>
                  We send a OTP to your mobile number
                </Text>
                <TouchableOpacity
                  style={{flexDirection: 'row', justifyContent: 'center'}}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      fontSize: normalize(12),
                      fontWeight: '400',
                      textAlign: 'center',
                    }}>
                    {AuthReducer?.userId}
                  </Text>
                  <Image
                    source={ICON.edit}
                    style={{
                      height: normalize(15),
                      width: normalize(15),
                      marginLeft: normalize(5),
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '80%',
                  marginTop: normalize(10),
                }}>
                <View>
                  <TextInput
                    style={[
                      styles.OtpInput,
                      {
                        borderColor: !isEmpty(otp1)
                          ? COLORS.PINK
                          : COLORS.WHITE,
                      },
                    ]}
                    keyboardType="numeric"
                    maxLength={1}
                    ref={textInput1}
                    value={otp1}
                    onChangeText={otp1 => {
                      setotp1(otp1);
                      if (otp1 != '') {
                        textInput2.current.focus();
                      }
                    }}
                  />
                </View>
                <TextInput
                  style={[
                    styles.OtpInput,
                    {borderColor: !isEmpty(otp1) ? COLORS.PINK : COLORS.WHITE},
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={textInput2}
                  value={otp2}
                  onChangeText={otp2 => {
                    setotp2(otp2);
                    if (otp2 != '') {
                      textInput3.current.focus();
                    }
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key == 'Backspace') {
                      textInput1.current.focus();
                    }
                  }}
                />
                <TextInput
                  style={[
                    styles.OtpInput,
                    {borderColor: !isEmpty(otp1) ? COLORS.PINK : COLORS.WHITE},
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={textInput3}
                  value={otp3}
                  onChangeText={otp3 => {
                    setotp3(otp3);
                    if (otp3 != '') {
                      textInput4.current.focus();
                    }
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key == 'Backspace') {
                      textInput2.current.focus();
                    }
                  }}
                />
                <TextInput
                  style={[
                    styles.OtpInput,
                    {borderColor: !isEmpty(otp1) ? COLORS.PINK : COLORS.WHITE},
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={textInput4}
                  value={otp4}
                  onChangeText={otp4 => {
                    setotp4(otp4);
                    if (otp4 != '') {
                      textInput4.current.focus();
                    }
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key == 'Backspace') {
                      textInput3.current.focus();
                    }
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
                    var otp = otp1 + otp2 + otp3 + otp4;
                    if (otp == '') {
                      ToastMessage('OTP required');
                    } else if (otp.length != 4) {
                      ToastMessage('Enter valid OTP');
                    } else {
                      IsInternetConnected()
                        .then(() => {
                          dispatch(
                            loginRequest({
                              mobile_number: AuthReducer?.userId,
                              verification_code: otp,
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
                    VERIFY
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground> */}
      <ScrollView style={{ flex: 1, backgroundColor: COLORS?.themeColor }}>
        <View
          style={{
            width: Dimensions?.get('window')?.width,
            height: Dimensions?.get('window')?.height / 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={ICON?.logo}
            style={{ height: normalize(70), width: normalize(200) }}
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
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <View
          style={{
            margin: normalize(25),
            width: '90%',
          }}>
          <Text
            style={{
              color: COLORS.themeColor,
              fontSize: normalize(32),
              fontWeight: '800',
            }}>
            Verify OTP
          </Text>
          <Text
            style={{
              color: 'rgba(91, 91, 91, 1)',
              fontSize: normalize(14),
              fontWeight: '600',
            }}>
            Enter the OTP sent to {AuthReducer?.userId}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={[
              styles.OtpInput,
              {
                borderColor: !isEmpty(otp1) ? COLORS.PINK : COLORS.WHITE,
              },
            ]}
            keyboardType="numeric"
            maxLength={1}
            ref={textInput1}
            value={otp1}
            onChangeText={otp1 => {
              setotp1(otp1);
              if (otp1 != '') {
                textInput2.current.focus();
              }
            }}
          />

          <TextInput
            style={[
              styles.OtpInput,
              { borderColor: !isEmpty(otp1) ? COLORS.PINK : COLORS.WHITE },
            ]}
            keyboardType="numeric"
            maxLength={1}
            ref={textInput2}
            value={otp2}
            onChangeText={otp2 => {
              setotp2(otp2);
              if (otp2 != '') {
                textInput3.current.focus();
              }
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key == 'Backspace') {
                textInput1.current.focus();
              }
            }}
          />
          <TextInput
            style={[
              styles.OtpInput,
              { borderColor: !isEmpty(otp1) ? COLORS.PINK : COLORS.WHITE },
            ]}
            keyboardType="numeric"
            maxLength={1}
            ref={textInput3}
            value={otp3}
            onChangeText={otp3 => {
              setotp3(otp3);
              if (otp3 != '') {
                textInput4.current.focus();
              }
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key == 'Backspace') {
                textInput2.current.focus();
              }
            }}
          />
          <TextInput
            style={[
              styles.OtpInput,
              { borderColor: !isEmpty(otp1) ? COLORS.PINK : COLORS.WHITE },
            ]}
            keyboardType="numeric"
            maxLength={1}
            ref={textInput4}
            value={otp4}
            onChangeText={otp4 => {
              setotp4(otp4);
              if (otp4 != '') {
                textInput4.current.focus();
              }
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key == 'Backspace') {
                textInput3.current.focus();
              }
            }}
          />
        </View>
        <View style={{ marginTop: normalize(20), width: '90%' }}>
          <TouchableOpacity
            style={{
              padding: normalize(16),
              backgroundColor: COLORS.STATUS_BAR,
              borderRadius: normalize(6),
              alignItems: 'center',
            }}
            onPress={() => {
              var otp = otp1 + otp2 + otp3 + otp4;
              if (otp == '') {
                ToastMessage('OTP required');
              } else if (otp.length != 4) {
                ToastMessage('Enter valid OTP');
              } else {

                messaging()
                  .getToken()
                  .then(device_token => {
                    console.log('Device token: ', device_token);
                    IsInternetConnected()
                      .then(() => {
                        dispatch(
                          loginRequest({
                            mobile_number: AuthReducer?.userId,
                            verification_code: otp,
                            type: AuthReducer?.verifyUserIdData?.type,
                            device_type: Platform.OS === 'ios' ? 2 : 1,
                            fcm_token: device_token,
                          }),
                        );
                      })
                      .catch(() => {
                        Toast('Network connection error');
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });

                // IsInternetConnected()
                //   .then(() => {
                //     dispatch(
                //       loginRequest({
                //         mobile_number: AuthReducer?.userId,
                //         verification_code: otp,
                //         type: AuthReducer?.verifyUserIdData?.type,
                //       }),
                //     );
                //   })
                //   .catch(() => {
                //     ToastMessage('Network connection issue');
                //   });
              }
            }}>
            <Text
              style={{
                color: COLORS.WHITE,
                letterSpacing: normalize(2),
                fontSize: 18,
              }}>
              VERIFY
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: normalize(20), justifyContent: "center" }}>


            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(12),
                fontWeight: '500',
                textAlign: 'center',
                // marginTop: normalize(20),
              }}
              onPress={() => {
                // navigation.navigate('ResendOTP');
              }}>
              Didn’t receive OTP?
            </Text>

            <TouchableOpacity
              onPress={() => {

                IsInternetConnected()
                  .then(() => {
                    dispatch(
                      verifyUserIdRequest({
                        mobile_number: AuthReducer?.userId,
                        user_type: '2',

                      }),
                    );
                  })
                  .catch(() => {
                    Toast('Network connection error');
                  });
              }}
              style={{ marginHorizontal: normalize(10) }}
            >
              <Text style={{color:COLORS.themeColor}}>Resend otp</Text>
            </TouchableOpacity>
          </View>





        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterOTP;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  OtpInput: {
    backgroundColor: COLORS.ASH,
    alignSelf: 'center',
    padding: normalize(15),
    fontSize: normalize(16),
    borderRadius: normalize(8),
    textAlign: 'center',
  },
});
