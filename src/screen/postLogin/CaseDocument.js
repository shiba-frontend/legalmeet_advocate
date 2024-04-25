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
  imageUploadUpdateProfileRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import Modal from 'react-native-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
var status = '';
const CaseDocument = ({navigation}) => {
  const [profile, setProfile] = useState(false);
  const [cardImage, setCardImage] = useState(false);
  const [name, setName] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [image, setImage] = useState('');
  const [pickerImage, setPickerImage] = useState('');
  const [image2, setImage2] = useState('');
  const [pickerImage2, setPickerImage2] = useState('');
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
  useEffect(() => {
    setImage(PostReducer?.profileData?.id_card);
    setImage2(PostReducer?.profileData?.profile_image);
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
          <View style={{marginTop: normalize(10), width: '90%'}}>
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
          </View>
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
              Add Document
            </Text>
          </View>
          {!isEmpty(profile?.name) ? (
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
          ) : null}
          <TouchableOpacity
            style={{
              marginTop: normalize(0),
              width: '90%',
              backgroundColor: '#DDD',
              height: normalize(150),
              borderRadius: normalize(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              OpenGallery();
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={ICON?.upload}
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  tintColor: COLORS.themeColor,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: COLORS.themeColor,
                  fontWeight: '600',
                  fontSize: normalize(12),
                  marginLeft: normalize(10),
                }}>
                {isEmpty(profile?.name) ? 'UPLOAD' : 'UPLOADED'}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{marginTop: normalize(20), width: '90%'}}>
            <TouchableOpacity
              style={{
                padding: normalize(10),
                backgroundColor: COLORS.STATUS_BAR,
                borderRadius: normalize(10),
                alignItems: 'center',
              }}
              onPress={() => {
                if (profile?.name == '') {
                  ToastMessage('Profile required');
                } else {
                  //
                  IsInternetConnected()
                    .then(() => {
                      let formData = new FormData();
                      formData.append('type', 'document');
                      formData.append('file', profile);
                      formData.append('case_id', PostReducer?.caseDetail?.id);
                      formData.append('document_name', name);
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default CaseDocument;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
