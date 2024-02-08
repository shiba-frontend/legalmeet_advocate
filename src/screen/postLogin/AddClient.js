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
import Modal from 'react-native-modal';
import {
  caseDeleteRequest,
  caseDetailRequest,
  caseListRequest,
  clientAddRequest,
  clientDeleteDocumentRequest,
  clientDetailRequest,
  clientDetailUpdate,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import moment from 'moment';
var status = '';
const AddClient = ({navigation, route}) => {
  const [clientID, setClientID] = useState('');
  const [corporateName, setCorporateName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [option, setOption] = useState('Basic Details');
  const [contactNumber, setContactNumber] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  const [caseDetail, setCaseDetail] = useState('');
  const options = ['Basic Details', 'Cases', 'Documents', 'Invoices'];
  const clientTypes = [
    {id: 0, name: 'Corporate'},
    {id: 1, name: 'Individual'},
  ];
  const [selectType, setSelectType] = useState(false);
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/clientAddRequest':
        status = PostReducer?.status;
        break;
      case 'post/clientAddSuccess':
        status = PostReducer?.status;
        setOption('Cases');
        IsInternetConnected()
          .then(() => {
            dispatch(caseListRequest({client_id: route?.params?.item?.id}));
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        // navigation.goBack();
        break;
      case 'post/clientDeleteDocumentRequest':
        status = PostReducer?.status;
        break;
      case 'post/clientDeleteDocumentSuccess':
        status = PostReducer?.status;
        IsInternetConnected()
          .then(() => {
            dispatch(
              clientDetailRequest({client_id: PostReducer?.clientDetail?.id}),
            );
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        break;
      case 'post/caseDeleteRequest':
        status = PostReducer?.status;
        break;
      case 'post/caseDeleteSuccess':
        status = PostReducer?.status;
        IsInternetConnected()
          .then(() => {
            dispatch(caseListRequest({client_id: route?.params?.item?.id}));
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        break;
    }
  }
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }
  useEffect(() => {
    setClientID(route?.params?.item?.client_id);
    setName(route?.params?.item?.name);
    setEmail(route?.params?.item?.email);
    setContactNumber(String(route?.params?.item?.mobile_number));
    dispatch(clientDetailUpdate(route?.params?.item));
    clientTypes.forEach(element => {
      setType(route?.params?.item?.email);
    });
    if (route?.params?.type == 'case') {
      setOption('Cases');
    }
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'View Details'}
      />
      <Loader visible={PostReducer.loading} />
      <View style={{marginTop: normalize(10)}}>
        <FlatList
          data={options}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: Dimensions.get('screen').width / 3.5,
                  alignItems: 'center',
                  paddingVertical: normalize(10),
                  borderBottomWidth:
                    item != option ? normalize(0) : normalize(3),
                  borderBottomColor: COLORS.STATUS_BAR,
                }}
                onPress={() => {
                  setOption(item);
                  if (item == 'Cases') {
                    IsInternetConnected()
                      .then(() => {
                        dispatch(
                          caseListRequest({client_id: route?.params?.item?.id}),
                        );
                      })
                      .catch(() => {
                        ToastMessage('Network connection issue');
                      });
                  }
                }}>
                <Text
                  style={{
                    color: item != option ? '#000' : COLORS.themeColor,
                    fontSize: normalize(14),
                    fontWeight: '800',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {option == 'Basic Details' ? (
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            {/* Case type list */}
            <Modal
              isVisible={selectType}
              animationIn="slideInUp"
              animationOut="slideInDown"
              animationInTiming={800}
              animationOutTiming={100}
              hasBackdrop={true}
              onBackdropPress={() => {
                setSelectType(false);
              }}
              backdropTransitionOutTiming={0}
              style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
              <View
                style={{
                  maxHeight: Dimensions.get('screen').height / 2,
                  width: '100%',
                  paddingTop: 10,
                  // paddingHorizontal: 30,
                  backgroundColor: '#EEE',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  // padding: normalize(40),
                  alignItems: 'center',
                }}>
                <FlatList
                  data={clientTypes}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          borderBottomWidth: normalize(1),
                          padding: normalize(10),
                          width: Dimensions.get('screen').width,
                        }}
                        onPress={() => {
                          setType(item);
                          setSelectType(false);
                        }}>
                        <Text>{item?.name}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </Modal>
            <View
              style={{
                marginVertical: normalize(5),
                paddingHorizontal: normalize(15),
                alignItems: 'flex-start',
                width: '100%',
              }}></View>

            <View style={{marginTop: normalize(0), width: '90%'}}>
              <Text
                style={{
                  marginVertical: normalize(10),
                  fontWeight: '600',
                  fontSize: normalize(13),
                }}>
                Client Name
              </Text>
              <InputText
                inputStyle={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  borderRadius: 10,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(3),
                  borderColor: '#e7e7e7',
                  borderWidth: 1,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(2),
                  borderColor: COLORS.themeColor,
                  borderWidth: 1,
                }}
                placeHolderText="Enter Client Name"
                beforeIcon={''}
                keyboardType={'default'}
                // maxLength={10}
                value={name}
                onChangingText={item => {
                  setName(item);
                }}
              />
            </View>

            <View style={{marginTop: normalize(0), width: '90%'}}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
                }}>
                Client Type
              </Text>
              <InputText
                inputStyle={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  borderRadius: 10,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(2),
                  borderColor: COLORS.themeColor,
                  borderWidth: 1,
                }}
                placeHolderText="Select"
                beforeIcon={''}
                keyboardType={'default'}
                selectBox={true}
                afterIcon={ICON.select_box_icon}
                // maxLength={10}
                value={type?.name}
                onChangingText={item => {
                  // setName(item);
                  setSelectType(true);
                }}
                OnOpenModal={item => {
                  if (clientTypes.length > 0) setSelectType(true);
                  else ToastMessage('No case type available');
                }}
              />
            </View>

            {!isEmpty(type) && type?.id == 0 ? (
              <View style={{marginTop: normalize(0), width: '90%'}}>
                <Text
                  style={{
                    marginVertical: normalize(7),
                    fontWeight: '600',
                    fontSize: normalize(13),
                  }}>
                  Corporate Name
                </Text>
                <InputText
                  inputStyle={{
                    backgroundColor: '#FFF',
                    width: '100%',
                    borderRadius: 10,
                    paddingHorizontal: normalize(7),
                    paddingVertical: normalize(2),
                    borderColor: COLORS.themeColor,
                    borderWidth: 1,
                  }}
                  placeHolderText="Enter Corporate Name"
                  beforeIcon={''}
                  keyboardType={'default'}
                  // maxLength={10}

                  value={corporateName}
                  onChangingText={item => {
                    setCorporateName(item);
                  }}
                />
              </View>
            ) : null}
            <View style={{marginTop: normalize(3), width: '90%'}}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
                }}>
                Email ID
              </Text>
              <InputText
                inputStyle={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  borderRadius: 10,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(3),
                  borderColor: '#e7e7e7',
                  borderWidth: 1,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(2),
                  borderColor: COLORS.themeColor,
                  borderWidth: 1,
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
                Contact Number
              </Text>
              <InputText
                inputStyle={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  borderRadius: 10,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(3),
                  borderColor: '#e7e7e7',
                  borderWidth: 1,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(2),
                  borderColor: COLORS.themeColor,
                  borderWidth: 1,
                }}
                placeHolderText="Enter Contact Number"
                beforeIcon={''}
                keyboardType={'phone-pad'}
                maxLength={10}
                value={contactNumber}
                onChangingText={item => {
                  setContactNumber(item);
                  setClientID(
                    '#CL' +
                      Math.floor(Math.random() * (999 - 100 + 1) + 100) +
                      '-' +
                      item,
                  );
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
                Client ID
              </Text>
              <InputText
                inputStyle={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  borderRadius: 10,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(3),
                  borderColor: '#e7e7e7',
                  borderWidth: 1,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(2),
                  borderColor: COLORS.themeColor,
                  borderWidth: 1,
                }}
                placeHolderText="Enter Client ID"
                beforeIcon={''}
                keyboardType={'default'}
                // maxLength={10}
                value={clientID}
                selectBox={true}
                onChangingText={item => {
                  // setName(item);
                }}
                OnOpenModal={item => {
                  console.log(item);
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
                  var emailreg =
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                  var phoneno = /^\d{10}$/;
                  if (name == '') {
                    ToastMessage('Client name required');
                  } else if (contactNumber == '') {
                    ToastMessage('Contact number required');
                    // } else if (email != '' && !email.match(emailreg)) {
                    //   ToastMessage('Enter valid email');
                  } else if (!contactNumber.match(phoneno)) {
                    ToastMessage('Enter valid phone');
                  } else {
                    var requestJSON = {
                      client_id: clientID,
                      name: name,
                      mobile_number: contactNumber,
                      client_type: type?.id,
                      s, //0:corporate,1:individual
                    };
                    if (email != '') {
                      requestJSON['email'] = email;
                    }
                    if (corporateName != '') {
                      requestJSON['corporate_name'] = corporateName;
                    }
                    IsInternetConnected()
                      .then(() => {
                        dispatch(
                          clientAddRequest({
                            exist_id: route?.params?.item?.id,
                            client_id: clientID,
                            name: name,
                            email: email,
                            mobile_number: contactNumber,
                          }),
                        );
                      })
                      .catch(() => {
                        ToastMessage('Network connection issue');
                      });
                  }
                }}>
                <Text
                  style={{color: COLORS.WHITE, letterSpacing: normalize(2)}}>
                  SAVE AND NEXT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : null}
      {option == 'Cases' ? (
        <View style={{padding: normalize(15), marginBottom: normalize(150)}}>
          <TouchableOpacity
            style={{
              padding: normalize(15),
              backgroundColor: 'rgba(17, 201, 0, 0.09)',
              alignItems: 'center',
              borderRadius: normalize(12),
            }}
            onPress={() => {
              navigation.navigate('AddCase1', {pageName: 'add'});
            }}>
            <Text style={{fontWeight: '800'}}>Add New Case</Text>
          </TouchableOpacity>
          <FlatList
            data={PostReducer?.cases}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                // <TouchableOpacity
                //   style={{
                //     padding: normalize(10),
                //     borderWidth: normalize(1),
                //     marginTop: normalize(10),
                //     borderRadius: normalize(10),
                //     borderColor: COLORS.themeColor,
                //   }}
                //   onPress={() => {
                //     if (caseDetail != '') setCaseDetail('');
                //     else {
                //       setCaseDetail(item);
                //     }
                //   }}>
                //   <View
                //     style={{
                //       flexDirection: 'row',
                //       justifyContent: 'space-between',
                //     }}>
                //     {/* <View></View> */}
                //     <View
                //       style={{
                //         marginTop: -normalize(10),
                //         paddingHorizontal: normalize(10),
                //         paddingVertical: normalize(6),
                //         backgroundColor: '#11C900',
                //         marginLeft: normalize(10),
                //         borderBottomLeftRadius: normalize(10),
                //         borderBottomRightRadius: normalize(10),
                //       }}>
                //       <Text style={{color: '#FFF'}}>{item?.case_id}</Text>
                //     </View>
                //     <TouchableOpacity
                //       onPress={() => {
                //         setCaseDetail(item);
                //       }}>
                //       <Image
                //         source={ICON.more_option}
                //         style={{height: normalize(15), width: normalize(15)}}
                //         resizeMode="contain"
                //       />
                //     </TouchableOpacity>
                //   </View>
                //   <View
                //     style={{marginTop: normalize(10), flexDirection: 'row'}}>
                //     <Image
                //       source={ICON?.case_history}
                //       style={{height: normalize(15), width: normalize(15)}}
                //       resizeMode="contain"
                //     />
                //     <Text
                //       style={{
                //         marginLeft: normalize(10),
                //         textTransform: 'capitalize',
                //       }}
                //       numberOfLines={1}>
                //       {item?.case_details}
                //     </Text>
                //   </View>
                //   <View
                //     style={{marginTop: normalize(10), flexDirection: 'row'}}>
                //     <Image
                //       source={ICON?.location}
                //       style={{height: normalize(15), width: normalize(15)}}
                //       resizeMode="contain"
                //     />
                //     <Text style={{marginLeft: normalize(10)}}>
                //       {item?.court}
                //     </Text>
                //   </View>
                //   <View
                //     style={{marginTop: normalize(10), flexDirection: 'row'}}>
                //     <Image
                //       source={ICON?.calender}
                //       style={{height: normalize(15), width: normalize(15)}}
                //       resizeMode="contain"
                //     />
                //     <Text
                //       style={{
                //         marginLeft: normalize(10),
                //         color: COLORS.STATUS_BAR,
                //       }}>
                //       {moment(item?.date).format('DD-MM-YYYY')}
                //     </Text>
                //   </View>
                //   {caseDetail?.id == item?.id ? (
                //     <View
                //       style={{
                //         padding: normalize(10),
                //         backgroundColor: '#FFF',
                //         borderColor: '#DDD',
                //         borderWidth: normalize(1),
                //         width: Dimensions.get('screen').width / 4,
                //         position: 'absolute',
                //         right: normalize(10),
                //         borderRadius: normalize(6),
                //         top: normalize(15),
                //       }}>
                //       <TouchableOpacity
                //         style={{
                //           borderBottomWidth: normalize(1),
                //           borderBottomColor: '#DDD',
                //           paddingVertical: normalize(5),
                //         }}
                //         onPress={() => {
                //           setCaseDetail('');
                //           IsInternetConnected()
                //             .then(() => {
                //               dispatch(caseDetailRequest({case_id: item?.id}));
                //             })
                //             .catch(() => {
                //               ToastMessage('Network connection issue');
                //             });
                //           navigation.navigate('CaseDetails', {item: item});
                //         }}>
                //         <Text>View</Text>
                //       </TouchableOpacity>
                //       <TouchableOpacity
                //         style={{
                //           borderBottomWidth: normalize(1),
                //           borderBottomColor: '#e7e7e7',
                //           paddingVertical: normalize(5),
                //         }}
                //         onPress={() => {
                //           console.log(item);
                //           setCaseDetail('');
                //           navigation.navigate('AddCase1', {
                //             pageName: 'add',
                //             item: item,
                //           });
                //         }}>
                //         <Text>Edit</Text>
                //       </TouchableOpacity>
                //       <TouchableOpacity
                //         style={{
                //           paddingVertical: normalize(5),
                //         }}
                //         onPress={() => {
                //           console.log(item);
                //           setCaseDetail('');
                //           Alert.alert('Are you sure to delete this case', '', [
                //             {
                //               text: 'Yes',
                //               onPress: () => {
                //                 IsInternetConnected()
                //                   .then(() => {
                //                     dispatch(
                //                       caseDeleteRequest({
                //                         case_id: item?.id,
                //                       }),
                //                     );
                //                   })
                //                   .catch(() => {
                //                     ToastMessage('Network connection issue');
                //                   });
                //               },
                //             },
                //             {
                //               text: 'No',
                //               onPress: () => console.log('Cancel Pressed'),
                //               style: 'cancel',
                //             },
                //           ]);
                //         }}>
                //         <Text>Delete</Text>
                //       </TouchableOpacity>
                //     </View>
                //   ) : null}
                // </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: normalize(0),
                    // borderWidth: normalize(1),
                    marginTop: normalize(10),
                    borderRadius: normalize(10),
                    // borderColor: COLORS.themeColor,
                  }}
                  onPress={() => {
                    if (caseDetail != '') setCaseDetail('');
                    else {
                      setCaseDetail(item);
                    }
                  }}>
                  <View
                    style={{
                      overflow: 'hidden',
                      // marginTop: normalize(5),
                      borderRadius: normalize(10),
                      borderColor: COLORS.themeColor,
                      borderWidth: normalize(1),
                    }}>
                    <View
                      style={{
                        // marginTop: normalize(4),
                        flexDirection: 'row',
                        backgroundColor: COLORS.themeColor,
                        padding: normalize(10),
                        marginBottom: normalize(5),
                        justifyContent: 'space-between',
                        // marginTop: normalize(-5),
                      }}>
                      <Text
                        style={{
                          marginLeft: normalize(0),
                          textTransform: 'capitalize',
                          color: '#fff',
                        }}
                        numberOfLines={1}>
                        Case No: {item?.case_id ? item?.case_id : 'N/A'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: normalize(10),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: normalize(10),
                        }}>
                        <Image
                          source={ICON?.case_history}
                          style={{
                            height: normalize(15),
                            width: normalize(15),
                            tintColor: COLORS.themeColor,
                          }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            marginLeft: normalize(10),
                            textTransform: 'capitalize',
                          }}
                          numberOfLines={1}>
                          {item?.case_details}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          // console.log('Hello');
                          // dispatch(updatePageName({pagename: 'CaseDetails'}));
                          // navigation.navigate('CaseDetails', {item: item});
                          setCaseDetail(item);
                        }}>
                        <Image
                          source={ICON.more_option}
                          style={{
                            height: normalize(15),
                            width: normalize(15),
                            tintColor: COLORS.themeColor,
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        marginTop: normalize(10),
                        flexDirection: 'row',
                        paddingHorizontal: normalize(10),
                      }}>
                      <Image
                        source={ICON?.location}
                        style={{
                          height: normalize(15),
                          width: normalize(15),
                          tintColor: COLORS.themeColor,
                        }}
                        resizeMode="contain"
                      />
                      <Text style={{marginLeft: normalize(10)}}>
                        {item?.court}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: normalize(10),
                        flexDirection: 'row',
                        paddingHorizontal: normalize(10),
                      }}>
                      <Image
                        source={ICON?.calender}
                        style={{
                          height: normalize(15),
                          width: normalize(15),
                          tintColor: COLORS.themeColor,
                        }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          marginLeft: normalize(10),
                        }}>
                        {moment(item?.date).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: normalize(10),
                        flexDirection: 'row',
                        paddingHorizontal: normalize(10),
                        marginBottom: normalize(10),
                      }}>
                      <Image
                        source={ICON?.bar_association}
                        style={{
                          height: normalize(15),
                          width: normalize(15),
                          tintColor: COLORS.themeColor,
                        }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          marginLeft: normalize(10),
                        }}>
                        {item?.type}
                      </Text>
                    </View>
                  </View>
                  {caseDetail?.id == item?.id ? (
                    <View
                      style={{
                        padding: normalize(10),
                        backgroundColor: COLORS.themeColor,
                        borderColor: COLORS.themeColor,
                        borderWidth: normalize(1),
                        width: Dimensions.get('screen').width / 4,
                        position: 'absolute',
                        right: normalize(18),
                        borderRadius: normalize(6),
                        top: normalize(40),
                      }}>
                      <TouchableOpacity
                        style={{
                          borderBottomWidth: normalize(1),
                          borderBottomColor: '#FFF',
                          paddingVertical: normalize(5),
                        }}
                        onPress={() => {
                          setCaseDetail('');
                          IsInternetConnected()
                            .then(() => {
                              dispatch(caseDetailRequest({case_id: item?.id}));
                            })
                            .catch(() => {
                              ToastMessage('Network connection issue');
                            });
                          navigation.navigate('CaseDetails', {item: item});
                        }}>
                        <Text style={{color: '#FFF'}}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderBottomWidth: normalize(1),
                          borderBottomColor: '#FFF',
                          paddingVertical: normalize(5),
                        }}
                        onPress={() => {
                          console.log(item);
                          setCaseDetail('');
                          navigation.navigate('AddCase1', {
                            pageName: 'edit',
                            item: item,
                          });
                        }}>
                        <Text style={{color: '#FFF'}}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          paddingVertical: normalize(5),
                        }}
                        onPress={() => {
                          console.log(item);
                          setCaseDetail('');
                          Alert.alert('Are you sure to delete this case', '', [
                            {
                              text: 'Yes',
                              onPress: () => {
                                IsInternetConnected()
                                  .then(() => {
                                    dispatch(
                                      caseDeleteRequest({
                                        case_id: item?.id,
                                      }),
                                    );
                                  })
                                  .catch(() => {
                                    ToastMessage('Network connection issue');
                                  });
                              },
                            },
                            {
                              text: 'No',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                          ]);
                        }}>
                        <Text style={{color: '#FFF'}}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
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
      ) : null}
      {option == 'Documents' ? (
        <View style={{padding: normalize(15)}}>
          <TouchableOpacity
            style={{
              padding: normalize(15),
              backgroundColor: 'rgba(17, 201, 0, 0.09)',
              alignItems: 'center',
              borderRadius: normalize(12),
            }}
            onPress={() => {
              navigation.navigate('ClientDocument');
            }}>
            <Text style={{fontWeight: '800'}}>Add Document</Text>
          </TouchableOpacity>
          <FlatList
            data={PostReducer?.clientDetail?.document}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: normalize(10),
                    borderWidth: normalize(1),
                    marginTop: normalize(10),
                    borderRadius: normalize(10),
                    borderColor: '#e7e7e7',
                    backgroundColor: '#FFF',
                    width: Dimensions?.get('screen').width / 2 - 25,
                    marginRight: normalize(10),
                  }}
                  onPress={() => {
                    Linking.openURL(item?.file);
                  }}>
                  <Image
                    source={
                      item?.type.toLowerCase() == 'pdf'
                        ? ICON?.pdf
                        : item?.type.toLowerCase() == 'doc'
                        ? ICON?.doc
                        : ICON?.img
                    }
                    style={{
                      width: Dimensions?.get('screen').width / 2 - 75,
                      height: normalize(100),
                    }}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: normalize(5),
                      top: normalize(5),
                    }}
                    onPress={() => {
                      Alert.alert('Are you sure to delete this document', '', [
                        {
                          text: 'Yes',
                          onPress: () => {
                            IsInternetConnected()
                              .then(() => {
                                dispatch(
                                  clientDeleteDocumentRequest({
                                    client_document_id: item?.id,
                                  }),
                                );
                              })
                              .catch(() => {
                                ToastMessage('Network connection issue');
                              });
                          },
                        },
                        {
                          text: 'No',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ]);
                    }}>
                    <Image
                      source={ICON?.delete}
                      style={{height: normalize(15), width: normalize(15)}}
                    />
                  </TouchableOpacity>
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
      ) : null}
      {option == 'Invoices' ? (
        <View style={{padding: normalize(15)}}>
          <TouchableOpacity
            style={{
              padding: normalize(15),
              backgroundColor: 'rgba(17, 201, 0, 0.09)',
              alignItems: 'center',
              borderRadius: normalize(12),
            }}
            onPress={() => {
              navigation.navigate('ClientInvoice');
            }}>
            <Text style={{fontWeight: '800'}}>Add Invoice</Text>
          </TouchableOpacity>
          <FlatList
            data={PostReducer?.clientDetail?.invoice}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: normalize(10),
                    borderWidth: normalize(1),
                    marginTop: normalize(10),
                    borderRadius: normalize(10),
                    borderColor: '#DDD',
                    backgroundColor: '#FFF',
                    width: Dimensions?.get('screen').width / 2 - 30,
                    marginRight: normalize(10),
                  }}
                  onPress={() => {
                    Linking.openURL(item?.file);
                  }}>
                  <Text>Amount: ₹{item?.amount}</Text>
                  <Text style={{fontStyle: 'italic'}}>
                    {item?.payment_type == 0
                      ? 'Pending'
                      : item?.payment_type == 1
                      ? 'Paid'
                      : 'Partial'}
                  </Text>
                  <Image
                    source={
                      item?.type.toLowerCase() == 'pdf'
                        ? ICON?.pdf
                        : item?.type.toLowerCase() == 'doc'
                        ? ICON?.doc
                        : ICON?.img
                    }
                    resizeMode="contain"
                    style={{
                      width: Dimensions?.get('screen').width / 2 - 75,
                      height: normalize(100),
                    }}
                  />
                  {/* <Text style={{textTransform: 'uppercase', fontWeight: '800'}}>
                    {item?.document_name.replace(' ', '_') + '.' + item?.type}
                  </Text> */}
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: normalize(5),
                      top: normalize(5),
                    }}
                    onPress={() => {
                      Alert.alert('Are you sure to delete this document', '', [
                        {
                          text: 'Yes',
                          onPress: () => {
                            IsInternetConnected()
                              .then(() => {
                                dispatch(
                                  clientDeleteDocumentRequest({
                                    client_document_id: item?.id,
                                  }),
                                );
                              })
                              .catch(() => {
                                ToastMessage('Network connection issue');
                              });
                          },
                        },
                        {
                          text: 'No',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ]);
                    }}>
                    <Image
                      source={ICON?.delete}
                      style={{height: normalize(15), width: normalize(15)}}
                    />
                  </TouchableOpacity>
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
      ) : null}
    </SafeAreaView>
  );
};

export default AddClient;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
