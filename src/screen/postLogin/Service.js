import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
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
  categoryListRequest,
  serviceListRequest,
} from '../../redux/reducer/PostReducer';
import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
import {ToastMessage} from '../../utils/helpers/Toast';
import InputText from '../../components/InputText';
import Modal from 'react-native-modal';

const Service = ({navigation}) => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [selectType, setSelectType] = useState(false);
  const [type, setType] = useState({title: 'All'});
  const starCreationArray = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(serviceListRequest());
        dispatch(categoryListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  return (
    <ScrollView>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Popular Services'}
      />
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
            data={PostReducer?.categoryList}
            renderItem={({item, index}) => {
              console.log(JSON.stringify(item));
              return (
                <>
                  {index == 0 ? (
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        borderBottomWidth: normalize(1),
                        padding: normalize(10),
                        width: Dimensions.get('screen').width,
                      }}
                      onPress={() => {
                        setType({title: 'All'});
                        setSelectType(false);
                        IsInternetConnected()
                          .then(() => {
                            dispatch(serviceListRequest());
                          })
                          .catch(() => {
                            ToastMessage('Network connection issue');
                          });
                      }}>
                      <Text>All</Text>
                    </TouchableOpacity>
                  ) : null}
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
                      IsInternetConnected()
                        .then(() => {
                          dispatch(serviceListRequest({category_id: item?.id}));
                        })
                        .catch(() => {
                          ToastMessage('Network connection issue');
                        });
                    }}>
                    <Text>{item?.title}</Text>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
      </Modal>
      <View
        style={{
          paddingTop: normalize(0),
        }}>
        <View
          style={{
            marginTop: normalize(0),
            width: '92%',
            alignSelf: 'center',
            marginBottom: normalize(10),
          }}>
          <Text
            style={{
              marginVertical: normalize(10),
              fontWeight: '600',
              fontSize: normalize(13),
            }}>
            Category
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
            selectBox={true}
            afterIcon={ICON.select_box_icon}
            // maxLength={10}
            value={type?.title}
            onChangingText={item => {
              // setName(item);
            }}
            OnOpenModal={item => {
              if (PostReducer?.categoryList?.length > 0) setSelectType(true);
              else ToastMessage('No case type available');
            }}
          />
        </View>
        <FlatList
          data={PostReducer?.services}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            var rating = item?.rating
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ServiceDetails', {item: item})
                }>
                <View
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? '#35A4431A' : '#F3BD281A',
                    borderRadius: normalize(8),
                    marginBottom: normalize(10),
                    borderWidth: normalize(1),
                    borderColor: index % 2 === 0 ? '#35A443' : '#F3BD28',
                    paddingVertical: normalize(8),
                    paddingHorizontal: normalize(8),
                    marginEnd: normalize(10),
                    marginStart: normalize(10),
                    width: Dimensions?.get('window')?.width - 30,
                    position:'relative'
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: normalize(6),
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: normalize(40),
                        height: normalize(40),
                       // borderWidth: normalize(1),
                        borderRadius: normalize(20),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: index % 2 === 0 ? '#74d680' : '#dbbc67',
                        // borderColor: index % 2 === 0 ? '#35A443' : '#F3BD28',
                      }}>
                      <Image
                        source={ICON?.receipt_s}
                        style={{
                          height: normalize(30),
                          width: normalize(24),
                          tintColor: '#fff',
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{width: '90%'}}>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: '#000',
                          fontWeight: '600',
                          fontSize: normalize(14),
                          width: '80%',
                        }}>
                        {item?.title}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: '#333',
                          fontWeight: '400',
                          fontSize: normalize(10),
                          width: '95%',
                          marginVertical:normalize(2),
                        }}>
                        Category: <Text style={{
                           fontWeight: '600',
                        }}>{item?.service_category}</Text>
                      </Text>
                      <FlatList
                          numColumns={5}
                          style={{
                            flexGrow: 0,
                            width: '90%',
                          }}
                          data={starCreationArray}
                          renderItem={({item, index}) => {
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  // width: normalize(17),
                                  alignSelf: 'flex-start',
                                }}>
                                <Image
                                  source={ICON?.rating1}
                                  style={{
                                    height: normalize(15),
                                    width: normalize(15),
                                    tintColor:
                                    rating >= index + 1 ? '#f5d103' : '#999',
                                  }}
                                  resizeMode="contain"
                                />
                              </View>
                            );
                          }}
                          />
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '600',
                          fontSize: normalize(14),
                          position:'absolute',
                          right:normalize(20),
                          bottom:0,
                        }}>
                        ₹{item?.price}/-
                      </Text>
                    </View>
                  </View>

                  {/* <Text
                    style={{
                      color: '#5B5B5B',
                      fontSize: normalize(12),
                    }}
                    numberOfLines={2}
                    >
                    {item?.description}
                  </Text> */}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* <Text
          style={{
            //marginTop: normalize(5),
            color: COLORS.themeColor,
            fontWeight: '800',
            fontSize: normalize(16),
            paddingLeft: normalize(10),
            marginBottom: normalize(10),
            marginTop: normalize(12),
          }}>
          My Services
        </Text> */}
        {/* <View
          style={{
            backgroundColor: 'rgba(53, 164, 67, 0.1)',
            marginRight: normalize(10),
            marginLeft: normalize(10),
            borderRadius: normalize(8),
            marginBottom: normalize(12),
            borderWidth: normalize(1),
            borderColor: 'rgba(53, 164, 67, 1)',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(8),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: COLORS?.themeColor,
                fontSize: normalize(14),
                fontWeight: '600',
                marginBottom: normalize(2),
              }}>
              FSSAI Registration
            </Text>
            <Text
              style={{
                color: '#5B5B5B',
              }}>
              Registration Date - 10-12-2023
            </Text>
            <Text
              style={{
                color: '#5B5B5B',
              }}>
              Expiry Date - 10-12-2024
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(10),
              }}>
              Status
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(14),
                color: 'rgba(53, 164, 67, 1)',
              }}>
              Active
            </Text>
          </View>
        </View> */}
        {/* -------Expired ------------ */}
        {/* <View
          style={{
            backgroundColor: 'rgba(254, 28, 50, 0.1)',
            marginRight: normalize(10),
            marginLeft: normalize(10),
            borderRadius: normalize(8),
            marginBottom: normalize(12),
            borderWidth: normalize(1),
            borderColor: 'rgba(254, 28, 50, 1)',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(8),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: COLORS?.themeColor,
                fontSize: normalize(14),
                fontWeight: '600',
                marginBottom: normalize(10),
              }}>
              FSSAI Registration
            </Text>
            <Text
              style={{
                color: '#fff',
                backgroundColor: COLORS?.themeColor,
                padding: normalize(6),
                fontSize: normalize(12),
                borderRadius: 4,
                textAlign: 'center',
                width: (Dimensions.get('screen').width / 10) * 3,
              }}>
              Renew Now
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(10),
              }}>
              Status
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(14),
                color: 'rgba(254, 28, 50, 1)',
              }}>
              Expired
            </Text>
          </View>
        </View> */}
        {/* -------Expired ------------ */}
        {/* <View
          style={{
            backgroundColor: 'rgba(243, 189, 40, 0.1)',
            marginRight: normalize(10),
            marginLeft: normalize(10),
            borderRadius: normalize(8),
            marginBottom: normalize(12),
            borderWidth: normalize(1),
            borderColor: 'rgba(243, 189, 40, 1)',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(8),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: COLORS?.themeColor,
                fontSize: normalize(14),
                fontWeight: '600',
                marginBottom: normalize(10),
              }}>
              FSSAI Registration
            </Text>
            <Text
              style={{
                color: '#fff',
                backgroundColor: COLORS?.themeColor,
                padding: normalize(6),
                fontSize: normalize(12),
                borderRadius: 4,
                textAlign: 'center',
                width: (Dimensions.get('screen').width / 10) * 3,
              }}>
              Renew Now
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#5B5B5B',
                fontSize: normalize(10),
              }}>
              Status
            </Text>
            <Text
              style={{
                fontWeight: '800',
                fontSize: normalize(14),
                color: 'rgba(243, 189, 40, 1)',
              }}>
              Expire Soon
            </Text>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default Service;

const styles = StyleSheet.create({});
