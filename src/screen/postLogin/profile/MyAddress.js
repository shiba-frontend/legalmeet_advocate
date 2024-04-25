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
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, IMAGE} from '../../../utils/Theme';
import MyStatusBar from '../../../utils/helpers/MyStatusBar';
import normalize from '../../../utils/helpers/normalize';
import InputText from '../../../components/InputText';
import {ToastMessage} from '../../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {verifyUserIdRequest} from '../../../redux/reducer/AuthReducer';
import Loader from '../../../utils/helpers/Loader';
import IsInternetConnected from '../../../utils/helpers/IsInternetConnected';
import {updateProfileRequest} from '../../../redux/reducer/PostReducer';
import Header from '../../../utils/helpers/Header';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '../../../utils/helpers/Constant';
import Modal from 'react-native-modal';

var status = '';
const MyAddress = ({navigation}) => {
  const [barCouncil, setBarCouncil] = useState('');
  const [pincode, sesetPinCode] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [searchModal, setSearchModal] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/updateProfileRequest':
        status = PostReducer?.status;
        break;
      case 'post/updateProfileSuccess':
        status = PostReducer?.status;
        navigation.goBack();
        break;
    }
  }
  useEffect(() => {
    sesetPinCode(PostReducer?.profileData?.pin);
    setAddress(PostReducer?.profileData?.address);
    setDistrict(PostReducer?.profileData?.district);
    setState(PostReducer?.profileData?.state);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header isMenuPresent={false} navigation={navigation} text={'Back'} />
      <Loader visible={PostReducer.loading} />
      <Modal
        isVisible={searchModal}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSearchModal(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            height: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#EEE',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
          }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{width: '100%'}}>
            <View
              keyboardShouldPersistTaps="handled"
              style={{width: '90%', alignSelf: 'center'}}>
              <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log('Data: ', details?.address_components);
                  sesetPinCode(
                    details?.address_components.find(addressComponent =>
                      addressComponent.types.includes('postal_code'),
                    )?.short_name,
                  );
                  setAddress(data?.description);
                  setDistrict(
                    details?.address_components.find(addressComponent =>
                      addressComponent.types.includes(
                        'administrative_area_level_3',
                      ),
                    )?.short_name,
                  );
                  setState(
                    details?.address_components.find(addressComponent =>
                      addressComponent.types.includes(
                        'administrative_area_level_1',
                      ),
                    )?.short_name,
                  );
                  setSearchModal(false);
                }}
                query={{
                  key: GOOGLE_MAPS_APIKEY,
                  language: 'en',
                  types: 'geocode',
                }}
                // requestUrl={{
                //   useOnPlatform: 'web', // or "all"
                //   url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
                //   headers: {
                //     Authorization: `an auth token`, // if required for your proxy
                //   },
                // }}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              marginVertical: normalize(10),
              paddingHorizontal: normalize(15),
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: normalize(15),
                fontWeight: '600',
              }}>
              Address
            </Text>
            <Text
              style={{
                color: COLORS.PINK,
                fontSize: normalize(15),
                fontWeight: '600',
              }}
              onPress={() => {
                setSearchModal(true);
              }}>
              Search
            </Text>
          </View>

          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Pin Code
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              placeHolderText="Enter Pin Code"
              beforeIcon={''}
              keyboardType={'phone-pad'}
              maxLength={6}
              value={pincode}
              onChangingText={item => {
                sesetPinCode(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              State
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              placeHolderText="Enter State"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={state}
              onChangingText={item => {
                setState(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              District
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              placeHolderText="Enter District"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={district}
              onChangingText={item => {
                setDistrict(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Full Address
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              numberOfLine={3}
              placeHolderText="Enter Address"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}

              value={address}
              onChangingText={item => {
                setAddress(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(20), width: '90%'}}>
            <TouchableOpacity
              style={{
                padding: normalize(13),
                backgroundColor: COLORS.STATUS_BAR,
                borderRadius: normalize(10),
                alignItems: 'center',
              }}
              onPress={() => {
                if (address == '') {
                  ToastMessage('Full Address required');
                } else if (district == '') {
                  ToastMessage('District required');
                } else if (state == '') {
                  ToastMessage('State required');
                } else if (pincode == '') {
                  ToastMessage('Pincode required');
                } else {
                  //
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        updateProfileRequest({
                          district: district,
                          state: state,
                          address: address,
                          pin: pincode,
                        }),
                      );
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

export default MyAddress;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
