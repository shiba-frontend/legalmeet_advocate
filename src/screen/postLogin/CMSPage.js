import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import Header from '../../utils/helpers/Header';
import normalize from '../../utils/helpers/normalize';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  consultationListRequest,
  serviceListRequest,
} from '../../redux/reducer/PostReducer';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {ToastMessage} from '../../utils/helpers/Toast';
import {cmsDataRequest} from '../../redux/reducer/AuthReducer';
import { useFocusEffect } from '@react-navigation/native';

const CMSPage = ({navigation, route}) => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }

  useFocusEffect(
    React.useCallback(() => {
      IsInternetConnected()
        .then(() => {

          dispatch(cmsDataRequest({ alias: route?.params.alias }));

         
        })
        .catch(() => {
          ToastMessage('Network connection issue');
        });
    }, []),
  );
  return (
   
      <View>
        <MyStatusBar
          barStyle={'dark-content'}
          backgroundColor={'#fff'}
        />
        <Header
          isMenuPresent={false}
          navigation={navigation}
          text={route?.params?.page}
        />
         <ScrollView>
        <View
          style={{
            paddingTop: normalize(10),
            paddingBottom:normalize(50)
          }}>
          <Text
            style={{
              //marginTop: normalize(5),
              color: '#222',
              fontWeight: '400',
              fontSize: normalize(12),
              paddingLeft: normalize(10),
              marginBottom: normalize(10),
              marginTop: normalize(12),
              lineHeight: normalize(19),
            }}>
            {AuthReducer?.cmsData?.description}
          </Text>
        </View>
        </ScrollView>
      </View>
   
  );
};

export default CMSPage;

const styles = StyleSheet.create({});
