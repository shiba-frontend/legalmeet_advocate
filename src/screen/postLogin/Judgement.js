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
  judgementRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {navigate} from '../../utils/helpers/RootNavigation';
var status = '';
const Judgement = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  console.log('jadgement list', PostReducer?.judgement);

  // if (status == '' || status != PostReducer?.status) {
  //   switch (PostReducer?.status) {
  //     case 'post/clientDeleteRequest':
  //       status = PostReducer?.status;
  //       break;
  //     case 'post/clientDeleteSuccess':
  //       status = PostReducer?.status;
  //       IsInternetConnected()
  //         .then(() => {
  //           dispatch(clientListRequest());
  //         })
  //         .catch(() => {
  //           ToastMessage('Network connection issue');
  //         });
  //       break;
  //   }
  // }
  useEffect(() => {
    // IsInternetConnected()
    //   .then(() => {
    //     dispatch(judgementRequest({search: ''}));
    //   })
    //   .catch(() => {
    //     ToastMessage('Network connection issue');
    //   });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Judgement'}
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
              placeholder="section no, title, year, citation, etc..."
              style={{width: '90%'}}
              onChangeText={item => {
                IsInternetConnected()
                  .then(() => {
                    dispatch(judgementRequest({search: item}));
                  })
                  .catch(() => {
                    ToastMessage('Network connection issue');
                  });
              }}
            />
          </View>
          <FlatList
            data={PostReducer?.judgement}
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
                    navigate('JudgementDetail', {item: item});
                    // console.log('Hello');
                    // dispatch(updatePageName({pagename: 'EditPage'}));
                    // navigation.navigate('AddClient', {item: item});
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        marginLeft: normalize(5),
                        fontSize: normalize(14),
                        fontWeight: '800',
                        marginTop: normalize(2),
                      }}>
                      {item?.title}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#000',
                      marginLeft: normalize(5),
                      fontSize: normalize(12),
                      fontWeight: '400',
                      width: '90%',
                    }}>
                    {item?.short_desc}
                  </Text>
                  <View
                    style={{
                      padding: normalize(5),
                      borderTopWidth: normalize(1),
                      borderTopColor: COLORS.themeColor,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(5),
                    }}>
                    <View>
                      <Text>
                        Legalmeet Citation :{' '}
                        <Text style={{fontWeight: '600', color: '#000'}}>
                          {item?.legelmeet_citation}
                        </Text>
                      </Text>
                      <Text>
                        Equivalent Citatation :{' '}
                        <Text style={{fontWeight: '600', color: '#000'}}>
                          {item?.equivalent_citation}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      padding: normalize(5),
                      borderTopWidth: normalize(1),
                      borderTopColor: COLORS.themeColor,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(5),
                    }}>
                    <View>
                      <Text>
                        Section :{' '}
                        <Text style={{fontWeight: '600', color: '#000'}}>
                          {item?.section_no}
                        </Text>
                      </Text>
                      <Text>
                        Date :{' '}
                        <Text style={{fontWeight: '600', color: '#000'}}>
                          {item?.date}
                        </Text>
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
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 1.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={ICON?.bar_association}
                    style={{
                      width: normalize(70),
                      height: normalize(70),
                    }}
                    tintColor={COLORS.themeColor}
                    resizeMode="contain"
                  />
                  <Text>Find the result after search</Text>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Judgement;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
