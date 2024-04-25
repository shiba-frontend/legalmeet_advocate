import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  View,
} from 'react-native';

import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  notificationListRequest,
  productListRequest,
} from '../../redux/reducer/ProfileReducer';
import Loader from '../../utils/helpers/Loader';
import {ToastMessage} from '../../utils/helpers/Toast';
import Header from '../../utils/helpers/Header';
import {COLORS} from '../../utils/Theme';
import {navigate} from '../../utils/helpers/RootNavigation';
import {
  getProfileRequest,
  markNotificationRequest,
} from '../../redux/reducer/PostReducer';
export default function NotificationList(props) {
  const [selectedOption, setSelectedOption] = useState({
    name: 'Live',
    status: 1,
  });
  const PostReducer = useSelector(state => state.PostReducer);
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(getProfileRequest());
      })
      .catch(() => {
        ToastMessage('Network connection error');
      });
  }, []);
  const dispatch = useDispatch();
  function OptionRenderItem({item, index}) {
    return (
      <TouchableOpacity
        style={{
          width: Dimensions?.get('window').width / 3,
          padding: normalize(10),
          borderBottomWidth:
            selectedOption?.status == item?.status
              ? normalize(2)
              : normalize(0),
          borderBottomColor: '#5FA212',
        }}
        onPress={() => {
          setSelectedOption(item);
          // IsInternetConnected()
          //   .then(() => {
          //     dispatch(productListRequest({status: item?.status}));
          //   })
          //   .catch(() => {
          //     ToastMessage('Network connection error');
          //   });
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: FONTS.Poppins_SemiBold,
            fontSize: normalize(10),
            color: selectedOption?.status == item?.status ? '#5FA212' : '#000',
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <>
      <MyStatusBar backgroundColor={COLORS.WHITE} barStyle={'dark-content'} />
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: COLORS.WHITE}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <SafeAreaView style={{flex: 1}}>
          <Header
            isMenuPresent={false}
            text={'Notifications'}
            navigation={props?.navigation}
          />
          {/* <Loader visible={PostReducer?.isLoading} /> */}

          <View style={{marginHorizontal: normalize(15), alignItems: 'center'}}>
            <FlatList
              data={PostReducer?.profileData?.all_notifications}
              showsVerticalScrollIndicator={false}
              style={{marginBottom: normalize(50)}}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      // backgroundColor: item?.is_read == 0 ? '#EEE' : '#FFF',
                      borderRadius: normalize(10),
                      width: Dimensions.get('window').width - 40,
                      marginVertical: normalize(5),
                      padding: normalize(5),
                      marginBottom: normalize(0),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      IsInternetConnected()
                        .then(() => {
                          dispatch(
                            markNotificationRequest({
                              notification_id: item?.id,
                            }),
                          );
                        })
                        .catch(() => {
                          ToastMessage('Network connection error');
                        });
                      if (item?.type == 'subscription') {
                        navigate('Appointment');
                      } else if (item?.type == 'case') {
                        navigate('Cases');
                        // } else if (item?.type == 'consult') {
                        //   navigate('Report');
                      } else if (item?.type == 'enquiry') {
                        navigate('EnqueryList');
                        // } else if (item?.type == 'consult') {
                        //   navigate('Report');
                      }
                    }}>
                    {item?.is_read == 0 ? (
                      <View
                        style={{
                          height: normalize(6),
                          width: normalize(6),
                          borderRadius: normalize(3),
                          backgroundColor: COLORS?.themeColor,
                        }}
                      />
                    ) : null}
                    <View style={{marginLeft: normalize(5), width: '95%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          gap:normalize(5),
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: normalize(12),
                          }}>
                          {item?.title}
                        </Text>
                        <Text
                          style={{
                            color: '#8F8B8A',
                            fontSize: normalize(9),
                          }}>
                          {moment(item?.created_at).format('hh:mm A')}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#8F8B8A',
                            fontSize: normalize(10),
                          }}>
                          {item?.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      height: Dimensions?.get('window')?.height / 1.2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(14),
                        color: COLORS?.yellow,
                      }}>
                      No data found
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {/* </ScrollView> */}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    //alignItems: 'center',
  },
  lowerText: {
    marginTop: normalize(20),
    marginBottom: normalize(15),
    fontSize: normalize(11),
    color: COLORS.black,
  },
  topHeaderText: {
    fontSize: normalize(30),
    color: COLORS.black,
    marginBottom: normalize(20),
    alignSelf: 'flex-start',
  },
  topHeaderText1: {
    fontSize: normalize(12),
    color: '#FF98BA',
    lineHeight: normalize(19),
    marginTop: normalize(6),
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    borderTopLeftRadius: normalize(20),
    borderBottomLeftRadius: normalize(20),
    borderRadius: 0,
    width: '50%',
    marginTop: normalize(60),
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: COLORS.white,
    height: normalize(45),
    borderRadius: normalize(5),
    width: '90%',
    flexDirection: 'row',
  },

  textInputFont: {
    fontSize: normalize(11),
    color: COLORS.WHITE,
  },

  backButton: {
    marginTop: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(0),
  },
});
