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
import Share from 'react-native-share';
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
  generateInvoiceListRequest,
  invoiceListRequest,
  updateInvoiceRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
var status = '';
const Invoice = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  console.log('invoice =============', PostReducer?.generateInvoiceList);

  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/clientDeleteRequest':
        status = PostReducer?.status;
        break;
      case 'post/clientDeleteSuccess':
        status = PostReducer?.status;
        IsInternetConnected()
          .then(() => {
            dispatch(clientListRequest());
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
        dispatch(generateInvoiceListRequest());
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
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Invoice List'}
      />
      <Loader visible={PostReducer.loading} />
      <ScrollView>
        <View
          style={{
            width: Dimensions.get('screen').width - 20,
            alignSelf: 'center',
            marginTop: normalize(10),
          }}>
          <FlatList
            data={PostReducer?.generateInvoiceList}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    borderRadius: normalize(5),
                    borderWidth: normalize(1),
                    borderColor: '#EEE',
                    padding: normalize(10),
                    marginTop: normalize(10),
                  }}>
                  {item?.is_paid === 1 ? (
                    <Text
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: 10,
                        backgroundColor: 'green',
                        color: 'white',
                        fontSize: normalize(10),
                        paddingHorizontal: normalize(5),
                        paddingVertical: normalize(1),
                        borderRadius: normalize(3),
                      }}>
                      Received
                    </Text>
                  ) : (
                    <Text
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: 10,
                        backgroundColor: 'orange',
                        color: 'white',
                        fontSize: normalize(10),
                        paddingHorizontal: normalize(5),
                        paddingVertical: normalize(1),
                        borderRadius: normalize(3),
                      }}>
                      Due
                    </Text>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: '#000000'}}>
                      Case - {item?.case?.case_id}
                    </Text>
                    <Text
                      style={{color: '#000000', marginBottom: normalize(2)}}>
                      ₹ {item?.price} /-
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: '#000000'}}>
                      Client Name - {item?.client?.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          padding: normalize(2),
                          borderRadius: normalize(30),
                          borderWidth: normalize(1),
                        }}
                        onPress={() => {
                          Share.open({
                            title: 'This is my report ',
                            message: 'Message:',
                            url: item?.invoice,
                            subject: 'Report',
                          })
                            .then(res => {
                              console.log(res);
                            })
                            .catch(err => {
                              err && console.log(err);
                            });
                        }}>
                        <Image
                          source={ICON?.share}
                          style={{height: normalize(15), width: normalize(15)}}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: normalize(2),
                          borderRadius: normalize(30),
                          borderWidth: normalize(1),
                          marginLeft: normalize(5),
                        }}
                        onPress={() => {
                          Linking.openURL(item?.invoice);
                        }}>
                        <Image
                          source={ICON?.eye_on}
                          style={{
                            height: normalize(15),
                            width: normalize(15),
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(10),
                    }}>
                    <Text style={{color: '#000000'}}>
                      Raised Date - {item?.date}
                    </Text>
                    {item?.is_paid !== 1 && (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(
                            updateInvoiceRequest({
                              invoice_id: item?.id,
                              status: 1,
                            }),
                          );
                        }}>
                        <Text style={{color: COLORS.secondarColor}}>Mark As Received</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IMAGE?.no_data}
                    style={{
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height / 10,
                    }}
                    resizeMode="contain"
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: normalize(30),
          right: normalize(0),
          padding: normalize(10),
          backgroundColor: '#f2f2f2',
          borderTopLeftRadius: normalize(30),
          borderBottomLeftRadius: normalize(30),
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            dispatch(updatePageName({pagename: 'AddPage'}));
            navigation.navigate('GenerateInvoice');
          }}>
          <Image
            source={ICON?.add_client}
            style={{height: normalize(35), width: normalize(35)}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
