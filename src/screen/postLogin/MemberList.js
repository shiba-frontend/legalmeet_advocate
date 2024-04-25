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
  caseDetailRequest,
  caseListRequest,
  clientListRequest,
  memberDeleteRequest,
  memberListRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
var status = '';
const MemberList = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [caseDetail, setCaseDetail] = useState('');
  const dispatch = useDispatch();

  const members = [
    {
      name: 'Indranil Sen',
      phone: '9903178228',
    },
    {
      name: 'Indranil Sen',
      phone: '9903178228',
    },
    {
      name: 'Indranil Sen',
      phone: '9903178228',
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      IsInternetConnected()
        .then(() => {
          dispatch(memberListRequest());
        })
        .catch(() => {
          ToastMessage('Network connection issue');
        });
    }, []),
  );
  useEffect(() => {}, []);
  return (
    <SafeAreaView
    style={{
      flex: 1,
    }}>
    <MyStatusBar
      barStyle={'dark-content'}
      backgroundColor={COLORS.WHITE}
    />
    <Header isMenuPresent={true} navigation={navigation} text={'Members'} />
    <Loader visible={PostReducer.loading} />
    <View
      style={{
        width: Dimensions.get('screen').width - 20,
        alignSelf: 'center',
        marginTop: normalize(10),
      }}>
      <FlatList
        data={PostReducer?.memberList}
        style={{marginBottom: normalize(100)}}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                padding: normalize(10),
                marginTop: normalize(10),
                borderRadius: normalize(10),
                backgroundColor:'#F5F7F8',
                flexDirection:'row',
                alignItems: 'center',
                gap: normalize(7)
              }}
              onPress={() => {
                navigation.navigate('AddMember', {item: item});
              }}>
                <View style={{
                  width:normalize(35),
                  height:normalize(35),
                  backgroundColor:'#002D521A',
                  borderRadius: normalize(4),
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                    <Text style={{
                      textTransform: 'uppercase',
                      fontSize: normalize(14),
                      color:COLORS.themeColor,
                      fontWeight: '600'
                    }}>{item?.name?.substring(0, 1)} </Text>
                </View>
              <View
                style={{
                
                }}>
                
                <Text
                    style={{
                      textTransform: 'capitalize',
                      fontSize: normalize(13),
                      color:COLORS.themeColor,
                      fontWeight: '600'
                    }}
                    numberOfLines={1}>
                    {item?.name}
                  </Text>
                  <Text  style={{
                      fontSize: normalize(10),
                      color:'#5B5B5B',
                      fontWeight: '400'
                    }}> {item?.mobile_number}</Text>
              
              </View>

              <View
                style={{
                  marginLeft:'auto',
                  flexDirection: 'row',
                }}>
                  <TouchableOpacity
                  style={
                    {width:normalize(30),
                      height:normalize(30),
                      backgroundColor:'#FE1C321A',
                      borderRadius:normalize(3),
                      justifyContent:'center',
                      alignItems:'center'
                    }}
                  onPress={() => {
                    setCaseDetail(item);
                    Alert.alert('Are you sure to delete this member', '', [
                      {
                        text: 'Yes',
                        onPress: () => {
                          IsInternetConnected()
                            .then(() => {
                              dispatch(
                                memberDeleteRequest({
                                  member_id: item?.id,
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
                    source={IMAGE.trash}
                    style={{
                      height: normalize(15),
                      width: normalize(15),
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                style={
                  {width:normalize(30),
                    height:normalize(30),
                    backgroundColor:'#35A4431A',
                    borderRadius:normalize(3),
                    justifyContent:'center',
                    alignItems:'center',
                    marginLeft:normalize(5),
                  }}
                  onPress={() => {
                    Linking.openURL(`tel:${item?.mobile_number}`);
                  }}>
                  <Image
                    source={IMAGE.call_calling_one}
                    style={{height: normalize(15), width: normalize(15)}}
                    resizeMode="contain"
                  />
                
                </TouchableOpacity>
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
                  width: normalize(150),
                  height: normalize(150),
                }}
                resizeMode="contain"
              />
            </View>
          );
        }}
      />
    </View>
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: normalize(30),
        right: normalize(30),
      }}
      onPress={() => {
        // dispatch(updatePageName({pagename: 'AddPage'}));
        navigation.navigate('AddMember');
      }}>
      <Image
        source={ICON?.add_client}
        style={{height: normalize(35), width: normalize(35)}}
      />
    </TouchableOpacity>
  </SafeAreaView>
  );
};

export default MemberList;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
