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
  Alert,
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
import Header from '../../utils/helpers/Header';
import RazorpayCheckout from 'react-native-razorpay';
import moment from 'moment';

import * as Progress from 'react-native-progress';
import {
  caseDetailRequest,
  caseListRequest,
  clientListRequest,
  memberDeleteRequest,
  memberListRequest,
  subscriptionAddRequest,
  subscriptionRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
var status = '';
const Subscription = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [choosePlan, setChoosePlan] = useState('');

  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/subscriptionAddRequest':
        status = PostReducer?.status;
        break;
      case 'post/subscriptionAddSuccess':
        status = PostReducer?.status;
        var options = {
          description: 'Credits towards consultation',
          // image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: PostReducer?.allKeys?.razorpay_key_id, // Your api key
          order_id: PostReducer?.consultNowPaymentData?.order_id,
          amount: PostReducer?.consultNowPaymentData?.amount_in_paisa,
          // name: 'foo',
          prefill: {
            email: PostReducer?.profileData?.email,
            contact: PostReducer?.profileData?.mobile_number,
            name: PostReducer?.profileData?.name,
          },
          theme: {color: COLORS?.themeColor},
        };
        console.log(options);
        RazorpayCheckout.open(options)
          .then(data => {
            console.log(data);
            //servicePaymentDataRequest
            IsInternetConnected()
              .then(() => {
                console.log('AAAAAAAA');
                dispatch(
                  consultNowDataRequest({
                    consult_id: PostReducer?.consultNowPaymentData?.consult_id,
                    order_id: PostReducer?.consultNowPaymentData?.order_id,
                    status: 1,
                  }),
                );
              })
              .catch(() => {
                ToastMessage('Network connection error for consult now');
              });
          })
          .catch(err => {});
        break;
      case 'post/subscriptionAddFailure':
        status = PostReducer?.status;
        break;
      case 'post/consultNowDataSuccess':
        status = PostReducer?.status;
        ToastMessage('Subscription purchased successfuly');
        break;
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      setChoosePlan(PostReducer?.profileData?.subscription_details);
      IsInternetConnected()
        .then(() => {
          dispatch(subscriptionRequest());
        })
        .catch(() => {
          ToastMessage('Network connection issue');
        });
    }, []),
  );
  useEffect(() => {}, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Subscription'}
      />
      <Loader visible={PostReducer.loading} />
      <View
        style={{
          width: Dimensions.get('screen').width - 20,
          alignSelf: 'center',
          marginTop: normalize(10),
        }}>
        <FlatList
          data={PostReducer?.subscription}
          style={{marginBottom: normalize(100)}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  padding: normalize(10),
                  borderWidth: normalize(1),
                  marginTop: normalize(10),
                  borderRadius: normalize(10),
                  borderColor: COLORS.themeColor,
                  backgroundColor:
                    choosePlan?.id == item?.id ? '#EFEFEF' : 'FFF',
                }}
                onPress={() => {
                  setChoosePlan(item);
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        subscriptionAddRequest({subscription_id: item?.id}),
                      );
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                  // navigation.navigate('AddMember', {item: item});
                }}>
                <View
                  style={
                    {
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                      // alignItems: 'center',
                    }
                  }>
                  <View
                    style={{
                      marginTop: normalize(4),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        textTransform: 'capitalize',
                        fontWeight: '800',
                        fontSize: normalize(14),
                        color: COLORS.themeColor,
                      }}
                      numberOfLines={1}>
                      {item?.title}
                    </Text>
                    <View
                      style={{
                        paddingHorizontal: normalize(10),
                        paddingVertical: normalize(4),
                        borderWidth: normalize(1),
                        borderColor: '#1db066',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: normalize(20),
                        backgroundColor: '#1db066',
                      }}>
                      <Text
                        style={{
                          marginLeft: normalize(10),
                          textTransform: 'capitalize',
                          fontWeight: '600',
                          fontSize: normalize(12),
                          color: '#FFF',
                          // textAlign: 'center',
                        }}
                        numberOfLines={1}>
                        ₹ {item?.price}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: normalize(4),
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        textTransform: 'capitalize',
                        fontWeight: '800',
                        fontSize: normalize(14),
                        // color: COLORS.themeColor,
                      }}
                      numberOfLines={1}>
                      MRP:₹ {item?.mrp}
                    </Text>
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        textTransform: 'capitalize',
                        fontWeight: '600',
                        fontSize: normalize(12),
                        color: '#872dff',
                      }}
                      numberOfLines={1}>
                      Duration: {item?.duration} days
                    </Text>
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        textTransform: 'capitalize',
                        fontWeight: '600',
                        fontSize: normalize(12),
                        // color: '#1db066',
                      }}
                      numberOfLines={1}>
                      {item?.discount}% off
                    </Text>
                  </View>
                  {/* <Text
                        style={{
                          marginLeft: normalize(10),
                          textTransform: 'capitalize',
                          fontWeight: '500',
                          fontSize: normalize(8),
                          color: '#000',
                          
                          // textAlign: 'center',
                        }}
                        numberOfLines={1}>
                        
                      </Text> */}
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height / 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={IMAGE?.no_data}
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 1.5,
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
