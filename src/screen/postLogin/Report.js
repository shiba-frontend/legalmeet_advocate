import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
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

const Report = ({navigation}) => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(consultationListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  return (
    <ScrollView>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.WHITE}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'My Consultant'}
      />
      <View
        style={{
          paddingTop: normalize(22),
        }}>
        <FlatList
          data={PostReducer?.consultationList}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              // <TouchableOpacity
              //   onPress={() =>
              //     navigation.navigate('ServiceDetails', {item: item})
              //   }>
              <View
                style={{
                  backgroundColor: '#F5F7F8',
                  borderRadius: normalize(8),
                  marginBottom: normalize(10),
                  borderWidth: normalize(1),
                  borderColor: 'rgba(0, 45, 82, 0.2)',
                  // paddingVertical: normalize(10),
                  paddingHorizontal: normalize(8),
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginEnd: normalize(10),
                  marginStart: normalize(10),
                  width: Dimensions?.get('window')?.width - 30,
                }}>
                <View
                  style={{
                    width: '100%',
                    padding: normalize(10),
                  }}>
                  <Text
                    style={{
                      color: '#5B5B5B',
                      fontSize: normalize(10),
                      textAlign: 'right',
                      fontStyle: 'italic',
                      position: 'absolute',
                      right: normalize(10),
                      top: normalize(10),
                    }}>
                    {item?.created_at}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: '#000',
                      fontWeight: '600',
                      fontSize: normalize(14),
                      width: '80%',
                    }}>
                    {item?.advocate_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: normalize(2),
                    }}>
                    <Text
                      numberOfLines={4}
                      style={{
                        color: '#5B5B5B',
                        fontSize: normalize(12),
                        width: '80%',
                      }}>
                      {item?.advocate_mobile_number}
                    </Text>
                  </View>
                  {/* {item?.advocate_charges != null ? ( */}
                  <Text
                    numberOfLines={4}
                    style={{
                      color: '#5B5B5B',
                      fontSize: normalize(12),
                      width: '80%',
                    }}>
                    Amount{' '}
                    {item?.advocate_charges != null
                      ? '(₹' + item?.advocate_charges + '/-)'
                      : '- nill'}
                  </Text>
                  {/* ) : null} */}
                </View>
              </View>
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

        {/* <Text
          style={{
            //marginTop: normalize(5),
            color: COLORS.themeColor,
            fontWeight: '800',
            fontSize: normalize(16),
            paddingLeft: normalize(10),
            marginBottom: normalize(10),
            marginTop: normalize(12),
          }}>
          My Services
        </Text> */}
        {/* <View
          style={{
            backgroundColor: 'rgba(53, 164, 67, 0.1)',
            marginRight: normalize(10),
            marginLeft: normalize(10),
            borderRadius: normalize(8),
            marginBottom: normalize(12),
            borderWidth: normalize(1),
            borderColor: 'rgba(53, 164, 67, 1)',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(8),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: COLORS?.themeColor,
                fontSize: normalize(14),
                fontWeight: '600',
                marginBottom: normalize(2),
              }}>
              FSSAI Registration
            </Text>
            <Text
              style={{
                color: '#5B5B5B',
              }}>
              Registration Date - 10-12-2023
            </Text>
            <Text
              style={{
                color: '#5B5B5B',
              }}>
              Expiry Date - 10-12-2024
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(10),
              }}>
              Status
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(14),
                color: 'rgba(53, 164, 67, 1)',
              }}>
              Active
            </Text>
          </View>
        </View> */}
        {/* -------Expired ------------ */}
        {/* <View
          style={{
            backgroundColor: 'rgba(254, 28, 50, 0.1)',
            marginRight: normalize(10),
            marginLeft: normalize(10),
            borderRadius: normalize(8),
            marginBottom: normalize(12),
            borderWidth: normalize(1),
            borderColor: 'rgba(254, 28, 50, 1)',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(8),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: COLORS?.themeColor,
                fontSize: normalize(14),
                fontWeight: '600',
                marginBottom: normalize(10),
              }}>
              FSSAI Registration
            </Text>
            <Text
              style={{
                color: '#fff',
                backgroundColor: COLORS?.themeColor,
                padding: normalize(6),
                fontSize: normalize(12),
                borderRadius: 4,
                textAlign: 'center',
                width: (Dimensions.get('screen').width / 10) * 3,
              }}>
              Renew Now
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(10),
              }}>
              Status
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(14),
                color: 'rgba(254, 28, 50, 1)',
              }}>
              Expired
            </Text>
          </View>
        </View> */}
        {/* -------Expired ------------ */}
        {/* <View
          style={{
            backgroundColor: 'rgba(243, 189, 40, 0.1)',
            marginRight: normalize(10),
            marginLeft: normalize(10),
            borderRadius: normalize(8),
            marginBottom: normalize(12),
            borderWidth: normalize(1),
            borderColor: 'rgba(243, 189, 40, 1)',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(8),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: COLORS?.themeColor,
                fontSize: normalize(14),
                fontWeight: '600',
                marginBottom: normalize(10),
              }}>
              FSSAI Registration
            </Text>
            <Text
              style={{
                color: '#fff',
                backgroundColor: COLORS?.themeColor,
                padding: normalize(6),
                fontSize: normalize(12),
                borderRadius: 4,
                textAlign: 'center',
                width: (Dimensions.get('screen').width / 10) * 3,
              }}>
              Renew Now
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(10),
              }}>
              Status
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(14),
                color: 'rgba(243, 189, 40, 1)',
              }}>
              Expire Soon
            </Text>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default Report;

const styles = StyleSheet.create({});
