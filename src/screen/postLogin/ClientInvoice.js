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
  caseDocumentAddRequest,
  caseListRequest,
  clientDetailRequest,
  clientDocumentAddRequest,
  imageUploadUpdateProfileRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import Modal from 'react-native-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
var status = '';
const ClientInvoice = ({navigation}) => {
  const [profile, setProfile] = useState('');
  const [cardImage, setCardImage] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentModeModal, setPaymentModeModal] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [image, setImage] = useState('');
  const [pickerImage, setPickerImage] = useState('');
  const [image2, setImage2] = useState('');
  const [pickerImage2, setPickerImage2] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const paymentModes = [
    {id: 0, name: 'Pending'},
    {id: 1, name: 'Paid'},
    {id: 2, name: 'Partially Paid'},
  ];
  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/clientDocumentAddRequest':
        status = PostReducer?.status;
        break;
      case 'post/clientDocumentAddSuccess':
        status = PostReducer?.status;

        if (PostReducer?.pageName == 'AddPage') {
          navigation.popToTop();
        } else {
          IsInternetConnected()
            .then(() => {
              dispatch(
                clientDetailRequest({client_id: PostReducer?.clientDetail?.id}),
              );
            })
            .catch(() => {
              ToastMessage('Network connection issue');
            });
          navigation.goBack();
        }
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
    });
    var imageData = response;
    console.log(response);
    imageData = {
      uri: response.uri,
      type: response.type,
      name: response.uri.replace(/^.*[\\\/]/, ''),
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
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header isMenuPresent={false} navigation={navigation} text={'Back'} />
      <Loader visible={PostReducer.loading} />
      {/* Payment Mode List */}
      <Modal
        isVisible={paymentModeModal}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setPaymentModeModal(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#EEE',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
          }}>
          <FlatList
            data={paymentModes}
            renderItem={({item, index}) => {
              console.log(JSON.stringify(item));
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                  }}
                  onPress={() => {
                    setPaymentMode(item);
                    setPaymentModeModal(false);
                  }}>
                  <Text>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View style={{marginTop: normalize(10), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Invoice Name
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter Invoice Name"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={name}
              onChangingText={item => {
                setName(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Amount
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter Amount"
              beforeIcon={''}
              keyboardType={'phone-pad'}
              // maxLength={10}
              value={amount}
              onChangingText={item => {
                setAmount(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Select Payment Mode
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Select"
              beforeIcon={''}
              keyboardType={'default'}
              selectBox={true}
              afterIcon={ICON.select_box_icon}
              // maxLength={10}
              value={paymentMode?.name}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                setPaymentModeModal(true);
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
                      formData.append('document_type', 0);
                      formData.append('file', profile);
                      formData.append(
                        'client_id',
                        PostReducer?.clientDetail?.id,
                      );
                      formData.append('amount', amount);
                      formData.append('payment_type', paymentMode?.id);
                      formData.append('document_name', name);
                      console.log(formData);
                      dispatch(clientDocumentAddRequest(formData));
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

export default ClientInvoice;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
