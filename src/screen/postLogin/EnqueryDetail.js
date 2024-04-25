import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import Header from '../../utils/helpers/Header';
import normalize from '../../utils/helpers/normalize';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  addEnquiryRequest,
  consultationListRequest,
  serviceListRequest,
} from '../../redux/reducer/PostReducer';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {ToastMessage} from '../../utils/helpers/Toast';
import Modal from 'react-native-modal';
import InputText from '../../components/InputText';

const EnqueryDetail = ({navigation, route}) => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [openModal, setOpenModal] = useState(false);
  const [subject, setSubject] = useState('');
  const dispatch = useDispatch();
  function isEmpty(item) {
    if (item == null || item == '' || item == undefined) return true;
    return false;
  }
  useEffect(() => {}, []);
  return (
    <ScrollView>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Enquiry Details'}
      />
      <Modal
        isVisible={openModal}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setOpenModal(false);
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
          <View style={{marginTop: normalize(3), width: '90%'}}>
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
              placeHolderText="Type your messages..."
              beforeIcon={''}
              numberOfLine={5}
              keyboardType={'default'}
              value={subject}
              onChangingText={item => {
                setSubject(item);
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS?.themeColor,
              padding: normalize(10),
              margin: normalize(10),
              width: '90%',
              borderRadius: normalize(6),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (isEmpty(subject)) {
                ToastMessage('Enter subject');
              } else {
                setOpenModal(false);
                IsInternetConnected()
                  .then(() => {
                    dispatch(
                      addEnquiryRequest({
                        note: subject,
                      }),
                    );
                  })
                  .catch(() => {
                    ToastMessage('Network connection issue');
                  });
              }
            }}>
            <Text style={{color: COLORS?.WHITE}}>Send</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View
        style={{
          paddingTop: normalize(22),
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS?.themeColor,
            padding: normalize(10),
            position: 'absolute',
            top: normalize(10),
            right: normalize(10),
            width: '30%',
            borderRadius: normalize(5),
            flexDirection: 'row',
          }}
          onPress={() => {
            setOpenModal(true);
          }}>
          <Image
            source={ICON?.add}
            style={{
              height: normalize(12),
              width: normalize(12),
              tintColor: COLORS?.WHITE,
            }}
          />
          <Text style={{color: COLORS?.WHITE, marginLeft: normalize(5)}}>
            Add Enquiry
          </Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#F5F7F8',
            borderRadius: normalize(6),
            marginBottom: normalize(10),
            borderWidth: normalize(1),
            borderColor: 'rgba(0, 45, 82, 0.2)',
            paddingVertical: normalize(10),
            // paddingHorizontal: normalize(8),

            marginEnd: normalize(10),
            marginStart: normalize(10),
            width: Dimensions?.get('window')?.width - 30,
            elevation: normalize(5),
            marginTop: normalize(30),
          }}>
          <View
            style={{
              width: '100%',
              // borderBottomWidth: normalize(1),
              paddingBottom: normalize(10),
              paddingHorizontal: normalize(8),
              // padding: normalize(6),
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '400',
                fontSize: normalize(12),
                width: '100%',
              }}>
              {route?.params?.item?.note}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: normalize(10),
                textAlign: 'right',
              }}>
              {route?.params?.item?.date}
            </Text>
          </View>
          {/* <View
            style={{
              alignItems: 'center',
              marginTop: normalize(5),
            }}>
            <View
              style={{flexDirection: 'row', paddingHorizontal: normalize(10)}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: normalize(10),
                  marginLeft: normalize(3),
                  width: '100%',
                }}>
                'It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution'
              </Text>
            </View>
          </View> */}
          {/* <Text
            style={{
              color: '#000',
              fontSize: normalize(10),
              textAlign: 'right',
              marginRight: normalize(10),
            }}>
            January 27, 2024, 3:32 pm
          </Text> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default EnqueryDetail;

const styles = StyleSheet.create({});
