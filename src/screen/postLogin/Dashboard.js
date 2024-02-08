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
import {allHearingRequest} from '../../redux/reducer/PostReducer';
import {useFocusEffect} from '@react-navigation/native';
var status = '';
const Dashboard = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      IsInternetConnected()
        .then(() => {
          dispatch(allHearingRequest());
        })
        .catch(() => {
          ToastMessage('Network connection issue');
        });
    }, []),
  );
  useEffect(() => {}, []);
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }

  const options = [
    {
      image: ICON.user,
      text: 'Clients',
      page: 'Client',
    },
    {
      image: ICON.case_history,
      text: 'Cases',
      page: 'Cases',
    },
    {
      image: ICON.judgement,
      text: 'Judgements',
      page: 'Judgement',
    },
    {
      image: ICON.chat,
      text: 'Enquires',
      page: 'Enquiry',
    },
    {
      image: ICON.case_history,
      text: 'Cause List',
      page: 'Client',
    },
    {
      image: ICON.calender,
      text: 'Calenders',
      page: 'Calender',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={true}
        text={'LEGAL MEET'}
        navigation={navigation}
      />
      <Loader visible={PostReducer.loading} />
      <FlatList
        data={PostReducer?.allHearing}
        showsVerticalScrollIndicator={false}
        style={{
          width: Dimensions.get('screen').width - 25,
          alignSelf: 'center',
          backgroundColor: '#fff',
        }}
        ListHeaderComponent={() => {
          return (
            <View>
              {Number(PostReducer?.profileData?.complete_profile_percentage) /
                100 <
              1 ? (
                <TouchableOpacity
                  style={[
                    styles.shadowProp,
                    {
                      padding: normalize(10),
                      borderWidth: normalize(1),
                      borderColor: COLORS.themeColor,
                      borderRadius: normalize(10),
                      marginVertical: normalize(10),
                      backgroundColor: COLORS.themeColor,
                    },
                  ]}
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: normalize(5),
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={
                          PostReducer?.profileData?.profile_image == ''
                            ? ICON.profile_image
                            : {uri: PostReducer?.profileData?.profile_image}
                        }
                        style={{
                          height: normalize(40),
                          width: normalize(40),
                          borderRadius: normalize(25),
                        }}
                        resizeMode="contain"
                      />
                      <View>
                        <Text
                          style={{
                            marginLeft: normalize(10),
                            color: '#fff',
                            fontSize: normalize(14),
                            fontWeight: '800',
                          }}>
                          {PostReducer?.profileData?.name}
                        </Text>
                        <Text
                          style={{
                            marginLeft: normalize(10),
                            color: '#fff',
                            fontSize: normalize(12),
                            fontWeight: '600',
                            fontStyle: 'italic',
                          }}>
                          {PostReducer?.profileData?.mobile_number}
                        </Text>
                      </View>
                    </View>
                    {PostReducer?.profileData?.charges ? (
                      <View>
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: '600',
                            textAlign: 'right',
                          }}>
                          ₹{PostReducer?.profileData?.charges}
                        </Text>
                        <Text style={{color: '#fff'}}>1 hour consulting</Text>
                      </View>
                    ) : null}
                  </View>
                  {Number(
                    PostReducer?.profileData?.complete_profile_percentage,
                  ) /
                    100 <
                  1 ? (
                    <View
                      style={{
                        paddingTop: normalize(7),
                        borderTopWidth: normalize(1),
                        borderTopColor: '#19affb',
                        marginTop: normalize(7),
                      }}>
                      <Text
                        style={{
                          marginBottom: normalize(10),
                          color: '#fff',
                          fontWeight: '600',
                        }}>
                        Complete Your Profile!
                      </Text>
                      <Progress.Bar
                        progress={
                          Number(
                            PostReducer?.profileData
                              ?.complete_profile_percentage,
                          ) / 100
                        }
                        width={Dimensions.get('screen').width - 50}
                        color={'#6ce4e3'}
                        borderColor={'#19affb'}
                        unfilledColor={'#19affb'}
                      />
                    </View>
                  ) : null}
                </TouchableOpacity>
              ) : null}
              <View>
                <FlatList
                  data={options}
                  numColumns={3}
                  // style={{marginBottom: normalize(10)}}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(item, index) => {
                    return (
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: normalize(10),
                          paddingVertical: normalize(15),
                          borderRadius: normalize(10),
                          borderWidth: normalize(1),
                          borderColor: COLORS.themeColor,
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: Dimensions.get('screen').width / 3.5,
                          marginRight: normalize(10),
                          backgroundColor: '#FFF',
                          marginBottom: normalize(10),
                        }}
                        onPress={() => {
                          navigation.navigate(item?.item?.page);
                        }}>
                        <Image
                          source={item?.item?.image}
                          style={{
                            height: normalize(20),
                            width: normalize(20),
                            tintColor: COLORS.themeColor,
                          }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            fontSize: normalize(10),
                            marginTop: normalize(5),
                            color: COLORS.themeColor,
                          }}>
                          {item?.item?.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: normalize(10),
                }}>
                <Text
                  style={{
                    fontSize: normalize(16),
                    textAlign: 'left',
                    color: '#000',
                    fontWeight: '600',
                  }}>
                  Today Cases ({PostReducer?.todayhearing?.length})
                </Text>
              </View>

              <FlatList
                data={PostReducer?.todayhearing}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={
                  {
                    // width: Dimensions.get('screen').width / 2.5,
                    // alignSelf: 'center',
                  }
                }
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        // padding: normalize(10),
                        // borderWidth: normalize(1),
                        // borderRadius: normalize(10),
                        // marginBottom: normalize(10),
                        // borderColor: '#e7e7e7',
                        // width: Dimensions.get('screen').width / 1.8,
                        // marginRight: normalize(10),
                        // backgroundColor: '#FFF',
                        backgroundColor: COLORS.themeColor,
                        marginRight: normalize(10),
                        width: Dimensions.get('screen').width / 1.8,

                        borderRadius: normalize(10),
                        marginBottom: normalize(10),
                        borderWidth: normalize(3),
                        borderColor: '#9ad4ff',
                        paddingHorizontal: normalize(7),
                        paddingVertical: normalize(8),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingBottom: normalize(5),
                          alignItems: 'center',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#fff',
                            marginLeft: normalize(5),
                            fontWeight: '800',
                          }}>
                          Case No:
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            width: '85%',
                            color: '#fff',
                            marginLeft: normalize(5),
                            fontWeight: '800',
                          }}>
                          {item?.case_details?.case_id
                            ? item?.case_details?.case_id
                            : 'N/A'}
                        </Text>
                      </View>

                      {!isEmpty(
                        item?.case_details?.type_details?.description,
                      ) ? (
                        <View
                          style={{
                            flexDirection: 'row',

                            alignItems: 'center',
                          }}>
                          <Image
                            source={ICON.case_history}
                            style={{
                              height: normalize(15),
                              width: normalize(15),
                              tintColor: '#fff',
                            }}
                            resizeMode="contain"
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              width: '85%',
                              color: '#fff',
                              marginLeft: normalize(5),
                            }}>
                            {item?.case_details?.type_details?.description}
                          </Text>
                        </View>
                      ) : null}
                      {!isEmpty(item?.case_details?.court_details?.name) ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingVertical: normalize(5),
                            alignItems: 'center',
                          }}>
                          <Image
                            source={ICON.location}
                            style={{
                              height: normalize(16),
                              width: normalize(16),
                              tintColor: '#fff',
                            }}
                            resizeMode="contain"
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              width: '95%',
                              color: '#fff',
                              marginLeft: normalize(5),
                            }}>
                            {item?.case_details?.court_details?.name}
                          </Text>
                        </View>
                      ) : null}
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={ICON.calender}
                          style={{
                            height: normalize(14),
                            width: normalize(14),
                            tintColor: '#fff',
                          }}
                          resizeMode="contain"
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#fff',
                            marginLeft: normalize(5),
                          }}>
                          {moment(item?.date_original).format('DD-MM-YYYY')}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height / 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={IMAGE?.no_data}
                        style={{
                          width: Dimensions.get('window').width,
                          height: Dimensions.get('window').height / 10,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  );
                }}
              />
              <View style={{marginTop: normalize(13)}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('displayboard')}>
                  <Image
                    source={ICON.live_board}
                    style={{
                      width: Dimensions.get('screen').width - 20,
                      height: normalize(97),
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: normalize(10),
                }}>
                <Text
                  style={{
                    fontSize: normalize(16),
                    textAlign: 'left',
                    color: '#000',
                    fontWeight: '600',
                  }}>
                  Upcoming Cases ({PostReducer?.allHearing?.length})
                </Text>
                <Text
                  style={{
                    fontSize: normalize(12),
                    textAlign: 'right',
                    color: COLORS.themeColor,
                    fontWeight: '600',
                  }}>
                  View All
                </Text>
              </View>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                padding: normalize(10),
                borderWidth: normalize(1),
                borderRadius: normalize(10),
                marginBottom: normalize(10),
                borderColor: COLORS.themeColor,
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: normalize(1),
                  borderBottomColor: '#e7e7e7',
                  paddingBottom: normalize(5),
                }}>
                <View>
                  <Text
                    numberOfLines={1}
                    style={{color: COLORS.themeColor, fontWeight: '800'}}>
                    Case No:{' '}
                    {item?.case_details?.case_id
                      ? item?.case_details?.case_id
                      : 'N/A'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'centers'}}>
                  <Image
                    source={ICON.calender}
                    style={{
                      height: normalize(14),
                      width: normalize(14),
                      tintColor: COLORS.themeColor,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#000',
                      marginLeft: normalize(5),
                    }}>
                    {moment(item?.date_original).format('DD-MM-YYYY')}
                  </Text>
                </View>
              </View>
              {!isEmpty(item?.case_details?.court_details?.name) ? (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: normalize(5),
                    borderBottomWidth: normalize(1),
                    borderBottomColor: '#e7e7e7',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={ICON.location}
                    style={{
                      height: normalize(15),
                      width: normalize(15),
                      tintColor: COLORS.themeColor,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      width: '95%',
                      color: '#000',
                      marginLeft: normalize(5),
                    }}>
                    {item?.case_details?.court_details?.name}
                  </Text>
                </View>
              ) : null}
              {!isEmpty(item?.case_details?.type_details?.description) ? (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: normalize(5),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={ICON.case_history}
                    style={{
                      height: normalize(15),
                      width: normalize(15),
                      tintColor: COLORS.themeColor,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      width: '95%',
                      color: '#000',
                      marginLeft: normalize(5),
                    }}>
                    {item?.case_details?.type_details?.description}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height / 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={IMAGE?.no_data}
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height / 10,
                }}
                resizeMode="contain"
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
