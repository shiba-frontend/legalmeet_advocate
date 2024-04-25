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
  caseDetailRequest,
  caseDocumentAddRequest,
  caseListRequest,
  caseTypeRequest,
  clientListRequest,
  courtListRequest,
  stateListRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

var status = '';
const AddHearing = ({navigation}) => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [selectType, setSelectType] = useState(false);
  const [selectYear, setSelectYear] = useState(false);
  const [selectTime, setSelectTime] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  function isEmpty(item) {
    if (item == null || item == '' || item == undefined) return true;
    return false;
  }
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(courtListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
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
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.WHITE}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Add Hearing Date'}
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
            data={PostReducer?.courtLists}
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

      <ScrollView>
        <View style={{alignItems: 'center'}}>
          
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(10),
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

          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(10),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Select Time
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeHolderText="Select"
              beforeIcon={''}
              keyboardType={'default'}
              afterIcon={ICON.calender}
              selectBox={true}
              value={moment(time).format('hh:mm a')}
              onChangingText={item => {
                // setYear(item);
              }}
              OnOpenModal={item => {
                setSelectTime(true);
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
                  ToastMessage('Date required');
                } else if (time == '') {
                  ToastMessage('Time required');
                } else {
                  //
                  IsInternetConnected()
                    .then(() => {
                      let formData = new FormData();
                      formData.append('type', 'hearing');
                      formData.append(
                        'hearing_date',
                        moment(year).format('YYYY-MM-DD'),
                      );
                      formData.append(
                        'hearing_time',
                        moment(year).format('hh:mm:ss'),
                      );
                   
                      formData.append('case_id', PostReducer?.caseDetail?.id);
                      dispatch(caseDocumentAddRequest(formData));
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                }
              }}>
              <Text style={{color: COLORS.secondarColor, letterSpacing: normalize(2)}}>
                SAVE AND CONTINUE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <DatePicker
          modal
          open={selectYear}
          date={year}
          minimumDate={new Date()}
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
        <DatePicker
          modal
          open={selectTime}
          date={time}
          // maximumDate={new Date()}
          onConfirm={date => {
            setTime(date);
            setSelectTime(false);
          }}
          onCancel={() => {
            setSelectTime(false);
          }}
          mode="time"
          textColor={'#000'}
          theme="light"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddHearing;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
