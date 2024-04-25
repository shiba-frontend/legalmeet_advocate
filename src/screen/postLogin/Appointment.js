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
import React, {useEffect, useState, useMemo} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
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
import moment from 'moment';
import * as Progress from 'react-native-progress';
import {
  allApiKeyRequest,
  caseDeleteRequest,
  caseDetailRequest,
  caseListRequest,
  clientListRequest,
  doSubscriptionRequest,
  getProfileRequest,
  memberListRequest,
  memberShipPlansRequest,
  paymentResponseSaveRequest,
  subscriptionAddRequest,
  subscriptionPaymentRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
var status = '';
const Appointment = ({navigation}) => {
  const dispatch = useDispatch();
  const PostReducer = useSelector(state => state.PostReducer);
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }
  const myBills = [
    {
      name: 'FSSAI Registration',
      status: true,
      amount: '2000',
    },
    {
      name: 'FSSAI Registration',
      status: false,
    },
    {
      name: 'FSSAI Registration',
      status: false,
    },
    {
      name: 'FSSAI Registration',
      status: false,
    },
    {
      name: 'FSSAI Registration',
      status: false,
    },
    {
      name: 'FSSAI Registration',
      status: false,
    },
  ];
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        //label: 'Option 1',
        value: 'option1',
        color: '#fff',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState();
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
          order_id: PostReducer?.subscriptionData?.order_id,
          amount: PostReducer?.subscriptionData?.amount_in_paisa,
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
                var data = {
                  subscription_id:
                    PostReducer?.subscriptionData?.subscription_id,
                  order_id: PostReducer?.subscriptionData?.order_id,
                  status: 1,
                };
                console.log(data);
                dispatch(subscriptionPaymentRequest(data));
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
      // case 'post/paymentResponseSaveRequest':
      //   status = PostReducer?.status;
      //   break;
      // case 'post/paymentResponseSaveSuccess':
      //   status = PostReducer?.status;
      //   // dispatch(getProfileRequest());
      //   break;
    }
  }
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(memberShipPlansRequest());
        dispatch(allApiKeyRequest());
        // dispatch(getProfileRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);

  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/doSubscriptionRequest':
        status = PostReducer?.status;
        break;
      case 'post/doSubscriptionSuccess':
        status = PostReducer?.status;
        var options = {
          description: 'Credits towards consultation',
          // image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: PostReducer?.allKeys?.razorpay_key_id, // Your api key
          order_id: PostReducer?.subscriptionData?.order_id,
          amount: PostReducer?.subscriptionData?.amount_in_paisa,
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
                  paymentResponseSaveRequest({
                    membership_id: selectedId?.id,
                    order_id: PostReducer?.subscriptionData?.order_id,
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
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      style={{
        flex: 1,
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Subscription'}
      />
      <Loader visible={PostReducer.loading} />
      {/* ------------- Get Appointment ------------- */}
      <Text
        style={{
          //marginTop: normalize(5),
          color: COLORS.themeColor,
          fontWeight: '800',
          fontSize: normalize(16),
          paddingLeft: normalize(10),
          marginTop: normalize(16),
          marginBottom: normalize(16),
        }}>
        Select a Plan
      </Text>
      <FlatList
        data={PostReducer?.memberShipPlans}
        renderItem={({item, index}) => {
          return (
            <>
              <View
                style={{
                  borderWidth: normalize(1),
                  borderColor: '#ccc',
                  padding: normalize(10),
                  borderRadius: normalize(5),
                  marginHorizontal: normalize(10),
                  marginBottom: normalize(13),
                }}>
                <Text
                  style={{
                    color: COLORS.themeColor,
                    fontSize: normalize(14),
                    textTransform: 'uppercase',
                    marginBottom: normalize(12),
                  }}>
                  {item?.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: normalize(5),
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: normalize(15),
                      fontWeight: '800',
                    }}>
                    Rs. {item?.price}{' '}
                  </Text>
                  <Text
                    style={{
                      textDecorationLine: 'line-through',
                      color: COLORS?.red,
                      fontSize: normalize(12),
                    }}>
                    Rs. {item?.mrp}{' '}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#000',
                    fontSize: normalize(12),
                    fontWeight: '400',
                    marginBottom: normalize(10),
                  }}>
                  {item?.duration} Days
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: normalize(10),
                  }}>
                  {' '}
                  {item?.description}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.themeColor,
                    borderRadius: normalize(6),
                    paddingVertical: normalize(10),
                    marginTop: normalize(15),
                  }}
                  onPress={() => {
                    IsInternetConnected()
                      .then(() => {
                        dispatch(
                          subscriptionAddRequest({
                            subscription_id: item?.id,
                          }),
                        );
                      })
                      .catch(() => {
                        ToastMessage('Network connection issue');
                      });
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      textAlign: 'center',
                      letterSpacing: normalize(1),
                    }}>
                    BUY NOW
                  </Text>
                </TouchableOpacity>
                {PostReducer?.profileData?.subscription_details
                  ?.subscription_id == item?.id ? (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: COLORS?.red,
                      right: normalize(10),
                      paddingHorizontal: normalize(7),
                      paddingVertical: normalize(2),
                      top: normalize(10),
                      borderRadius: normalize(3),
                    }}>
                    <Text style={{color: COLORS?.WHITE}}>Active</Text>
                  </View>
                ) : null}
              </View>
            </>
          );
        }}
      />
      {/* <View
        style={{
          marginTop: 30,
          width: (Dimensions.get('screen').width / 10) * 9,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS?.themeColor,
            padding: 18,
            alignItems: 'center',
            borderRadius: 8,
          }}
          onPress={() => {
            if (selectedId == '') {
              ToastMessage('Please select a plan first');
            } else {
              IsInternetConnected()
                .then(() => {
                  dispatch(
                    doSubscriptionRequest({
                      membership_id: selectedId?.id,
                    }),
                  );
                })
                .catch(() => {
                  ToastMessage('Network connection issue');
                });
            }
            // IsInternetConnected()
            //   .then(() => {
            //     dispatch(
            //       doSubscriptionRequest({
            //         membership_id: selectedId?.id,
            //       }),
            //     );
            //   })
            //   .catch(() => {
            //     ToastMessage('Network connection issue');
            //   });
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
            }}>
            CONTINUE
          </Text>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: '#B3B3B3',
            }}>
            *No credit card required
          </Text>
        </View>
      </View> */}
    </ScrollView>
  );
};

export default Appointment;
