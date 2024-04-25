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
  caseListRequest,
  clientAddRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import moment from 'moment';
import Modal from 'react-native-modal';
var status = '';
const ClientAddBasicDetail = ({navigation}) => {
  const [clientID, setClientID] = useState('');
  const [corporateName, setCorporateName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [option, setOption] = useState('Basic Details');
  const [contactNumber, setContactNumber] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  const options = ['Basic Details', 'Cases', 'Documents'];
  const clientTypes = [
    {id: 0, name: 'Corporate'},
    {id: 1, name: 'Individual'},
  ];
  const [selectType, setSelectType] = useState(false);
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/clientAddRequest':
        status = PostReducer?.status;
        break;
      case 'post/clientAddSuccess':
        status = PostReducer?.status;
        // navigation.navigate('AddCase1', {pageName: 'add'}); route?.params?.item?.id
        navigation.navigate('AddClient', {
          item: PostReducer?.clientDetail,
          tab: 'case',
        });
        break;
    }
  }
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Add Client'}
      />
      <Loader visible={PostReducer.loading} />
      {/* Case type list */}
      <Modal
        isVisible={selectType}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectType(false);
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
            data={clientTypes}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                  }}
                  onPress={() => {
                    setType(item);
                    setSelectType(false);
                  }}>
                  <Text>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
      <View
        style={{
          marginTop: normalize(10),
          // backgroundColor: '#FF0',
          flex: 0,
        }}>
        <FlatList
          data={options}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: Dimensions.get('screen').width / 3.5,
                  alignItems: 'center',
                  paddingVertical: normalize(10),
                  borderBottomWidth: index != 0 ? normalize(0) : normalize(3),
                  borderBottomColor: COLORS.STATUS_BAR,
                }}
                onPress={() => {}}>
                <Text
                  style={{
                    color: index != 0 ? '#000' : COLORS.themeColor,
                    fontSize: normalize(14),
                    fontWeight: '800',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          {/* <View
            style={{
              marginVertical: normalize(10),
              paddingHorizontal: normalize(15),
              alignItems: 'flex-start',
              width: '100%',
            }}></View> */}

          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Client Name
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(2),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter Client Name"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}

              value={name}
              onChangingText={item => {
                setName(item);
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
              Client Type
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(2),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Select"
              beforeIcon={''}
              keyboardType={'default'}
              selectBox={true}
              afterIcon={ICON.select_box_icon}
              // maxLength={10}
              value={type?.name}
              onChangingText={item => {
                // setName(item);
                setSelectType(true);
              }}
              OnOpenModal={item => {
                if (clientTypes.length > 0) setSelectType(true);
                else ToastMessage('No case type available');
              }}
            />
          </View>
          {!isEmpty(type) && type?.id == 0 ? (
            <View style={{marginTop: normalize(0), width: '90%'}}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
                }}>
                Corporate Name
              </Text>
              <InputText
                inputStyle={{
                  backgroundColor: '#FFF',
                  width: '100%',
                  borderRadius: 10,
                  paddingHorizontal: normalize(7),
                  paddingVertical: normalize(2),
                  borderColor: COLORS.themeColor,
                  borderWidth: 1,
                }}
                placeHolderText="Enter Corporate Name"
                beforeIcon={''}
                keyboardType={'default'}
                // maxLength={10}

                value={corporateName}
                onChangingText={item => {
                  setCorporateName(item);
                }}
              />
            </View>
          ) : null}
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Email ID
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(2),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
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
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Contact Number
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(2),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter Contact Number"
              beforeIcon={''}
              keyboardType={'phone-pad'}
              maxLength={10}
              value={contactNumber}
              onChangingText={item => {
                setContactNumber(item);
                setClientID(
                  '#CL' +
                    Math.floor(Math.random() * (999 - 100 + 1) + 100) +
                    '-' +
                    item,
                );
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
              Client ID
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(2),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter Client ID"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={clientID}
              selectBox={true}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                console.log(item);
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
                var emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var phoneno = /^\d{10}$/;
                if (name == '') {
                  ToastMessage('Client name required');
                  // } else if (email == '') {
                  //   ToastMessage('Email required');
                } else if (contactNumber == '') {
                  ToastMessage('Contact number required');
                  // } else if (!email.match(emailreg)) {
                  //   ToastMessage('Enter valid email');
                } else if (!contactNumber.match(phoneno)) {
                  ToastMessage('Enter valid phone');
                } else if (isEmpty(type)) {
                  ToastMessage('Enter type');
                } else {
                  var requestJSON = {
                    client_id: clientID,
                    name: name,
                    mobile_number: contactNumber,
                    client_type: type?.id, //0:corporate,1:individual
                  };
                  if (email != '') {
                    requestJSON['email'] = email;
                  }
                  if (corporateName != '') {
                    requestJSON['corporate_name'] = corporateName;
                  }
                  IsInternetConnected()
                    .then(() => {
                      dispatch(clientAddRequest(requestJSON));
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                }
              }}>
              <Text style={{color: COLORS.WHITE, letterSpacing: normalize(2)}}>
                SAVE AND NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientAddBasicDetail;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
