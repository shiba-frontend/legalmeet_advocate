import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS, ICONS, IMAGE, IMAGES} from '../Theme';
import {ICON} from '../Theme';
import normalize from './normalize';
import {navigate} from './RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN} from './Constant';
import {updateAuthToken} from '../../redux/reducer/AuthReducer';
import Share from 'react-native-share';
import {useFocusEffect} from '@react-navigation/native';
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
  const [selection, setSelection] = React.useState('');
  const [customizeOption, setCustomizeOption] = React.useState([]);
  var array = [];
  const options = [
    // {
    //   page: 'Cases',
    //   name: 'My Cases',
    //   icon: ICON?.judge,
    // },
    // {
    //   page: 'Bills',
    //   name: 'My Orders',
    //   icon: ICON?.bn_bill,
    // },
    {
      page: 'DraftList',
      name: 'Drafts',
      icon: ICON?.ebook,
    },
    {
      page: 'Ebook-category',
      name: 'Ebook',
      icon: ICON?.ebook,
    },
    {
      page: 'Appointment',
      name: 'Subscription',
      icon: ICON?.bn_bill,
    },

    {
      page: 'Feed',
      name: 'Feeds',
      icon: ICON?.feeds,
    },
    {
      page: 'Invoice',
      name: 'Invoice List',
      icon: ICON?.bn_bill,
    },
    {
      page: 'Bills',
      name: 'Transactions',
      icon: ICON?.bn_bill,
    },
    {
      page: 'RequestList',
      name: 'Request',
      icon: ICON?.settings,
    },
    {
      page: 'CMSPage',
      name: 'About Us',
      alias: 'about-us',
      icon: ICON?.settings,
    },
    {
      page: 'CMSPage',
      name: 'Term & Conditions',
      alias: 'terms-and-condition',
      icon: ICON?.settings,
    },
    {
      page: 'CMSPage',
      name: 'Privacy Policy',
      alias: 'privacy-policy',
      icon: IMAGE?.privacy_icon,
    },
    {
      page: '',
      name: 'Share',
      icon: ICON?.share,
    },
    {
      page: '',
      name: 'Delete Account',
      icon: ICON?.delete_account,
    },
    {
      page: '',
      name: 'Logout',
      icon: ICON?.logout,
    },
  ];
  useFocusEffect(
    React.useCallback(() => {
      console.log(PostReducer);
      options.forEach(element => {
        if (
          PostReducer?.profileData?.client_type == 1 &&
          element?.name != 'My Teams'
        ) {
          array.push(element);
        } else if (PostReducer?.profileData?.client_type == 0) {
          array.push(element);
        }
      });
      console.log('Array:::: ', array);
    }, []),
  );

  const logoutAction = async () => {
    await AsyncStorage.removeItem(TOKEN);
    dispatch(updateAuthToken({authToken: null, mode: ''}));
  };
  function RenderOption({item, index}) {
    return (
      <TouchableOpacity
        style={{
          padding: normalize(10),
          flexDirection: 'row',
          alignItems: 'center',
          // borderBottomWidth:
          //   index == options?.length - 1 ? normalize(0) : normalize(1),
          paddingLeft: normalize(20),
          // borderBottomColor: '#707070',
          //   backgroundColor: selection?.name == item?.name ? '#FFDA61' : '#FFF',
        }}
        onPress={() => {
          setSelection(item);
          props.onOff(false);
          if (item?.page == 'CMSPage') {
            navigate('CMSPage', {
              alias: item?.alias,
              page: item?.name,
            });
          } else if (item?.name == 'Delete Account') {
            Alert.alert(
              'Delete Account!',
              'Are you sure to delete your account',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    logoutAction();
                  },
                },
              ],
            );
          } else if (item?.name == 'Logout') {
            Alert.alert('Logout!', 'Are you sure to logout your account', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => {
                  logoutAction();
                },
              },
            ]);
          } else if (item?.name == 'Share') {
            Share.open(
              
                {
                  title: 'Legalmeet',
                  message: 'Google play store link',
                   url: 'https://play.google.com/store/apps/details?id=com.legalexpert',
                }
              
              
              )
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                err && console.log(err);
              });
          } else if (item?.name == 'Drafts') {
            if (PostReducer?.profileData?.is_subscribed) {
              navigate('DraftList');
            } else {
              navigation.navigate('expire');
            }
          } else if (item?.name == 'Ebook') {
            console.log(PostReducer);
            if (PostReducer?.profileData?.is_subscribed) {
              navigate('Ebook-category');
            } else {
              navigation.navigate('expire');
            }
          } else {
            navigate(item?.page);
          }
        }}>
        <Image
          source={item?.icon}
          style={{
            height: normalize(15),
            width: normalize(15),
            tintColor: COLORS?.themeColor,
          }}
        />
        <Text
          style={{
            color: '#000',
            fontSize: normalize(16),
            marginLeft: normalize(10),
            // fontWeight: '800',
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
          width: Dimensions.get('screen').width / 1.2,
          backgroundColor: '#FFF',
          // borderTopRightRadius: normalize(60),
          // borderBottomRightRadius: normalize(60),
          // borderTopRightRadius: normalize(50),
          // borderBottomRightRadius: normalize(50),
        }}>
        <FlatList
          data={options}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: normalize(15),
                  paddingHorizontal: normalize(10),
                  borderBottomWidth: normalize(1),
                  borderBottomColor: COLORS?.themeColor,
                  marginTop: normalize(25),
                }}>
                <Image
                  source={ICON?.menu}
                  style={{
                    height: normalize(15),
                    width: normalize(15),
                  }}
                />
                <Image
                  source={IMAGE?.logo_new}
                  style={{
                    height: normalize(30),
                    width: normalize(100),
                    marginLeft: normalize(10),
                  }}
                  resizeMode="contain"
                />

                {/* <Text
                  style={{
                    fontWeight: '800',
                    fontSize: normalize(15),
                    marginLeft: normalize(10),
                  }}>
                  LegalMeet
                </Text> */}
              </View>
            );
          }}
          renderItem={RenderOption}
          style={{
            flex: 1,
            marginBottom: normalize(40),
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
    color: '#000000',
  },
});
