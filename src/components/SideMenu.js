import React from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  Alert,
} from 'react-native';
// import {COLORS, IMAGE} from '../utils/Theme';
// import {FONTS} from '../utils/Theme';
// import {CO}
import Modal from 'react-native-modal';
import normalize from '../utils/helpers/normalize';
import {logOutRequest} from '../redux/reducer/AuthReducer';
import IsInternetConnected from '../utils/helpers/IsInternetConnected';
import Toast, {ToastMessage} from '../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../utils/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
const SideMenu = ({
  label,
  secureTextEntry,
  onChangeText,
  style,
  multiline,
  value,
  isOpen,
  navigation,
  ...props
}) => {
  const dispatch = useDispatch();
  const PostReducer = useSelector(state => state.PostReducer);
  //
  const options = [
    {
      page: 'Dashboard',
      name: 'Home',
    },
    {
      page: 'Members',
      name: 'Member List',
    },
    {
      page: 'Requests', //MyReservation
      name: 'Request List',
    },
    {
      page: 'Feed',
      name: 'Feed',
    },
    {
      page: 'Subscription',
      name: 'Subscription',
    },
    {
      page: 'DraftList',
      name: 'Drafts',
    },
    {
      page: 'Invoice',
      name: 'Invoice List',
    },
    {
      page: '',
      name: 'Logout',
    },
  ];
  function RenderOption({item, index}) {
    return (
      <TouchableOpacity
        style={{
          padding: normalize(10),
          borderBottomWidth:
            index == options?.length - 1 ? normalize(0) : normalize(1),
          paddingLeft: normalize(0),
          borderBottomColor: '#707070',
        }}
        onPress={() => {
          props.onOff(false);
          if (item.name?.toLowerCase() == 'logout') {
            Alert.alert('Logout', 'Are you sure to logout your account?', [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  IsInternetConnected()
                    .then(async () => {
                      await AsyncStorage.removeItem('TOKEN');
                      dispatch(logOutRequest());
                    })
                    .catch(() => {
                      Toast('Problème de connexion réseau');
                    });
                },
              },
            ]);
          } else {
            navigation.navigate(item?.page);
          }
        }}>
        <Text
          style={{
            color: index == options?.length - 1 ? COLORS.red : '#000',
            // fontFamily: FONTS.Fredoka_SemiBold,
            fontSize: normalize(12),
            // fontWeight: '800',   if (item?.name?.toLowerCase() != 'dashboard')
            // textTransform: 'uppercase',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <Modal
      isVisible={isOpen}
      animationIn="fadeInLeft"
      animationOut="fadeOutLeft"
      animationInTiming={800}
      animationOutTiming={400}
      backdropTransitionOutTiming={0}
      hasBackdrop={true}
      onBackdropPress={() => {
        props.onOff(false);
      }}
      style={{margin: 0, alignItems: 'flex-start'}}>
      <View
        style={{
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width / 1.35,
          backgroundColor: '#FFF',
          // borderTopRightRadius: normalize(60),
          // borderBottomRightRadius: normalize(60),
          // borderTopRightRadius: normalize(50),
          // borderBottomRightRadius: normalize(50),
        }}>
        <TouchableOpacity
          style={[
            styles.shadowProp,
            {
              padding: normalize(10),
              paddingTop: normalize(20),
              borderWidth: normalize(1),
              borderColor: COLORS.themeColor,
              borderRadius: normalize(10),
              marginTop: normalize(10),
              backgroundColor: COLORS.themeColor,
            },
          ]}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: normalize(5),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={
                  PostReducer?.profileData?.profile_image == ''
                    ? ICON.profile_image
                    : {uri: PostReducer?.profileData?.profile_image}
                }
                style={{
                  height: normalize(40),
                  width: normalize(40),
                  borderRadius: normalize(25),
                }}
                resizeMode="contain"
              />
              <View>
                <Text
                  style={{
                    marginLeft: normalize(10),
                    color: '#fff',
                    fontSize: normalize(14),
                    fontWeight: '800',
                  }}>
                  {PostReducer?.profileData?.name}
                </Text>
                <Text
                  style={{
                    marginLeft: normalize(10),
                    color: '#fff',
                    fontSize: normalize(12),
                    fontWeight: '600',
                    fontStyle: 'italic',
                  }}>
                  {PostReducer?.profileData?.mobile_number}
                </Text>
              </View>
            </View>
            {PostReducer?.profileData?.charges ? (
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '600',
                    textAlign: 'right',
                  }}>
                  ₹{PostReducer?.profileData?.charges}
                </Text>
                <Text style={{color: '#fff'}}>1 hour consulting</Text>
              </View>
            ) : null}
          </View>
          {Number(PostReducer?.profileData?.complete_profile_percentage) / 100 <
          1 ? (
            <View
              style={{
                paddingTop: normalize(7),
                borderTopWidth: normalize(1),
                borderTopColor: '#19affb',
                marginTop: normalize(7),
              }}>
              <Text
                style={{
                  marginBottom: normalize(10),
                  color: '#fff',
                  fontWeight: '600',
                }}>
                Complete Your Profile!
              </Text>
              <Progress.Bar
                progress={
                  Number(
                    PostReducer?.profileData?.complete_profile_percentage,
                  ) / 100
                }
                width={Dimensions.get('screen').width / 1.6}
                color={'#6ce4e3'}
                borderColor={'#19affb'}
                unfilledColor={'#19affb'}
              />
            </View>
          ) : null}
        </TouchableOpacity>
        <FlatList
          data={options}
          renderItem={RenderOption}
          style={{
            flex: 1,
            // marginTop: normalize(50),
            paddingHorizontal: normalize(20),
          }}
        />
      </View>
    </Modal>
  );
};

export default SideMenu;

SideMenu.defaultProps = {
  label: '',
  value: '',
  secureTextEntry: false,
  multiline: false,
  style: {},
  // onChangeText: () => {},
};
const styles = StyleSheet.create({
  inputbox: {
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 0,
    marginVertical: 10,
    height: 52,
    paddingHorizontal: 20,
    alignItems: 'center',

    // fontFamily: FONTS.Fredoka_Medium,
    color: '#000000',
  },
});
