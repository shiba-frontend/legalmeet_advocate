import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import { COLORS, ICON, IMAGE } from '../../utils/Theme';
import Header from '../../utils/helpers/Header';
import Loader from '../../utils/helpers/Loader';
import { ScrollView } from 'react-native-gesture-handler';

const TalkAdvocate = ({navigation}) => {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Talk to an Advocate'}
      />
      <View
        style={{
          width: (Dimensions.get('screen').width / 10) * 9,
          alignSelf: 'center',
          marginTop: 32,
        }}>
        <Image
          source={ICON?.calling_s}
          style={{
            height: normalize(240),
            width: '100%',
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            lineHeight: 20,
            marginTop: 32,
          }}>
          Instantly connect with seasoned legal professionals through our app.
          Discuss your legal concerns, receive personalized advice, and gain
          clarity on your legal situation. Access a direct line to knowledgeable
          advocates for swift guidance and valuable insights tailored to your
          specific needs.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CallRequest')}
          style={{
            backgroundColor: COLORS?.themeColor,
            padding: 18,
            alignItems: 'center',
            borderRadius: 8,
            marginTop: 30,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 40,
          }}>
          <Image
            source={ICON?.call_incoming}
            style={{
              height: normalize(20),
              width: normalize(20),
              // tintColor: COLORS?.themeColor,
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              marginStart: 10,
            }}>
            Request Callback
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TalkAdvocate