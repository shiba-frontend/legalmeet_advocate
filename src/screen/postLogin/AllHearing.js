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
  Alert,
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
const AllHearing = ({navigation}) => {
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

  const options = ['Today Cases', 'Upcoming Cases'];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        text={'All Hearing'}
        navigation={navigation}
      />
      <Loader visible={PostReducer.loading} />

      <FlatList
        data={PostReducer?.hearingList}
        showsVerticalScrollIndicator={false}
        style={{
          width: Dimensions.get('screen').width - 25,
          alignSelf: 'center',
          backgroundColor: '#fff',
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                // padding: normalize(10),
                borderWidth: normalize(1),
                borderRadius: normalize(10),
                marginBottom: normalize(10),
                borderColor: COLORS.themeColor,
                backgroundColor: '#FFF',
                marginTop: normalize(10),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // borderBottomWidth: normalize(1),
                  // borderBottomColor: '#e7e7e7',
                  padding: normalize(10),
                  backgroundColor: COLORS?.themeColor,
                  borderTopLeftRadius: normalize(10),
                  borderTopRightRadius: normalize(10),
                }}>
                <View>
                  <Text
                    numberOfLines={1}
                    style={{color: COLORS.WHITE, fontWeight: '800'}}>
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
                      tintColor: COLORS.WHITE,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#FFF',
                      marginLeft: normalize(5),
                      marginRight: normalize(10),
                    }}>
                    {moment(item?.date_original).format('DD-MM-YYYY')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Reminder',
                        'Hi ' +
                          item?.case_details?.client +
                          ', \n' +
                          'Your next hearing date is ' +
                          moment(item?.date_original).format('DD-MM-YYYY'),
                        [
                          {
                            text: 'Cancel',
                            onPress: () => {},
                            style: 'cancel',
                          },
                          {
                            text: 'Send',
                            onPress: () => {},
                            style: 'cancel',
                          },
                        ],
                        // {
                        //   cancelable: true,
                        //   onDismiss: () => {

                        //   }
                        //     // Alert.alert(
                        //     //   'This alert was dismissed by tapping outside of the alert dialog.',
                        //     // ),
                        // },
                      );
                    }}>
                    <Image
                      source={ICON.chat}
                      style={{
                        height: normalize(10),
                        width: normalize(10),
                        tintColor: COLORS.WHITE,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {!isEmpty(item?.case_details?.client) ? (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: normalize(5),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomWidth: normalize(1),
                    borderBottomColor: '#e7e7e7',
                    marginHorizontal: normalize(10),
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#000',
                      marginLeft: normalize(5),
                      fontWeight: '800',
                      textAlign: 'center',
                    }}>
                    {item?.case_details?.client +
                      ' vs ' +
                      item?.case_details?.party_name}
                  </Text>
                </View>
              ) : null}
              {!isEmpty(item?.case_details?.court_details?.name) ? (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: normalize(5),
                    borderBottomWidth: normalize(1),
                    borderBottomColor: '#e7e7e7',
                    alignItems: 'center',
                    marginHorizontal: normalize(10),
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
                    marginHorizontal: normalize(10),
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

export default AllHearing;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
