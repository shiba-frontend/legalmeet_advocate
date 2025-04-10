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
  caseTypeRequest,
  clientListRequest,
  courtListRequest,
  memberListRequest,
  stateListRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import Modal from 'react-native-modal';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
var status = '';
const AddCase1 = ({navigation, route}) => {
  const [client, setClient] = useState('');
  const [court, setCourt] = useState('');
  const [state, setState] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [member, setMember] = useState([]);
  const [petitioner, setPetitioner] = useState('');
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

  //Search adv
  const [ClientList, setClientList] = useState([]);
  const [searchclientname, setsearchclientname] = useState('');
  //Search state
  const [StateList, setStateList] = useState([]);
  const [searchstate, setsearchstate] = useState('');

  //Search Court
  const [CourtList, setCourtList] = useState([]);
  const [searchcourt, setsearchcourt] = useState('');

  //Search case type
  const [CasetypetList, setCasetypetList] = useState([]);
  const [searchcasetype, setsearchcasetype] = useState('');

  const [caseYear, setCaseYear] = useState('');
  const [caseYearFlag, setCaseYearFlag] = useState(false);

  console.log('--------------------------------', ClientList);

  const [type, setType] = useState('');
  const courtType = [
    {id: 0, type: 'Suprime Court'},
    {id: 1, type: 'High Court'},
    {id: 2, type: 'District Court'},
    {id: 3, type: 'Others'},
  ];
  const [selectCourtType, setSelectCourtType] = useState({
    id: 2,
    type: 'District Court',
  });
  const [selectType, setSelectType] = useState(false);

  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(courtListRequest());
        dispatch(stateListRequest());
        dispatch(memberListRequest());
        dispatch(clientListRequest());
        route?.params?.pageName != 'add'
          ? dispatch(clientListRequest())
          : setClient(PostReducer?.clientDetail);
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });

    if (!isEmpty(route?.params?.item)) {
      console.log(route?.params?.item);
      setCourt(route?.params?.item?.court_details);
      setState(route?.params?.item?.state_details);
      setPetitioner(String(route?.params?.item?.petitioner));
      setCaseYear(route?.params?.item?.year_of_case);
      setClient({
        id: route?.params?.item?.client_id,
        name: route?.params?.item?.client,
      });
      setMember(route?.params?.item?.members);
      setCaseNumber(route?.params?.item?.case_id);
      setType(route?.params?.item?.type_details);
      if (
        route?.params?.item?.state_id == null &&
        route?.params?.item?.court_id == null
      ) {
        setSelectCourtType(courtType[0]);
        IsInternetConnected()
          .then(() => {
            dispatch(caseTypeRequest({type_id: courtType?.[0]?.id}));
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
      } else if (route?.params?.item?.court_id == null) {
        setSelectCourtType(courtType[1]);
        IsInternetConnected()
          .then(() => {
            dispatch(caseTypeRequest({type_id: courtType?.[1]?.id}));
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
      } else {
        IsInternetConnected()
          .then(() => {
            dispatch(caseTypeRequest({type_id: courtType?.[2]?.id}));
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
      }

      // courtType.forEach(type => {
      //   if (type?.id == route?.params?.item?.court_id) {
      //     setSelectCourtType(type);
      //   }
      // });
    } else {
      IsInternetConnected()
        .then(() => {
          dispatch(caseTypeRequest({type_id: courtType?.[2]?.id}));
        })
        .catch(() => {
          ToastMessage('Network connection issue');
        });
    }
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    setClientList(PostReducer?.clients);
  }, [PostReducer?.clients]);

  useEffect(() => {
    setStateList(PostReducer?.stateList);
  }, [PostReducer?.stateList]);

  useEffect(() => {
    setCourtList(PostReducer?.courtLists);
  }, [PostReducer?.courtLists]);

  useEffect(() => {
    setCasetypetList(PostReducer?.caseTypes);
  }, [PostReducer?.caseTypes]);

  const handleSearch = text => {
    if (text) {
      setsearchclientname(text);

      const filtered = ClientList.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );

      setClientList(filtered);
    } else {
      setClientList(PostReducer?.clients);
      setsearchclientname(text);
    }
  };

  const handleSearchstate = text => {
    if (text) {
      setsearchstate(text);

      const filtered = StateList.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );

      setStateList(filtered);
    } else {
      setStateList(PostReducer?.stateList);
      setsearchstate(text);
    }
  };

  const handleSearchcourt = text => {
    if (text) {
      setsearchcourt(text);

      const filtered = CourtList.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );

      setCourtList(filtered);
    } else {
      setCourtList(PostReducer?.courtLists);
      setsearchcourt(text);
    }
  };

  const handleSearchcasetype = text => {
    if (text) {
      setsearchcasetype(text);

      const filtered = CasetypetList.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );

      setCasetypetList(filtered);
    } else {
      setCasetypetList(PostReducer?.caseTypes);
      setsearchcasetype(text);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
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
          <View style={{padding: normalize(10)}}>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: Dimensions.get('screen').width - 25,
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: '#e7e7e7',
                borderWidth: 1,
              }}
              placeHolderText="Search client name"
              beforeIcon={''}
              keyboardType={'default'}
              maxLength={100}
              value={searchclientname}
              onChangingText={handleSearch}
            />
          </View>

          <FlatList
            data={ClientList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: normalize(10),
                  }}
                  onPress={() => {
                    setClient(item);
                    setSelectClient(false);
                  }}>
                  <View
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: normalize(40),
                      backgroundColor: '#f3f3f3',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(8),
                      }}>
                      {item?.name?.split(' ')[0]?.substring(0, 1)}{' '}
                      {item?.name?.split(' ')[1]?.substring(0, 1)}
                    </Text>
                  </View>
                  <View>
                    <Text>{item?.name}</Text>
                    <Text>{item?.mobile_number}</Text>
                  </View>
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
          <View style={{padding: normalize(10)}}>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: Dimensions.get('screen').width - 25,
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: '#e7e7e7',
                borderWidth: 1,
              }}
              placeHolderText="Search court Name"
              beforeIcon={''}
              keyboardType={'default'}
              maxLength={100}
              value={searchcourt}
              onChangingText={handleSearchcourt}
            />
          </View>
          <FlatList
            data={CourtList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-start',
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
          <View style={{padding: normalize(10)}}>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: Dimensions.get('screen').width - 25,
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: '#e7e7e7',
                borderWidth: 1,
              }}
              placeHolderText="Search State"
              beforeIcon={''}
              keyboardType={'default'}
              maxLength={100}
              value={searchstate}
              onChangingText={handleSearchstate}
            />
          </View>
          <FlatList
            data={StateList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-start',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                  }}
                  onPress={() => {
                    setState(item);
                    setSelectState(false);
                    IsInternetConnected()
                      .then(() => {
                        dispatch(courtListRequest({state_id: item?.id}));
                      })
                      .catch(() => {
                        ToastMessage('Network connection issue');
                      });
                  }}>
                  <Text style={{textAlign: 'left'}}>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
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
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // padding: normalize(40),
            alignItems: 'center',
          }}>
          <View style={{padding: normalize(10)}}>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: Dimensions.get('screen').width - 25,
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: '#e7e7e7',
                borderWidth: 1,
              }}
              placeHolderText="Search case type"
              beforeIcon={''}
              keyboardType={'default'}
              maxLength={100}
              value={searchcasetype}
              onChangingText={handleSearchcasetype}
            />
          </View>
          <FlatList
            data={CasetypetList}
            renderItem={({item, index}) => {
              console.log(JSON.stringify(item));
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-start',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                  }}
                  onPress={() => {
                    setType(item);
                    setSelectType(false);
                  }}>
                  <Text style={{textAlign: 'left'}}>{item?.name}</Text>
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
        <View style={{alignItems: 'center', marginBottom: normalize(10)}}>
          <View style={{marginTop: normalize(10), width: '90%'}}>
            {route?.params?.pageName != 'add' ? (
              <View>
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
                      backgroundColor: COLORS.themeColor,
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
            <Text
              style={{
                marginVertical: normalize(10),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Select Court Type
            </Text>
            <FlatList
              data={courtType}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: Dimensions.get('screen').width - 45,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderWidth: normalize(1),
                      borderRadius: normalize(10),
                      padding: normalize(10),
                      margin: normalize(5),
                      marginLeft: normalize(0),
                      borderColor:
                        item?.id == selectCourtType?.id
                          ? COLORS.themeColor
                          : COLORS.ASH,
                    }}
                    onPress={() => {
                      setSelectCourtType(item);
                      IsInternetConnected()
                        .then(() => {
                          dispatch(caseTypeRequest({type_id: item?.id}));
                          setType('');
                        })
                        .catch(() => {
                          ToastMessage('Network connection issue');
                        });
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: normalize(13),
                        color:
                          item?.id == selectCourtType?.id
                            ? COLORS.STATUS_BAR
                            : '#000',
                      }}>
                      {item?.type}
                    </Text>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: normalize(20),
                        width: normalize(20),
                        borderRadius: normalize(10),
                        borderColor:
                          item?.id == selectCourtType?.id
                            ? COLORS.themeColor
                            : COLORS.ASH,
                        borderWidth: normalize(1),
                      }}>
                      {item?.id == selectCourtType?.id ? (
                        <Image
                          source={ICON?.verified}
                          style={{
                            height: normalize(15),
                            width: normalize(15),
                            tintColor: COLORS.STATUS_BAR,
                          }}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {selectCourtType?.id != 0 && (
            <View style={{marginTop: normalize(0), width: '90%'}}>
              <Text
                style={{
                  marginVertical: normalize(10),
                  fontWeight: '600',
                  fontSize: normalize(13),
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
          )}
          {selectCourtType?.id == 2 && (
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
          )}

{selectCourtType?.id == 3 && (
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
          )}

          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              On behalf of
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
              placeHolderText="Petitioner/Respondent"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={6}
              value={petitioner}
              onChangingText={item => {
                setPetitioner(item);
              }}
            />
          </View>

          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(10),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Select Case Type
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
              value={type?.name}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                if (PostReducer?.caseTypes?.length > 0) setSelectType(true);
                else ToastMessage('No case type available');
              }}
            />
          </View>

          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(10),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Select Case Number
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
              placeHolderText="Case number"
              beforeIcon={''}
              keyboardType={'default'}
              // selectBox={true}
              // afterIcon={ICON.select_box_icon}
              // maxLength={10}
              value={caseNumber}
              onChangingText={item => {
                setCaseNumber(item);
              }}
              // OnOpenModal={item => {
              //   if (PostReducer?.caseTypes?.length > 0) setSelectType(true);
              //   else ToastMessage('No case type available');
              // }}
            />
          </View>

          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Case of Year
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
              // placeHolderText=
              // beforeIcon={''}
              // keyboardType={'numeric'}
              // maxLength={4}
              // afterIcon={ICON.calender}
              // // selectBox={true}
              // value={caseYear}
              // onChangingText={item => {
              //   setCaseYear(item);
              // }}
              placeHolderText="Enter year"
              beforeIcon={''}
              keyboardType={'numeric'}
              // selectBox={true}
              // afterIcon={ICON.select_box_icon}
              maxLength={4}
              value={caseYear}
              onChangingText={item => {
                setCaseYear(item);
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
                  ToastMessage('Client required');
                }
                else if (court == '' && selectCourtType?.id == 2) {
                  ToastMessage('Court required');
                } else if (courtType == '') {
                  ToastMessage('Court type required');
                } else if (state == '' && selectCourtType?.id != 0) {
                  ToastMessage('State required');
                } else if (petitioner == '') {
                  ToastMessage('petitioner required');
                } else if (type == '') {
                  ToastMessage('Case type required');
                } else if (caseYear == '') {
                  ToastMessage('Case year required');
                } else if (caseYear.length != 4) {
                  ToastMessage('Enter valid year');
                } else {
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        caseData({
                          client: client,
                          court_type: selectCourtType,
                          court: court,
                          state: state,
                          petitioner: petitioner,
                          previousData: route?.params?.item,
                          member: member,
                          case_type: type,
                          case_id: caseNumber,
                          year_of_case: caseYear,
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
              <Text
                style={{
                  color: COLORS.secondarColor,
                  letterSpacing: normalize(2),
                }}>
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
