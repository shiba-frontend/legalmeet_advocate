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
  enquiryListRequest,
  enquiryReplyRequest,
  serviceListRequest,
} from '../../redux/reducer/PostReducer';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {ToastMessage} from '../../utils/helpers/Toast';
import Modal from 'react-native-modal';
import InputText from '../../components/InputText';
import {navigate} from '../../utils/helpers/RootNavigation';

const EnqueryList = ({navigation}) => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [openModal, setOpenModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [selectedQuery, setSelectedQuery] = useState('');
  const dispatch = useDispatch();
  function isEmpty(item) {
    if (item == null || item == '' || item == undefined) return true;
    return false;
  }
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(enquiryListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  return (
    <ScrollView
      style={{
        backgroundColor: '#f1f1f1',
        flex: 1,
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Enquiry List'}
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
                      enquiryReplyRequest({
                        enquiry_id: selectedQuery?.id,
                        message: subject,
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
          padding: normalize(12),
        }}>
        {PostReducer?.enquiryList?.length > 0 ? (
          <Text
            style={{
              backgroundColor: '#fefefe',
              paddingHorizontal: normalize(10),
              paddingVertical: normalize(3),
              color: '#000',
              fontSize: normalize(12),
              fontWeight: '500',
            }}>
            {PostReducer?.enquiryList?.length} New Enquires
          </Text>
        ) : null}
        <FlatList
          data={PostReducer?.enquiryList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  padding: normalize(10),
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                }}
                onPress={() => {
                  if (PostReducer?.profileData?.is_subscribed) {
                    navigate('Message', {item: item});
                  } else {
                    navigation.navigate('expire');
                  }
             
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: normalize(5),
                  }}>
                  <View
                    style={{
                      width: '68%',
                    }}>
                    <Text
                      style={{
                        backgroundColor: '#eff8ff',
                        borderWidth: 1,
                        borderColor: '#bfe3ff',
                        paddingVertical: normalize(3),
                        paddingHorizontal: normalize(5),
                        color: COLORS.themeColor,
                        marginBottom: normalize(3),
                        fontSize: normalize(11),
                      }}>
                      {item?.category}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '32%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        color: '#666',
                        fontSize: normalize(8),
                        marginBottom: normalize(2),
                      }}>
                      {item?.date}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.secondarColor,
                        fontSize: normalize(9),
                        textAlign: 'center',
                        backgroundColor: COLORS.themeColor,
                        paddingVertical: normalize(4),
                        paddingHorizontal: normalize(10),
                        borderRadius: normalize(4),
                      }}>
                      Open
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    color: '#000',
                    fontSize: normalize(9),
                    marginBottom: normalize(2),
                  }}>
                  {item?.description}
                </Text>
                <View style={{
                          marginTop: normalize(3)
                        }}>
                          {
                            item?.client?.user_type === 1 ?
                          
                        <View>
                          <Text style={{
                            color:'#000',
                            fontSize:normalize(9),
                            fontWeight:'600'
                          }}>{item?.name}</Text>
                          <Text style={{
                            color:'#666',
                            fontSize:normalize(9),
                            fontWeight:'400'
                          }}>{item?.city}, {item?.state} </Text>
                        </View>
                        :
                        <View>
                        <Text style={{
                          color:'#000',
                          fontSize:normalize(9),
                          fontWeight:'600'
                        }}>{item?.client?.name}</Text>
                        <Text style={{
                          color:'#666',
                          fontSize:normalize(9),
                          fontWeight:'400'
                        }}>{item?.client?.district}, {item?.client?.state} </Text>
                      </View>
                }
                      </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default EnqueryList;

const styles = StyleSheet.create({});
