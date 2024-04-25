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
import moment from 'moment';
import * as Progress from 'react-native-progress';
import {
  caseDeleteRequest,
  caseDetailRequest,
  caseListRequest,
  clientListRequest,
  dashboardRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
var status = '';
const Cases = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [search, setSearch] = useState('');
  const [selectOption, setSelectOption] = useState({
    id: '',
    status: 'All',
  });

  const [caseDetail, setCaseDetail] = useState('');
  const options = [
    {
      status: 'All',
    },
    {
      status: 'Allowed',
    },
    {
      status: 'Dismissed',
    },

    {
      status: 'Withdraw',
    },
  ];

  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }

  const myCAses = [
    {
      case_id: 'WB345454',
      name: 'Aniruddha Jana',
      description:
        'Lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller',
      court: 'Jharkhand High Court',
      pitition: 'Special leave pitition',
    },
    {
      case_id: 'WB345454',
      name: 'Aniruddha Jana',
      description:
        'Lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller',
      court: 'Jharkhand High Court',
      pitition: 'Special leave pitition',
    },
    {
      case_id: 'WB345454',
      name: 'Aniruddha Jana',
      description:
        'Lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller',
      court: 'Jharkhand High Court',
      pitition: 'Special leave pitition',
    },
    {
      case_id: 'WB345454',
      name: 'Aniruddha Jana',
      description:
        'Lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller lorem epsum sit doller',
      court: 'Jharkhand High Court',
      pitition: 'Special leave pitition',
    },
  ];


  console.log("All case========", PostReducer?.cases)

  const dispatch = useDispatch();

  if (status == '' || PostReducer?.status != status) {
    switch (PostReducer?.status) {
      case 'post/caseDeleteRequest':
        status = PostReducer?.status;
        break;
      case 'post/caseDeleteSuccess':
        status = PostReducer?.status;
        IsInternetConnected()
          .then(() => {
            dispatch(caseListRequest());
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        break;
    }
  }
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(caseListRequest());
        // dispatch(dashboardRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header isMenuPresent={false} navigation={navigation} text={'Cases'} />
      <Loader visible={PostReducer.loading && search == ''} />
      <View>
        <FlatList
          horizontal={true}
          data={options}
          style={{borderBottomWidth: normalize(1), borderBottomColor: '#DDD'}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width / 4,
                  paddingVertical: normalize(6),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth:
                    item?.status == selectOption?.status
                      ? normalize(1)
                      : normalize(0),
                  borderColor: COLORS.themeColor,
                  backgroundColor:
                    item?.status == selectOption?.status
                      ? COLORS.themeColor
                      : COLORS.WHITE,
                  borderRadius: 4,
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onPress={() => {
                  setSelectOption(item);
                }}>
                <Text
                  style={{
                    fontSize: normalize(14),
                    color:
                      item?.status == selectOption?.status
                        ? COLORS.secondarColor
                        : COLORS.themeColor,
                  }}>
                  {item?.status}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          width: Dimensions.get('screen').width - 10,
          alignSelf: 'center',
          marginTop: normalize(10),
          justifyContent: 'center',
          marginLeft: normalize(15),
        }}>
        <FlatList
          data={
            selectOption?.status == 'All'
              ? PostReducer?.cases
              : selectOption?.status == 'Allowed'
              ? PostReducer?.caseWin
              : // : selectOption?.status == 'Pending'
                // ? PostReducer?.caseLost
                PostReducer?.caseLost
          }
          // horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={
            {
              // width: Dimensions.get('screen').width / 2.5,
              // alignSelf: 'center',
            }
          }
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  height: 250,
                }}
              />
            );
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: '#EFEFEF',
                  marginRight: normalize(10),
                  width: Dimensions.get('screen').width - 30,
                  borderRadius: normalize(8),
                  marginBottom: normalize(10),
                  borderWidth: normalize(1),
                  borderColor: '#CCC',
                }}
                onPress={() => {
                  // dispatch(caseDetailRequest(item));
                  // navigation?.navigate('CasesDetails');

                  if (PostReducer?.profileData?.is_subscribed) {
                    IsInternetConnected()
                    .then(() => {
                      dispatch(
                        caseDetailRequest({
                          case_id: item?.id,
                        }),
                      );
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                  } else {
                    navigation.navigate('expire');
                  }

                
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: normalize(6),
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderBottomColor: '#CCC',
                    paddingHorizontal: normalize(8),
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <View style={{flexDirection: 'row', width: '85%'}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#000',
                        marginLeft: normalize(5),
                        fontWeight: '600',
                        fontSize: 14,
                      }}>
                      Case No:
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        width: '85%',
                        color: '#000',
                        marginLeft: normalize(5),
                        fontWeight: '600',
                      }}>
                      {item?.case_id ? item?.case_id + '-' + item?.year_of_case: 'N/A'}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '15%',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
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
                      }}>
                      <Image
                        source={ICON?.delete}
                        style={{height: normalize(12), width: normalize(12)}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{marginHorizontal: normalize(10)}}
                      onPress={() => {
                        navigation?.navigate('AddCase1', {item: item});
                      }}>
                      <Image
                        source={ICON?.edit_s}
                        style={{height: normalize(12), width: normalize(12)}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {!isEmpty(item?.client) ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: normalize(10),
                      alignItems: 'center',
                      paddingHorizontal: normalize(10),
                    }}>
                    <Image
                      source={ICON?.user_s_s}
                      style={{
                        height: normalize(14),
                        width: normalize(14),
                        tintColor: COLORS?.themeColor,
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        width: '95%',
                        color: COLORS?.themeColor,
                        marginLeft: normalize(10),
                        fontWeight: '600',
                        fontSize: 14,
                      }}>
                      {item?.client}
                    </Text>
                  </View>
                ) : null}
                {!isEmpty(item?.type) ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingBottom: normalize(10),
                      alignItems: 'center',
                      paddingHorizontal: normalize(10),
                    }}>
                    <Image
                      source={ICON.bar_association}
                      style={{
                        height: normalize(14),
                        width: normalize(14),
                        tintColor: COLORS?.themeColor,
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        width: '90%',
                        color: COLORS?.themeColor,
                        marginLeft: normalize(10),
                        fontWeight: '600',
                      }}>
                      {item?.type}
                    </Text>
                  </View>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: normalize(10),
                    paddingBottom: normalize(10),
                  }}>
                  <Image
                    source={ICON.calendar_s}
                    style={{
                      height: normalize(14),
                      width: normalize(14),
                      tintColor: COLORS?.themeColor,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS?.themeColor,
                      marginLeft: normalize(10),
                      fontWeight: '600',
                    }}>
                    {moment(item?.date).format('DD-MM-YYYY')}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: normalize(10),
                    alignItems: 'center',
                    paddingHorizontal: normalize(10),
                  }}>
                  <Image
                    source={ICON.courthouse}
                    style={{
                      height: normalize(14),
                      width: normalize(14),
                      tintColor: COLORS?.themeColor,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      width: '90%',
                      color: COLORS?.themeColor,
                      marginLeft: normalize(10),
                      fontWeight: '600',
                    }}>
                    {!isEmpty(item?.court_details)
                      ? item?.court_details?.name
                      : !isEmpty(item?.state)
                      ? item?.state
                      : 'Suprime Court'}
                  </Text>
                </View>

                {!isEmpty(item?.pitition) ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingBottom: normalize(10),
                      alignItems: 'center',
                      paddingHorizontal: normalize(10),
                    }}>
                    <Image
                      source={ICON.judge}
                      style={{
                        height: normalize(14),
                        width: normalize(14),
                        tintColor: COLORS?.themeColor,
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        width: '90%',
                        color: COLORS?.themeColor,
                        marginLeft: normalize(10),
                        fontWeight: '600',
                      }}>
                      {item?.type_details?.description}
                    </Text>
                  </View>
                ) : null}
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
        {/* ---New Case Card --- */}

        {/* {selectOption?.id == 0 ? (
          <View
            style={{
              paddingHorizontal: normalize(10),
              borderRadius: normalize(10),
              borderColor: COLORS.themeColor,
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: normalize(15),
              marginBottom: normalize(10),
            }}>
            <Image
              source={ICON.search}
              style={{
                height: normalize(20),
                width: normalize(20),
                tintColor: COLORS.themeColor,
              }}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Search by client / party / case no/ title"
              style={{width: '90%'}}
              onChangeText={item => {
                setSearch(item);
                IsInternetConnected()
                  .then(() => {
                    dispatch(caseListRequest({search: item}));
                  })
                  .catch(() => {
                    ToastMessage('Network connection issue');
                  });
              }}
            />
          </View>
        ) : null} */}
        {/* <FlatList
          data={
            // selectOption?.id == 0
            //   ? PostReducer?.cases
            //   : selectOption?.id == 1
            //   ? PostReducer?.caseWin
            //   : PostReducer?.caseLost
            PostReducer?.dashboard?.cases
          }
          style={{marginBottom: normalize(140)}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  paddingTop: index == 0 ? normalize(5) : normalize(15),
                  paddingBottom: normalize(0),
                  paddingHorizontal: normalize(15),
                }}
                onPress={() => {
                  if (selectOption?.id == 0) {
                    if (caseDetail != '') setCaseDetail('');
                    else {
                      setCaseDetail(item);
                    }
                  } else {
                    // IsInternetConnected()
                    //   .then(() => {
                    //     dispatch(caseDetailRequest({case_id: item?.id}));
                    //   })
                    //   .catch(() => {
                    //     ToastMessage('Network connection issue');
                    //   });
                    // navigation.navigate('CaseDetails', {item: item});
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
                      paddingHorizontal: normalize(10),
                    }}>
                    <View
                      style={{
                        marginTop: normalize(4),
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={ICON?.profile}
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
                        {item?.client ? item?.client : 'Anonymous'}
                      </Text>
                    </View>
                    {selectOption?.id == 0 ? (
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
                    ) : null}
                  </View>
                  <View
                    style={{
                      marginTop: normalize(10),
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
                      top: normalize(50),
                    }}>
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: normalize(1),
                        borderBottomColor: '#fff',
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
                      <Text style={{color: '#fff'}}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: normalize(1),
                        borderBottomColor: '#fff',
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
                      <Text style={{color: '#fff'}}>Edit</Text>
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
                      <Text style={{color: '#fff'}}>Delete</Text>
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
        /> */}
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: normalize(30),
          right: normalize(30),
          height: normalize(40),
          width: normalize(40),
          backgroundColor: COLORS.STATUS_BAR,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: normalize(20),
        }}
        onPress={() => {
          // dispatch(updatePageName({pagename: 'AddPage'}));
          if (PostReducer?.profileData?.is_subscribed) {
            navigation.navigate('AddCase1', {pageName: 'edit'});
          } else {
            navigation.navigate('expire');
          }
          
        }}>
        <Image
          source={ICON?.case_history}
          style={{
            height: normalize(20),
            width: normalize(20),
            tintColor: '#FFF',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Cases;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
