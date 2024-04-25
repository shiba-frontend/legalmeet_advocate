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
import React, {useEffect, useState, useMemo} from 'react';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import InputText from '../../components/InputText';
import {ToastMessage} from '../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import Header from '../../utils/helpers/Header';
import moment from 'moment';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import {servicePaymentDataRequest} from '../../redux/reducer/PostReducer';
const OrderDetails = props => {
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
        <Header
          isMenuPresent={false}
          navigation={props?.navigation}
          text={'Order Details'}
        />
        <Loader visible={PostReducer.loading} />

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: normalize(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: normalize(10),
            }}>
            <View style={{width: '60%'}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: normalize(13),
                  fontWeight: '500',
                  marginBottom: normalize(3),
                }}>
                Get {props?.route?.params?.item?.type} for (
                {props?.route?.params?.item?.payment_for_title})
              </Text>
              <Text
                style={{
                  color: 'green',
                  fontSize: normalize(10),
                  fontWeight: '400',
                }}>
                {props?.route?.params?.item?.payment}
              </Text>
            </View>
            <View style={{width: '40%'}}>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: normalize(10),
                  color: '#000',
                }}>
                {props?.route?.params?.item?.transaction_id}
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: normalize(10),
                  color: '#666',
                }}>
                {props?.route?.params?.item?.created_at}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: '#35A4431A',
              borderWidth: 1,
              borderBottomRightRadius: normalize(6),
              borderBottomStartRadius: normalize(6),
              borderTopRightRadius: normalize(6),
              borderTopStartRadius: normalize(6),
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#35A4431A',
                paddingHorizontal: normalize(10),
                paddingVertical: normalize(5),
                borderTopRightRadius: normalize(6),
                borderTopStartRadius: normalize(6),
              }}>
              <Text
                style={{
                  flex: 1,
                  color: '#000',
                  fontSize: normalize(12),
                  fontWeight: '500',
                }}>
                Item
              </Text>
              <Text
                style={{
                  flex: 1,
                  color: '#000',
                  fontSize: normalize(12),
                  fontWeight: '500',
                  textAlign: 'right',
                }}>
                Price
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: normalize(10),
                paddingVertical: normalize(5),
              }}>
              <Text
                style={{
                  flex: 1,
                  color: '#000',
                  fontSize: normalize(12),
                  fontWeight: '400',
                }}>
                Get {props?.route?.params?.item?.type} for (
                {props?.route?.params?.item?.payment_for_title})
              </Text>
              <Text
                style={{
                  flex: 1,
                  color: '#000',
                  fontSize: normalize(12),
                  fontWeight: '400',
                  textAlign: 'right',
                }}>
                Rs. {props?.route?.params?.item?.amount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: normalize(10),
                paddingVertical: normalize(5),
                borderColor: '#35A4431A',
                borderTopWidth: 1,
              }}>
              <Text
                style={{
                  flex: 1,
                  color: '#000',
                  fontSize: normalize(12),
                  fontWeight: '500',
                }}>
                Total
              </Text>
              <Text
                style={{
                  flex: 1,
                  color: '#000',
                  fontSize: normalize(12),
                  fontWeight: '500',
                  textAlign: 'right',
                }}>
                Rs. {props?.route?.params?.item?.amount}
              </Text>
            </View>
          </View>
          {props?.route?.params?.item?.payment_status != 0 ? (
            <View style={{marginVertical: normalize(15)}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: normalize(12),
                  fontWeight: '500',
                  marginBottom: normalize(2),
                }}>
                Billing Details
              </Text>
              <Text
                style={{
                  color: '#666',
                  fontSize: normalize(10),
                  fontWeight: '400',
                  marginBottom: normalize(2),
                }}>
                {props?.route?.params?.item?.name}
              </Text>
              <Text
                style={{
                  color: '#666',
                  fontSize: normalize(10),
                  fontWeight: '400',
                  marginBottom: normalize(2),
                }}>
                {props?.route?.params?.item?.mobile_number}
              </Text>
              <Text
                style={{
                  color: '#666',
                  fontSize: normalize(10),
                  fontWeight: '400',
                  marginBottom: normalize(2),
                }}>
                {props?.route?.params?.item?.email}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
      {props?.route?.params?.item?.download_link != '' ? (
        <View
          style={{
            alignSelf: 'center',
            width: Dimensions?.get('window')?.width,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.themeColor,
              paddingHorizontal: normalize(10),
              paddingVertical: normalize(10),
              borderRadius: normalize(6),
              position: 'absolute',
              bottom: normalize(30),
              width: '90%',
            }}
            onPress={() => {
              Linking.openURL(props?.route?.params?.item?.download_link);
            }}>
            <Text
              style={{
                fontSize: normalize(12),
                color: '#fff',
                textAlign: 'center',
              }}>
              Download Receipt
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default OrderDetails;
