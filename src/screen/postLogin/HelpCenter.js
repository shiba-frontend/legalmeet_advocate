import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import Header from '../../utils/helpers/Header';
import normalize from '../../utils/helpers/normalize';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  helpCenterRequest,
  serviceListRequest,
} from '../../redux/reducer/PostReducer';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {ToastMessage} from '../../utils/helpers/Toast';

const HelpCenter = ({navigation}) => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [expandItem, setExpandItem] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(helpCenterRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  return (
    <ScrollView>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Help Center'}
      />
      <View
        style={{
          paddingTop: normalize(22),
        }}>
        <FlatList
          data={PostReducer?.helpCenter}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: '#F5F7F8',
                  borderRadius: normalize(8),
                  marginBottom: normalize(10),
                  borderWidth: normalize(1),
                  borderColor: 'rgba(0, 45, 82, 0.2)',
                  paddingVertical: normalize(10),
                  paddingHorizontal: normalize(8),
                  marginEnd: normalize(10),
                  marginStart: normalize(10),
                  width: Dimensions?.get('window')?.width - 30,
                }}
                onPress={() => {
                  if (item?.id == expandItem?.id) {
                    setExpandItem('');
                  } else {
                    setExpandItem(item);
                  }
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: '#000',
                      fontWeight: '600',
                      fontSize: normalize(14),
                      width: '80%',
                    }}>
                    {item?.question}
                  </Text>

                  <Image
                    source={
                      expandItem?.id == item?.id
                        ? ICON?.opposite_selection
                        : ICON?.select_box_icon
                    }
                    style={{height: normalize(15), width: normalize(15)}}
                    resizeMode="contain"
                  />
                </View>
                {expandItem?.id == item?.id ? (
                  <Text
                    style={{
                      color: '#999',
                      fontWeight: '400',
                      fontSize: normalize(11),
                      width: '80%',
                      marginTop: normalize(10),
                    }}>
                    {item?.ans}
                  </Text>
                ) : null}
              </TouchableOpacity>
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

export default HelpCenter;

const styles = StyleSheet.create({});
