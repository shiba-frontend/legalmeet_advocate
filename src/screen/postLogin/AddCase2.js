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
  addCaseRequest,
  caseListRequest,
  caseTypeRequest,
  clientListRequest,
  courtListRequest,
  dashboardRequest,
  stateListRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

var status = '';
const AddCase2 = ({navigation, route}) => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState(new Date());
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [caseDetail, setCaseDetail] = useState('');
  const [council, setCouncil] = useState('');
  const courtType = [
    {id: 0, type: 'Suprime Court'},
    {id: 1, type: 'High Court'},
    {id: 2, type: 'District Court'},
  ];
  const [selectCourtType, setSelectCourtType] = useState({
    id: 2,
    type: 'District Court',
  });
  const [selectType, setSelectType] = useState(false);
  const [selectYear, setSelectYear] = useState(false);
  const [opponent, setOpponent] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [litigationCost, setLitigationCost] = useState('');
  const [assets, setAssets] = useState('');
  const [liability, setLiability] = useState('');
  function isEmpty(item) {
    if (item == null || item == '' || item == undefined) return true;
    return false;
  }
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(caseTypeRequest({type_id: 2}));
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
    console.log('BABUL:::::', PostReducer?.addData?.case_type);
    // setCaseNumber();
    if (!isEmpty(PostReducer?.addData?.previousData)) {
      setName(PostReducer?.addData?.previousData?.party_name);
      setCaseDetail(PostReducer?.addData?.previousData?.case_details);
      setType(PostReducer?.addData?.case_type);
      setYear(new Date(PostReducer?.addData?.previousData?.date));
      setCouncil(PostReducer?.addData?.previousData?.assisting_counsel);
      setCaseNumber(PostReducer?.addData?.previousData?.case_id);
      setOpponent(PostReducer?.addData?.previousData?.opponent);
    }
  }, []);
  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/addCaseRequest':
        status = PostReducer?.status;
        break;
      case 'post/addCaseSuccess':
        status = PostReducer?.status;
        if (PostReducer?.pageName == 'AddPage')
          navigation.navigate('CaseDocument');
        else {
          IsInternetConnected()
            .then(() => {
              dispatch(caseListRequest());
              dispatch(dashboardRequest());
            })
            .catch(() => {
              ToastMessage('Network connection issue');
            });
          navigation.pop(2);
        }
        break;
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={
          !isEmpty(PostReducer?.addData?.previousData)
            ? 'Edit Case'
            : 'Add New Case'
        }
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
            data={PostReducer?.caseTypes}
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

      <ScrollView>
        <View style={{alignItems: 'center'}}>
          {/* <View style={{marginTop: normalize(3), width: '90%'}}>
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
          </View> */}
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Party Name (Petitioner)
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
              placeHolderText="Enter Party Name"
              beforeIcon={''}
              keyboardType={'default'}
              value={name}
              onChangingText={item => {
                setName(item);
              }}
            />
          </View>
          <Text style={{marginTop: normalize(10), fontWeight: '800'}}>VS</Text>
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Respondents
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
              placeHolderText="Enter opponent"
              beforeIcon={''}
              keyboardType={'default'}
              value={opponent}
              onChangingText={item => {
                setOpponent(item);
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
              Select Date
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
              afterIcon={ICON.calender}
              selectBox={true}
              value={moment(year).format('YYYY-MM-DD')}
              onChangingText={item => {
                // setYear(item);
              }}
              OnOpenModal={item => {
                setSelectYear(true);
              }}
            />
          </View>
          {PostReducer?.profileData?.client_type == 0 ? (
            <>
              {/* <View style={{marginTop: normalize(3), width: '90%'}}>
                <Text
                  style={{
                    marginVertical: normalize(7),
                    fontWeight: '600',
                    fontSize: normalize(13),
                  }}>
                  Litigation Cost
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
                  placeHolderText="Enter Cost"
                  beforeIcon={''}
                  keyboardType={'numeric'}
                  value={litigationCost}
                  onChangingText={item => {
                    setLitigationCost(item);
                  }}
                />
              </View> */}

              <View style={{marginTop: normalize(3), width: '90%'}}>
                <Text
                  style={{
                    marginVertical: normalize(7),
                    fontWeight: '600',
                    fontSize: normalize(13),
                  }}>
                  Assets
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
                  placeHolderText="Enter Cost"
                  beforeIcon={''}
                  keyboardType={'numeric'}
                  value={assets}
                  onChangingText={item => {
                    setAssets(item);
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
                  Liabilities
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
                  placeHolderText="Enter Cost"
                  beforeIcon={''}
                  keyboardType={'numeric'}
                  value={liability}
                  onChangingText={item => {
                    setLiability(item);
                  }}
                />
              </View>
            </>
          ) : null}
          <View style={{marginTop: normalize(3), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Case Details
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
              placeHolderText="Enter Case Details"
              numberOfLine={5}
              beforeIcon={''}
              keyboardType={'default'}
              value={caseDetail}
              onChangingText={item => {
                setCaseDetail(item);
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
              Assigning Council
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
              placeHolderText="Enter Assigning Council"
              beforeIcon={''}
              keyboardType={'default'}
              value={council}
              onChangingText={item => {
                setCouncil(item);
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
                marginBottom: normalize(10),
              }}
              onPress={() => {
                if (year == '') {
                  ToastMessage('Year required');
                } else if (name == '') {
                  ToastMessage('Party name required');
                } else if (caseDetail == '') {
                  ToastMessage('Case detail required');
                } else if (opponent == '') {
                  ToastMessage('Opponent required');
                } else {
                  console.log('Data: ', {
                    advocate_id: PostReducer?.addData?.advocate?.id,
                    type_id: type?.id,
                    court_id: PostReducer?.addData?.court?.id,
                    state_id: PostReducer?.addData?.state?.id,
                    petitioner: PostReducer?.addData?.petitioner,
                    date: moment(year).format('YYYY-MM-DD'),
                    party_name: name,
                    case_details: caseDetail,
                    assisting_counsel: council,
                    case_id: PostReducer?.addData?.case_id,
                    year_of_case: PostReducer?.addData?.year_of_case,
                    opponent: opponent,
                  });
                  var array = [];
                  PostReducer?.addData?.member?.forEach(element => {
                    array.push(element?.id);
                  });
                  IsInternetConnected()
                    .then(() => {
                      // var requestJSON = {
                      //   // "exist_id" : "1"
                      //   advocate_id: PostReducer?.addData?.advocate?.id,
                      //   type_id: PostReducer?.addData?.case_type?.id,
                      //   court_id: PostReducer?.addData?.court?.id,
                      //   state_id: PostReducer?.addData?.state?.id,
                      //   pin: PostReducer?.addData?.postcode,
                      //   date: moment(year).format('YYYY-MM-DD'),
                      //   party_name: name,
                      //   case_details: caseDetail,
                      //   case_id: caseNumber,
                      // };
                      var requestJSON = {
                        // "exist_id" : "1"
                        client_id:
                          route?.params?.pageName == 'add'
                            ? PostReducer?.clientDetail?.id
                            : PostReducer?.addData?.client?.id,
                        type_id: PostReducer?.addData?.case_type?.id,
                        court_id: PostReducer?.addData?.court?.id,
                        state_id: PostReducer?.addData?.state?.id,
                        petitioner: PostReducer?.addData?.petitioner,
                        date: moment(year).format('YYYY-MM-DD'),
                        party_name: name,
                        case_details: caseDetail,
                        assisting_counsel: council,
                        member_ids: array,
                        case_id: PostReducer?.addData?.case_id,
                        year_of_case: PostReducer?.addData?.year_of_case,
                        opponent: opponent,
                      };
                      if (isEmpty(requestJSON?.advocate_id)) {
                        requestJSON['advocate_mobile'] =
                          PostReducer?.addData?.advocateMobileNumber;
                        requestJSON['advocate_name'] =
                          PostReducer?.addData?.advocateName;
                      }

                      console.log('REQUEST PARAMS:::::::', requestJSON);
                      if (!isEmpty(PostReducer?.addData?.previousData)) {
                        requestJSON.exist_id =
                          PostReducer?.addData?.previousData?.id;
                      }
                      dispatch(addCaseRequest(requestJSON));
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
                SAVE AND CONTINUE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <DatePicker
          modal
          open={selectYear}
          date={year}
          // maximumDate={new Date()}
          onConfirm={date => {
            setYear(date);
            setSelectYear(false);
          }}
          onCancel={() => {
            setSelectYear(false);
          }}
          mode="date"
          textColor={'#000'}
          theme="light"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCase2;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
