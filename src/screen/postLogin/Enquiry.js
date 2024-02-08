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
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
var status = '';
const Enquiry = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [search, setSearch] = useState('');
  const [selectOption, setSelectOption] = useState({
    id: 0,
    status: 'Pending',
  });
  const [caseDetail, setCaseDetail] = useState('');
  const options = [
    {
      id: 0,
      status: 'Pending',
    },
    {
      id: 1,
      status: 'Win',
    },
    {
      id: 2,
      status: 'Lost',
    },
  ];
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
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Enquiries'}
      />
      <Loader visible={PostReducer.loading && search == ''} />

      <View
        style={{
          width: Dimensions.get('screen').width - 10,
          alignSelf: 'center',
          marginTop: normalize(10),
        }}>
        {selectOption?.id == 0 ? (
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
        ) : null}
        <FlatList
          data={
            selectOption?.id == 0
              ? PostReducer?.cases
              : selectOption?.id == 1
              ? PostReducer?.caseWin
              : PostReducer?.caseLost
          }
          style={{marginBottom: normalize(90)}}
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
                    IsInternetConnected()
                      .then(() => {
                        dispatch(caseDetailRequest({case_id: item?.id}));
                      })
                      .catch(() => {
                        ToastMessage('Network connection issue');
                      });
                    navigation.navigate('CaseDetails', {item: item});
                  }
                }}>
                <View
                  style={{
                    overflow: 'hidden',
                    // marginTop: normalize(5),
                    borderTopLeftRadius: normalize(10),
                    borderTopRightRadius: normalize(10),
                    borderColor: COLORS.themeColor,
                    borderWidth: normalize(1),
                    paddingVertical: normalize(10),
                  }}>
                  <View
                    style={{
                      marginTop: normalize(4),
                      flexDirection: 'row',
                      paddingHorizontal: normalize(10),
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
                      marginTop: normalize(4),
                      paddingHorizontal: normalize(10),
                    }}>
                    <Text
                      numberOfLines={4}
                      style={{
                        textTransform: 'capitalize',
                        // width: '90%',
                      }}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    // marginTop: normalize(4),
                    backgroundColor: COLORS.themeColor,
                    padding: normalize(10),
                    marginBottom: normalize(5),
                    // marginTop: normalize(-5),
                    borderBottomLeftRadius: normalize(10),
                    borderBottomRightRadius: normalize(10),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      marginLeft: normalize(0),
                      textTransform: 'capitalize',
                      color: '#fff',
                      textAlign: 'center',
                      fontWeight: '800',
                      fontSize: normalize(14),
                    }}
                    numberOfLines={1}>
                    Reply
                  </Text>
                </View>
                {/* {caseDetail?.id == item?.id ? (
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
                ) : null} */}
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

export default Enquiry;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
