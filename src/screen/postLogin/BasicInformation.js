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
import {
  enqueryCategoryListRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {GOOGLE_MAPS_APIKEY} from '../../../utils/helpers/Constant';
import Modal from 'react-native-modal';
import {GOOGLE_MAPS_APIKEY} from '../../utils/helpers/Constant';
var status = '';
const BasicInformation = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Usertype, setUsertype] = useState('Advocate');
  const [enrollmentId, setEnrollmentId] = useState('');
  const [pincode, sesetPinCode] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [client, setClient] = useState('');
  const [specialization, setSpecialization] = useState([
    {
      id: 1,
      name: 'Criminal',
    },
    {
      id: 2,
      name: 'Civil',
    },
  ]);
  const [searchModal, setSearchModal] = useState(false);
  const [specialityFlag, setSpecialityFlag] = useState(false);
  const [selectSpecialzation, setSelectSpecialization] = useState([]);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  if (status == '' || status != AuthReducer?.status) {
    switch (AuthReducer?.status) {
      case 'auth/verifyUserIdRequest':
        status = AuthReducer?.status;
        break;
      case 'auth/verifyUserIdSuccess':
        status = AuthReducer?.status;
        navigation.navigate('EnterOTP');
        break;
    }
  }
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(enqueryCategoryListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
    // sesetPinCode(PostReducer?.profileData?.pin);
    // setAddress(PostReducer?.profileData?.address);
    // setDistrict(PostReducer?.profileData?.district);
    // setState(PostReducer?.profileData?.state);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
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

      <Modal
        isVisible={specialityFlag}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSpecialityFlag(false);
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
            paddingVertical: normalize(20),
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <View
            style={{
              marginVertical: normalize(10),

              width: '90%',
            }}>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(16),
                color: COLORS?.red,
                textAlign: 'right',
              }}
              onPress={() => {
                setSpecialityFlag(false);
              }}>
              DONE
            </Text>
          </View>
          <FlatList
            data={PostReducer?.enquiryCategoryList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: normalize(10),
                    borderBottomWidth: normalize(1),
                    borderBottomColor: '#ccc',
                    width: Dimensions?.get('window')?.width,
                    backgroundColor:
                      selectSpecialzation.findIndex(itm => {
                        return item?.id == itm?.id;
                      }) != -1
                        ? COLORS?.themeColor
                        : '#eee',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    var array = [...selectSpecialzation];
                    if (
                      array.findIndex(itm => {
                        return item?.id == itm?.id;
                      }) == -1
                    ) {
                      array.push(item);
                    } else {
                      array.splice(
                        array.findIndex(itm => {
                          return item?.id == itm?.id;
                        }),
                        1,
                      );
                    }
                    setSelectSpecialization(array);
                  }}>
                  <Text
                    style={{
                      color:
                        selectSpecialzation.findIndex(itm => {
                          return item?.id == itm?.id;
                        }) != -1
                          ? COLORS?.WHITE
                          : COLORS?.themeColor,
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
      <ScrollView>
        <View style={{alignItems: 'center', marginBottom: normalize(30)}}>
          <View
            style={{
              marginVertical: normalize(10),
              paddingHorizontal: normalize(15),
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <Text
              style={{
                color: COLORS.STATUS_BAR,
                fontSize: normalize(20),
                fontWeight: '800',
              }}>
              Hello !
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: normalize(15),
                fontWeight: '600',
              }}>
              Please fill your basic information
            </Text>
          </View>
          <View style={{marginTop: normalize(0), width: '90%', flexDirection:'row', gap:normalize(10), marginBottom:normalize(10)}}>
            <TouchableOpacity onPress={()=>setUsertype('Advocate')} style={{flexDirection:'row', alignItems:'center',gap:normalize(7)}}>
               {Usertype == 'Advocate' ? 
                  <Image
                          source={ICON?.radioEnable}
                          style={{height: normalize(17), width: normalize(17)}}
                          resizeMode="contain"
                          tintColor={COLORS.themeColor}
                        />
                        :
                        <Image
                        source={ICON?.radioDisable}
                        style={{height: normalize(17), width: normalize(17)}}
                        resizeMode="contain"
                        tintColor={COLORS.themeColor}
                      />
               }

                      <Text style={{
                fontWeight: '600',
                fontSize: normalize(13),
              }}>Advocate</Text>
               
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setUsertype('Others')} style={{flexDirection:'row', alignItems:'center',gap:normalize(7)}}>
               {Usertype == 'Others' ? 
                  <Image
                          source={ICON?.radioEnable}
                          style={{height: normalize(17), width: normalize(17)}}
                          resizeMode="contain"
                          tintColor={COLORS.themeColor}
                        />
                        :
                        <Image
                        source={ICON?.radioDisable}
                        style={{height: normalize(17), width: normalize(17)}}
                        resizeMode="contain"
                        tintColor={COLORS.themeColor}
                      />
               }

                      <Text style={{
                fontWeight: '600',
                fontSize: normalize(13),
              }}>Others</Text>
               
            </TouchableOpacity>
           
          </View>
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
             Your Name
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: 1,
                borderColor: COLORS.themeColor,
              }}
              placeHolderText="Enter Name"
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
              Enter Your Email ID
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeHolderText="Enter Email"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={email}
              onChangingText={item => {
                setEmail(item);
              }}
            />
          </View>
          {Usertype == 'Advocate' &&
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Select Speciality
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: '#e7e7e7',
                borderWidth: 1,
                color: '#000',
              }}
              placeHolderText="Select"
              beforeIcon={''}
              keyboardType={'default'}
              selectBox={true}
              afterIcon={ICON.select_box_icon}
              // maxLength={10}
              value={
                selectSpecialzation?.length > 0
                  ? 'Speciality selected'
                  : 'Select speciality'
              }
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                setSpecialityFlag(true);
              }}
            />
          </View>
}
          <FlatList
            data={selectSpecialzation}
            style={{marginTop: normalize(10)}}
            horizontal={true}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: normalize(10),
                    width: Dimensions?.get('window')?.width / 2.5,
                    borderWidth: normalize(1),
                    borderColor: COLORS?.themeColor,
                    borderRadius: normalize(6),
                    marginRight: normalize(10),
                  }}>
                  <Text>{item?.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      var array = [...selectSpecialzation];
                      array.splice(
                        array.findIndex(itm => {
                          return item?.id == itm?.id;
                        }),
                        1,
                      );
                      setSelectSpecialization(array);
                    }}>
                    <Image
                      source={ICON?.close_circle}
                      style={{height: normalize(12), width: normalize(12)}}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />

{Usertype == 'Advocate' &&
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Enrolment ID
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeHolderText="Enrolment Number"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={enrollmentId}
              onChangingText={item => {
                setEnrollmentId(item);
              }}
              onOpenModal={item => {}}
            />
          </View>
}
          <View style={{marginTop: normalize(20), width: '90%'}}>
            <TouchableOpacity
              style={{
                padding: normalize(10),
                backgroundColor: COLORS.STATUS_BAR,
                borderRadius: normalize(10),
                alignItems: 'center',
              }}
              onPress={() => {
                var emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (name == '') {
                  ToastMessage('Name required');
                }  else {
                  //
                  var array = [];
                  selectSpecialzation.forEach(element => {
                    array.push(element?.id);
                  });
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        updateProfileRequest({
                          name: name,
                          email: email,
                          enrolment_id: enrollmentId,
                          type:Usertype == 'Advocate' ? 1 : 2,
                          // district: district,
                          // state: state,
                          // address: address,
                          // pin: pincode,
                          specialization: JSON?.stringify(array),
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

export default BasicInformation;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
