import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import SplashImage from '../../assets/splash.png';
import {COLORS, IMAGE} from '../../utils/Theme';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/normalize';

const Splash = ({navigation}) => {
  return (
    <>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <ImageBackground
        source={IMAGE.app_background}
        resizeMode="cover"
        style={styles.imgbg}>
        {/* <Image source={IMAGE.logo} style={{height: normalize(100), width: normalize(250)}} resizeMode='contain' /> */}
      </ImageBackground>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
