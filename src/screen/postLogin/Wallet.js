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
  getWalletRequest,
  myTransactionHistoryRequest,
  updatePageName,
  walletRequest,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
const Wallet = ({navigation}) => {
  const PostReducer = useSelector(state => state.PostReducer);
  const [selectTab, setSelectTab] = useState('Credit');
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdraw, setWithdraw] = useState('');
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
        dispatch(getWalletRequest());
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
      <Header isMenuPresent={false} navigation={navigation} text={'Wallet'} />
      <Loader visible={PostReducer.loading} />
      {/* Withdraw modal */}
      <Modal
        isVisible={withdrawModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setWithdrawModal(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: normalize(10),
              top: normalize(10),
            }}
            onPress={() => {
              setWithdrawModal(false);
            }}>
            <Image
              source={ICON?.close_circle}
              style={{height: normalize(15), width: normalize(15)}}
            />
          </TouchableOpacity>
          <View
            style={{
              padding: normalize(10),
              borderWidth: normalize(1),
              width: '92%',
              borderRadius: normalize(5),
              // alignItems: 'center',
              marginTop: normalize(25),
            }}>
            <Text style={{color: '#000', fontWeight: '800'}}>
              Available Balance
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={IMAGE.wallet}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                }}
                resizeMode="contain"
              />
              <View style={{marginLeft: normalize(10)}}>
                <Text>
                  ₹{' '}
                  {parseFloat(PostReducer?.getWallet?.total_balance).toFixed(
                    2,
                  )}
                </Text>
                <Text>Legalmeet Balance</Text>
              </View>
            </View>
          </View>
          <View style={{padding: normalize(10)}}>
            <Text
              style={{
                color: '#000',
                fontWeight: '800',
                marginBottom: normalize(10),
              }}>
              Withdraw Amount (₹)
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: Dimensions.get('screen').width - 25,
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: '#e7e7e7',
                borderWidth: 1,
              }}
              placeHolderText="Enter Withdraw Amount"
              keyboardType={'default'}
              maxLength={100}
              value={withdraw}
              onChangingText={value => {
                setWithdraw(value);
              }}
            />
          </View>
          <TouchableOpacity
            disabled={PostReducer?.getWallet?.wallet_balance == '0'}
            style={{
              padding: normalize(10),
              backgroundColor: COLORS?.themeColor,
              marginBottom: normalize(10),
              borderRadius: normalize(6),
            }}
            onPress={() => {
              if (withdraw == '') {
                ToastMessage('Withdraw amount required');
              } else if (
                Number(withdraw) >
                Number(PostReducer?.getWallet?.total_balance)
              ) {
                ToastMessage('Limit exceed');
              } else {
                dispatch(walletRequest({amount: withdraw}));
                setWithdrawModal(false);
                setWithdraw('');
              }
            }}>
            <Text style={{color: COLORS?.WHITE}}>Withdraw</Text>
          </TouchableOpacity>
          <View style={{marginBottom: normalize(10), width: '90%'}}>
            <Text
              style={{
                fontSize: normalize(10),
                width: '100%',
                color: COLORS?.themeColor,
              }}>
              ***The amount will be transfered to your bank account in 7 working
              days
            </Text>
          </View>
        </View>
      </Modal>
      <View
        style={{
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            marginVertical: normalize(10),
            backgroundColor: '#fff',
            marginVertical: normalize(15),
            padding: normalize(10),
            borderColor: '#e9e9e9',
            borderWidth: normalize(1),
            borderRadius: normalize(5),
            marginHorizontal: normalize(9),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: normalize(7),
            }}>
            <Image
              source={IMAGE.wallet}
              style={{
                height: normalize(25),
                width: normalize(25),
              }}
              resizeMode="contain"
            />
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: normalize(10),
                  letterSpacing: normalize(1),
                }}>
                Wallet Balance
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: normalize(12),
                  fontWeight: '600',
                }}>
                ₹{' '}
                {parseFloat(PostReducer?.getWallet?.total_balance).toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: normalize(5),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: normalize(3),
                }}>
                <View
                  style={{
                    width: normalize(5),
                    height: normalize(5),
                    backgroundColor: 'green',
                    borderRadius: normalize(10),
                  }}></View>
                <Text style={{color: '#000', fontSize: normalize(9)}}>
                  Total Income
                </Text>
              </View>
              <Text
                style={{
                  color: '#000',
                  fontSize: normalize(9),
                  fontWeight: '500',
                }}>
                ₹ {parseFloat(PostReducer?.getWallet?.total_credit).toFixed(2)}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: normalize(3),
                }}>
                <View
                  style={{
                    width: normalize(5),
                    height: normalize(5),
                    backgroundColor: 'red',
                    borderRadius: normalize(10),
                  }}></View>
                <Text style={{color: '#000', fontSize: normalize(9)}}>
                  Total Withdrawal
                </Text>
              </View>
              <Text
                style={{
                  color: '#000',
                  fontSize: normalize(9),
                  fontWeight: '500',
                }}>
                ₹ {parseFloat(PostReducer?.getWallet?.total_debit).toFixed(2)}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: normalize(3),
                }}>
                <View
                  style={{
                    width: normalize(5),
                    height: normalize(5),
                    backgroundColor: '#000',
                    borderRadius: normalize(10),
                  }}></View>
                <Text style={{color: '#000', fontSize: normalize(9)}}>
                  Pending
                </Text>
              </View>
              <Text
                style={{
                  color: '#000',
                  fontSize: normalize(9),
                  fontWeight: '500',
                }}>
                ₹ {parseFloat(PostReducer?.getWallet?.total_balance).toFixed(2)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {PostReducer?.getWallet?.credited.length > 0 &&
        <TouchableOpacity
          style={{
            padding: normalize(10),
            backgroundColor: COLORS?.themeColor,
            borderRadius: normalize(10),
            width: '95%',
            alignSelf: 'center',
            marginBottom: normalize(10),
          }}
          onPress={() => {
            setWithdrawModal(true);
          }}>
          <Text style={{color: COLORS?.WHITE, textAlign: 'center'}}>
            Withdraw
          </Text>
        </TouchableOpacity>
}
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: normalize(1),
            marginHorizontal: normalize(10),
          }}>
          <TouchableOpacity
            style={{
              width: '50%',
              elevation: normalize(5),
              alignItems: 'center',
              padding: normalize(5),
            }}
            onPress={() => {
              setSelectTab('Credit');
            }}>
            <Text
              style={{
                color: selectTab == 'Credit' ? COLORS?.themeColor : '#000',
                fontWeight: '800',
              }}>
              Credit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              elevation: normalize(5),
              alignItems: 'center',
              padding: normalize(5),
            }}
            onPress={() => {
              setSelectTab('Debit');
            }}>
            <Text
              style={{
                color: selectTab == 'Debit' ? COLORS?.themeColor : '#000',
                fontWeight: '800',
              }}>
              Debit
            </Text>
          </TouchableOpacity>
        </View>
        {selectTab == 'Debit' ? (
          <FlatList
            data={PostReducer?.getWallet?.debited}
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
                      backgroundColor:
                        item?.payment_status != 1 ? '#35A4431A' : '#FE1C321A',
                      marginRight: normalize(10),
                      marginLeft: normalize(10),
                      width: (Dimensions.get('screen').width / 10) * 9.5,
                      borderRadius: normalize(8),
                      marginBottom: normalize(10),
                      padding: normalize(8),
                      justifyContent: 'space-between',
                    }}>
                    {!isEmpty(item?.id) ? (
                      <TouchableOpacity
                        onPress={
                          () => {}
                          // navigation.navigate('orderDetails', {item: item})
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
                                item?.payment_status != 1
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
                              // numberOfLines={1}
                              style={{
                                color: COLORS?.themeColor,
                                fontWeight: '600',
                                fontSize: normalize(14),
                              }}>
                              {item?.message}
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
                                color:
                                  item?.payment_status != 1
                                    ? 'rgba(53, 164, 67, 1)'
                                    : 'rgba(254, 28, 50, 1)',
                                fontWeight: '800',
                                fontSize: normalize(10),
                                backgroundColor:
                                  item?.payment_status != 1
                                    ? 'rgba(53, 164, 67, 0.1)'
                                    : 'rgba(254, 28, 50, 0.1)',
                                paddingVertical: normalize(3),
                                borderRadius: 4,
                                width: normalize(50),
                                textAlign: 'center',
                                marginTop: normalize(3),
                              }}>
                              {item?.payment_status == 1
                                ? 'Pending'
                                : 'Received'}
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
                            {/* <Image
                              source={ICON.back}
                              style={{
                                height: normalize(18),
                                width: normalize(18),
                                transform: [{rotate: '180deg'}],
                              }}
                              resizeMode="contain"
                            /> */}
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
                    style={{
                      color: COLORS?.themeColor,
                      fontSize: normalize(11),
                    }}>
                    No Data Found
                  </Text>
                </View>
              );
            }}
          />
        ) : null}
        {selectTab == 'Credit' ? (
          <FlatList
            data={PostReducer?.getWallet?.credited}
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
                  <View style={{}}>
                    {!isEmpty(item?.message) ? (
                      <View
                        onPress={
                          () => {}
                          // navigation.navigate('orderDetails', {item: item})
                        }>
                        <View
                          style={{
                            alignItems: 'center',
                            borderBottomWidth: normalize(1),
                            borderColor: '#e7e7e7',
                            padding: normalize(10),
                            width: Dimensions.get('screen').width,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: normalize(10),
                            justifyContent: 'space-between',
                            marginRight: normalize(10),
                          }}
                          onPress={() => {}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '70%',
                            }}>
                            <View
                              style={{
                                height: 35,
                                width: 35,
                                borderRadius: normalize(40),
                                backgroundColor: '#f3f3f3',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                                {
                                  item?.type == 3 ?
                                  <Text
                                  style={{
                                    fontSize: normalize(8),
                                  }}> LM </Text> 
                                    :
                                    <Text
                                style={{
                                  fontSize: normalize(8),
                                }}>
                                {item?.client?.name
                                  ?.split(' ')[0]
                                  ?.substring(0, 1)}{' '}
                                {item?.client?.name
                                  ?.split(' ')[1]
                                  ?.substring(0, 1)}
                              </Text>

                                }
                         
                            </View>
                            <View style={{marginLeft: normalize(10)}}>
                              <Text>{item?.type == 3 ? 'Legalmeet' : item?.client?.name}</Text>
                              {/* <Text>{item?.client?.mobile_number}</Text> */}
                            </View>
                          </View>
                          <View style={{
                              width: '30%',
                            }}>
                            <Text
                              style={{
                                color: COLORS?.themeColor,
                                fontWeight: '600',
                                fontSize: normalize(12),
                                
                              }}>
                              {item?.type == 1 ? 'Consult Book' :  item?.type == 2 ? 'Service Book by your client' : 'Enquery Payment'}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: COLORS?.themeColor,
                                fontWeight: '600',
                                fontSize: normalize(12),
                              }}>
                              ₹{item?.balance}
                            </Text>
                          </View>
                        </View>
                      </View>
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
                    style={{
                      color: COLORS?.themeColor,
                      fontSize: normalize(11),
                    }}>
                    No Data Found
                  </Text>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Wallet;
