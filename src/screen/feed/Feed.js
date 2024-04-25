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
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
import {feedListRequest} from '../../redux/reducer/PostReducer';

const Feed = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(feedListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
    //
  }, []);

  const PostReducer = useSelector(state => state.PostReducer);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header isMenuPresent={false} navigation={navigation} text={'Feeds'} />
      <Loader visible={PostReducer.loading} />
      <View
        style={{
          width: Dimensions.get('screen').width,
          alignSelf: 'center',
          marginTop: normalize(20),
          marginBottom: normalize(20),
        }}>
        <FlatList
          data={PostReducer?.feedList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('feeddetails', {item: item});
                }}
                style={{
                  marginBottom: normalize(15),
                  paddingHorizontal: normalize(15),
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingBottom: normalize(15),
                }}>
                <View>
                  <Image
                    source={{uri: item?.image}}
                    style={{height: normalize(150), width: '100%'}}
                  />
                </View>
                <View style={{paddingTop: normalize(7)}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: normalize(15),
                      fontWeight: '600',
                      marginBottom: normalize(6),
                    }}>
                    {item.title}
                  </Text>
                  <Text style={{color: '#666', fontSize: normalize(12)}}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Feed;
