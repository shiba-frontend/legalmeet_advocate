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
import SplashImage from '../../assets/splash.png';
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
  caseDetailRequest,
  caseDocumentAddRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
var status = '';
const AddNote = ({navigation}) => {
  const [aboutMe, setAboutMe] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/caseDocumentAddRequest':
        status = PostReducer?.status;
        break;
      case 'post/caseDocumentAddSuccess':
        status = PostReducer?.status;
        IsInternetConnected()
          .then(() => {
            dispatch(caseDetailRequest({case_id: PostReducer?.caseDetail?.id}));
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        navigation.goBack();
        break;
    }
  }
  useEffect(() => {}, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header isMenuPresent={false} navigation={navigation} text={'Back'} />
      <Loader visible={PostReducer.loading} />
      <View
        style={{
          width: Dimensions.get('screen').width - 50,
          alignSelf: 'center',
        }}>
        <View
          style={{
            marginTop: normalize(10),
            paddingHorizontal: normalize(0),
            alignItems: 'flex-start',
            width: '100%',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: normalize(15),
              fontWeight: '600',
            }}>
            Add Note
          </Text>
        </View>
        <View style={{marginTop: normalize(20), width: '100%'}}>
          <InputText
            inputStyle={{
              backgroundColor: '#FFF',
              width: '100%',
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeHolderText="Add Note Here"
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
              padding: normalize(10),
              backgroundColor: COLORS.STATUS_BAR,
              borderRadius: normalize(10),
              alignItems: 'center',
            }}
            onPress={() => {
              if (aboutMe == '') {
                ToastMessage('Note required');
              } else {
                //
                IsInternetConnected()
                  .then(() => {
                    let formData = new FormData();
                    formData.append('type', 'note');
                    formData.append('note', aboutMe);
                    formData.append('case_id', PostReducer?.caseDetail?.id);
                    dispatch(caseDocumentAddRequest(formData));
                  })
                  .catch(() => {
                    ToastMessage('Network connection issue');
                  });
              }
            }}>
            <Text style={{color: COLORS.WHITE, letterSpacing: normalize(2)}}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
