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
  clientDeleteRequest,
  clientListRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
var status = '';
const Client = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/clientDeleteRequest':
        status = PostReducer?.status;
        break;
      case 'post/clientDeleteSuccess':
        status = PostReducer?.status;
        IsInternetConnected()
          .then(() => {
            dispatch(clientListRequest());
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
        dispatch(clientListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Client List'}
      />
      <Loader visible={PostReducer.loading} />
      <ScrollView>
        <View
          style={{
            width: Dimensions.get('screen').width - 20,
            alignSelf: 'center',
            marginTop: normalize(10),
          }}>
          <View
            style={{
              paddingHorizontal: normalize(10),
              borderWidth: normalize(1),
              borderRadius: normalize(10),
              borderColor: COLORS.themeColor,
              marginBottom: normalize(10),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={ICON.search}
              style={{
                height: normalize(15),
                width: normalize(15),
                tintColor: COLORS.themeColor,
              }}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Search Client"
              style={{width: '90%'}}
              onChangeText={item => {
                IsInternetConnected()
                  .then(() => {
                    dispatch(clientListRequest({search: item}));
                  })
                  .catch(() => {
                    ToastMessage('Network connection issue');
                  });
              }}
            />
          </View>
          <FlatList
            data={PostReducer?.clients}
            style={{}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFF',
                    marginBottom: normalize(10),
                    borderRadius: normalize(10),
                    borderWidth: normalize(1),
                    borderColor: COLORS.themeColor,
                  }}
                  onPress={() => {
                    console.log('Hello');
                    dispatch(updatePageName({pagename: 'EditPage'}));
                    navigation.navigate('AddClient', {item: item});
                  }}>
                  <View
                    style={{
                      padding: normalize(10),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={ICON?.profile_image}
                        style={{
                          height: normalize(35),
                          width: normalize(35),
                          borderRadius: normalize(28),
                          borderWidth: normalize(1),
                          borderColor: COLORS?.STATUS_BAR,
                        }}
                        resizeMode="contain"
                      />
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            marginLeft: normalize(10),
                            fontSize: normalize(14),
                            fontWeight: '800',
                          }}>
                          {item?.name}
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            marginLeft: normalize(10),
                            fontSize: normalize(11),
                            fontWeight: '500',
                          }}>
                          {item?.email}
                        </Text>
                        <TouchableOpacity
                          style={{
                            paddingHorizontal: normalize(5),
                            paddingVertical: normalize(3),
                            backgroundColor: COLORS?.STATUS_BAR,
                            width: normalize(70),
                            borderRadius: normalize(20),
                            alignItems: 'center',
                            marginLeft: normalize(10),
                            marginTop: normalize(3),
                          }}>
                          <Text style={{color: '#FFF'}}>
                            {item?.client_type == 1
                              ? 'Individual'
                              : 'Corporate'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        Alert.alert('Are you sure to delete this client', '', [
                          {
                            text: 'Yes',
                            onPress: () => {
                              IsInternetConnected()
                                .then(() => {
                                  dispatch(
                                    clientDeleteRequest({client_id: item?.id}),
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
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: normalize(30),
                      right: normalize(10),
                    }}
                    onPress={() => {
                      // Check for perfect 10 digit length
                      if (String(item?.mobile_number)?.length != 10) {
                        Alert.alert('Please insert correct contact number ');
                        return;
                      }
                      Linking.openURL(`tel:${item?.mobile_number}`);

                      // Make a call
                      // call(args).catch(console.error);
                    }}>
                    <Image
                      source={ICON?.call}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: COLORS.themeColor,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  {/* <View
                    style={{
                      padding: normalize(10),
                      borderTopWidth: normalize(1),
                      borderTopColor: COLORS.themeColor,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        padding: normalize(7),
                        backgroundColor: '#11C900',
                      }}
                    />
                    <Text style={{marginHorizontal: normalize(10)}}>
                      Allocated : 1
                    </Text>
                    <View
                      style={{
                        padding: normalize(7),
                        backgroundColor: '#9D44C0',
                      }}
                    />
                    <Text style={{marginHorizontal: normalize(10)}}>
                      Current : 1
                    </Text>
                    <View
                      style={{
                        padding: normalize(7),
                        backgroundColor: '#FC1E00',
                      }}
                    />
                    <Text style={{marginHorizontal: normalize(10)}}>
                      Disposed : 1
                    </Text>
                  </View> */}
                  <View
                    style={{
                      padding: normalize(10),
                      borderTopWidth: normalize(1),
                      borderTopColor: COLORS.themeColor,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Invoiced : ₹ 14000 /-</Text>
                    <Text>Received : ₹ 14000 /-</Text>
                  </View>
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
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: normalize(30),
          right: normalize(0),
          padding: normalize(10),
          backgroundColor: '#f2f2f2',
          borderTopLeftRadius: normalize(30),
          borderBottomLeftRadius: normalize(30),
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            dispatch(updatePageName({pagename: 'AddPage'}));
            navigation.navigate('ClientAddBasicDetail');
          }}>
          <Image
            source={ICON?.add_client}
            style={{height: normalize(35), width: normalize(35)}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Client;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
