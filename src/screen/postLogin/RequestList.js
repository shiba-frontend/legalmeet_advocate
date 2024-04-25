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
  requestListRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
var status = '';
const RequestList = ({navigation}) => {
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

  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(requestListRequest());
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
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Request List'}
      />
      <Loader visible={PostReducer.loading} />

      <View
        style={{
          width: Dimensions.get('screen').width - 10,
          alignSelf: 'center',
          marginTop: normalize(10),
          height: Dimensions.get('window').height - 100,
        }}>
        <FlatList
          data={PostReducer?.requestList}
          style={{}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  overflow: 'hidden',
                  marginTop: normalize(10),
                  borderRadius: normalize(10),
                  borderColor: COLORS.themeColor,
                  borderWidth: normalize(1),
                  paddingVertical: normalize(10),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: normalize(10),
                  }}>
                  <Text
                    style={{
                      // marginLeft: normalize(10),
                      fontSize: normalize(14),
                      fontWeight: '600',
                    }}>
                    {item?.title}
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
                    {item?.description}
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: normalize(30),
            right: normalize(30),
            backgroundColor: COLORS.themeColor,
            height: normalize(40),
            width: normalize(40),
            borderRadius: normalize(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            // dispatch(updatePageName({pagename: 'AddPage'}));
            navigation.navigate('AddRequest');
          }}>
          <Image
            source={ICON?.edit}
            style={{height: normalize(25), width: normalize(25)}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RequestList;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
