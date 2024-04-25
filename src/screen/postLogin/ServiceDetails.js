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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import Header from '../../utils/helpers/Header';
import normalize from '../../utils/helpers/normalize';
import {
  assignServiceRequest,
  ratingReviewRequest,
  serviceDetailRequest,
  servicePaymentDataRequest,
  servicePaymentRequest,
} from '../../redux/reducer/PostReducer';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import InputText from '../../components/InputText';
import {ToastMessage} from '../../utils/helpers/Toast';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {goBack, navigate} from '../../utils/helpers/RootNavigation';
import RazorpayCheckout from 'react-native-razorpay';


var status = '';
const ServiceDetails = ({navigation, route}) => {
  const [chooseOption, setChooseOption] = useState('Details');
  const [openModal, setOpenModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewPoint, setReviewPoint] = useState(0);
  const [reviews, setReviews] = useState('');
  const reviewPoints = [1, 2, 3, 4, 5];
  const starCreationArray = [1, 2, 3, 4, 5];
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [openratingModal, setopenratingModal] = useState(false);
  const [appointmentDateFlag, setAppointmentDateFlag] = useState(false);
  const [myFavourite, setMyFavourite] = useState(
    route?.params?.item?.is_favourite,
  );
  const [appointmentFor, setAppointmentFor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [paymentOption, setPaymentOption] = useState(false);
  const dispatch = useDispatch();
  const PostReducer = useSelector(state => state.PostReducer);
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/assignServiceRequest':
        status = PostReducer?.status;
        break;
      case 'post/assignServiceSuccess':
        status = PostReducer?.status;
        if (paymentOption) {
          dispatch(
            servicePaymentRequest({
              appointment_id: PostReducer?.serviceResponse?.id,
            }),
          );
        } else {
          navigate('ServiceRequest');
        }
        //
        // var options = {
        //   description: 'Credits towards consultation',
        //   // image: 'https://i.imgur.com/3g7nmJC.png',
        //   currency: 'INR',
        //   key: PostReducer?.allKeys?.razorpay_key_id, // Your api key
        //   order_id: props?.route?.params?.item?.transaction_id,
        //   amount: Number(props?.route?.params?.item?.amount) * 100,
        //   // name: 'foo',
        //   prefill: {
        //     email: PostReducer?.profileData?.email,
        //     contact: PostReducer?.profileData?.mobile_number,
        //     name: PostReducer?.profileData?.name,
        //   },
        //   theme: {color: COLORS?.themeColor},
        // };
        // console.log(options);
        // RazorpayCheckout.open(options)
        //   .then(data => {
        //     console.log(data);
        //     //servicePaymentDataRequest
        //     IsInternetConnected()
        //       .then(() => {
        //         console.log('AAAAAAAA');
        //         dispatch(
        //           servicePaymentDataRequest({
        //             appointment_id: props?.route?.params?.item?.id,
        //             order_id:
        //               props?.route?.params?.item?.transaction_id,
        //             status: 1, // 1- success 2- fail
        //           }),
        //         );
        //       })
        //       .catch(() => {
        //         ToastMessage(
        //           'Network connection error for consult now',
        //         );
        //       });
        //   })
        //   .catch(err => {});
        break;
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
                    appointment_id: PostReducer?.serviceResponse?.id,
                    order_id: PostReducer?.servicePaymentData?.order_id,
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
      case 'post/ratingReviewSuccess':
        status = PostReducer?.status;
        setReviewModalOpen(false);
        IsInternetConnected()
          .then(() => {
            dispatch(
              serviceDetailRequest({
                service_id: route?.params?.item?.id,
              }),
            );
          })
          .catch(() => {
            ToastMessage('Network connection error for consult now');
          });
        break;
    }
  }
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    //
    IsInternetConnected()
      .then(() => {
        dispatch(
          serviceDetailRequest({
            service_id: route?.params?.item?.id,
          }),
        );
      })
      .catch(() => {
        ToastMessage('Network connection error for consult now');
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={route?.params?.item?.title}
      />
      {/* <Modal
        isVisible={openModal}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setOpenModal(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
          }}>
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Request Message
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Type your message"
              beforeIcon={''}
              numberOfLine={5}
              keyboardType={'default'}
              value={subject}
              onChangingText={item => {
                setSubject(item);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: normalize(10),
              marginHorizontal: normalize(18),
              marginVertical: normalize(13),
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS?.themeColor,
                padding: normalize(10),
                borderRadius: normalize(6),
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() => {
                if (isEmpty(subject)) {
                  ToastMessage('Enter note');
                } else {
                  setOpenModal(false);
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        assignServiceRequest({
                          service_id: route?.params?.item?.id,
                          note: subject,
                        }),
                      );
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                  // IsInternetConnected()
                  //   .then(() => {
                  //     dispatch(
                  //       consultNowRequest({
                  //         advocate_id: route?.params?.item?.id,
                  //         subject: subject,
                  //         description: description,
                  //       }),
                  //     );
                  //   })
                  //   .catch(() => {
                  //     ToastMessage('Network connection issue');
                  //   });
                }
              }}>
              <Text style={{color: COLORS?.WHITE}}>Pay Latter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS?.themeColor,
                padding: normalize(10),
                borderRadius: normalize(6),
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text style={{color: COLORS?.WHITE}}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

      <Modal
        isVisible={openModal}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setOpenModal(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <View style={{marginTop: normalize(3), width: '98%'}}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
                }}>
                Enter Subject
              </Text>
              <InputText
                inputStyle={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  borderRadius: 10,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(3),
                  borderColor: COLORS.themeColor,
                  borderWidth: 1,
                }}
                placeHolderText="Enter Subject"
                beforeIcon={''}
                keyboardType={'default'}
                value={subject}
                onChangingText={item => {
                  setSubject(item);
                }}
              />
            </View> */}

            {/* <View style={{marginTop: normalize(3), width: '98%'}}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
                }}>
                Appointment For
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    padding: normalize(5),
                    borderWidth: normalize(1),
                    width: '48%',
                    borderRadius: normalize(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setAppointmentFor('Document review');
                  }}>
                  <Image
                    source={
                      appointmentFor == 'Document review'
                        ? ICON?.radioEnable
                        : ICON?.radioDisable
                    }
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      tintColor: COLORS?.themeColor,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: normalize(11),
                      marginLeft: normalize(10),
                    }}>
                    Document review
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: normalize(5),
                    borderWidth: normalize(1),
                    width: '48%',
                    borderRadius: normalize(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setAppointmentFor('Consultant');
                  }}>
                  <Image
                    source={
                      appointmentFor == 'Consultant'
                        ? ICON?.radioEnable
                        : ICON?.radioDisable
                    }
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      tintColor: COLORS?.themeColor,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: normalize(11),
                      marginLeft: normalize(10),
                    }}>
                    Consultant
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* <View style={{marginTop: normalize(3), width: '98%'}}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
                }}>
                Appoinment Type
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    padding: normalize(5),
                    borderWidth: normalize(1),
                    width: '48%',
                    borderRadius: normalize(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setAppointmentType('Video metting');
                  }}>
                  <Image
                    source={
                      appointmentType == 'Video metting'
                        ? ICON?.radioEnable
                        : ICON?.radioDisable
                    }
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      tintColor: COLORS?.themeColor,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: normalize(11),
                      marginLeft: normalize(10),
                    }}>
                    Video metting
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: normalize(5),
                    borderWidth: normalize(1),
                    width: '48%',
                    borderRadius: normalize(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setAppointmentType('Normal Call');
                  }}>
                  <Image
                    source={
                      appointmentType == 'Normal Call'
                        ? ICON?.radioEnable
                        : ICON?.radioDisable
                    }
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      tintColor: COLORS?.themeColor,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: normalize(11),
                      marginLeft: normalize(10),
                    }}>
                    Normal Call
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* <View style={{marginTop: normalize(0), width: '98%'}}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
                }}>
                Select Appointment Date
              </Text>
              <InputText
                inputStyle={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  borderRadius: 10,
                  paddingLeft: 10,
                  borderColor: COLORS.themeColor,
                  borderWidth: 1,
                }}
                placeHolderText="Select"
                beforeIcon={''}
                keyboardType={'default'}
                afterIcon={ICON.calender}
                selectBox={true}
                value={moment(appointmentDate).format('YYYY-MM-DD')}
                onChangingText={item => {
                  // setYear(item);
                }}
                OnOpenModal={item => {
                  setAppointmentDateFlag(true);
                }}
              />
            </View> */}
            <View
              style={{
                marginTop: normalize(3),
                width: Dimensions?.get('window')?.width - 50,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
                  textAlign: 'left',
                  width: '100%',
                }}>
                Enter Description
              </Text>
              <InputText
                inputStyle={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  borderRadius: 10,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(3),
                  borderColor: COLORS.themeColor,
                  borderWidth: 1,
                }}
                placeHolderText="Enter Description"
                numberOfLine={5}
                beforeIcon={''}
                keyboardType={'default'}
                value={description}
                onChangingText={item => {
                  setDescription(item);
                }}
              />
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS?.themeColor,
                    padding: normalize(10),
                    margin: normalize(10),
                    width: '60%',
                    borderRadius: normalize(6),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    if (isEmpty(description)) {
                      ToastMessage('Enter description');
                    } else {
                      setPaymentOption(false);
                      setOpenModal(false);
                      IsInternetConnected()
                        .then(() => {
                          dispatch(
                            // consultNowRequest({
                            //   advocate_id: route?.params?.item?.id,
                            //   subject: subject,
                            //   description: description,
                            // }),
                            assignServiceRequest({
                              service_id: route?.params?.item?.id,
                              note: description,
                              mode: 'pay_later',
                              // date: moment(appointmentDate).format('YYYY-MM-DD'),
                              // appointment_for:
                              //   appointmentFor == 'Document review' ? 1 : 0, //1 = Document review, 2 = Consultant
                              // appointment_type:
                              //   appointmentType == 'Video meeting' ? 1 : 0, //1 = Video meeting, 2 = Normal Call
                            }),
                          );
                        })
                        .catch(() => {
                          ToastMessage('Network connection issue');
                        });
                    }
                  }}>
                  <Text style={{color: COLORS?.WHITE}}>Book Now</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{
                    backgroundColor: COLORS?.themeColor,
                    padding: normalize(10),
                    margin: normalize(10),
                    width: '45%',
                    borderRadius: normalize(6),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    if (isEmpty(description)) {
                      ToastMessage('Enter description');
                    } else {
                      setPaymentOption(true);
                      setOpenModal(false);
                      IsInternetConnected()
                        .then(() => {
                          dispatch(
                            // consultNowRequest({
                            //   advocate_id: route?.params?.item?.id,
                            //   subject: subject,
                            //   description: description,
                            // }),
                            assignServiceRequest({
                              service_id: route?.params?.item?.id,
                              note: description,
                              mode: 'pay_now',
                              // date: moment(appointmentDate).format('YYYY-MM-DD'),
                              // appointment_for:
                              //   appointmentFor == 'Document review' ? 1 : 0, //1 = Document review, 2 = Consultant
                              // appointment_type:
                              //   appointmentType == 'Video meeting' ? 1 : 0, //1 = Video meeting, 2 = Normal Call
                            }),
                          );
                        })
                        .catch(() => {
                          ToastMessage('Network connection issue');
                        });
                    }
                  }}>
                  <Text style={{color: COLORS?.WHITE}}>Pay Now</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={reviewModalOpen}
        backdropColor={COLORS.black}
        backdropOpacity={0.7}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={300}
        animationOutTiming={500}
        backdropTransitionOutTiming={0}
        avoidKeyboard={true}
        onBackdropPress={() => {
          setReviewModalOpen(false);
        }}
        onBackButtonPress={() => {
          setReviewModalOpen(false);
        }}
        style={{
          margin: 0,
          alignSelf: 'center',
          width: '100%',
        }}>
        <View
          style={{
            height: Dimensions?.get('window').height / 2,
            width: '100%',
            // paddingHorizontal: normalize(18),
            paddingVertical: normalize(20),
            backgroundColor: COLORS.WHITE,
            borderRadius: normalize(5),
            position: 'absolute',
            bottom: normalize(0),
          }}>
          <ScrollView>
            <View style={{paddingLeft: normalize(20)}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: normalize(20),
                }}>
                <Text
                  style={{
                    fontSize: normalize(14),
                    color: COLORS?.black,
                    fontWeight: '800',
                  }}>
                  Put your ratings
                </Text>
              </View>

              <FlatList
                data={reviewPoints}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        marginTop: normalize(10),
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: normalize(10),
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setReviewPoint(index + 1);
                        }}>
                        <Image
                          source={ICON?.rating1}
                          style={{
                            height: normalize(20),
                            width: normalize(20),
                            tintColor:
                              reviewPoint - 1 >= index
                                ? COLORS?.yellow
                                : '#AAAAAA',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
              <Text
                style={{
                  fontSize: normalize(14),
                  color: COLORS?.black,
                  fontWeight: '800',
                  marginTop: normalize(10),
                }}>
                Put your valuable comments
              </Text>
              <View
                style={{
                  borderWidth: normalize(1),
                  borderColor: COLORS?.black,
                  borderRadius: normalize(5),
                  padding: normalize(5),
                  width: '90%',
                  marginTop: normalize(10),
                }}>
                <TextInput
                  value={reviews}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical={'top'}
                  onChangeText={item => {
                    setReviews(item);
                  }}
                  placeholder="Write your comment"
                  placeholderTextColor={COLORS?.black}
                />
              </View>

              <View style={{width: '90%'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS?.themeColor,
                    padding: normalize(10),
                    marginTop: normalize(10),
                    width: '60%',
                    alignSelf: 'center',
                    borderRadius: normalize(10),
                  }}
                  onPress={() => {
                    IsInternetConnected()
                      .then(() => {
                        dispatch(
                          ratingReviewRequest({
                            type: '2', // 1 = advocate, 2 = Service
                            client_service_id: route?.params?.item?.id,
                            ratings: reviewPoint,
                            review: reviews,
                          }),
                        );
                      })
                      .catch(() => {
                        ToastMessage('Network connection issue');
                      });
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(16),
                      color: COLORS?.WHITE,
                      fontWeight: '800',
                      textAlign: 'center',
                    }}>
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={{}}
        style={{marginBottom: normalize(30)}}>
        <View style={{}}>
          <View
            style={{
              marginTop: normalize(20),
              backgroundColor: '#35A4431A' ,
              borderRadius: normalize(8),
              marginBottom: normalize(10),
              paddingVertical: normalize(8),
              paddingHorizontal: normalize(8),
              marginLeft:normalize(10),
              width: Dimensions?.get('window')?.width - 25,
              position:'relative',
              alignItems:'center',
              justifyContent: 'center',
              flex:1
            }}>
            <View
              style={{
                flexDirection: 'row',
                 alignItems: 'center',
                gap: normalize(5),
              }}>
                 <View
                      style={{
                        width: normalize(40),
                        height: normalize(40),
                       // borderWidth: normalize(1),
                        borderRadius: normalize(20),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#74d680' ,
                        // borderColor: index % 2 === 0 ? '#35A443' : '#F3BD28',
                      }}>
                      <Image
                        source={ICON?.receipt_s}
                        style={{
                          height: normalize(30),
                          width: normalize(24),
                          tintColor: '#fff',
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{width: '85%'}}>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: '#000',
                          fontWeight: '600',
                          fontSize: normalize(14),
                          width: '80%',
                        }}>
                        {route?.params?.item?.title}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: '#333',
                          fontWeight: '400',
                          fontSize: normalize(10),
                          width: '95%',
                          marginVertical:normalize(2),
                        }}>
                        Category: <Text style={{
                           fontWeight: '600',
                        }}>{route?.params?.item?.service_category}</Text>
                      </Text>
                      <FlatList
                          numColumns={5}
                          style={{
                            flexGrow: 0,
                            width: '90%',
                          }}
                          data={starCreationArray}
                          renderItem={({item, index}) => {
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  // width: normalize(17),
                                  alignSelf: 'flex-start',
                                }}>
                                <Image
                                  source={ICON?.rating1}
                                  style={{
                                    height: normalize(15),
                                    width: normalize(15),
                                    tintColor:
                                    route?.params?.item?.rating >= index + 1 ? '#f5d103' : '#999',
                                  }}
                                  resizeMode="contain"
                                />
                              </View>
                            );
                          }}
                          />
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '600',
                          fontSize: normalize(14),
                          position:'absolute',
                          right:normalize(12),
                          bottom:0,
                        }}>
                        ₹{route?.params?.item?.price}/-
                      </Text>
                    </View>
             
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#F5F7F8',
              margin: normalize(10),
              padding: normalize(10),
              borderRadius: normalize(10),
              flex: 1,
              flexGrow: 1,
              // height: Dimensions?.get('window')?.height / 1.3,
            }}>
            <Text
              style={{fontWeight: '800'}}
              onPress={() => {
                setChooseOption('Details');
              }}>
              Details
            </Text>

            {chooseOption == 'Details' ? (
              <Text style={{width: '100%', fontSize: normalize(12)}}>
                {route?.params?.item?.description}
              </Text>
            ) : null}
          </View>
        </View>
        <View>
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              marginVertical: normalize(5),
            }}>
            <View style={{padding: normalize(10)}}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(12),
                      color: '#484541',

                      fontWeight: '700',
                    }}>
                    Reviews & Ratings
                  </Text>
                </View>
              </View>
            </View>
            
            <FlatList
              style={{padding: normalize(10)}}
              data={PostReducer?.serviceDetail?.rating_arr}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <View
                      style={{
                        backgroundColor: '#F9F9F9',
                        borderWidth: normalize(1),
                        borderColor: '#D5D5D5',
                        padding: normalize(10),
                        marginBottom: normalize(10),
                        borderRadius: normalize(4)
                      }}>
                     
                      <FlatList
            numColumns={5}
            style={{
              flexGrow: 0,
              width: '90%',
            }}
            data={starCreationArray}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    // width: normalize(17),
                    alignSelf: 'flex-start',
                  }}>
                  <Image
                    source={ICON?.rating1}
                    style={{
                      height: normalize(15),
                      width: normalize(15),
                      tintColor:
                      route?.params?.item?.rating >= index + 1 ? '#f5d103' : '#999',
                    }}
                    resizeMode="contain"
                  />
                </View>
              );
            }}
            />
                 
                      <Text
                        style={{
                          fontSize: normalize(14),
                          color: '#2B2727',
                        }}>
                        {item?.added_by}
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          color: '#8C8581',
                        }}>
                        {item?.review}
                      </Text>
                      <Text
                        style={{
                          position: 'absolute',
                          top: normalize(5),
                          right: normalize(7),
                          fontSize: normalize(12),
                          color: '#7F8E9D',
                        }}>
                        {item?.created_at}
                      </Text>
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
                      height: Dimensions?.get('window')?.height / 8,
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
            {/* <View style={{padding: normalize(10)}}>
              <View
                style={{
                  backgroundColor: '#F9F9F9',
                  borderWidth: normalize(1),
                  borderColor: '#D5D5D5',
                  padding: normalize(10),
                  marginBottom: normalize(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {!isEmpty(route?.params?.item?.rating) ? (
                    <View style={{flexDirection: 'row'}}>
                      {Math.round(Number(route?.params?.item?.rating)) == 5 ? (
                        <Image
                          source={ICON?.rating}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        4 ? (
                        <Image
                          source={ICON?.rating4}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        3 ? (
                        <Image
                          source={ICON?.rating3}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        2 ? (
                        <Image
                          source={ICON?.rating2}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          source={ICON?.rating1}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      )}
                      <Text
                        style={{
                          color: '#1E3354',
                          fontSize: normalize(10),
                          fontWeight: normalize(400),
                        }}>
                        {route?.params?.item?.rating}{' '}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text
                  style={{
                    fontSize: normalize(14),
                    color: '#2B2727',
                  }}>
                  Shiba Prasad
                </Text>
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: '#8C8581',
                  }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: normalize(5),
                    right: normalize(7),
                    fontSize: normalize(12),
                    color: '#7F8E9D',
                  }}>
                  13-02-2024
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#F9F9F9',
                  borderWidth: normalize(1),
                  borderColor: '#D5D5D5',
                  padding: normalize(10),
                  marginBottom: normalize(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {!isEmpty(route?.params?.item?.rating) ? (
                    <View style={{flexDirection: 'row'}}>
                      {Math.round(Number(route?.params?.item?.rating)) == 5 ? (
                        <Image
                          source={ICON?.rating}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        4 ? (
                        <Image
                          source={ICON?.rating4}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        3 ? (
                        <Image
                          source={ICON?.rating3}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        2 ? (
                        <Image
                          source={ICON?.rating2}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          source={ICON?.rating1}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      )}
                      <Text
                        style={{
                          color: '#1E3354',
                          fontSize: normalize(10),
                          fontWeight: normalize(400),
                        }}>
                        {route?.params?.item?.rating}{' '}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text
                  style={{
                    fontSize: normalize(14),
                    color: '#2B2727',
                  }}>
                  Shiba Prasad
                </Text>
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: '#8C8581',
                  }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: normalize(5),
                    right: normalize(7),
                    fontSize: normalize(12),
                    color: '#7F8E9D',
                  }}>
                  13-02-2024
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#F9F9F9',
                  borderWidth: normalize(1),
                  borderColor: '#D5D5D5',
                  padding: normalize(10),
                  marginBottom: normalize(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {!isEmpty(route?.params?.item?.rating) ? (
                    <View style={{flexDirection: 'row'}}>
                      {Math.round(Number(route?.params?.item?.rating)) == 5 ? (
                        <Image
                          source={ICON?.rating}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        4 ? (
                        <Image
                          source={ICON?.rating4}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        3 ? (
                        <Image
                          source={ICON?.rating3}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        2 ? (
                        <Image
                          source={ICON?.rating2}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          source={ICON?.rating1}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      )}
                      <Text
                        style={{
                          color: '#1E3354',
                          fontSize: normalize(10),
                          fontWeight: normalize(400),
                        }}>
                        {route?.params?.item?.rating}{' '}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text
                  style={{
                    fontSize: normalize(14),
                    color: '#2B2727',
                  }}>
                  Shiba Prasad
                </Text>
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: '#8C8581',
                  }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: normalize(5),
                    right: normalize(7),
                    fontSize: normalize(12),
                    color: '#7F8E9D',
                  }}>
                  13-02-2024
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#F9F9F9',
                  borderWidth: normalize(1),
                  borderColor: '#D5D5D5',
                  padding: normalize(10),
                  marginBottom: normalize(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {!isEmpty(route?.params?.item?.rating) ? (
                    <View style={{flexDirection: 'row'}}>
                      {Math.round(Number(route?.params?.item?.rating)) == 5 ? (
                        <Image
                          source={ICON?.rating}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        4 ? (
                        <Image
                          source={ICON?.rating4}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        3 ? (
                        <Image
                          source={ICON?.rating3}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        2 ? (
                        <Image
                          source={ICON?.rating2}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          source={ICON?.rating1}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      )}
                      <Text
                        style={{
                          color: '#1E3354',
                          fontSize: normalize(10),
                          fontWeight: normalize(400),
                        }}>
                        {route?.params?.item?.rating}{' '}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text
                  style={{
                    fontSize: normalize(14),
                    color: '#2B2727',
                  }}>
                  Shiba Prasad
                </Text>
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: '#8C8581',
                  }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: normalize(5),
                    right: normalize(7),
                    fontSize: normalize(12),
                    color: '#7F8E9D',
                  }}>
                  13-02-2024
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#F9F9F9',
                  borderWidth: normalize(1),
                  borderColor: '#D5D5D5',
                  padding: normalize(10),
                  marginBottom: normalize(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {!isEmpty(route?.params?.item?.rating) ? (
                    <View style={{flexDirection: 'row'}}>
                      {Math.round(Number(route?.params?.item?.rating)) == 5 ? (
                        <Image
                          source={ICON?.rating}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        4 ? (
                        <Image
                          source={ICON?.rating4}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        3 ? (
                        <Image
                          source={ICON?.rating3}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(route?.params?.item?.rating)) ==
                        2 ? (
                        <Image
                          source={ICON?.rating2}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          source={ICON?.rating1}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      )}
                      <Text
                        style={{
                          color: '#1E3354',
                          fontSize: normalize(10),
                          fontWeight: normalize(400),
                        }}>
                        {route?.params?.item?.rating}{' '}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text
                  style={{
                    fontSize: normalize(14),
                    color: '#2B2727',
                  }}>
                  Shiba Prasad
                </Text>
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: '#8C8581',
                  }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: normalize(5),
                    right: normalize(7),
                    fontSize: normalize(12),
                    color: '#7F8E9D',
                  }}>
                  13-02-2024
                </Text>
              </View>
            </View> */}
          </View>
          <DatePicker
            modal
            open={appointmentDateFlag}
            date={appointmentDate}
            minimumDate={new Date()}
            // maximumDate={new Date()}
            onConfirm={date => {
              setAppointmentDate(date);
              setAppointmentDateFlag(false);
            }}
            onCancel={() => {
              setAppointmentDateFlag(false);
            }}
            mode="date"
            textColor={'#000'}
            theme="light"
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            padding: normalize(12),
            backgroundColor: '#0b4e85',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setReviewModalOpen(true);
          }}>
          <Text
            style={{
              fontSize: normalize(12),
              color: '#FFF',

              fontWeight: '700',
            }}>
            WRITE REVIEW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS?.themeColor,
            padding: normalize(12),
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
          onPress={() => {
            setOpenModal(true);
          }}>
          <Text
            style={{
              color: COLORS?.WHITE,
              fontSize: normalize(12),
              fontWeight: '800',
            }}>
            BUY SERVICE
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ServiceDetails;
