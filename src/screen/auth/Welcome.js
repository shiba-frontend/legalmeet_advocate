import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';

import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS, IMAGE} from '../../utils/Theme';
import {navigate} from '../../utils/helpers/RootNavigation';
import normalize from '../../utils/helpers/normalize';
const {width, height} = Dimensions.get('screen');

export default function Welcome(props) {
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (step < 3) {
      setTimeout(() => {
        console.log(step);
        setStep(step + 1);
      }, 3000);
    }
  }, [step]);
  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <SafeAreaView>
        <View>
          <ImageBackground
            // resizeMode="stretch"
            source={
              step == 1
                ? IMAGE.image1
                : step == 2
                ? IMAGE?.image2
                : IMAGE?.image3
            }
            imageStyle={{
              height: Dimensions?.get('window')?.height,
              width: Dimensions?.get('window')?.width,
            }}
            style={styles.container}>
            <View
              style={{
                position: 'absolute',
                bottom: normalize(0),
                width: Dimensions?.get('window')?.width,
                padding: normalize(20),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '50%',
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: normalize(13),
                  fontWeight: '600',
                  color: '#333F48',
                  marginTop: -normalize(2),
                }}
                onPress={() => {
                  navigate('Login');
                }}>
                Skip
              </Text>
              <View style={{flexDirection: 'row', gap: normalize(3)}}>
                <View
                  style={{
                    height: normalize(10),
                    width: normalize(10),
                    borderRadius: normalize(5),
                    backgroundColor: step == 1 ? COLORS?.themeColor : '#AAA',
                  }}
                />
                <View
                  style={{
                    height: normalize(10),
                    width: normalize(10),
                    borderRadius: normalize(5),
                    backgroundColor: step == 2 ? COLORS?.themeColor : '#AAA',
                  }}
                />
                <View
                  style={{
                    height: normalize(10),
                    width: normalize(10),
                    borderRadius: normalize(5),
                    backgroundColor: step == 3 ? COLORS?.themeColor : '#AAA',
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(13),
                  fontWeight: '600',
                  color: '#333F48',
                }}
                onPress={() => {
                  if (step == 1 || step == 2) setStep(step + 1);
                  else navigate('Login');
                }}>
                Next
              </Text>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    height: Dimensions?.get('window')?.height,
    width: Dimensions?.get('window')?.width,
  },
  topText: {
    fontSize: normalize(14),
    color: '#757575',
    textAlign: 'center',
    marginTop: normalize(30),
    letterSpacing: normalize(2),
  },
  centerText: {
    fontSize: normalize(15),
    color: COLORS.black,
    textAlign: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: normalize(5),
    borderColor: COLORS.black,
    marginTop: normalize(7),
  },
  centerLogo: {
    height: normalize(90),
    width: normalize(170),
    resizeMode: 'contain',
    tintColor: COLORS.yellow,
    marginVertical: normalize(14),
  },
  ellipse1Style: {
    height: height * 0.3,
    width: height * 0.3,
    resizeMode: 'contain',
    marginTop: normalize(20),
  },
  ellipse2Style: {
    height: normalize(95),
    width: normalize(95),
    resizeMode: 'contain',
    position: 'absolute',
    left: -normalize(25),
  },
  ellipse3Style: {
    height: normalize(70),
    width: normalize(70),
    resizeMode: 'contain',
    position: 'absolute',
    right: -normalize(20),
    bottom: 0,
  },
});
