import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Modal from 'react-native-modal';

import {useDispatch, useSelector} from 'react-redux';
import {
  closeChatRequest,
  createRoomRequest,
  enquiryReplyListRequest,
  enquiryReplyRequest,
  messageListRequest,
  messageSendRequest,
} from '../../redux/reducer/PostReducer';

import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

import DocumentPicker, {types} from 'react-native-document-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

import normalize from '../../utils/helpers/normalize';
import Loader from '../../utils/helpers/Loader';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {ToastMessage} from '../../utils/helpers/Toast';
import {COLORS, ICON, IMAGE} from '../../utils/Theme';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import Header from '../../utils/helpers/Header';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
var status = '';
const Message = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const selectedQuery = route?.params?.item;
  const PostReducer = useSelector(state => state.PostReducer);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openAt, setOpenAt] = useState(new Date());
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [uploadModal, setUploadModal] = useState(false);
  const [file, setFile] = useState([]);
  useEffect(() => {
    console.log('SELECTEDQUERY:', selectedQuery);
  }, []);
  function sendMessage(file) {
    console.log('Message: ', file);
    if (message != '' || file.length != 0) {
      var today = new Date();
      var diffMs = new Date() - openAt; // milliseconds between now & Christmas
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      console.log(diffMins);
      if (diffMins > 1) {
        Alert.alert('Session Expired');
        navigation.goBack();
      } else {
      }
    } else {
      ToastMessage('Write or upload something');
    }
  }
  const openGallery = async () => {
    let files = file;
    const response = await DocumentPicker.pick({
      presentationStyle: 'formSheet',
      allowMultiSelection: true,
      // type: [types.pdf],
    });
    console.log(response);
    files = [...files, ...response];
    console.log(files);
    setFile(files);
    setUploadModal(false);
    sendMessage(files);
  };
  function OpenCamera() {
    ImageCropPicker.openCamera({
      // width: 200,
      // height: 200,
      cropping: true,
      // compressImageMaxWidth: 500,
      // compressImageMaxHeight: 500,
      compressImageQuality: 0.5,
    }).then(image => {
      console.log(image);
      var imageData = image;
      imageData = {
        uri: image.path,
        type: image.mime,
        name: image.path.replace(/^.*[\\\/]/, ''),
        size: image.size,
      };
      let files = file;
      console.log(imageData);
      console.log(files);
      files.push(imageData);
      setFile(files);
      setUploadModal(false);
      sendMessage(files);
    });
  }
  useEffect(() => {
    if (isFocused) {
      setOpenAt(new Date());
      IsInternetConnected()
        .then(() => {
          dispatch(
            enquiryReplyListRequest({
              enquiry_id: selectedQuery?.id,
            }),
          );
        })
        .catch(err => {
          ToastMessage('Network connection issue');
        });
    }
  }, [isFocused]);

  if (status == '' || status != PostReducer.status) {
    switch (PostReducer?.status) {
      case 'post/enquiryReplyRequest':
        status = PostReducer.status;
        break;
      case 'post/enquiryReplySuccess':
        status = PostReducer.status;
        setMessage('');
        IsInternetConnected()
          .then(() => {
            dispatch(
              enquiryReplyListRequest({
                enquiry_id: selectedQuery?.id,
              }),
            );
          })
          .catch(err => {
            ToastMessage('Network connection issue');
          });
        break;
      case 'post/enquiryReplyFailure':
        status = PostReducer.status;

      case 'post/closeChatRequest':
        status = PostReducer.status;
        break;
      case 'post/closeChatSuccess':
        status = PostReducer.status;
        navigation.pop(2);
        break;
      case 'post/closeChatFailure':
        status = PostReducer.status;
        break;
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#EBF4F6',
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header isMenuPresent={false} navigation={navigation} text={'Reply'} />

      <View
        style={{
          backgroundColor: '#FFF',
          // marginLeft: -normalize(20),
          paddingLeft: normalize(15),
          paddingTop: normalize(10),
          paddingRight: normalize(15),
        }}>
        <Loader visible={PostReducer.loading} />

        <View style={{}}>
          {/* <Text
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
              color: COLORS.black,
              fontSize: normalize(12),
              marginBottom: normalize(10),
            }}>
            {moment(new Date()).format('Do MMM, YY hh:mm A')}
          </Text> */}
          <FlatList
            data={PostReducer?.message}
            style={{height: '98%'}}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    marginBottom: normalize(10),
                    paddingBottom: normalize(10),
                  }}>
                  <Text
                    style={{
                      color: COLORS.themeColor,
                      fontSize: normalize(12),
                      fontWeight: '600',
                    }}>
                    {selectedQuery?.category}
                  </Text>
                  <Text style={{color: '#666', fontSize: normalize(9)}}>
                    {selectedQuery?.description}
                  </Text>
                </View>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginBottom:
                      index != PostReducer?.message_list?.length - 1
                        ? normalize(20)
                        : normalize(100),
                  }}>
                  <View
                    style={{
                      // marginBottom: normalize(10),
                      // width: WIDTH - 50,
                      justifyContent:
                        PostReducer?.profileData?.id == item?.sender_id
                          ? 'flex-end'
                          : 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        // maxWidth: '50%',
                        // marginLeft: normalize(10),
                        backgroundColor:
                          PostReducer?.profileData?.id == item?.sender_id
                            ? COLORS.themeColor
                            : COLORS.themeColor,
                        padding: normalize(10),
                        borderRadius: normalize(10),
                        borderTopEndRadius:
                          PostReducer?.profileData?.id == item?.sender_id
                            ? normalize(0)
                            : normalize(10),
                        borderTopLeftRadius:
                          PostReducer?.profileData?.id == item?.sender_id
                            ? normalize(10)
                            : normalize(0),
                      }}>
                      {/* {item?.message_file?.length > 0 ? (
                        <FlatList
                          data={item?.message_file}
                          numColumns={2}
                          style={{
                            marginBottom:
                              item?.message != ''
                                ? normalize(10)
                                : normalize(0),
                          }}
                          renderItem={({item, index}) => {
                            return (
                              <TouchableOpacity
                                style={{
                                  padding: normalize(10),
                                  borderWidth: normalize(1),
                                  borderRadius: normalize(6),
                                  margin: normalize(2),
                                  alignItems: 'center',
                                  borderColor: item?.is_sender
                                    ? COLOR.white
                                    : COLOR.black,
                                }}
                                onPress={() => {
                                  Linking.openURL(item);
                                }}>
                                <Text
                                  style={{
                                    fontFamily: FONTS.Poppins_Regular_400,
                                    fontSize: normalize(12),
                                    color: item?.is_sender
                                      ? COLOR.white
                                      : COLOR.black,
                                  }}>
                                  File {index + 1}
                                </Text>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      ) : null} */}
                      <Text
                        style={{
                          textAlign:
                            PostReducer?.profileData?.id == item?.sender_id
                              ? 'left'
                              : 'left',
                          color:
                            PostReducer?.profileData?.id == item?.sender_id
                              ? '#FFF'
                              : '#FFF',
                          // marginTop:
                          //   item?.message_file?.length > 0
                          //     ? normalize(10)
                          //     : normalize(0),
                        }}>
                        {item?.message}
                      </Text>
                    </View>
                  </View>
                  {/* {item?.is_send ? ( */}
                  <Text
                    style={{
                      textAlign:
                        PostReducer?.profileData?.id == item?.sender_id
                          ? 'right'
                          : 'left',
                      marginRight: normalize(0),
                      color: '#4E586E',

                      fontSize: normalize(8),
                      marginLeft: item?.is_sender ? normalize(0) : normalize(0),
                      marginTop: normalize(5),
                    }}>
                    {item?.created_at}
                  </Text>
                  {/* ) : null} */}
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: Dimensions.get('screen').height / 1.9,
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      fontWeight: '500',
                    }}>
                    No previous conversation found
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#EBF4F6',
            padding: normalize(10),
            // marginLeft: -normalize(20),
            paddingLeft: normalize(20),
            position: 'absolute',
            bottom: normalize(25),
            zIndex: normalize(10),
            width: Dimensions?.get('window')?.width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // bottom:
          }}>
          <View
            style={{
              backgroundColor: '#FFF',
              marginLeft: normalize(0),
              borderRadius: normalize(20),
              paddingHorizontal: normalize(10),
              width: '85%',
            }}>
            <TextInput
              multiline={true}
              placeholder={'Type here'}
              value={message}
              onChangeText={item => {
                setMessage(item);
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              height: normalize(30),
              width: normalize(30),
              borderRadius: normalize(15),
              backgroundColor: COLORS.themeColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              IsInternetConnected()
                .then(() => {
                  dispatch(
                    enquiryReplyRequest({
                      enquiry_id: selectedQuery?.id,
                      message: message,
                    }),
                  );
                })
                .catch(() => {
                  ToastMessage('Network connection issue');
                });
            }}>
            <Image
              source={ICON.send}
              style={{
                height: normalize(15),
                width: normalize(15),
                tintColor: COLORS.WHITE,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Message;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
