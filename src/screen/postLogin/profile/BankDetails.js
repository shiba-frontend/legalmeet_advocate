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
const BankDetails = ({navigation}) => {
  const [barCouncil, setBarCouncil] = useState('');
  const [area, setArea] = useState('');

  const [specialized, setSpecialized] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscNumber, setIfscNumber] = useState('');
  const [name, setName] = useState('');
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
  useEffect(() => {
    setBankName(PostReducer?.profileData?.bank_name);
    setBranchName(PostReducer?.profileData?.bank_branch);
    setName(PostReducer?.profileData?.bank_account_holder_name);
    setAccountNumber(PostReducer?.profileData?.bank_account_number);
    setIfscNumber(PostReducer?.profileData?.bank_account_number);
  }, []);
  function isEmpty(item) {
    if (item == '' || item == undefined || item == null) return true;
    return false;
  }
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
              Bank Details
            </Text>
          </View>
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Bank Name
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
              placeHolderText="Enter Bank Name"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={bankName}
              onChangingText={item => {
                setBankName(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Branch Name
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
              placeHolderText="Enter branch name"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={branchName}
              onChangingText={item => {
                setBranchName(item);
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
              Account Number
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
              placeHolderText="Enter Account Number"
              beforeIcon={''}
              keyboardType={'numeric'}
              // maxLength={10}
              value={accountNumber}
              onChangingText={item => {
                setAccountNumber(item);
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
              IFSC Number
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
              placeHolderText="Enter IFSC Code"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={ifscNumber}
              onChangingText={item => {
                setIfscNumber(item);
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
              Account holder name
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
              placeHolderText="Enter Specialized"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={name}
              onChangingText={item => {
                setName(item);
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
                if (isEmpty(accountNumber)) {
                  ToastMessage('Account number required');
                } else if (isEmpty(name)) {
                  ToastMessage('Account holder name required');
                } else if (isEmpty(ifscNumber)) {
                  ToastMessage('IFSC number required');
                } else if (isEmpty(bankName)) {
                  ToastMessage('Bank name required');
                } else if (isEmpty(branchName)) {
                  ToastMessage('Bank Branch required');
                } else {
                  //
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        updateProfileRequest({
                          bank_account_number: accountNumber,
                          bank_account_holder_name: name,
                          bank_ifsc_code: ifscNumber,
                          bank_branch: branchName,
                          bank_name: name,
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

export default BankDetails;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
