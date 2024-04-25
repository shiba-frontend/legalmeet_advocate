import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import Header from '../../utils/helpers/Header';
import normalize from '../../utils/helpers/normalize';
import {
  assignServiceRequest,
  myServiceDetailRequest,
  myServiceDocumentDeleteRequest,
  servicePartPaymentRequest,
  servicePartPaymentSaveRequest,
  servicePaymentRequest,
} from '../../redux/reducer/PostReducer';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import InputText from '../../components/InputText';
import {ToastMessage} from '../../utils/helpers/Toast';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
var status = '';
const MyServiceDetails = ({navigation, route}) => {
  const [paymentItem, setPaymentItem] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) {
      return true;
    }
    return false;
  }
  const [options, setOptions] = useState(['Document', 'Payment']);
  const [selectOption, setSelectOption] = useState('Document');
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/myServiceDocumentDeleteRequest':
        status = PostReducer?.status;
        break;
      case 'post/myServiceDocumentDeleteSuccess':
        IsInternetConnected()
          .then(() => {
            dispatch(
              myServiceDetailRequest({
                appointment_id: route?.params?.item?.id,
              }),
            );
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        status = PostReducer?.status;
        break;
      case 'post/servicePartPaymentRequest':
        status = PostReducer?.status;
        break;
      case 'post/servicePartPaymentSuccess':
        status = PostReducer?.status;
        if (PostReducer?.consultNowPaymentData?.order_id != '') {
          ToastMessage('Order Created successfully');
          var options1 = {
            description: 'Credits towards consultation',
            // image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: PostReducer?.allKeys?.razorpay_key_id, // Your api key
            order_id: PostReducer?.paymentRequestData?.order_id,
            amount: PostReducer?.paymentRequestData?.amount_in_paisa,
            // name: 'foo',
            prefill: {
              email: PostReducer?.profileData?.email,
              contact: PostReducer?.profileData?.mobile_number,
              name: PostReducer?.profileData?.name,
            },
            theme: {color: COLORS?.themeColor},
          };
          console.log(options1);
          RazorpayCheckout.open(options1)
            .then(data => {
              console.log(data);
              //servicePaymentDataRequest
              IsInternetConnected()
                .then(() => {
                  console.log('AAAAAAAA');
                  dispatch(
                    servicePartPaymentSaveRequest({
                      service_payment_id: paymentItem?.id,
                      order_id: PostReducer?.paymentRequestData?.order_id,
                      status: 1,
                    }),
                  );
                })
                .catch(() => {
                  ToastMessage('Network connection error for consult now');
                });
            })
            .catch(err => {});
        } else {
          ToastMessage('Thanks for consultant, we will contact soon');
          navigation?.pop(2);
        }
        break;
      case 'post/servicePartPaymentSaveRequest':
        status = PostReducer?.status;
        break;
      case 'post/servicePartPaymentSAveSuccess':
        IsInternetConnected()
          .then(() => {
            dispatch(
              myServiceDetailRequest({
                appointment_id: route?.params?.item?.id,
              }),
            );
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        status = PostReducer?.status;
        break;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      IsInternetConnected()
        .then(() => {
          dispatch(
            myServiceDetailRequest({
              appointment_id: route?.params?.item?.id,
            }),
          );
        })
        .catch(() => {
          ToastMessage('Network connection issue');
        });
    }, []),
  );
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={route?.params?.item?.title}
      />

      <ScrollView contentContainerStyle={{}}>
        <View
          style={{
            marginHorizontal: normalize(10),
            marginVertical: normalize(20),
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: normalize(14),
              fontWeight: 600,
              color: '#211F20',
              marginBottom: normalize(3),
            }}>
            {route?.params?.item?.title}
          </Text>
          <Text
            style={{
              fontSize: normalize(14),
              fontWeight: 400,
              color: '#666',
            }}>
            ₹ {route?.params?.item?.price}/-
          </Text>

          <Text
            style={{
              color:
                String(route?.params?.item?.payment_status) == '1'
                  ? 'green'
                  : COLORS?.red,
              fontWeight: '600',
              fontSize: normalize(12),
            }}>
            <Text style={{fontWeight: '500', color: '#000'}}>Status :</Text>{' '}
            {String(route?.params?.item?.payment_status) == '1'
              ? 'Paid'
              : 'Pending'}
          </Text>

          {/* {route?.params?.item?.payment_status == 3 ? (
            <View style={{marginVertical: normalize(10)}}>
              

              {route?.params?.item?.status != 1 &&
              (route?.params?.item?.payment_status == 1 ||
                route?.params?.item?.payment_status == 3) ? (
                <Text
                  style={{
                    color: '#FFF',
                    fontWeight: '600',
                    fontSize: normalize(16),
                  }}>
                  ₹{route?.params?.item?.price}/-
                </Text>
              ) : route?.params?.item?.payment_status != 1 ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS?.themeColor,
                    padding: normalize(10),
                    borderRadius: normalize(6),
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flex: 1,
                    width: normalize(100),
                  }}
                  onPress={() => {
                    setPaymentItem(route?.params?.item);
                    console.log('Calling here');
                    IsInternetConnected()
                      .then(() => {
                        dispatch(
                          servicePaymentRequest({
                            appointment_id: route?.params?.item?.id,
                          }),
                        );
                      })
                      .catch(() => {
                        Toast('Network connection error');
                      });
                  }}>
                  <Text style={{color: COLORS?.WHITE}}>Pay Now</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null} */}
          <FlatList
            data={options}
            style={{marginBottom: normalize(10)}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    minWidth: Dimensions.get('screen').width / 2,
                    alignItems: 'center',
                    paddingVertical: normalize(10),
                    borderBottomWidth:
                      item != selectOption ? normalize(0) : normalize(3),
                    borderBottomColor: COLORS.STATUS_BAR,
                  }}
                  onPress={() => {
                    setSelectOption(item);
                  }}>
                  <Text
                    style={{
                      color: item != selectOption ? '#000' : COLORS.themeColor,
                      fontSize: normalize(14),
                      fontWeight: '800',
                      padding: normalize(4),
                      textAlign: 'center',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          {selectOption == 'Document' ? (
            <View>
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS?.themeColor,
                    padding: normalize(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: normalize(10),
                    marginBottom: normalize(5),
                    borderRadius: normalize(7),
                    marginTop: normalize(10),
                  }}
                  onPress={() => {
                    if (route?.params?.item?.payment_status != 3)
                      navigation.navigate('addDocumentService', {
                        id: route?.params?.item?.id,
                      });
                    else {
                      ToastMessage(
                        'Please complete payment befor adding documents',
                      );
                    }
                  }}>
                  <Text style={{color: '#fff', fontSize: normalize(14)}}>
                    Add Document
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  data={
                    PostReducer?.myServiceDetail?.document_for_admin_or_advocate
                  }
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          backgroundColor: '#002D5233',
                          padding: normalize(7),
                          marginVertical: normalize(5),
                          borderRadius: normalize(10),
                          borderWidth: 1,
                          borderStyle: 'dashed',
                          borderColor: '#002D5233',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View style={{flex: 2}}>
                          <Text
                            style={{
                              color: '#222',
                              fontWeight: '600',
                              fontSize: normalize(13),
                            }}>
                            {item?.document_name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'flex-end',
                          }}>
                          <TouchableOpacity
                            style={{
                              width: normalize(30),
                              height: normalize(30),
                              backgroundColor: '#FE1C321A',
                              borderRadius: normalize(3),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              IsInternetConnected()
                                .then(() => {
                                  dispatch(
                                    myServiceDocumentDeleteRequest({
                                      appointment_document_id: item?.id,
                                    }),
                                  );
                                })
                                .catch(() => {
                                  ToastMessage('Network connection issue');
                                });
                            }}>
                            <Image
                              source={ICON?.trash}
                              style={{
                                height: normalize(15),
                                width: normalize(15),
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={{
                              width: normalize(30),
                              height: normalize(30),
                              backgroundColor: '#35A4431A',
                              borderRadius: normalize(3),
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: normalize(5),
                            }}
                            onPress={() => {
                              Linking.openURL(item?.file);
                            }}>
                            <Image
                              source={ICON.import}
                              style={{
                                height: normalize(15),
                                width: normalize(15),
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
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
                          style={{
                            color: COLORS?.themeColor,
                            fontSize: normalize(11),
                          }}>
                          No Data Found
                        </Text>
                      </View>
                    );
                  }}
                />

                {/* <View
              style={{
                backgroundColor: '#002D5233',
                padding: normalize(7),
                marginVertical: normalize(5),
                borderRadius: normalize(10),
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#002D5233',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flex: 2}}>
                <Text
                  style={{
                    color: '#222',
                    fontWeight: '600',
                    fontSize: normalize(13),
                  }}>
                  Pan Card
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  style={{
                    width: normalize(30),
                    height: normalize(30),
                    backgroundColor: '#FE1C321A',
                    borderRadius: normalize(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={ICON?.trash}
                    style={{height: normalize(15), width: normalize(15)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    width: normalize(30),
                    height: normalize(30),
                    backgroundColor: '#35A4431A',
                    borderRadius: normalize(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: normalize(5),
                  }}
                  onPress={() => {
                    Linking.openURL('');
                  }}>
                  <Image
                    source={ICON.import}
                    style={{height: normalize(15), width: normalize(15)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View> */}
              </View>
            </View>
          ) : null}
          {selectOption == 'Payment' ? (
            <View style={{}}>
              <FlatList
                data={PostReducer?.myServiceDetail?.payment}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#EEE',
                        borderWidth: normalize(1),
                        borderColor: COLORS?.ASH,
                        borderRadius: normalize(2),
                        padding: normalize(10),
                        alignItems: 'center',
                        marginBottom: normalize(10),
                      }}>
                      <View style={{width: '75%'}}>
                        <Text
                          style={{fontWeight: '800', fontSize: normalize(12)}}>
                          {item?.title}
                        </Text>
                        {!isEmpty(item?.description) ? (
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: normalize(9),
                              color: '#666',
                            }}>
                            {item?.description}
                          </Text>
                        ) : null}

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: normalize(5),
                            marginTop: normalize(7),
                          }}>
                          <Image
                            source={ICON?.calendar_s}
                            style={{
                              height: normalize(15),
                              width: normalize(15),
                            }}
                            resizeMode="contain"
                          />
                          <Text>
                            {moment(item?.created_at).format('DD MMM, YYYY')}
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(8),
                              color: item?.is_paid == 1 ? 'green' : 'red',
                            }}>
                            {item?.is_paid == 1
                              ? 'Paid'
                              : 'Waiting for payment'}
                          </Text>
                        </View>
                      </View>
                      <View style={{width: '25%', marginLeft: 'auto'}}>
                        <Text style={{textAlign: 'right'}}>
                          ₹ {item?.price}
                        </Text>
                        {item?.is_paid == 2 ? (
                          <TouchableOpacity
                            style={{
                              backgroundColor: COLORS?.themeColor,
                              paddingVertical: normalize(5),
                              paddingHorizontal: normalize(4),
                              borderRadius: normalize(4),
                              marginTop: normalize(6),
                            }}
                            onPress={() => {
                              setPaymentItem(item);
                              IsInternetConnected()
                                .then(() => {
                                  dispatch(
                                    servicePartPaymentRequest({
                                      service_payment_id: item?.id,
                                    }),
                                  );
                                })
                                .catch(() => {
                                  ToastMessage('Network connection issue');
                                });
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: COLORS?.WHITE,
                                fontSize: normalize(12),
                              }}>
                              Pay now
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
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
                        style={{
                          color: COLORS?.themeColor,
                          fontSize: normalize(11),
                        }}>
                        No Data Found
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
      {!isEmpty(PostReducer?.myServiceDetail?.document_for_client) ? (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS?.themeColor,
              padding: normalize(10),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: normalize(10),
            }}
            onPress={() => {
              Linking.openURL(
                PostReducer?.myServiceDetail?.document_for_client?.file,
              );
            }}>
            <Text style={{color: '#fff', fontSize: normalize(14)}}>
              Download Certification
            </Text>
            <Image
              source={ICON?.import}
              style={{
                height: normalize(24),
                width: normalize(24),
                tintColor: '#fff',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default MyServiceDetails;
