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
import Header from '../../../utils/helpers/Header';
import moment from 'moment';
import * as Progress from 'react-native-progress';
var status = '';
const Profile = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const options = [
    {
      image: ICON.about,
      text: 'About My Self',
      page: 'AboutMe',
      value: PostReducer?.profileData?.about_my_self,
    },
    {
      image: ICON.address,
      text: 'My Address',
      page: 'MyAddress',
      value: PostReducer?.profileData?.address
        ? PostReducer?.profileData?.address +
          '-' +
          PostReducer?.profileData?.pin
        : '',
    },
    {
      image: ICON.case_history,
      text: 'Professional Details',
      page: 'ProfessionalDetails',
      value: PostReducer?.profileData?.bar_association_name
        ? 'Data Present'
        : '',
    },
    {
      image: ICON.profile,
      text: 'Personal Information',
      page: 'PersonalInformation',
      value: PostReducer?.profileData?.charges
        ? PostReducer?.profileData?.charges
        : '',
    },
    {
      image: ICON.id_card,
      text: 'ID card and Profile Image',
      page: 'ProfileImage',
      value: '',
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.STATUS_BAR}
      />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'My Profile'}
      />
      <Loader visible={PostReducer.loading} />
      <ScrollView>
        <View
          style={{
            width: Dimensions.get('screen').width - 20,
            alignSelf: 'center',
          }}>
          <View
            style={{
              padding: normalize(10),
              borderWidth: normalize(1),
              borderColor: COLORS.themeColor,
              borderRadius: normalize(10),
              marginVertical: normalize(10),
              backgroundColor: COLORS.themeColor,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: normalize(10),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={
                    PostReducer?.profileData?.profile_image == ''
                      ? ICON.profile_image
                      : {uri: PostReducer?.profileData?.profile_image}
                  }
                  style={{
                    height: normalize(40),
                    width: normalize(40),
                    borderRadius: normalize(25),
                  }}
                  resizeMode="contain"
                />
                <View>
                  <Text
                    style={{
                      marginLeft: normalize(10),
                      color: '#fff',
                      fontSize: normalize(14),
                      fontWeight: '800',
                    }}>
                    {PostReducer?.profileData?.name}
                  </Text>
                  <Text
                    style={{
                      marginLeft: normalize(10),
                      color: '#fff',
                      fontSize: normalize(12),
                      fontWeight: '600',
                      fontStyle: 'italic',
                    }}>
                    {PostReducer?.profileData?.mobile_number}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginLeft: normalize(10),
                  color: '#fff',
                  fontSize: normalize(14),
                  fontWeight: '800',
                }}>
                {PostReducer?.profileData?.is_verified == 1
                  ? 'Verified'
                  : 'Not Verified'}
              </Text>
            </View>
            {Number(PostReducer?.profileData?.complete_profile_percentage) /
              100 <
            1 ? (
              <View
                style={{
                  paddingTop: normalize(7),
                  borderTopWidth: normalize(1),
                  borderTopColor: '#19affb',
                  marginTop: normalize(7),
                }}>
                <Text
                  style={{
                    marginBottom: normalize(10),
                    color: '#fff',
                    fontWeight: '600',
                  }}>
                  Complete Your Profile!
                </Text>
                <Progress.Bar
                  progress={
                    Number(
                      PostReducer?.profileData?.complete_profile_percentage,
                    ) / 100
                  }
                  width={Dimensions.get('screen').width - 70}
                  color={'#6ce4e3'}
                  borderColor={'#19affb'}
                  unfilledColor={'#19affb'}
                />
              </View>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: normalize(10),
            }}>
            <View
              style={{
                width: Dimensions.get('screen').width / 3.6,
                height: normalize(70),
                backgroundColor: '#FFF',
                borderRadius: normalize(10),
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '80%',
                }}>
                <Image
                  source={ICON.client}
                  style={{
                    height: normalize(20),
                    width: normalize(20),
                    tintColor: COLORS.themeColor,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    marginLeft: normalize(5),
                    color: '#000',
                    fontSize: normalize(10),
                  }}>
                  Clients
                </Text>
              </View>
              <Text
                style={{
                  marginTop: normalize(3),
                  color: COLORS.themeColor,
                  fontSize: normalize(15),
                  fontWeight: '800',
                  textAlign: 'left',
                  width: '75%',
                }}>
                {PostReducer?.profileData?.total_clients}
              </Text>
            </View>
            <View
              style={{
                width: Dimensions.get('screen').width / 3.6,
                height: normalize(70),
                backgroundColor: '#FFF',
                borderRadius: normalize(10),
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%',
                }}>
                <Image
                  source={ICON.case}
                  style={{
                    height: normalize(20),
                    width: normalize(20),
                    tintColor: COLORS.themeColor,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    marginLeft: normalize(5),
                    color: '#000',
                    fontSize: normalize(10),
                  }}>
                  Cases
                </Text>
              </View>
              <Text
                style={{
                  marginTop: normalize(3),
                  color: COLORS.themeColor,
                  fontSize: normalize(15),
                  fontWeight: '800',
                  textAlign: 'left',
                  width: '80%',
                }}>
                {PostReducer?.profileData?.total_cases}
              </Text>
            </View>
            <View
              style={{
                width: Dimensions.get('screen').width / 3.6,
                height: normalize(70),
                backgroundColor: '#FFF',
                borderRadius: normalize(10),
                borderWidth: normalize(1),
                borderColor: COLORS.themeColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={ICON.case}
                  style={{
                    height: normalize(20),
                    width: normalize(20),
                    tintColor: COLORS.themeColor,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    marginLeft: normalize(5),
                    color: '#000',
                    fontSize: normalize(10),
                  }}>
                  Wining Cases
                </Text>
              </View>
              <Text
                style={{
                  marginTop: normalize(3),
                  color: COLORS.themeColor,
                  fontSize: normalize(15),
                  fontWeight: '800',
                  textAlign: 'left',
                  width: '80%',
                }}>
                {PostReducer?.profileData?.wining_cases}
              </Text>
            </View>
          </View>
          <FlatList
            data={options}
            style={{}}
            showsVerticalScrollIndicator={false}
            renderItem={(item, index) => {
              console.log(item?.item);
              return (
                <View
                  style={{
                    backgroundColor: '#FFF',
                    marginBottom: normalize(10),
                    borderRadius: normalize(10),
                    borderWidth: normalize(1),
                    borderColor: COLORS.themeColor,
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: normalize(10),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      if (item?.item?.page != '') {
                        navigation.navigate(item?.item?.page);
                      }
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={item?.item?.image}
                        style={{
                          height: normalize(15),
                          width: normalize(15),
                          tintColor: COLORS.themeColor,
                        }}
                        resizeMode="contain"
                      />
                      <Text style={{color: '#000', marginLeft: normalize(7)}}>
                        {item?.item?.text}
                      </Text>
                    </View>
                    {item?.item?.value == '' ? (
                      <Image
                        source={ICON?.next}
                        style={{height: normalize(15), width: normalize(15)}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={ICON?.edit_data}
                        style={{height: normalize(15), width: normalize(15)}}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                  {item?.item?.value &&
                  item?.item?.text != 'Professional Details' &&
                  item?.item?.text != 'Personal Information' ? (
                    <View
                      style={{
                        borderTopWidth: item?.item?.value
                          ? normalize(1)
                          : normalize(0),
                        borderTopColor: '#DDD',
                        padding: item?.item?.value
                          ? normalize(10)
                          : normalize(0),
                        // borderBottomLeftRadius: normalize(10),
                        // borderBottomRightRadius: normalize(10),
                      }}>
                      <Text style={{color: '#000'}}>{item?.item?.value}</Text>
                    </View>
                  ) : item?.item?.value &&
                    item?.item?.text == 'Personal Information' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        paddingBottom: normalize(10),
                        borderTopWidth: normalize(1),
                        borderTopColor: '#DDD',
                        paddingTop: normalize(10),
                      }}>
                      <Image
                        source={ICON.charges}
                        style={{
                          height: normalize(22),
                          width: normalize(22),
                          marginLeft: normalize(5),
                          tintColor: COLORS.themeColor,
                        }}
                        resizeMode="contain"
                      />
                      <View style={{marginLeft: normalize(6)}}>
                        <Text
                          style={{
                            fontSize: normalize(8),
                            color: '#000',
                            fontWeight: '600',
                          }}>
                          Charges Per Seeting
                        </Text>
                        <Text
                          style={{
                            fontSize: normalize(13),
                            color: COLORS.STATUS_BAR,
                            fontWeight: '500',
                          }}>
                          {item?.item?.value}
                        </Text>
                      </View>
                    </View>
                  ) : item?.item?.value &&
                    item?.item?.text == 'Professional Details' ? (
                    <View
                      style={{
                        borderTopWidth: item?.item?.value
                          ? normalize(1)
                          : normalize(0),
                        borderTopColor: '#DDD',
                        padding: item?.item?.value
                          ? normalize(10)
                          : normalize(0),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={ICON.judgement}
                          style={{
                            height: normalize(17),
                            width: normalize(17),
                            tintColor: COLORS.themeColor,
                          }}
                          resizeMode="contain"
                        />
                        <View style={{marginLeft: normalize(10)}}>
                          <Text
                            style={{
                              fontSize: normalize(8),
                              color: '#000',
                              fontWeight: '600',
                            }}>
                            State Bar Council
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(13),
                              color: COLORS.STATUS_BAR,
                              fontWeight: '500',
                            }}>
                            {PostReducer?.profileData?.state_bar_council}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          marginTop: normalize(10),
                        }}>
                        <Image
                          source={ICON.bar_association}
                          style={{
                            height: normalize(17),
                            width: normalize(17),
                            tintColor: COLORS.themeColor,
                          }}
                          resizeMode="contain"
                        />
                        <View style={{marginLeft: normalize(10)}}>
                          <Text
                            style={{
                              fontSize: normalize(8),
                              color: '#000',
                              fontWeight: '600',
                            }}>
                            Bar Association
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(13),
                              color: COLORS.STATUS_BAR,
                              fontWeight: '500',
                            }}>
                            {PostReducer?.profileData?.bar_association_name}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          marginTop: normalize(10),
                        }}>
                        <Image
                          source={ICON.practice_area}
                          style={{
                            height: normalize(17),
                            width: normalize(17),
                            tintColor: COLORS.themeColor,
                          }}
                          resizeMode="contain"
                        />
                        <View style={{marginLeft: normalize(10)}}>
                          <Text
                            style={{
                              fontSize: normalize(8),
                              color: '#000',
                              fontWeight: '600',
                            }}>
                            Practice Area
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(13),
                              color: COLORS.STATUS_BAR,
                              fontWeight: '500',
                            }}>
                            {PostReducer?.profileData?.practice_area}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          marginTop: normalize(10),
                        }}>
                        <Image
                          source={ICON.specialised}
                          style={{
                            height: normalize(17),
                            width: normalize(17),
                            tintColor: COLORS.themeColor,
                          }}
                          resizeMode="contain"
                        />
                        <View style={{marginLeft: normalize(10)}}>
                          <Text
                            style={{
                              fontSize: normalize(8),
                              color: '#000',
                              fontWeight: '600',
                            }}>
                            Specialised
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(13),
                              color: COLORS.STATUS_BAR,
                              fontWeight: '500',
                            }}>
                            {PostReducer?.profileData?.spacialised}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : null}
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
