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
  draftLanguageRequest,
  draftListRequest,
  draftRequest,
  ebookRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
var status = '';
const Ebook = ({route, navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [active, setactive] = useState('eng');

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
            dispatch(ebookRequest());
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        break;
    }
  }

  const languageOptions = [
    {
      title: 'English',
      key: 'eng'
    },
    {
      title: 'Hindi (हिंदी )',
      key: 'hind'
    },
    {
      title: 'Bengali (বাঙ্গালী )',
      key: 'beng'
    }
  ]

  useEffect(() => {


    IsInternetConnected()
      .then(() => {
       // dispatch(draftLanguageRequest({category_id: route?.params?.item?.id}));
        dispatch(ebookRequest({category_id: route?.params?.item?.id}));
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);

const ToggleHandle = (id) =>{
  setactive(id)
}




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
      text={'Ebook List'}
    />
    <Loader visible={PostReducer.loading} />
    <ScrollView>
      <View
        style={{
          width: Dimensions.get('screen').width - 20,
          alignSelf: 'center',
          marginTop: normalize(10),
        }}>
      
        <View>
          <FlatList
            data={languageOptions}
            horizontal={true}
            style={{marginVertical: normalize(10)}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: Dimensions.get('window').width / 2 - 20,
                    padding: normalize(10),
                    borderWidth: normalize(1),
                    marginRight: normalize(10),
                    borderColor: COLORS.themeColor,
                    backgroundColor:active == item.key  ? COLORS.themeColor : '#fff'
                    // borderColor: COLORS.themeColor,
                  }}
                  onPress={()=>ToggleHandle(item.key)}>
                  <Text style={{textAlign: 'center', color: active == item.key  ? '#fff'  :  COLORS.themeColor}}>{item?.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {active == 'eng' &&
        <FlatList
          data={PostReducer?.ebook
            ?.EN}
          style={{}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: '#FFF',
                  marginBottom: normalize(10),
                  borderRadius: normalize(10),
                  borderWidth: normalize(1),
                  borderColor: COLORS.themeColor,
                  padding: normalize(10),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems:'center'
                }}
              >
                <View
                  style={{
                   width:'90%'
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: normalize(14),
                      fontWeight: '800',
                    }}> 
                    {item?.document_name}
                  </Text>
                  <Text>Cate: {item?.category}</Text>
                  <Text>Lang: {item?.language}</Text>
                </View>
                <View>
                  <TouchableOpacity style={{
                   width:'10%'
                  }}
                  onPress={() => {
                    Linking.openURL(item?.file);
                  }}
                  >
                      <Image source={ICON.import} />
                  </TouchableOpacity>
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
                    width: normalize(200),
                    height: normalize(200),
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          }}
        />
      }
       {active == 'hind' &&
        <FlatList
          data={PostReducer?.ebook?.HN}
          style={{}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: '#FFF',
                  marginBottom: normalize(10),
                  borderRadius: normalize(10),
                  borderWidth: normalize(1),
                  borderColor: COLORS.themeColor,
                  padding: normalize(10),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems:'center'
                }}
              >
                <View
                  style={{
                   width:'90%'
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: normalize(14),
                      fontWeight: '800',
                    }}> 
                    {item?.document_name}
                  </Text>
                  <Text>Cate: {item?.category}</Text>
                  <Text>Lang: {item?.language}</Text>
                </View>
                <View>
                  <TouchableOpacity style={{
                   width:'10%'
                  }}
                  onPress={() => {
                    Linking.openURL(item?.file);
                  }}
                  >
                      <Image source={ICON.import} />
                  </TouchableOpacity>
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
                    width: normalize(200),
                    height: normalize(200),
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          }}
        />
      }
       {active == 'beng' &&
        <FlatList
          data={PostReducer?.ebook?.BE}
          style={{}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: '#FFF',
                  marginBottom: normalize(10),
                  borderRadius: normalize(10),
                  borderWidth: normalize(1),
                  borderColor: COLORS.themeColor,
                  padding: normalize(10),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems:'center'
                }}
              >
                <View
                  style={{
                   width:'90%'
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: normalize(14),
                      fontWeight: '800',
                    }}> 
                    {item?.document_name}
                  </Text>
                  <Text>Cate: {item?.category}</Text>
                  <Text>Lang: {item?.language}</Text>
                </View>
                <View>
                  <TouchableOpacity style={{
                   width:'10%'
                  }}
                  onPress={() => {
                    Linking.openURL(item?.file);
                  }}
                  >
                      <Image source={ICON.import} />
                  </TouchableOpacity>
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
                    width: normalize(200),
                    height: normalize(200),
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          }}
        />
      }
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default Ebook;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
