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
  Linking,
  TextInput,
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
import moment from 'moment';
import * as Progress from 'react-native-progress';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RazorpayCheckout from 'react-native-razorpay';
import {
  allHearingRequest,
  consultNowDataRequest,
  consultNowRequest,
  dashboardRequest,
  favouriteAddRequest,
  getProfileRequest,
  ratingReviewRequest,
} from '../../redux/reducer/PostReducer';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';

var status = '';
const AdvocateDetail = ({navigation, route}) => {
  const [search, setSearch] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [advocate, setAdvocate] = useState('');
  const [appointmentFor, setAppointmentFor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [consultNowFlag, setConsultNowFlag] = useState(false);
  const [header, setHeader] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openratingModal, setopenratingModal] = useState(false);
  const [appointmentDateFlag, setAppointmentDateFlag] = useState(false);
  const [rating, setRating] = useState(route?.params?.item?.rating);
  const [myFavourite, setMyFavourite] = useState(
    route?.params?.item?.is_favourite,
  );

  const [reviewPoint, setReviewPoint] = useState(0);

  const reviewPoints = [1, 2, 3, 4, 5];
  const starCreationArray = [1, 2, 3, 4, 5];

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      IsInternetConnected()
        .then(() => {
          dispatch(dashboardRequest());
        })
        .catch(() => {
          ToastMessage('Network connection issue');
        });
    }, []),
  );
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/consultNowRequest':
        status = PostReducer?.status;
        break;
      case 'post/consultNowSuccess':
        status = PostReducer?.status;
        if (PostReducer?.consultNowPaymentData?.order_id != '') {
          ToastMessage('Order Created successfully');
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
                      consult_id:
                        PostReducer?.consultNowPaymentData?.consult_id,
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
        } else {
          ToastMessage('Thanks for consultant, we will contact soon');
          navigation?.pop(2);
        }
        break;
      case 'post/consultNowDataRequest':
        status = PostReducer?.status;
        break;
      case 'post/consultNowDataSuccess':
        status = PostReducer?.status;
        navigation?.pop(2);
        break;
      case 'post/favouriteAddRequest':
        status = PostReducer?.status;
        break;
      case 'post/favouriteAddSuccess':
        setMyFavourite(myFavourite == 1 ? 0 : 1);
        console.log('Here');
        status = PostReducer?.status;
        break;
      case 'post/ratingReviewRequest':
        status = PostReducer?.status;
        break;
      case 'post/ratingReviewSuccess':
        setRating(reviewPoint);
        setopenratingModal(false);
        status = PostReducer?.status;
        break;
    }
  }
  useEffect(() => {
    console.log(route?.params);
  }, []);

  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        text={'Advocate Detail'}
        navigation={navigation}
      />
      <Loader visible={PostReducer.loading} />
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
            <View style={{marginTop: normalize(3), width: '98%'}}>
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
            </View>

            <View style={{marginTop: normalize(3), width: '98%'}}>
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
            </View>

            <View style={{marginTop: normalize(3), width: '98%'}}>
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
            </View>

            <View style={{marginTop: normalize(0), width: '98%'}}>
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
            </View>
            <View style={{marginTop: normalize(3), width: '98%'}}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
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
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS?.themeColor,
                padding: normalize(10),
                margin: normalize(10),
                width: '90%',
                borderRadius: normalize(6),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                if (isEmpty(subject)) {
                  ToastMessage('Enter subject');
                } else if (isEmpty(description)) {
                  ToastMessage('Enter description');
                } else {
                  setOpenModal(false);
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        consultNowRequest({
                          advocate_id: route?.params?.item?.id,
                          subject: subject,
                          description: description,
                          date: moment(appointmentDate).format('YYYY-MM-DD'),
                          consult_for:
                            appointmentFor == 'Document review' ? 1 : 2, //1 = Document review, 2 = Consultant
                          consult_type:
                            appointmentType == 'Video meeting' ? 1 : 2, //1 = Video meeting, 2 = Normal Call
                        }),
                      );
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                }
              }}>
              <Text style={{color: COLORS?.WHITE}}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={openratingModal}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setopenratingModal(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 3,
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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -normalize(50),
            }}>
            <Image
              source={ICON?.rating_img}
              style={{
                height: normalize(100),
                width: normalize(100),
              }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              color: '#222',
              fontSize: normalize(13),
              marginBottom: normalize(10),
            }}>
            Rate your experince with expert!
          </Text>

          <FlatList
            data={reviewPoints}
            horizontal={true}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
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
                          reviewPoint - 1 >= index ? COLORS?.yellow : '#AAAAAA',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.themeColor,
              paddingHorizontal: normalize(15),
              paddingVertical: normalize(7),
              borderRadius: normalize(3),
              marginVertical: normalize(15),
            }}
            onPress={() => {
              IsInternetConnected()
                .then(() => {
                  dispatch(
                    ratingReviewRequest({
                      type: '1', // 1 = advocate, 2 = Service
                      advocate_id: route?.params?.item?.id,
                      ratings: reviewPoint,
                    }),
                  );
                })
                .catch(() => {
                  ToastMessage('Network connection issue');
                });
            }}>
            <Text style={{color: '#fff', fontSize: normalize(12)}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: normalize(10),
            padding: normalize(10),
            borderRadius: normalize(10),
          }}>
          <View
            style={{
              padding: normalize(10),
              backgroundColor: COLORS?.themeColor,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: normalize(6),
              paddingBottom: normalize(40),
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={ICON?.profile_image}
                style={{height: normalize(50), width: normalize(50)}}
              />
              <View style={{marginLeft: normalize(10)}}>
                <Text
                  style={{
                    color: COLORS?.WHITE,

                    fontWeight: '700',
                    fontSize: normalize(18),
                  }}>
                  {route?.params?.item?.name}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginTop: normalize(3),
                  }}>
                  {!isEmpty(rating) ? (
                    <FlatList
                      numColumns={5}
                      style={{
                        flexGrow: 0,
                        width: '100%',
                      }}
                      data={starCreationArray}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: normalize(17),
                              alignSelf: 'flex-start',
                            }}>
                            <Image
                              source={ICON?.rating1}
                              style={{
                                height: normalize(15),
                                width: normalize(15),
                                tintColor:
                                  rating >= index + 1 ? '#f5d103' : '#999',
                              }}
                              resizeMode="contain"
                            />
                          </View>
                        );
                      }}
                    />
                  ) : (
                    <View style={{marginTop: normalize(12)}}></View>
                  )}
                </View>
                {/* <View>
                  {!isEmpty(rating) ? (
                    <View style={{flexDirection: 'row'}}>
                      {Math.round(Number(rating)) === 5 ? (
                        <Image
                          source={ICON?.rating}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(rating)) == 4 ? (
                        <Image
                          source={ICON?.rating4}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(rating)) == 3 ? (
                        <Image
                          source={ICON?.rating3}
                          style={{
                            height: normalize(12),
                            width: normalize(60),
                          }}
                          resizeMode="contain"
                        />
                      ) : Math.round(Number(rating)) == 2 ? (
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
                          color: '#f3f3f3',
                          fontSize: normalize(10),
                          fontWeight: normalize(400),
                        }}>
                        ( {Math.round(Number(rating))} )
                      </Text>
                    </View>
                  ) : null}
                </View> */}
              </View>
            </View>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => {
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        favouriteAddRequest({
                          advocate_id: route?.params?.item?.id,
                        }),
                      );
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                }}>
                <Image
                  source={ICON?.heart}
                  style={{
                    height: normalize(15),
                    width: normalize(15),
                    tintColor: myFavourite == 1 ? '#F00' : COLORS?.ASH,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: normalize(5),
                  paddingVertical: normalize(3),
                  borderRadius: normalize(5),
                  marginTop: normalize(5),
                }}
                onPress={() => {
                  setopenratingModal(true);
                }}>
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: COLORS.themeColor,
                  }}>
                  Give Rating
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              padding: normalize(10),
              backgroundColor: COLORS?.WHITE,
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              borderWidth: normalize(1),
              borderRadius: normalize(6),
              marginTop: -normalize(20),
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '33%',
                alignItems: 'center',
                borderRightWidth: normalize(1),
                borderRightColor: '#999',
              }}>
              <Text>{route?.params?.item?.total_clients}</Text>
              <Text>Total Clients</Text>
            </View>
            <View
              style={{
                width: '33%',
                alignItems: 'center',
                borderRightWidth: normalize(1),
                borderRightColor: '#999',
              }}>
              <Text>{route?.params?.item?.cases?.length}</Text>
              <Text>All Cases</Text>
            </View>
            <View style={{width: '33%', alignItems: 'center'}}>
              <Text>{route?.params?.item?.wining_cases}</Text>
              <Text>Wining Cases</Text>
            </View>
          </View>
          <View
            style={{
              padding: normalize(10),
              backgroundColor: COLORS?.WHITE,
              width: '100%',
              borderWidth: normalize(1),
              borderRadius: normalize(6),
              marginTop: normalize(10),
            }}>
            <Text style={{fontWeight: '800', fontSize: normalize(13)}}>
              About
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: normalize(10),
                marginTop: normalize(5),
              }}>
              {route?.params?.item?.about_my_self}
            </Text>
          </View>
          {!isEmpty(route?.params?.item?.address) ? (
            <View
              style={{
                padding: normalize(10),
                backgroundColor: COLORS?.WHITE,
                width: '100%',
                borderWidth: normalize(1),
                borderRadius: normalize(6),
                marginTop: normalize(10),
              }}>
              <Text style={{fontWeight: '800', fontSize: normalize(13)}}>
                Address
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: normalize(10),
                  marginTop: normalize(5),
                }}>
                {route?.params?.item?.address}
              </Text>
            </View>
          ) : null}
          {!isEmpty(route?.params?.item?.state_bar_council) ||
          !isEmpty(route?.params?.item?.bar_association_name) ||
          !isEmpty(route?.params?.item?.practice_area) ||
          !isEmpty(route?.params?.item?.spacialised) ? (
            <View
              style={{
                padding: normalize(10),
                backgroundColor: COLORS?.WHITE,
                width: '100%',
                borderWidth: normalize(1),
                borderRadius: normalize(6),
                marginTop: normalize(10),
              }}>
              <Text style={{fontWeight: '800', fontSize: normalize(13)}}>
                Professional Details
              </Text>
              {!isEmpty(route?.params?.item?.state_bar_council) ? (
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: normalize(10),
                    marginTop: normalize(5),
                  }}>
                  <Text style={{fontWeight: '500'}}>State Bar Council:</Text>{' '}
                  {route?.params?.item?.state_bar_council}
                </Text>
              ) : null}
              {!isEmpty(route?.params?.item?.bar_association_name) ? (
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: normalize(10),
                    marginTop: normalize(10),
                  }}>
                  <Text style={{fontWeight: '500'}}> Bar Association:</Text>{' '}
                  {route?.params?.item?.bar_association_name}
                </Text>
              ) : null}
              {!isEmpty(route?.params?.item?.practice_area) ? (
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: normalize(10),
                    marginTop: normalize(10),
                  }}>
                  <Text style={{fontWeight: '500'}}> Practice Area:</Text>{' '}
                  {route?.params?.item?.practice_area}
                </Text>
              ) : null}
              {!isEmpty(route?.params?.item?.spacialised) ? (
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: normalize(10),
                    marginTop: normalize(10),
                  }}>
                  <Text style={{fontWeight: '500'}}>Specialized:</Text>{' '}
                  {route?.params?.item?.spacialised}
                </Text>
              ) : null}
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: normalize(10),
                  marginTop: normalize(10),
                }}>
                <Text style={{fontWeight: '500'}}>
                  Trust with legalmeet from:
                </Text>{' '}
                --
              </Text>
            </View>
          ) : null}
          <TouchableOpacity
            style={{
              backgroundColor: COLORS?.themeColor,
              padding: normalize(10),
              marginTop: normalize(10),
              width: '100%',
              borderRadius: normalize(6),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setOpenModal(true);
            }}>
            {!isEmpty(route?.params?.item?.charges) ? (
              <Text style={{color: COLORS?.WHITE}}>
                {route?.params?.item?.charges}/- Get Appoinment
              </Text>
            ) : (
              <Text style={{color: COLORS?.WHITE}}>Consult Now</Text>
            )}
          </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default AdvocateDetail;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
