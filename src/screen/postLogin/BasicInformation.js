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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashImage from '../../assets/splash.png';
import {COLORS, IMAGE} from '../../utils/Theme';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import InputText from '../../components/InputText';
import {ToastMessage} from '../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {verifyUserIdRequest} from '../../redux/reducer/AuthReducer';
import Loader from '../../utils/helpers/Loader';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {updateProfileRequest} from '../../redux/reducer/PostReducer';
var status = '';
const BasicInformation = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
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
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Loader visible={PostReducer.loading} />
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              marginVertical: normalize(10),
              paddingHorizontal: normalize(15),
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <Text
              style={{
                color: COLORS.STATUS_BAR,
                fontSize: normalize(20),
                fontWeight: '800',
              }}>
              Hello !
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: normalize(15),
                fontWeight: '600',
              }}>
              Please fill your basic information
            </Text>
          </View>
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Your Name
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth:1,
                borderColor: COLORS.themeColor
              }}
              placeHolderText="Enter Name"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={name}
              onChangingText={item => {
                setName(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Enter Your Email ID
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeHolderText="Enter Email"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={email}
              onChangingText={item => {
                setEmail(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Enrolment ID
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeHolderText="Enrolment Number"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={enrollmentId}
              onChangingText={item => {
                setEnrollmentId(item);
              }}
              onOpenModal={item => {}}
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
                var emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (email == '') {
                  ToastMessage('Email required');
                } else if (!email.match(emailreg)) {
                  ToastMessage('Enter valid email');
                } else if (name == '') {
                  ToastMessage('Name required');
                } else if (enrollmentId == '') {
                  ToastMessage('Enrollment ID required');
                } else {
                  //
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        updateProfileRequest({
                          name: name,
                          email: email,
                          enrolment_id: enrollmentId,
                        }),
                      );
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                }
              }}>
              <Text style={{color: COLORS.WHITE, letterSpacing: normalize(2)}}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicInformation;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
