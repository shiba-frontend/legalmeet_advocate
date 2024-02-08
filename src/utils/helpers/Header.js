import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS, ICON} from '../Theme';
import normalize from './normalize';
import {Dialog} from 'react-native-paper';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {updatePageName} from '../../redux/reducer/PostReducer';
import SideMenu from '../../components/SideMenu';
// import SideMenu from '../../components/SideMenu';

export default function Header(props) {
  const [showSideMenuOption, setShowSideMenuOption] = useState(false);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <SideMenu
        isOpen={showSideMenuOption}
        onOff={item => {
          setShowSideMenuOption(false);
        }}
        navigation={props.navigation}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (!props?.isMenuPresent) {
              console.log(PostReducer?.pageName);
              if (PostReducer?.pageName == 'AddPage') {
                props.navigation.popToTop();
              } else {
                props.navigation.goBack();
              }
              dispatch(updatePageName({pagename: ''}));
            } else {
              setShowSideMenuOption(true);
            }
          }}>
          <Image
            source={props?.isMenuPresent ? ICON.menu : ICON.back}
            style={{
              height: props?.isMenuPresent ? normalize(20) : normalize(20),
              width: props?.isMenuPresent ? normalize(20) : normalize(20),
              tintColor: '#fff',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            marginLeft: normalize(10),
            fontWeight: '800',
            fontSize: normalize(14),
          }}>
          {props?.text}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '20%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (props?.isMenuPresent) props.navigation.navigate('Profile');
          }}>
          {props?.isMenuPresent ? (
            <Image
              source={ICON.profile}
              style={{
                height: props?.isMenuPresent ? normalize(18) : normalize(18),
                width: props?.isMenuPresent ? normalize(18) : normalize(18),
                marginTop: normalize(1),
                tintColor: '#fff',
              }}
              resizeMode="contain"
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // if (!props?.isMenuPresent) props.navigation.goBack();
          }}>
          {props?.isMenuPresent ? (
            <Image
              source={ICON.notification}
              style={{
                height: props?.isMenuPresent ? normalize(20) : normalize(20),
                width: props?.isMenuPresent ? normalize(20) : normalize(20),
                tintColor: '#fff',
              }}
              resizeMode="contain"
            />
          ) : null}
        </TouchableOpacity>
      </View>

      {/* {props?.isMenuPresent ? (
        <TouchableOpacity
          onPress={() => {
            setShowSideMenuOption(!showSideMenuOption);
          }}>
          <Image
            source={ICONS.sidemenu}
            style={{
              height: normalize(20),
              width: normalize(20),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.themeColor,
    alignItems: 'center',
    height: normalize(40),
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    paddingHorizontal: normalize(10),
    justifyContent: 'space-between',
    borderBottomWidth: normalize(1),
    borderBottomColor: '#ddd',
  },
});
