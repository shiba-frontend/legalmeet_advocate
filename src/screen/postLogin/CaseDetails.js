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
  Linking,
  Platform,
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
  caseDetailRequest,
  caseDocumentDeleteRequest,
  caseListRequest,
  caseStatusChangeRequest,
  clientListRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';
var status = '';
const CasesDetails = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const [option, setOption] = useState('Hearing Date');
  const options = ['Hearing Date', 'Documents', 'Note'];

  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }

  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/caseDocumentDeleteRequest':
        status = PostReducer?.status;
        break;
      case 'post/caseDocumentDeleteSuccess':
        status = PostReducer?.status;
        IsInternetConnected()
          .then(() => {
            dispatch(caseDetailRequest({case_id: PostReducer?.caseDetail?.id}));
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        break;
      case 'post/caseStatusChangeRequest':
        status = PostReducer?.status;
        break;
      case 'post/caseStatusChangeSuccess':
        status = PostReducer?.status;
        navigation.goBack();
        break;
    }
  }

  useEffect(() => {
    // IsInternetConnected()
    //   .then(() => {
    //     dispatch(caseListRequest());
    //   })
    //   .catch(() => {
    //     ToastMessage('Network connection issue');
    //   });
  }, []);
  return (
    <>
      <ScrollView
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
          text={'Case Details'}
        />
        <Loader visible={PostReducer.loading} />
        <View
          style={{
            width: Dimensions.get('screen').width - 20,
            alignSelf: 'center',
            marginTop: normalize(10),
          }}>
          <View style={{padding: normalize(15)}}>
            <View
              style={{
                padding: normalize(10),
                borderWidth: normalize(1),
                marginTop: normalize(10),
                borderRadius: normalize(10),
                borderColor: COLORS.themeColor,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
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
                    {PostReducer?.caseDetail?.client
                      ? PostReducer?.caseDetail?.client
                      : 'Anonymous'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: normalize(10),
                  flexDirection: 'row',
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
                  {PostReducer?.caseDetail?.case_details}
                </Text>
              </View>
              <View
                style={{
                  marginTop: normalize(10),
                  flexDirection: 'row',
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
                  {PostReducer?.caseDetail?.court}
                </Text>
              </View>
              <View
                style={{
                  marginTop: normalize(10),
                  flexDirection: 'row',
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
                    color: '#000',
                  }}>
                  {moment(PostReducer?.caseDetail?.date).format('DD-MM-YYYY')}
                </Text>
              </View>
              <View
                style={{
                  marginTop: normalize(10),
                  flexDirection: 'row',
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
                  {PostReducer?.caseDetail?.type}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: normalize(20),
            backgroundColor: '#fff',
          }}>
          <FlatList
            data={options}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: Dimensions.get('screen').width / 2.8,
                    alignItems: 'center',
                    paddingVertical: normalize(10),
                    borderBottomWidth:
                      item != option ? normalize(0) : normalize(3),
                    borderBottomColor: COLORS.STATUS_BAR,
                  }}
                  onPress={() => {
                    setOption(item);
                  }}>
                  <Text
                    style={{
                      color: item != option ? '#000' : COLORS.themeColor,
                      fontSize: normalize(14),
                      fontWeight: '800',
                      padding: normalize(4),
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {option == 'Hearing Date' ? (
          <View style={{padding: normalize(15), marginTop: normalize(10)}}>
            {PostReducer?.caseDetail?.final_report == 0 ? (
              <TouchableOpacity
                style={{
                  padding: normalize(15),
                  backgroundColor: 'rgba(17, 201, 0, 0.09)',
                  alignItems: 'center',
                  borderRadius: normalize(12),
                }}
                onPress={() => {
                  navigation.navigate('AddHearing');
                }}>
                <Text style={{fontWeight: '800'}}>Add Hearing Date</Text>
              </TouchableOpacity>
            ) : null}
            <FlatList
              data={PostReducer?.caseDetail?.hearing}
              style={{marginBottom: normalize(50)}}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      padding: normalize(10),
                      borderWidth: normalize(1),
                      marginTop: normalize(20),
                      borderRadius: normalize(10),
                      borderColor: COLORS.themeColor,
                    }}>
                    <View
                      style={{marginTop: normalize(4), flexDirection: 'row'}}>
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
                        {PostReducer?.caseDetail?.court}
                      </Text>
                    </View>
                    <View
                      style={{marginTop: normalize(10), flexDirection: 'row'}}>
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
                          color: '#000',
                        }}>
                        {moment(item?.hearing_date).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: normalize(5),
                        top: normalize(5),
                      }}
                      onPress={() => {
                        Alert.alert(
                          'Are you sure to delete this document',
                          '',
                          [
                            {
                              text: 'Yes',
                              onPress: () => {
                                IsInternetConnected()
                                  .then(() => {
                                    dispatch(
                                      caseDocumentDeleteRequest({
                                        type: 'hearing',
                                        hearing_id: item?.id,
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
                          ],
                        );
                      }}>
                      <Image
                        source={ICON?.delete}
                        style={{height: normalize(15), width: normalize(15)}}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        ) : null}

        {option == 'Documents' ? (
          <View style={{padding: normalize(15), marginTop: normalize(10)}}>
            <TouchableOpacity
              style={{
                padding: normalize(15),
                backgroundColor: 'rgba(17, 201, 0, 0.09)',
                alignItems: 'center',
                borderRadius: normalize(12),
              }}
              onPress={() => {
                navigation.navigate('CaseDocument');
              }}>
              <Text style={{fontWeight: '800'}}>Add Documents</Text>
            </TouchableOpacity>
            <FlatList
              data={PostReducer?.caseDetail?.document}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      padding: normalize(10),
                      borderWidth: normalize(1),
                      marginTop: normalize(10),
                      borderRadius: normalize(10),
                      borderColor: '#DDD',
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
                      resizeMode="contain"
                      style={{
                        width: Dimensions?.get('screen').width / 2 - 75,
                        height: normalize(100),
                      }}
                    />
                    {/* <Text
                      style={{textTransform: 'uppercase', fontWeight: '800'}}>
                      {item?.document_name.replace(' ', '_') + '.' + item?.type}
                    </Text> */}
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: normalize(5),
                        top: normalize(5),
                      }}
                      onPress={() => {
                        Alert.alert(
                          'Are you sure to delete this document',
                          '',
                          [
                            {
                              text: 'Yes',
                              onPress: () => {
                                IsInternetConnected()
                                  .then(() => {
                                    dispatch(
                                      caseDocumentDeleteRequest({
                                        type: 'document',
                                        document_id: item?.id,
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
                          ],
                        );
                      }}>
                      <Image
                        source={ICON?.delete}
                        style={{height: normalize(15), width: normalize(15)}}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}

        {option == 'Note' ? (
          <View style={{padding: normalize(15), marginTop: normalize(10)}}>
            <TouchableOpacity
              style={{
                padding: normalize(15),
                backgroundColor: 'rgba(17, 201, 0, 0.09)',
                alignItems: 'center',
                borderRadius: normalize(12),
              }}
              onPress={() => {
                navigation.navigate('AddNote');
              }}>
              <Text style={{fontWeight: '800'}}>Add Note</Text>
            </TouchableOpacity>
            <FlatList
              data={PostReducer?.caseDetail?.note}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      padding: normalize(10),
                      borderWidth: normalize(2),
                      marginTop: normalize(20),
                      borderRadius: normalize(10),
                      borderColor: '#DDD',
                    }}>
                    <View
                      style={{
                        marginTop: normalize(4),
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: 14,
                          fontStyle: 'italic',
                          color: COLORS.PINK,
                          marginBottom: normalize(4),
                        }}>
                        {moment(item?.date).format('DD-MM-YYYY')}
                      </Text>

                      <Text>{item?.note}</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: normalize(5),
                        top: normalize(5),
                      }}
                      onPress={() => {
                        Alert.alert(
                          'Are you sure to delete this document',
                          '',
                          [
                            {
                              text: 'Yes',
                              onPress: () => {
                                IsInternetConnected()
                                  .then(() => {
                                    dispatch(
                                      caseDocumentDeleteRequest({
                                        type: 'note',
                                        note_id: item?.id,
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
                          ],
                        );
                      }}>
                      <Image
                        source={ICON?.delete}
                        style={{height: normalize(15), width: normalize(15)}}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        ) : null}

        {/* {option == 'Case Status' ? (
        <View style={{padding: normalize(15), marginTop: normalize(10)}}>
          <TouchableOpacity
            style={{
              padding: normalize(15),
              backgroundColor: 'rgba(17, 201, 0, 0.09)',
              alignItems: 'center',
              borderRadius: normalize(12),
            }}
            onPress={() => {
              // navigation.navigate('AddCase1', {pageName: 'add'});
            }}>
            <Text style={{fontWeight: '800'}}>Add Case Status</Text>
          </TouchableOpacity>
          <FlatList
            data={PostReducer?.caseDetail?.note}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    padding: normalize(10),
                    borderWidth: normalize(2),
                    marginTop: normalize(20),
                    borderRadius: normalize(10),
                    borderColor: '#DDD',
                  }}>
                  <View
                    style={{marginTop: normalize(4), flexDirection: 'column'}}>
                    <Text>Case Status</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      ) : null} */}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          backgroundColor: '#fff',
          width: Dimensions.get('screen').width,
        }}>
        <TouchableOpacity
          style={{
            width: Dimensions.get('screen').width / 2,
            padding: normalize(14),
            backgroundColor: COLORS.STATUS_BAR,
            alignItems: 'center',
          }}
          onPress={() => {
            console.log(PostReducer?.caseDetail?.generate_pdf);
            if (PostReducer?.caseDetail?.generate_pdf) {
              const android = RNFetchBlob.android;

              RNFetchBlob.config({
                addAndroidDownloads: {
                  useDownloadManager: true,
                  title: 'casehistory.pdf',
                  description: 'An awesome PDF',
                  mime: 'application/pdf',
                  mediaScannable: true,
                  notification: true,
                },
              })
                .fetch('GET', PostReducer?.caseDetail?.generate_pdf)
                .then(res => {
                  const path = res.path();
                  if (Platform.OS === 'ios') {
                    RNFetchBlob.ios.openDocument(path);
                  } else {
                    android.actionViewIntent(path, 'application/pdf');
                  }
                });
            }
            // Linking.openURL(PostReducer?.caseDetail?.generate_pdf).catch(
            //   err => console.error('An error occurred', err),
            // );
          }}>
          <Text style={{color: COLORS.WHITE}}>Export as PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: Dimensions.get('screen').width / 2,
            padding: normalize(14),
            backgroundColor: COLORS.secondarColor,
            alignItems: 'center',
          }}
          onPress={() => {
            status = PostReducer?.status;
            if (PostReducer?.caseDetail?.final_report == 0) {
              Alert.alert('FINAL JUDGEMENT!', 'Final judgement declare', [
                {
                  text: 'Cancel',
                  onPress: () => {},
                },
                {
                  text: 'Loose',
                  onPress: () => {
                    IsInternetConnected()
                      .then(() => {
                        dispatch(
                          caseStatusChangeRequest({
                            case_id: PostReducer?.caseDetail?.id,
                            status: 2,
                          }),
                        );
                      })
                      .catch(() => {
                        ToastMessage('Network connection issue');
                      });
                  },
                  style: 'cancel',
                },
                {
                  text: 'Win',
                  onPress: () => {
                    IsInternetConnected()
                      .then(() => {
                        dispatch(
                          caseStatusChangeRequest({
                            case_id: PostReducer?.caseDetail?.id,
                            status: 1,
                          }),
                        );
                      })
                      .catch(() => {
                        ToastMessage('Network connection issue');
                      });
                  },
                },
              ]);
            } else {
              ToastMessage(
                PostReducer?.caseDetail?.final_report == 1
                  ? 'You win this case'
                  : 'You lost this case',
              );
            }
          }}>
          <Text style={{color: COLORS.WHITE}}>Final Judgement</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CasesDetails;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
