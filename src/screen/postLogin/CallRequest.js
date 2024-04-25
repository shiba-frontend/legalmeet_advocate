import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import Header from '../../utils/helpers/Header';
import Loader from '../../utils/helpers/Loader';
import {ScrollView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import InputText from '../../components/InputText';

const CallRequest = ({navigation}) => {
  return (
    <SafeAreaView>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Call Request'}
      />
      <View
        style={{
          width: (Dimensions.get('screen').width / 10) * 9,
          alignSelf: 'center',
          marginTop: 22,
        }}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 18,
            marginBottom: 20,
          }}>
          Request Message
        </Text>
        <InputText
          inputStyle={{
            backgroundColor: '#FFF',
            width: '100%',
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeHolderText="Type your message"
          beforeIcon={''}
          keyboardType={'default'}
          numberOfLine={10}
          //value={aboutMe}
          // onChangingText={item => {
          //   setAboutMe(item);
          // }}
        />
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
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              marginStart: 10,
            }}>
            Send Request
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CallRequest;
