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
  Linking,
  TextInput,
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
import {
  allHearingRequest,
  dashboardRequest,
  getProfileRequest,
} from '../../redux/reducer/PostReducer';
import {useFocusEffect} from '@react-navigation/native';
var status = '';
const AdvocateListing = ({navigation}) => {
  const [search, setSearch] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [advocate, setAdvocate] = useState('');
  const [consultNowFlag, setConsultNowFlag] = useState(false);
  const [header, setHeader] = useState('');
  const [subject, setSubject] = useState('');

  const starCreationArray = [1, 2, 3, 4, 5];

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      IsInternetConnected()
        .then(() => {
          dispatch(dashboardRequest());
        })
        .catch(() => {
          ToastMessage('Network connection issue');
        });
    }, []),
  );
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/dashboardRequest':
        status = PostReducer?.status;
        break;
      case 'post/dashboardSuccess':
        setAdvocate(PostReducer?.dashboard?.advocates);
        status = PostReducer?.status;
        break;
    }
  }
  useEffect(() => {}, []);

  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.WHITE}
      />
      <Header
        isMenuPresent={false}
        text={'Advocate List'}
        navigation={navigation}
      />
      <Loader visible={PostReducer.loading} />
      {/* <Modal
        isVisible={selectClient}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectClient(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
          }}>
          <FlatList
            data={PostReducer?.dashboard?.advocates}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                  }}
                  onPress={() => {
                    setClient(item);
                    setSelectClient(false);
                  }}>
                  <Text>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal> */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: normalize(10),
        }}>
        <View
          style={{
            padding: normalize(10),
            width: Dimensions.get('screen').width - 50,
            marginRight: normalize(10),
            marginBottom: normalize(10),
            // borderWidth: normalize(1),
            // borderRadius: normalize(4),
            // borderColor: '#5B5B5B',
            // flexDirection: 'row',
            // alignItems: 'center',
          }}>
          {/* <View style={{width: '10%'}}>
            <Image
              source={ICON?.search}
              style={{
                height: normalize(12),
                width: normalize(12),
                tintColor: '#5B5B5B',
              }}
            />
          </View>
          <View style={{width: '90%'}}>
            <TextInput
              placeholder="Search"
              value={search}
              onChangeText={item => {
                setSearch(item);
              }}
            />
          </View> */}
          <InputText
            inputStyle={{
              backgroundColor: '#FFF',
              width: '100%',
              borderRadius: 10,
              paddingLeft: 0,
              borderColor: COLORS.themeColor,
              borderWidth: 1,
            }}
            placeHolderText="Enter Search"
            beforeIcon={ICON?.search}
            keyboardType={'default'}
            value={search}
            onChangingText={item => {
              setSearch(item);
              if (item == '') {
                setAdvocate(PostReducer?.dashboard?.advocates);
              } else {
                setAdvocate([]);
                var arr = [];
                PostReducer?.dashboard?.advocates.forEach(element => {
                  if (
                    element?.name?.toLowerCase()?.includes(item?.toLowerCase())
                  ) {
                    arr.push(element);
                  }
                });
                setAdvocate(arr);
              }
            }}
          />
        </View>
        <FlatList
          data={advocate}
          style={{paddingTop: normalize(10), marginBottom: normalize(80)}}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={() => {
          //   return (

          //   );
          // }}
          renderItem={({item, index}) => {
            var rating = item?.rating;
            return (
              <TouchableOpacity
                style={{
                  padding: normalize(10),
                  borderRadius: normalize(8),
                  borderWidth: normalize(1),
                  borderColor: '#DDD',
                  width: Dimensions.get('screen').width - 50,
                  marginRight: normalize(10),
                  backgroundColor: '#EFEFEF',
                  marginBottom: normalize(10),
                 
                }}
                onPress={() => {
                  navigation.navigate('AdvocateDetail', {item: item});
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    navigation.navigate('AdvocateDetail', {item: item});
                    // navigation.navigate(item?.page);
                  }}>
                    <View style={{width:'35%'}}>
                    <Image
                    source={{uri: item?.profile_image}}
                    style={{
                      height: normalize(75),
                      width: '100%',
                      borderRadius: normalize(3),
                    }}
                    resizeMode="contain"
                  />
                    <View style={{alignItems: 'center',justifyContent:'center', marginTop:normalize(3)}}>
                      {!isEmpty(item?.rating) ? (
                        <FlatList
                          numColumns={5}
                          style={{
                            flexGrow: 0,
                            width: '90%',
              
                          }}
                          data={starCreationArray}
                          renderItem={({item, index}) => {
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: normalize(17),
                                  alignSelf: 'flex-start',
                                }}>
                                <Image
                                  source={ICON?.rating1}
                                  style={{
                                    height: normalize(15),
                                    width: normalize(15),
                                    tintColor:
                                      rating >= index + 1 ? '#f5d103' : '#999',
                                  }}
                                  resizeMode="contain"
                                />
                              
                              </View>
                            );
                          }}
                        />
                      ) : (
                       
                        <View style={{marginTop: normalize(12)}}></View>
                      )}
                    </View>
                    <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: normalize(4),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'rgba(53, 164, 67, 0.1)',
                      padding: normalize(5),
                      borderRadius: normalize(2),
                      width:'100%',
                      justifyContent:'center'
                    }}>
                    <Image
                      source={ICON?.verify}
                      style={{height: normalize(12), width: normalize(12)}}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: '#35A443',
                        fontWeight: '800',
                        marginLeft: normalize(5),
                      }}>
                      Verified
                    </Text>
                  </View>
                
                </View>
                    </View>
                 
                  <View style={{marginLeft: normalize(10), width: '65%'}}>
                    <Text
                      style={{
                        color: COLORS.themeColor,
                        fontWeight: '800',
                        fontSize: normalize(12),
                      }}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: normalize(10),
                        marginTop: normalize(2),
                        color: '#666',
                        fontWeight: '400',
                      }}>
                      {item?.spacialised
                        ? item?.spacialised + ' | ' + item?.since
                        : item?.since}
                    </Text>
                    {item?.address ? (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={ICON?.location}
                          style={{
                            height: normalize(12),
                            width: normalize(12),
                            tintColor: '#5B5B5B',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: normalize(10),
                            marginTop: normalize(2),
                            color: '#666',
                            fontWeight: '400',
                            marginLeft: normalize(2),
                          }}>
                          {item?.address}
                        </Text>
                      </View>
                    ) : null}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={ICON?.cash}
                        style={{
                          height: normalize(12),
                          width: normalize(12),
                          tintColor: '#5B5B5B',
                        }}
                      />
                      {item?.charges != '' ? (
                        <Text
                          style={{
                            fontSize: normalize(10),
                            color: '#666',
                            fontWeight: '400',
                            marginLeft: normalize(2),
                          }}>
                          {item?.charges + '₹'}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: normalize(10),
                            color: '#666',
                            fontWeight: '400',
                            marginLeft: normalize(2),
                          }}>
                          Free
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
               
             
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AdvocateListing;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
