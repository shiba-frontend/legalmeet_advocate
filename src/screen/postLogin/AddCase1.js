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
  caseData,
  clientListRequest,
  courtListRequest,
  memberListRequest,
  stateListRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import Modal from 'react-native-modal';

var status = '';
const AddCase1 = ({navigation, route}) => {
  const [client, setClient] = useState('');
  const [court, setCourt] = useState('');
  const [state, setState] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [member, setMember] = useState([]);
  const [postcode, setPostcode] = useState('');
  const [selectClient, setSelectClient] = useState(false);
  const [selectCourt, setSelectCourt] = useState(false);
  const [selectState, setSelectState] = useState(false);
  const [selectMember, setSelectMember] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  function isEmpty(item) {
    if (item == '' || item == undefined || item == null) return true;
    return false;
  }
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(courtListRequest());
        dispatch(stateListRequest());
        dispatch(memberListRequest());
        route?.params?.pageName != 'add'
          ? dispatch(clientListRequest())
          : setClient(PostReducer?.clientDetail);
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });

    if (!isEmpty(route?.params?.item)) {
      console.log(route?.params?.item?.court_details);
      setCourt(route?.params?.item?.court_details);
      setState(route?.params?.item?.state_details);
      setPostcode(String(route?.params?.item?.pin));
      setClient({
        id: route?.params?.item?.client_id,
        name: route?.params?.item?.client,
      });
      setMember(route?.params?.item?.members);
      setCaseNumber(route?.params?.item?.case_id);
    }
  }, []);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={!isEmpty(route?.params?.item) ? 'Edit Case' : 'Add New Case'}
      />
      <Loader visible={PostReducer.loading} />
      {/* Client list */}
      <Modal
        isVisible={selectClient}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectClient(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
          }}>
          <FlatList
            data={PostReducer?.clients}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                  }}
                  onPress={() => {
                    setClient(item);
                    setSelectClient(false);
                  }}>
                  <Text>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
      {/* Court list */}
      <Modal
        isVisible={selectCourt}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectCourt(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
          }}>
          <FlatList
            data={PostReducer?.courtLists}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                  }}
                  onPress={() => {
                    setCourt(item);
                    setSelectCourt(false);
                  }}>
                  <Text>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
      {/* State list */}
      <Modal
        isVisible={selectState}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectState(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
          }}>
          <FlatList
            data={PostReducer?.stateList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                  }}
                  onPress={() => {
                    setState(item);
                    setSelectState(false);
                  }}>
                  <Text>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
      {/* Member list */}
      <Modal
        isVisible={selectMember}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectMember(false);
        }}
        backdropTransitionOutTiming={0}
        style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            maxHeight: Dimensions.get('screen').height / 2,
            width: '100%',
            paddingTop: 10,
            // paddingHorizontal: 30,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
          }}>
          <FlatList
            data={PostReducer?.memberList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                    paddingRight: normalize(10),
                  }}
                  onPress={() => {
                    let arr = [...member];
                    let ind = arr.findIndex(data => {
                      return data.id === item.id;
                    });
                    if (ind != -1) {
                      arr.splice(ind, 1);
                      setMember(arr);
                    } else {
                      arr.push(item);
                      setMember(arr);
                    }
                    // setState(item);
                    setSelectMember(false);
                  }}>
                  <Text
                    style={{
                      color:
                        member.findIndex(data => {
                          return data.id === item.id;
                        }) != -1
                          ? COLORS.themeColor
                          : '#000',
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
        <View style={{alignItems: 'center'}}>
          {route?.params?.pageName != 'add' ? (
            <View style={{marginTop: normalize(0), width: '90%'}}>
              <Text
                style={{
                  marginVertical: normalize(7),
                  fontWeight: '600',
                  fontSize: normalize(13),
                }}>
                Select Client
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
                value={client?.name}
                onChangingText={item => {
                  // setName(item);
                }}
                OnOpenModal={item => {
                  if (PostReducer?.clients?.length > 0) setSelectClient(true);
                  else ToastMessage('No client list is available');
                }}
              />
            </View>
          ) : null}
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Select Member
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText={member?.length > 0 ? 'Selected' : 'Select'}
              beforeIcon={''}
              keyboardType={'default'}
              selectBox={true}
              afterIcon={ICON.select_box_icon}
              // maxLength={10}
              // value={member?.name}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                if (PostReducer?.memberList?.length > 0) setSelectMember(true);
                else ToastMessage('No member list is available');
              }}
            />
            <FlatList
              horizontal={true}
              style={{marginTop: normalize(7)}}
              data={member}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      paddingHorizontal: normalize(10),
                      paddingVertical: normalize(5),
                      borderRadius: normalize(20),
                      backgroundColor: COLORS.STATUS_BAR,
                      marginRight: normalize(10),
                      paddingRight: normalize(15),
                      // width: '60%',
                    }}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        backgroundColor: '#FFF',
                        height: normalize(12),
                        width: normalize(12),
                        borderRadius: normalize(6),
                        right: -normalize(0),
                        top: normalize(0),
                      }}
                      onPress={() => {
                        let arr = [...member];
                        let ind = arr.findIndex(data => {
                          return data.id === item.id;
                        });
                        if (ind != -1) {
                          arr.splice(ind, 1);
                          setMember(arr);
                        }
                      }}>
                      <Image
                        source={ICON?.close_circle}
                        style={{height: normalize(12), width: normalize(12)}}
                      />
                    </TouchableOpacity>
                    <Text style={{color: COLORS.WHITE}}>{item?.name}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(11),
              }}>
              Select State
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Select"
              beforeIcon={''}
              keyboardType={'default'}
              selectBox={true}
              afterIcon={ICON.select_box_icon}
              // maxLength={10}
              value={state?.name}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                if (PostReducer?.stateList?.length > 0) setSelectState(true);
                else ToastMessage('No state list is available');
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
              Enter Case Number
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter case number"
              beforeIcon={''}
              keyboardType={'default'}
              value={caseNumber}
              onChangingText={item => {
                setCaseNumber(item);
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
              Select Court
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Select"
              beforeIcon={''}
              keyboardType={'default'}
              selectBox={true}
              afterIcon={ICON.select_box_icon}
              // maxLength={10}
              value={court?.name}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                if (PostReducer?.courtLists?.length > 0) setSelectCourt(true);
                else ToastMessage('No court list is available');
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
              Enter Pincode
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter post code"
              beforeIcon={''}
              keyboardType={'phone-pad'}
              maxLength={6}
              value={postcode}
              onChangingText={item => {
                setPostcode(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(20), width: '90%'}}>
            <TouchableOpacity
              style={{
                padding: normalize(10),
                backgroundColor: COLORS.STATUS_BAR,
                borderRadius: normalize(10),
                alignItems: 'center',
              }}
              onPress={() => {
                if (client == '') {
                  ToastMessage('CLient required');
                } else if (court == '') {
                  ToastMessage('Court required');
                } else if (state == '') {
                  ToastMessage('State required');
                } else if (postcode == '') {
                  ToastMessage('Postcode required');
                } else {
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        caseData({
                          client: client,
                          court: court,
                          state: state,
                          postcode: postcode,
                          previousData: route?.params?.item,
                          member: member,
                          case_id: caseNumber,
                        }),
                      );
                      navigation.navigate('AddCase2', {
                        pageName: route?.params?.pageName,
                      });
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                }
              }}>
              <Text style={{color: COLORS.WHITE, letterSpacing: normalize(2)}}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCase1;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
