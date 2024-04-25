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
  Alert,
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
import {
  caseDetailRequest,
  caseDocumentAddRequest,
  hearingDocumentAddRequest,
  imageUploadUpdateProfileRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import Modal from 'react-native-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
var status = '';
const CaseHearingNoteAdd = ({navigation, route}) => {
  const [profile, setProfile] = useState('');
  const [cardImage, setCardImage] = useState(false);
  const [note, setNote] = useState(route?.params?.item?.note);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [image, setImage] = useState('');
  const [pickerImage, setPickerImage] = useState('');
  const [image2, setImage2] = useState('');
  const [pickerImage2, setPickerImage2] = useState('');
  const [editable, setEditable] = useState(true);
  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/hearingDocumentAddRequest':
        status = PostReducer?.status;
        break;
      case 'post/hearingDocumentAddSuccess':
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
  useEffect(() => {
    console.log('FROm PC: ', route?.params?.for);
    if (!isEmpty(route?.params?.for) && route?.params?.for == 'edit') {
      // setNote('');
    }
    if (!isEmpty(route?.params?.for) && route?.params?.for == 'display') {
      setNote(route?.params?.item?.note);
      setEditable(false);
    }
  });
  const OpenGallery = async () => {
    console.log('Anirban Chatterjee');
    const response = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      type: [DocumentPicker.types.pdf],
    });
    var imageData = response;
    console.log(response);
    imageData = {
      uri: response.uri,
      type: response.type,
      // mime: response.type,
      name:
        response.uri.replace(/^.*[\\\/]/, '') +
        '.' +
        response.type?.split('/', 2)[1],
    };
    console.log(imageData);
    setProfile(imageData);
  };
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    else return false;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header isMenuPresent={false} navigation={navigation} text={'Back'} />
      <Loader visible={PostReducer.loading} />

      <ScrollView>
        <View style={{alignItems: 'center'}}>
          {/* <View style={{marginTop: normalize(10), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(10),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Document Name
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeHolderText="Enter Document Name"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={name}
              onChangingText={item => {
                setName(item);
              }}
            />
          </View> */}
          <View
            style={{
              marginVertical: normalize(10),
              paddingHorizontal: normalize(15),
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: normalize(15),
                fontWeight: '600',
              }}>
              {!isEmpty(route?.params?.for) && route?.params?.for == 'edit'
                ? 'Edit Note'
                : !isEmpty(route?.params?.for) &&
                  route?.params?.for == 'display'
                ? 'Display Note'
                : 'Add Note'}
            </Text>
          </View>
          {/* {!isEmpty(profile?.name) ? (
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                padding: normalize(10),
                borderWidth: normalize(1),
                borderRadius: normalize(10),
                borderColor: '#DDD',
                marginBottom: normalize(10),
              }}>
              <Text>{profile?.name}</Text>
            </View>
          ) : null} */}
          {editable ? (
            <View style={{marginTop: normalize(20), width: '90%'}}>
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
                value={note}
                onChangingText={item => {
                  setNote(item);
                }}
              />
            </View>
          ) : (
            <View style={{marginTop: normalize(20), width: '90%'}}>
              <TouchableOpacity
                style={{
                  borderWidth: normalize(1),
                  padding: normalize(10),
                  borderRadius: normalize(5),
                  borderColor: COLORS?.themeColor,
                  minHeight: normalize(100),
                }}>
                <Text>{note}</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={{marginTop: normalize(20), width: '90%'}}>
            {editable ? (
              <TouchableOpacity
                style={{
                  padding: normalize(10),
                  backgroundColor: COLORS.STATUS_BAR,
                  borderRadius: normalize(10),
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (note == '') {
                    ToastMessage('Document or note required');
                  } else {
                    IsInternetConnected()
                      .then(() => {
                        console.log(route?.params?.item);
                        let formData = new FormData();
                        formData.append('hearing_id', route?.params?.item?.id);
                        formData.append('note', note);
                        dispatch(hearingDocumentAddRequest(formData));
                      })
                      .catch(() => {
                        ToastMessage('Network connection issue');
                      });
                  }
                }}>
                <Text
                  style={{color: COLORS.WHITE, letterSpacing: normalize(2)}}>
                  {!isEmpty(route?.params?.for) && route?.params?.for == 'edit'
                    ? 'UPDATE'
                    : !isEmpty(route?.params?.for) &&
                      route?.params?.for == 'display'
                    ? ''
                    : 'SUBMIT'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CaseHearingNoteAdd;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
