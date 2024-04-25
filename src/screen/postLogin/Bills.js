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
import React, {useEffect, useState, useMemo} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
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
  myTransactionHistoryRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

const Bills = ({navigation}) => {
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  const [selectOption, setSelectOption] = useState({
    id: '',
    status: 'All',
  });
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }
  const myBills = [
    {
      name: 'FSSAI Registration',
      status: true,
      amount: '2000',
    },
    {
      name: 'FSSAI Registration',
      status: false,
      amount: '2000',
    },
    {
      name: 'FSSAI Registration',
      status: false,
      amount: '2000',
    },
    {
      name: 'FSSAI Registration',
      status: false,
      amount: '2000',
    },
    {
      name: 'FSSAI Registration',
      status: false,
      amount: '2000',
    },
    {
      name: 'FSSAI Registration',
      status: false,
      amount: '2000',
    },
  ];
  const options = [
    {
      id: '',
      status: 'All',
    },
    {
      id: 1,
      status: 'Paid',
    },
    {
      id: 2,
      status: 'Due',
    },
  ];
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        //label: 'Option 1',
        value: 'option1',
        color: '#fff',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState();
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(myTransactionHistoryRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'My Orders'}
      />
      <Loader visible={PostReducer.loading} />

      <View
        style={{
          marginTop: 20,
        }}>
        <FlatList
          data={PostReducer?.myBills}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          style={
            {
              // width: Dimensions.get('screen').width / 2.5,
              // alignSelf: 'center',
            }
          }
          ListFooterComponent={
            <View
              style={{
                height: 150,
              }}
            />
          }
          renderItem={({item, index}) => {
            return (
              <>
                <View
                  style={{
                    // padding: normalize(10),
                    // borderWidth: normalize(1),
                    // borderRadius: normalize(10),
                    // marginBottom: normalize(10),
                    // borderColor: '#e7e7e7',
                    // width: Dimensions.get('screen').width / 1.8,
                    // marginRight: normalize(10),
                    // backgroundColor: '#FFF',
                    backgroundColor: item?.payment_status
                      ? '#35A4431A'
                      : '#FE1C321A',
                    marginRight: normalize(10),
                    marginLeft: normalize(10),
                    width: (Dimensions.get('screen').width / 10) * 9.5,
                    borderRadius: normalize(8),
                    marginBottom: normalize(10),
                    padding: normalize(8),
                    justifyContent: 'space-between',
                  }}>
                  {!isEmpty(item?.name) ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('orderDetails', {item: item})
                      }>
                      <View
                        style={{
                          flexDirection: 'row',

                          alignItems: 'center',

                          justifyContent: 'space-between',
                        }}>
                        <View style={{width: '9%'}}>
                          <Image
                            source={
                              item?.payment_status
                                ? ICON.success_icon
                                : ICON.faild_icon
                            }
                            style={{
                              height: normalize(18),
                              width: normalize(18),
                            }}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={{width: '66%'}}>
                          <Text
                            numberOfLines={1}
                            style={{
                              color: COLORS?.themeColor,
                              fontWeight: '600',
                              fontSize: normalize(14),
                            }}>
                            {item?.type}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{
                              color: '#555',
                              fontWeight: '600',
                              fontSize: normalize(9),
                            }}>
                            {item?.created_at}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{
                              color: item?.payment_status
                                ? 'rgba(53, 164, 67, 1)'
                                : 'rgba(254, 28, 50, 1)',
                              fontWeight: '800',
                              fontSize: normalize(10),
                              backgroundColor: item?.payment_status
                                ? 'rgba(53, 164, 67, 0.1)'
                                : 'rgba(254, 28, 50, 0.1)',
                              paddingVertical: normalize(3),
                              borderRadius: 4,
                              width: normalize(50),
                              textAlign: 'center',
                              marginTop: normalize(3),
                            }}>
                            {item?.payment}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '25%',
                            flexDirection: 'row',
                            gap: normalize(6),
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              color: COLORS?.themeColor,
                              fontWeight: '600',
                              fontSize: normalize(12),
                            }}>
                            ₹{item?.amount}
                          </Text>
                          <Image
                            source={ICON.back}
                            style={{
                              height: normalize(18),
                              width: normalize(18),
                              transform: [{rotate: '180deg'}],
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: Dimensions?.get('window')?.height / 1.6,
                  width: Dimensions?.get('window')?.width / 1.1,
                }}>
                <Image
                  source={IMAGE?.no_data}
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 10,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{color: COLORS?.themeColor, fontSize: normalize(11)}}>
                  No Data Found
                </Text>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Bills;
