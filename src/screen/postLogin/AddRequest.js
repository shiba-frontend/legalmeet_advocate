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
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  requestAddRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
var status = '';
const AddRequest = ({navigation}) => {
  const [aboutMe, setAboutMe] = useState('');
  const [topic, setTopic] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/requestAddRequest':
        status = PostReducer?.status;
        break;
      case 'post/requestAddSuccess':
        status = PostReducer?.status;
        navigation.goBack();
        break;
    }
  }
  useEffect(() => {
    // setAboutMe(PostReducer?.profileData?.about_my_self);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header isMenuPresent={false} navigation={navigation} text={'Back'} />
      <Loader visible={AuthReducer.loading} />
      <View
        style={{
          width: Dimensions.get('screen').width - 50,
          alignSelf: 'center',
        }}>
        <View style={{marginTop: normalize(20), width: '100%'}}>
          <InputText
            inputStyle={{
              backgroundColor: '#FFF',
              width: '100%',
              borderRadius: 10,
              paddingLeft: 10,
              borderWidth: normalize(1),
              borderColor: COLORS.themeColor,
            }}
            placeHolderText="Write topic"
            beforeIcon={''}
            keyboardType={'default'}
            // numberOfLine={10}
            value={topic}
            onChangingText={item => {
              setTopic(item);
            }}
          />
        </View>
        <View style={{marginTop: normalize(20), width: '100%'}}>
          <InputText
            inputStyle={{
              backgroundColor: '#FFF',
              width: '100%',
              borderRadius: 10,
              paddingLeft: 10,
              borderWidth: normalize(1),
              borderColor: COLORS.themeColor,
            }}
            placeHolderText="Write something"
            beforeIcon={''}
            keyboardType={'default'}
            numberOfLine={10}
            value={aboutMe}
            onChangingText={item => {
              setAboutMe(item);
            }}
          />
        </View>
        <View style={{marginTop: normalize(20), width: '100%'}}>
          <TouchableOpacity
            style={{
              padding: normalize(13),
              backgroundColor: COLORS.STATUS_BAR,
              borderRadius: normalize(10),
              alignItems: 'center',
            }}
            onPress={() => {
              if (aboutMe == '') {
                ToastMessage('Request required');
              } else {
                //
                IsInternetConnected()
                  .then(() => {
                    dispatch(
                      requestAddRequest({
                        title: topic,
                        description: aboutMe,
                      }),
                    );
                  })
                  .catch(() => {
                    ToastMessage('Network connection issue');
                  });
              }
            }}>
            <Text
              style={{
                color: COLORS.WHITE,
                letterSpacing: normalize(2),
                fontWeight: '800',
              }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddRequest;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
