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
import {COLORS, ICON, IMAGE} from '../../../utils/Theme';
import MyStatusBar from '../../../utils/helpers/MyStatusBar';
import normalize from '../../../utils/helpers/normalize';
import InputText from '../../../components/InputText';
import {ToastMessage} from '../../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {verifyUserIdRequest} from '../../../redux/reducer/AuthReducer';
import Loader from '../../../utils/helpers/Loader';
import IsInternetConnected from '../../../utils/helpers/IsInternetConnected';
import {
  imageUploadUpdateProfileRequest,
  updateProfileRequest,
} from '../../../redux/reducer/PostReducer';
import Header from '../../../utils/helpers/Header';
import Modal from 'react-native-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
var status = '';
const ProfileImage = ({navigation}) => {
  const [profile, setProfile] = useState(false);
  const [cardImage, setCardImage] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [image, setImage] = useState('');
  const [pickerImage, setPickerImage] = useState('');
  const [image2, setImage2] = useState('');
  const [pickerImage2, setPickerImage2] = useState('');
  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/imageUploadUpdateProfileRequest':
        status = PostReducer?.status;
        break;
      case 'post/imageUploadUpdateProfileSuccess':
        status = PostReducer?.status;
        navigation.goBack();
        break;
    }
  }
  useEffect(() => {
    setImage(PostReducer?.profileData?.id_card);
    setImage2(PostReducer?.profileData?.profile_image);
  }, []);
  function OpenGallery() {
    ImageCropPicker.openPicker({
      // width: 100,
      // height: 100,
      cropping: true,
      // compressImageMaxWidth: 500,
      // compressImageMaxHeight: 500,
      compressImageQuality: 0.5,
    }).then(image => {
      console.log(image);
      if (image.size < 1000000) {
        var imageData = image;
        imageData = {
          uri: image.path,
          type: image.mime,
          name: image.path.replace(/^.*[\\\/]/, ''),
        };
        console.log('Shyam Futuretech: ', image.path);
        if (profile) {
          setPickerImage2(imageData);
          setImage2(image.path);
          setProfile(false);
        } else if (cardImage) {
          setPickerImage(imageData);
          setImage(image?.path);
          setCardImage(false);
        }
      } else {
        Alert.alert('Please upload image within 1 mb');
        setProfile(false);
        setCardImage(false);
      }
    });
  }
  function OpenCamera() {
    ImageCropPicker.openCamera({
      // width: 200,
      // height: 200,
      cropping: true,
      // compressImageMaxWidth: 500,
      // compressImageMaxHeight: 500,
      compressImageQuality: 0.5,
    }).then(image => {
      console.log(image);
      if (image.size < 1000000) {
        var imageData = image;
        imageData = {
          uri: image.path,
          type: image.mime,
          name: image.path.replace(/^.*[\\\/]/, ''),
        };
        if (profile) {
          setPickerImage2(imageData);
          setImage2(image?.path);
          setProfile(false);
        } else if (cardImage) {
          setPickerImage(imageData);
          setImage(image?.path);
          setCardImage(false);
        }
      } else {
        Alert.alert('Please upload image within 1 mb');
        setProfile(false);
        setCardImage(false);
      }
    });
  }
  function isEmpty(item) {
    if (item == null || item == '' || item == undefined) return true;
    return false;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header isMenuPresent={false} navigation={navigation} text={'Back'} />
      <Loader visible={PostReducer.loading} />
      {/* Modal for Image upload */}
      <Modal
        isVisible={cardImage || profile}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          if (cardImage) setCardImage(false);
          else setProfile(false);
        }}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 3,
            width: '100%',
            paddingTop: 10,
            paddingHorizontal: 30,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 40,
          }}>
          <TouchableOpacity
            style={{
              paddingTop: normalize(10),
              alignItems: 'center',
              paddingBottom: normalize(5),
              borderBottomWidth: normalize(1),
            }}
            onPress={() => {
              OpenCamera();
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: '#000',
              }}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingTop: normalize(10),
              alignItems: 'center',
              paddingBottom: normalize(5),
              borderBottomWidth: normalize(1),
            }}
            onPress={() => {
              OpenGallery();
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: '#000',
              }}>
              Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
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
              Upload ID Card & Profile Image
            </Text>
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
                fontSize: normalize(12),
                fontWeight: '500',
              }}>
              Upload ID Card
            </Text>
          </View>
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
              setCardImage(true);
            }}>
            {image == '' ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={ICON?.upload}
                  style={{height: normalize(15), width: normalize(15)}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: COLORS.PINK,
                    fontWeight: '600',
                    fontSize: normalize(12),
                    marginLeft: normalize(10),
                  }}>
                  UPLOAD
                </Text>
              </View>
            ) : null}
            {image != '' ? (
              <Image
                source={{uri: image}}
                style={{
                  height: normalize(150),
                  width: '100%',
                  borderRadius: normalize(20),
                }}
              />
            ) : null}
          </TouchableOpacity>
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
                fontSize: normalize(12),
                fontWeight: '500',
              }}>
              Upload Profile Image
            </Text>
          </View>
          <TouchableOpacity
            style={{
              marginTop: normalize(10),
              width: normalize(100),
              height: normalize(100),
              borderRadius: normalize(50),
              backgroundColor: '#DDD',
            }}
            onPress={() => {
              setProfile(true);
            }}>
            <Image
              source={ICON.upload_background}
              style={{
                height: normalize(25),
                width: normalize(25),
                position: 'absolute',
                bottom: normalize(10),
                right: normalize(0),
                zIndex: normalize(10),
              }}
            />
            {image2 != '' ? (
              <Image
                source={{uri: image2}}
                style={{
                  height: normalize(100),
                  width: normalize(100),
                  borderRadius: normalize(50),
                }}
              />
            ) : null}
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
                if (image == '') {
                  ToastMessage('ID card required');
                } else if (image2 == '') {
                  ToastMessage('Profile required');
                } else {
                  //
                  IsInternetConnected()
                    .then(() => {
                      let formData = new FormData();
                      if (!isEmpty(pickerImage2))
                        formData.append('profile_image', pickerImage2);
                      if (!isEmpty(pickerImage))
                        formData.append('id_card', pickerImage);

                      dispatch(imageUploadUpdateProfileRequest(formData));
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

export default ProfileImage;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
