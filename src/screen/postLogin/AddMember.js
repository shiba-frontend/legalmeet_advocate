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
  FlatList,
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
import { verifyUserIdRequest } from '../../redux/reducer/AuthReducer';
import Loader from '../../utils/helpers/Loader';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {
  caseData,
  clientListRequest,
  courtListRequest,
  memberAddRequest,
  otpValidationRequest,
  stateListRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import Modal from 'react-native-modal';

var status = '';
const AddMember = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [client, setClient] = useState('');
  const [court, setCourt] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [selectClient, setSelectClient] = useState(false);
  const [selectCourt, setSelectCourt] = useState(false);
  const [selectState, setSelectState] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [otp1, setotp1] = useState('');
  const [otp2, setotp2] = useState('');
  const [otp3, setotp3] = useState('');
  const [otp4, setotp4] = useState('');
  const types = ['Clerk', 'Associate'];
  const [selectType, setSelectType] = useState('Associate');
  const textInput1 = useRef(null);
  const textInput2 = useRef(null);
  const textInput3 = useRef(null);
  const textInput4 = useRef(null);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);


  console.log("hhhhhh", PostReducer?.memberAdded)

  function isEmpty(item) {
    if (item == '' || item == undefined || item == null) return true;
    return false;
  }
  useEffect(() => {
    if (!isEmpty(route?.params?.item)) {
      setName(String(route?.params?.item?.name));
      setPhone(String(route?.params?.item?.mobile_number));
    }
  }, []);
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/memberAddRequest':
        status = PostReducer?.status;
        break;
      case 'post/memberAddSuccess':
        status = PostReducer?.status;
        setOtpModal(true);
        // navigation.goBack();
        break;
      case 'post/otpValidationRequest':
        status = PostReducer?.status;
        break;
      case 'post/otpValidationSuccess':
        status = PostReducer?.status;
        setOtpModal(false);
        navigation.goBack();
        break;
    }
  }
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={!isEmpty(route?.params?.item) ? 'Edit Member' : 'Add New Member'}
      />
      <Loader visible={PostReducer.loading} />

      {/* OTP MODAL */}
      <Modal
        isVisible={otpModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          // setOtpModal(false);
        }}
        backdropTransitionOutTiming={0}
        style={{ margin: 0, flex: 1, justifyContent: 'center' }}>

        <View
          style={{
            height: Dimensions.get('screen').height / 3.5,
            width: '90%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#EEE',
            borderRadius: 20,
            // padding: normalize(40),
            // alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: normalize(10) }}>
            <Text></Text>
            <TouchableOpacity onPress={() => {
              setOtpModal(false);
            }}>
              <Image
                source={
                  ICON?.close_circle
                }
                style={{
                  height: normalize(20),
                  width: normalize(20),

                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>






          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '80%',
              marginTop: normalize(10),
              alignSelf: "center"

            }}>
            <View>
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
            </View>
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
          {/* <View style={{ width: '100%', paddingHorizontal: normalize(30), alignItems: "center" }}>
            <Text
              style={{
                marginTop: normalize(10),
                textAlign: 'left',
                alignSelf: 'flex-start',
                color: "black"
              }}>
              OTP is 
              {PostReducer?.memberAdded?.verification_code}
            </Text>
          </View> */}

          <View style={{ marginTop: normalize(20), width: '100%', paddingHorizontal: normalize(30) }}>
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
                        otpValidationRequest({
                          mobile_number: phone,
                          verification_code: otp,
                          user_type: '2',
                          // member_id: PostReducer?.memberAdded?.id,
                        }),
                      );
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                }
              }}>
              <Text style={{ color: COLORS.WHITE, letterSpacing: normalize(2) }}>
                VERIFY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={{ flex: 1, paddingHorizontal: normalize(10) }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: normalize(10), width: '100%' }}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Enter Member Name
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              placeHolderText="Enter member name"
              beforeIcon={''}
              keyboardType={'default'}
              value={name}
              onChangingText={item => {
                setName(item);
              }}
            />
          </View>

          <View style={{ marginTop: normalize(7), width: '100%' }}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Enter Phone Number
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              placeHolderText="Enter phone number"
              beforeIcon={''}
              keyboardType={'phone-pad'}
              maxLength={10}
              value={phone}
              onChangingText={item => {
                setPhone(item);
              }}
            />
          </View>

          <View style={{ flexGrow: 0 }}>
            <FlatList
              style={{ flexGrow: 0, marginTop: normalize(20) }}
              data={types}
              horizontal={true}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      padding: normalize(5),
                      borderWidth: normalize(1),
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: Dimensions?.get('window')?.width / 2 - 30,
                      marginRight:
                        index % 2 == 0 ? normalize(20) : normalize(0),
                      borderRadius: normalize(6),
                      borderColor: COLORS?.themeColor,
                    }}
                    onPress={() => {
                      setSelectType(item);
                    }}>
                    <Image
                      source={
                        selectType == item
                          ? ICON?.radioEnable
                          : ICON?.radioDisable
                      }
                      style={{
                        height: normalize(20),
                        width: normalize(20),
                        tintColor: COLORS?.themeColor,
                      }}
                      resizeMode="contain"
                    />
                    <Text style={{ marginLeft: normalize(10) }}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{ marginTop: normalize(20), width: '90%' }}>
            <TouchableOpacity
              style={{
                padding: normalize(13),
                backgroundColor: COLORS.STATUS_BAR,
                borderRadius: normalize(10),
                alignItems: 'center',
              }}
              onPress={() => {
                if (name == '') {
                  ToastMessage('Name required');
                } else if (phone == '') {
                  ToastMessage('Phone required');
                } else {
                  IsInternetConnected()
                    .then(() => {
                      var requestJSON = {
                        name: name,
                        mobile_number: phone,
                        type: selectType == 'Associate' ? 1 : 0,
                      };
                      if (!isEmpty(route?.params?.item)) {
                        requestJSON['exist_id'] = route?.params?.item?.id;
                      }
                      dispatch(memberAddRequest(requestJSON));
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                }
              }}>
              <Text style={{ color: COLORS.WHITE, letterSpacing: normalize(2) }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMember;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  OtpInput: {
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    padding: normalize(15),
    fontSize: normalize(16),
    borderRadius: normalize(8),
    textAlign: 'center',
  },
});
