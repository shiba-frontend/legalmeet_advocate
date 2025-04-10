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
import {COLORS, IMAGE} from '../../../utils/Theme';
import MyStatusBar from '../../../utils/helpers/MyStatusBar';
import normalize from '../../../utils/helpers/normalize';
import InputText from '../../../components/InputText';
import {ToastMessage} from '../../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {verifyUserIdRequest} from '../../../redux/reducer/AuthReducer';
import Loader from '../../../utils/helpers/Loader';
import IsInternetConnected from '../../../utils/helpers/IsInternetConnected';
import {updateProfileRequest} from '../../../redux/reducer/PostReducer';
import Header from '../../../utils/helpers/Header';
var status = '';
const PersonalInformation = ({navigation}) => {
  const [charges, setCharges] = useState('');
  const [name, setName] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/updateProfileRequest':
        status = PostReducer?.status;
        break;
      case 'post/updateProfileSuccess':
        status = PostReducer?.status;
        navigation.goBack();
        break;
    }
  }
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }
  useEffect(() => {
    setCharges(
      !isEmpty(PostReducer?.profileData?.charges)
        ? String(PostReducer?.profileData?.charges)
        : '',
    );
    setName(PostReducer?.profileData?.name);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
      />
      <Header isMenuPresent={false} navigation={navigation} text={'Back'} />
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
                color: '#000',
                fontSize: normalize(15),
                fontWeight: '600',
              }}>
              Personal Details
            </Text>
          </View>
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Name
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
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
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
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              placeHolderText=""
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={
                !isEmpty(PostReducer?.profileData?.enrolment_id)
                  ? String(PostReducer?.profileData?.enrolment_id)
                  : ''
              }
              selectBox={true}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                console.log(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Contact Number
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
              placeHolderText=""
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={String(PostReducer?.profileData?.mobile_number)}
              selectBox={true}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                console.log(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Email
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
              placeHolderText=""
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={
                !isEmpty(PostReducer?.profileData?.email)
                  ? String(PostReducer?.profileData?.email)
                  : ''
              }
              selectBox={true}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                console.log(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Charges
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
              placeHolderText="Enter charges per consultancy"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={charges}
              onChangingText={item => {
                setCharges(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(20), width: '90%'}}>
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
                } else if (charges == '') {
                  ToastMessage('Charges required');
                } else {
                  //
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        updateProfileRequest({
                          name: name,
                          charges: charges,
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

export default PersonalInformation;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
