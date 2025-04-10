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
import {COLORS, ICON, IMAGE} from '../../../utils/Theme';
import MyStatusBar from '../../../utils/helpers/MyStatusBar';
import normalize from '../../../utils/helpers/normalize';
import InputText from '../../../components/InputText';
import {ToastMessage} from '../../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {verifyUserIdRequest} from '../../../redux/reducer/AuthReducer';
import Loader from '../../../utils/helpers/Loader';
import IsInternetConnected from '../../../utils/helpers/IsInternetConnected';
import {
  enqueryCategoryListRequest,
  updateProfileRequest,
} from '../../../redux/reducer/PostReducer';
import Header from '../../../utils/helpers/Header';
import Modal from 'react-native-modal';
var status = '';
const ProfessionalDetails = ({navigation}) => {
  const [barCouncil, setBarCouncil] = useState('');
  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [specialized, setSpecialized] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const [specialityFlag, setSpecialityFlag] = useState(false);
  const [selectSpecialzation, setSelectSpecialization] = useState([]);
  const dispatch = useDispatch();
  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/updateProfileRequest':
        status = PostReducer?.status;
        break;
      case 'post/updateProfileSuccess':
        status = PostReducer?.status;
        navigation.goBack();
        break;
    }
  }
  useEffect(() => {
    setBarCouncil(PostReducer?.profileData?.state_bar_council);
    setArea(PostReducer?.profileData?.practice_area);
    setName(PostReducer?.profileData?.bar_association_name);
    setSelectSpecialization(PostReducer?.profileData?.specialization);
    IsInternetConnected()
      .then(() => {
        dispatch(enqueryCategoryListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
      />
      <Header isMenuPresent={false} navigation={navigation} text={'Back'} />
      <Loader visible={PostReducer.loading} />
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
                      selectSpecialzation?.findIndex(itm => {
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
                        selectSpecialzation?.findIndex(itm => {
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
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              marginVertical: normalize(10),
              paddingHorizontal: normalize(15),
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: normalize(15),
                fontWeight: '600',
              }}>
              Professional Details
            </Text>
          </View>
          <View style={{marginTop: normalize(0), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              State Bar Council
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              placeHolderText="Enter Bar Council"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={barCouncil}
              onChangingText={item => {
                setBarCouncil(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Bar Association Name
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              placeHolderText="Enter Bar Association Name"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={name}
              onChangingText={item => {
                setName(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <Text
              style={{
                marginVertical: normalize(3),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Practice Area
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
              }}
              placeHolderText="Enter Practice Area"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={10}
              value={area}
              onChangingText={item => {
                setArea(item);
              }}
            />
          </View>
          <View style={{marginTop: normalize(7), width: '90%'}}>
            <View style={{marginTop: normalize(3), width: '100%'}}>
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
                if (barCouncil == '') {
                  ToastMessage('State Bar Council required');
                } else if (name == '') {
                  ToastMessage('Bar Association Name required');
                } else if (area == '') {
                  ToastMessage('Practice Area required');
                } else if (selectSpecialzation?.length == 0) {
                  ToastMessage('Speciality required');
                } else {
                  var array = [];
                  selectSpecialzation.forEach(element => {
                    array.push(element?.id);
                  });
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        updateProfileRequest({
                          state_bar_council: barCouncil,
                          bar_association_name: name,
                          practice_area: area,
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

export default ProfessionalDetails;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
