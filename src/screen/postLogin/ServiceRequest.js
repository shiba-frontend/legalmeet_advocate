import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import Header from '../../utils/helpers/Header';
import normalize from '../../utils/helpers/normalize';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  serviceAppointmentListRequest,
  serviceListRequest,
  servicePaymentDataRequest,
  servicePaymentRequest,
} from '../../redux/reducer/PostReducer';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {ToastMessage} from '../../utils/helpers/Toast';
import RazorpayCheckout from 'react-native-razorpay';
var status = '';
const ServiceRequest = ({navigation}) => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [paymentItem, setPaymentItem] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(serviceAppointmentListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/servicePaymentRequest':
        status = PostReducer?.status;
        break;
      case 'post/servicePaymentSuccess':
        status = PostReducer?.status;
        var options = {
          description: 'Credits towards consultation',
          // image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: PostReducer?.allKeys?.razorpay_key_id, // Your api key
          order_id: PostReducer?.servicePaymentData?.order_id,
          amount: PostReducer?.servicePaymentData?.amount_in_paisa,
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
                dispatch(
                  servicePaymentDataRequest({
                    appointment_id: paymentItem?.id,
                    ...PostReducer?.servicePaymentData,
                    status: 1,
                  }),
                );
              })
              .catch(() => {
                ToastMessage('Network connection error');
              });
          })
          .catch(err => {});
        break;
    }
  }
  return (
    <ScrollView>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Requested service list'}
      />
      <View
        style={{
          paddingTop: normalize(22),
        }}>
        <FlatList
          data={PostReducer?.serviceAppointments}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MyServiceDetails', {item: item})
                }>
                <View
                  style={{
                    backgroundColor: '#F5F7F8',
                    borderRadius: normalize(8),
                    marginBottom: normalize(10),
                    borderWidth: normalize(1),
                    borderColor: 'rgba(0, 45, 82, 0.2)',
                    paddingVertical: normalize(8),
                    paddingHorizontal: normalize(8),
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginEnd: normalize(10),
                    marginStart: normalize(10),
                    width: Dimensions?.get('window')?.width - 30,
                  }}>
                    <View style={{
                      width:'90%'
                    }}>


                
                    <Text
                      numberOfLines={2}
                      style={{
                        color: '#000',
                        fontWeight: '600',
                        fontSize: normalize(14),
                        width: '80%',
                      }}>
                      {item?.title}
                    </Text>
                    <Text
                          style={{
                            color: '#000',
                            fontWeight: '400',
                            fontSize: normalize(12),
                          }}>
                          Rs. {item?.price}/-
                        </Text>
                    <Text
                      style={{
                        color: '#666',
                        fontSize: normalize(10),
                      }}>
                      {item?.note}
                    </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                    
                      {/* {item?.status != 1 &&
                      (item?.payment_status == 1 ||
                        item?.payment_status == 3) ? (
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '600',
                            fontSize: normalize(16),
                          }}>
                          ₹{item?.price}/-
                        </Text>
                      ) : item?.status != 1 ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: COLORS?.themeColor,
                            padding: normalize(5),
                            borderRadius: normalize(6),
                          }}
                          onPress={() => {
                            setPaymentItem(item);
                            IsInternetConnected()
                              .then(() => {
                                dispatch(
                                  servicePaymentRequest({
                                    appointment_id: item?.id,
                                  }),
                                );
                              })
                              .catch(() => {
                                Toast('Network connection error');
                              });
                            
                          }}>
                          <Text style={{color: COLORS?.WHITE}}>
                            Pay Now (₹{item?.price}/-)
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <Text
                          style={{
                            color: COLORS?.red,
                            fontWeight: '600',
                            fontSize: normalize(12),
                          }}>
                          View Details
                        </Text>
                      )} */}
                    
                    </View>
                      <View style={{
                        width:'10%',
                        justifyContent:'flex-end',
                        alignItems:'flex-end'
                      }}>
                      <Image
                            source={ICON.back}
                            style={{
                              height: normalize(18),
                              width: normalize(18),
                              transform: [{rotate: '180deg'}],
                            }}
                            resizeMode="contain"
                          />
                      </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: Dimensions?.get('window')?.height / 1.6,
                  width: Dimensions?.get('window')?.width / 1.1,
                }}>
                <Image
                  source={IMAGE?.no_data}
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 10,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{color: COLORS?.themeColor, fontSize: normalize(11)}}>
                  No Data Found
                </Text>
              </View>
            );
          }}
        />

        {/* <Text
          style={{
            //marginTop: normalize(5),
            color: COLORS.themeColor,
            fontWeight: '800',
            fontSize: normalize(16),
            paddingLeft: normalize(10),
            marginBottom: normalize(10),
            marginTop: normalize(12),
          }}>
          My Services
        </Text> */}
        {/* <View
          style={{
            backgroundColor: 'rgba(53, 164, 67, 0.1)',
            marginRight: normalize(10),
            marginLeft: normalize(10),
            borderRadius: normalize(8),
            marginBottom: normalize(12),
            borderWidth: normalize(1),
            borderColor: 'rgba(53, 164, 67, 1)',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(8),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: COLORS?.themeColor,
                fontSize: normalize(14),
                fontWeight: '600',
                marginBottom: normalize(2),
              }}>
              FSSAI Registration
            </Text>
            <Text
              style={{
                color: '#5B5B5B',
              }}>
              Registration Date - 10-12-2023
            </Text>
            <Text
              style={{
                color: '#5B5B5B',
              }}>
              Expiry Date - 10-12-2024
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(10),
              }}>
              Status
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(14),
                color: 'rgba(53, 164, 67, 1)',
              }}>
              Active
            </Text>
          </View>
        </View> */}
        {/* -------Expired ------------ */}
        {/* <View
          style={{
            backgroundColor: 'rgba(254, 28, 50, 0.1)',
            marginRight: normalize(10),
            marginLeft: normalize(10),
            borderRadius: normalize(8),
            marginBottom: normalize(12),
            borderWidth: normalize(1),
            borderColor: 'rgba(254, 28, 50, 1)',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(8),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: COLORS?.themeColor,
                fontSize: normalize(14),
                fontWeight: '600',
                marginBottom: normalize(10),
              }}>
              FSSAI Registration
            </Text>
            <Text
              style={{
                color: '#fff',
                backgroundColor: COLORS?.themeColor,
                padding: normalize(6),
                fontSize: normalize(12),
                borderRadius: 4,
                textAlign: 'center',
                width: (Dimensions.get('screen').width / 10) * 3,
              }}>
              Renew Now
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(10),
              }}>
              Status
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(14),
                color: 'rgba(254, 28, 50, 1)',
              }}>
              Expired
            </Text>
          </View>
        </View> */}
        {/* -------Expired ------------ */}
        {/* <View
          style={{
            backgroundColor: 'rgba(243, 189, 40, 0.1)',
            marginRight: normalize(10),
            marginLeft: normalize(10),
            borderRadius: normalize(8),
            marginBottom: normalize(12),
            borderWidth: normalize(1),
            borderColor: 'rgba(243, 189, 40, 1)',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(8),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: COLORS?.themeColor,
                fontSize: normalize(14),
                fontWeight: '600',
                marginBottom: normalize(10),
              }}>
              FSSAI Registration
            </Text>
            <Text
              style={{
                color: '#fff',
                backgroundColor: COLORS?.themeColor,
                padding: normalize(6),
                fontSize: normalize(12),
                borderRadius: 4,
                textAlign: 'center',
                width: (Dimensions.get('screen').width / 10) * 3,
              }}>
              Renew Now
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(10),
              }}>
              Status
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(14),
                color: 'rgba(243, 189, 40, 1)',
              }}>
              Expire Soon
            </Text>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default ServiceRequest;

const styles = StyleSheet.create({});
