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
  draftListRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
var status = '';
const DraftList = ({navigation}) => {
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
            dispatch(draftListRequest());
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
        dispatch(draftListRequest());
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
      backgroundColor={COLORS.WHITE}
    />
    <Header
      isMenuPresent={false}
      navigation={navigation}
      text={'Draft Category List'}
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
            placeholder="Search Draft Category List"
            style={{width: '90%'}}
            onChangeText={item => {
              IsInternetConnected()
                .then(() => {
                  dispatch(draftListRequest({search: item}));
                })
                .catch(() => {
                  ToastMessage('Network connection issue');
                });
            }}
          />
        </View>
        <FlatList
          data={PostReducer?.draftList}
          style={{}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.themeColor,
                  marginBottom: normalize(10),
                  borderRadius: normalize(10),
                  borderWidth: normalize(1),
                  borderColor: COLORS.themeColor,
                }}
                onPress={() => {
                  // console.log('Hello');
                  // dispatch(updatePageName({pagename: 'EditPage'}));
                  navigation.navigate('DraftListWithLanguage', {item: item});
                }}>
                <View
                  style={{
                    padding: normalize(10),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: COLORS.secondarColor,
                      marginLeft: normalize(10),
                      fontSize: normalize(14),
                      fontWeight: '800',
                    }}>
                    {item?.name}
                  </Text>
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
  </SafeAreaView>
  );
};

export default DraftList;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
