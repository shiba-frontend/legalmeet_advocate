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
import {
  allHearingRequest,
  dashboardRequest,
  favouriteListRequest,
  getProfileRequest,
} from '../../redux/reducer/PostReducer';
import {useFocusEffect} from '@react-navigation/native';
var status = '';
const FavouriteList = ({navigation}) => {
  const [search, setSearch] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [advocate, setAdvocate] = useState('');
  const [consultNowFlag, setConsultNowFlag] = useState(false);
  const [header, setHeader] = useState('');
  const [subject, setSubject] = useState('');
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      IsInternetConnected()
        .then(() => {
          dispatch(favouriteListRequest());
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.WHITE}
      />
      <Header
        isMenuPresent={false}
        text={'Favourite List'}
        navigation={navigation}
      />
      <Loader visible={PostReducer.loading} />
      {/* <Modal
        isVisible={selectClient}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectClient(false);
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
          <FlatList
            data={PostReducer?.dashboard?.advocates}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                  }}
                  onPress={() => {
                    setClient(item);
                    setSelectClient(false);
                  }}>
                  <Text>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal> */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: normalize(10),
        }}>
        <FlatList
          data={PostReducer?.favouriteList}
          style={{paddingTop: normalize(10), marginBottom: normalize(80)}}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={() => {
          //   return (

          //   );
          // }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  padding: normalize(10),
                  borderRadius: normalize(8),
                  borderWidth: normalize(1),
                  borderColor: '#DDD',
                  width: Dimensions.get('screen').width - 50,
                  marginRight: normalize(10),
                  backgroundColor: '#EFEFEF',
                  marginBottom: normalize(10),
                  height: normalize(130),
                }}
                onPress={() => {
                  navigation.navigate('AdvocateDetail', {item: item});
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    navigation.navigate('AdvocateDetail', {item: item});
                    // navigation.navigate(item?.page);
                  }}>
                  <Image
                    source={{uri: item?.profile_image}}
                    style={{
                      height: normalize(70),
                      width: normalize(70),
                      borderRadius: normalize(3),
                    }}
                    resizeMode="contain"
                  />
                  <View style={{marginLeft: normalize(10), width: '80%'}}>
                    <Text
                      style={{
                        color: COLORS.themeColor,
                        fontWeight: '800',
                        fontSize: normalize(12),
                      }}>
                      {item?.all_details?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: normalize(10),
                        marginTop: normalize(2),
                        color: '#666',
                        fontWeight: '400',
                      }}>
                      {item?.spacialised
                        ? item?.spacialised + ' | ' + item?.since
                        : item?.since}
                    </Text>
                    {item?.all_details?.address ? (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={ICON?.location}
                          style={{
                            height: normalize(12),
                            width: normalize(12),
                            tintColor: '#5B5B5B',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: normalize(10),
                            marginTop: normalize(2),
                            color: '#666',
                            fontWeight: '400',
                            marginLeft: normalize(2),
                          }}>
                          {item?.all_details?.address}
                        </Text>
                      </View>
                    ) : null}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={ICON?.cash}
                        style={{
                          height: normalize(12),
                          width: normalize(12),
                          tintColor: '#5B5B5B',
                        }}
                      />
                      {item?.all_details?.charges != '' ? (
                        <Text
                          style={{
                            fontSize: normalize(10),
                            color: '#666',
                            fontWeight: '400',
                            marginLeft: normalize(2),
                          }}>
                          {item?.all_details?.charges + '₹'}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: normalize(10),
                            color: '#666',
                            fontWeight: '400',
                            marginLeft: normalize(2),
                          }}>
                          Free
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                {!isEmpty(item?.rating) ? (
                  <View style={{flexDirection: 'row'}}>
                    {Math.round(Number(item?.all_details?.rating)) === 5 ? (
                      <Image
                        source={ICON?.rating}
                        style={{
                          height: normalize(12),
                          width: normalize(60),
                        }}
                        resizeMode="contain"
                      />
                    ) : Math.round(Number(item?.all_details?.rating)) == 4 ? (
                      <Image
                        source={ICON?.rating4}
                        style={{
                          height: normalize(12),
                          width: normalize(60),
                        }}
                        resizeMode="contain"
                      />
                    ) : Math.round(Number(item?.all_details?.rating)) == 3 ? (
                      <Image
                        source={ICON?.rating3}
                        style={{
                          height: normalize(12),
                          width: normalize(60),
                        }}
                        resizeMode="contain"
                      />
                    ) : Math.round(Number(item?.all_details?.rating)) == 2 ? (
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
                      {Math.round(Number(item?.all_details?.rating))}{' '}
                    </Text>
                  </View>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: normalize(10),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'rgba(53, 164, 67, 0.1)',
                      padding: normalize(5),
                      borderRadius: normalize(2),
                    }}>
                    <Image
                      source={ICON?.verify}
                      style={{height: normalize(12), width: normalize(12)}}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: '#35A443',
                        fontWeight: '800',
                        marginLeft: normalize(5),
                      }}>
                      Verified
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                    style={{
                      padding: normalize(5),
                      width: normalize(100),
                      backgroundColor: COLORS?.themeColor,
                      borderRadius: normalize(5),
                    }}
                    onPress={() => {
                      // Linking.openURL(`tel:${item?.mobile_number}`);
                    }}>
                    <Text
                      style={{
                        color: COLORS?.WHITE,
                        textAlign: 'center',
                        fontWeight: '800',
                      }}>
                      Consult Now
                    </Text>
                  </TouchableOpacity> */}
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
      </View>
    </SafeAreaView>
  );
};

export default FavouriteList;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
