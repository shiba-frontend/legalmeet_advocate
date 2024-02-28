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
import Header from '../../utils/helpers/Header';
import moment from 'moment';
import * as Progress from 'react-native-progress';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {allHearingRequest} from '../../redux/reducer/PostReducer';
import {useFocusEffect} from '@react-navigation/native';
var status = '';
const Dashboard = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      IsInternetConnected()
        .then(() => {
          dispatch(allHearingRequest());
        })
        .catch(() => {
          ToastMessage('Network connection issue');
        });
    }, []),
  );
  useEffect(() => {}, []);
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }

  const options = [
    {
      image: IMAGE.clients_icon,
      text: 'Clients',
      page: 'Client',
    },
    {
      image: IMAGE.case_icon,
      text: 'Cases',
      page: 'Cases',
    },
    {
      image: IMAGE.judgement_icon,
      text: 'Judgements',
      page: 'Judgement',
    },
    {
      image: IMAGE.enquery_icon,
      text: 'Enquires',
      page: 'Enquiry',
    },
    {
      image: IMAGE.causelist_icon,
      text: 'Cause List',
      page: 'Client',
    },
    {
      image: IMAGE.appoinment_icon,
      text: 'Calenders',
      page: 'Calender',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fefefe'}}>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.WHITE}
      />
      <Header
        isMenuPresent={true}
        text={'LEGAL MEET'}
        navigation={navigation}
      />
      <Loader visible={PostReducer.loading} />
      <FlatList
        data={PostReducer?.allHearing}
        showsVerticalScrollIndicator={false}
        style={{
          width: Dimensions.get('screen').width - 25,
          alignSelf: 'center',
          backgroundColor: '#fefefe',
        }}
        ListHeaderComponent={() => {
          return (
            <View>
              {Number(PostReducer?.profileData?.complete_profile_percentage) /
                100 <
              1 ? (

                <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                      {/* <ImageBackground source={IMAGE.dashboard_profile_bg} 
                      resizeMode="cover"
                      imageStyle={{ borderRadius: normalize(7)}}
                       style={{
                       marginVertical:normalize(15),
                       padding:normalize(10)
                       }}> */}
                       <View 
                        style={{
                          backgroundColor:'#fff',
                          marginVertical:normalize(15),
                          padding:normalize(10),
                          borderColor:'#e9e9e9',
                          borderWidth:normalize(1),
                          borderRadius:normalize(5),
                        }}
                       >

                     
                          <View style={{flexDirection:'row',gap:normalize(10)}}>
                              <View >
                              <Image
                              source={
                                PostReducer?.profileData?.profile_image == ''
                                  ? ICON.profile_image
                                  : {uri: PostReducer?.profileData?.profile_image}
                              }
                              style={{
                                height: normalize(60),
                                width: normalize(60),
                                borderRadius: normalize(50),
                              }}
                              resizeMode="contain"
                            />
                              </View>
                              <View>
                                  <View style={{flexDirection:'row', alignItems:'center', gap:normalize(7)}}>
                                  <Text
                                  style={{
                                    color: '#222',
                                    fontSize: normalize(14),
                                    fontWeight: '800',
                                  }}>
                                  {PostReducer?.profileData?.name}
                                </Text>
                                <Image
                              source={IMAGE.verify_icon}
                                style={{
                                  height: normalize(20),
                                  width:normalize(20),
                                
                                }}
                                resizeMode="contain"
                              />
                                  </View>
                                  <View style={{flexDirection:'row', alignItems:'center', gap:normalize(7), marginVertical:normalize(3)}}>
                                  <Image
                                source={IMAGE.call_calling}
                                  style={{
                                    height: normalize(15),
                                    width:normalize(15),
                                  }}
                                  tintColor={COLORS.themeColor}
                                  resizeMode="contain"
                                />
                                  <Text
                                  style={{
                                    color: '#222',
                                    fontSize: normalize(12),
                                    fontWeight: '600',

                                  }}>
                                  {PostReducer?.profileData?.mobile_number}
                                </Text>
                                  </View>
                                  <View>
                                  {PostReducer?.profileData?.charges ? (
                                      <View style={{flexDirection:'row', alignItems:'center', gap:normalize(7)}}>
                                        <Text
                                          style={{
                                            color: '#222',
                                            fontSize: normalize(12),
                                            fontWeight: '600',
                                          }}>
                                          Fees
                                        </Text>
                                        <Text style={{  color: '#222',
                                    fontSize: normalize(12),
                                    fontWeight: '600',}}>₹ {PostReducer?.profileData?.charges}</Text>
                                      </View>
                                    ) : null}
                                  </View>
                                  
                               </View>
                          </View>
                          {Number(
                                    PostReducer?.profileData?.complete_profile_percentage,
                                  ) /
                                    100 <
                                  1 ? (
                                    <View
                                      style={{
                                        marginTop:normalize(10),
                                        paddingTop:normalize(5),
                                        borderTopWidth: normalize(1),
                                        borderTopColor: '#ccc',
                                     
                                      }}>
                                      <Text
                                        style={{
                                          marginBottom: normalize(10),
                                          color: '#222',
                                          fontWeight: '600',
                                        }}>
                                        Complete Your Profile!
                                      </Text>
                                      <Progress.Bar
                                        progress={
                                          Number(
                                            PostReducer?.profileData
                                              ?.complete_profile_percentage,
                                          ) / 100
                                        }
                                        width={Dimensions.get('screen').width - 50}
                                        color={'#015fac'}
                                        borderColor={'#003561'}
                                        unfilledColor={'#003561'}
                                      />
                                    </View>
                                  ) : null}
                                    </View>
                      {/* </ImageBackground> */}


                  </TouchableOpacity>

              ) : 
              
              
                <TouchableOpacity
                  style={{
                    marginVertical:normalize(10),
                    backgroundColor:'#fff',
                    marginVertical:normalize(15),
                    padding:normalize(10),
                    borderColor:'#e9e9e9',
                    borderWidth:normalize(1),
                    borderRadius:normalize(5),
                  }}
                >
                <View style={{
                  flexDirection:'row',
                  alignItems:'center',
                  gap:normalize(7),
                }}>
                
                <Image
                    source={IMAGE.wallet}
                      style={{
                        height: normalize(25),
                        width:normalize(25),
                      
                      }}
                      resizeMode="contain"
                    />
                    <View>
                    <Text style={{color:'#000',fontSize:normalize(10),letterSpacing:normalize(1)}}>Wallet Balance</Text>
                    <Text style={{color:'#000',fontSize:normalize(12),fontWeight:'600'}}>₹ 0.00</Text>
                    </View>
                     
                 </View>
                 <View style={{marginTop:normalize(5),flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                        <View style={{flexDirection:'row', alignItems:'center', gap:normalize(3)}}>
                            <View style={{
                              width: normalize(5),
                              height: normalize(5),
                              backgroundColor:'green',
                              borderRadius: normalize(10)
                            }}></View>
                            <Text style={{color:'#000',fontSize:normalize(9)}}>Total Income</Text>
                        </View>
                        <Text style={{color:'#000',fontSize:normalize(9),fontWeight:'500'}}>₹ 0.00</Text>
                    </View>
                    <View>
                        <View style={{flexDirection:'row', alignItems:'center', gap:normalize(3)}}>
                            <View style={{
                              width: normalize(5),
                              height: normalize(5),
                              backgroundColor:'red',
                              borderRadius: normalize(10)
                            }}></View>
                            <Text style={{color:'#000',fontSize:normalize(9)}}>Total Withdrawl</Text>
                        </View>
                        <Text style={{color:'#000',fontSize:normalize(9),fontWeight:'500'}}>₹ 0.00</Text>
                    </View>
                    <View>
                        <View style={{flexDirection:'row', alignItems:'center', gap:normalize(3)}}>
                            <View style={{
                              width: normalize(5),
                              height: normalize(5),
                              backgroundColor:'#000',
                              borderRadius: normalize(10)
                            }}></View>
                            <Text style={{color:'#000',fontSize:normalize(9)}}>Pending</Text>
                        </View>
                        <Text style={{color:'#000',fontSize:normalize(9),fontWeight:'500'}}>₹ 0.00</Text>
                    </View>
                 </View>
                </TouchableOpacity>
                
               
              
              }
              <View style={{
                backgroundColor:'#fff',
                padding:normalize(10),
                borderColor:'#e9e9e9',
                borderWidth:normalize(1),
                borderRadius:normalize(5),
              }}>
                <FlatList
                  data={options}
                  numColumns={3}
                  // style={{marginBottom: normalize(10)}}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(item, index) => {
                    return (
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: Dimensions.get('screen').width / 3.5,
                          marginRight: normalize(10),
                          marginBottom: normalize(15),
                        }}
                        onPress={() => {
                          navigation.navigate(item?.item?.page);
                        }}>
                        <Image
                          source={item?.item?.image}
                          style={{
                            height: normalize(30),
                            width: normalize(30),
                            tintColor: COLORS.themeColor,
                          }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            fontSize: normalize(10),
                            marginTop: normalize(5),
                            color: COLORS.themeColor,
                          }}>
                          {item?.item?.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <ImageBackground source={IMAGE.displayboard_bg} 
                      resizeMode="cover"
                      imageStyle={{ borderRadius: normalize(7)}}
                       style={{
                       marginVertical:normalize(15),
                       padding:normalize(15)
                       }}>
                      <TouchableOpacity
                  onPress={() => navigation.navigate('displayboard')}>
                 
                    <View style={{flexDirection:'row',alignItems:'center', gap:normalize(10)}}>
                    <Image
                    source={IMAGE.judgement_icon}
                    style={{
                      width: normalize(30),
                      height: normalize(30),
                    }}
                    resizeMode="contain"
                    tintColor="#fff"
                  />
                  <Text style={{color:'#fff',fontSize:normalize(16),fontWeight:'600'}}>Live Judgement Board</Text>
                  <View style={{width:normalize(10),height:normalize(10),backgroundColor:'#35A443',borderRadius:normalize(20)}}></View>
                    </View>
                    </TouchableOpacity>
</ImageBackground>
             
{PostReducer?.todayhearing?.length > 0 &&
          <>  
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: normalize(10),
                }}>
                <Text
                  style={{
                    fontSize: normalize(16),
                    textAlign: 'left',
                    color: '#000',
                    fontWeight: '600',
                  }}>
                  Today Cases ({PostReducer?.todayhearing?.length})
                </Text>
              </View>

              <FlatList
                data={PostReducer?.todayhearing}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={
                  {
                    // width: Dimensions.get('screen').width / 2.5,
                    // alignSelf: 'center',
                  }
                }
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        // padding: normalize(10),
                        // borderWidth: normalize(1),
                        // borderRadius: normalize(10),
                        // marginBottom: normalize(10),
                        // borderColor: '#e7e7e7',
                        // width: Dimensions.get('screen').width / 1.8,
                        // marginRight: normalize(10),
                        // backgroundColor: '#FFF',
                        backgroundColor: COLORS.themeColor,
                        marginRight: normalize(10),
                        width: Dimensions.get('screen').width / 1.8,

                        borderRadius: normalize(10),
                        marginBottom: normalize(10),
                        borderWidth: normalize(3),
                        borderColor: '#9ad4ff',
                        paddingHorizontal: normalize(7),
                        paddingVertical: normalize(8),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingBottom: normalize(5),
                          alignItems: 'center',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#fff',
                            marginLeft: normalize(5),
                            fontWeight: '800',
                          }}>
                          Case No:
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            width: '85%',
                            color: '#fff',
                            marginLeft: normalize(5),
                            fontWeight: '800',
                          }}>
                          {item?.case_details?.case_id
                            ? item?.case_details?.case_id
                            : 'N/A'}
                        </Text>
                      </View>

                      {!isEmpty(
                        item?.case_details?.type_details?.description,
                      ) ? (
                        <View
                          style={{
                            flexDirection: 'row',

                            alignItems: 'center',
                          }}>
                          <Image
                            source={ICON.case_history}
                            style={{
                              height: normalize(15),
                              width: normalize(15),
                              tintColor: '#fff',
                            }}
                            resizeMode="contain"
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              width: '85%',
                              color: '#fff',
                              marginLeft: normalize(5),
                            }}>
                            {item?.case_details?.type_details?.description}
                          </Text>
                        </View>
                      ) : null}
                      {!isEmpty(item?.case_details?.court_details?.name) ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingVertical: normalize(5),
                            alignItems: 'center',
                          }}>
                          <Image
                            source={ICON.location}
                            style={{
                              height: normalize(16),
                              width: normalize(16),
                              tintColor: '#fff',
                            }}
                            resizeMode="contain"
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              width: '95%',
                              color: '#fff',
                              marginLeft: normalize(5),
                            }}>
                            {item?.case_details?.court_details?.name}
                          </Text>
                        </View>
                      ) : null}
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={ICON.calender}
                          style={{
                            height: normalize(14),
                            width: normalize(14),
                            tintColor: '#fff',
                          }}
                          resizeMode="contain"
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#fff',
                            marginLeft: normalize(5),
                          }}>
                          {moment(item?.date_original).format('DD-MM-YYYY')}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height / 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={IMAGE?.no_data}
                        style={{
                          width: Dimensions.get('window').width,
                          height: Dimensions.get('window').height / 10,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  );
                }}
              />
              </>  
              }

              {PostReducer?.allHearing?.length > 0 &&
              
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: normalize(10),
                }}>
                <Text
                  style={{
                    fontSize: normalize(16),
                    textAlign: 'left',
                    color: '#000',
                    fontWeight: '600',
                  }}>
                  Upcoming Cases ({PostReducer?.allHearing?.length})
                </Text>
                <Text
                  style={{
                    fontSize: normalize(12),
                    textAlign: 'right',
                    color: COLORS.themeColor,
                    fontWeight: '600',
                  }}>
                  View All
                </Text>
              </View>
        }
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                padding: normalize(10),
                borderWidth: normalize(1),
                borderRadius: normalize(10),
                marginBottom: normalize(10),
                borderColor: COLORS.themeColor,
                backgroundColor: '#FFF',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: normalize(1),
                  borderBottomColor: '#e7e7e7',
                  paddingBottom: normalize(5),
                }}>
                <View>
                  <Text
                    numberOfLines={1}
                    style={{color: COLORS.themeColor, fontWeight: '800'}}>
                    Case No:{' '}
                    {item?.case_details?.case_id
                      ? item?.case_details?.case_id
                      : 'N/A'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'centers'}}>
                  <Image
                    source={ICON.calender}
                    style={{
                      height: normalize(14),
                      width: normalize(14),
                      tintColor: COLORS.themeColor,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#000',
                      marginLeft: normalize(5),
                    }}>
                    {moment(item?.date_original).format('DD-MM-YYYY')}
                  </Text>
                </View>
              </View>
              {!isEmpty(item?.case_details?.court_details?.name) ? (
                
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: normalize(5),
                    borderBottomWidth: normalize(1),
                    borderBottomColor: '#e7e7e7',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={ICON.location}
                    style={{
                      height: normalize(15),
                      width: normalize(15),
                      tintColor: COLORS.themeColor,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      width: '95%',
                      color: '#000',
                      marginLeft: normalize(5),
                    }}>
                    {item?.case_details?.court_details?.name}
                  </Text>
                </View>
              ) : null}
              {!isEmpty(item?.case_details?.type_details?.description) ? (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: normalize(5),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={ICON.case_history}
                    style={{
                      height: normalize(15),
                      width: normalize(15),
                      tintColor: COLORS.themeColor,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      width: '95%',
                      color: '#000',
                      marginLeft: normalize(5),
                    }}>
                    {item?.case_details?.type_details?.description}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        }}
        // ListEmptyComponent={() => {
        //   return (
        //     <View
        //       style={{
        //         width: Dimensions.get('window').width,
        //         height: Dimensions.get('window').height / 10,
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //       }}>
        //       <Image
        //         source={IMAGE?.no_data}
        //         style={{
        //           width: Dimensions.get('window').width,
        //           height: Dimensions.get('window').height / 10,
        //         }}
        //         resizeMode="contain"
        //       />
        //     </View>
        //   );
        // }}
        ListFooterComponent={({item, index}) => {
          return (
            <View style={{
              backgroundColor:'#fff',
              borderColor:'#e9e9e9',
              borderWidth:normalize(1),
              borderRadius:normalize(5),
              marginBottom:normalize(10)
            }}>
        <Text style={{
          backgroundColor:'#fefefe',
          paddingHorizontal:normalize(10),
          paddingVertical:normalize(3),
          color:'#000',
          fontSize:normalize(12),
          fontWeight:'500'

        }}>10 New Enquires</Text>
        <View style={{
           padding:normalize(10),
           flexDirection:'row',
           gap:normalize(5),
          borderBottomColor:'#ccc',
          borderBottomWidth:1
        }}>
            <View style={{
              width:'65%'
            }}>
                <Text style={{
                  color:'#000',
                  fontSize:normalize(9),
                  marginBottom:normalize(2)
                }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum</Text>
                <Text style={{
                  color:'#666',
                  fontSize:normalize(8)
                }}>Kolkata</Text>
            </View>
            <View style={{
              width:'35%'
            }}>
              <Text style={{
                  color:'#666',
                  fontSize:normalize(8)
                }}>Feb 19, 2024 10:23 AM</Text>
              <TouchableOpacity
                style={{
                  backgroundColor:COLORS.themeColor,
                  padding:normalize(4),
                  borderRadius:normalize(4),
                  marginTop:normalize(6)
                }}
              >
                <Text style={{
                  color:'#fff',
                  fontSize:normalize(9),
                  textAlign: 'center'
                }}>Open</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={{
           padding:normalize(10),
           flexDirection:'row',
           gap:normalize(5),
           borderBottomColor:'#ccc',
           borderBottomWidth:1
        }}>
            <View style={{
              width:'65%'
            }}>
                <Text style={{
                  color:'#000',
                  fontSize:normalize(9),
                  marginBottom:normalize(2)
                }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum</Text>
                <Text style={{
                  color:'#666',
                  fontSize:normalize(8)
                }}>Kolkata</Text>
            </View>
            <View style={{
              width:'35%'
            }}>
              <Text style={{
                  color:'#666',
                  fontSize:normalize(8)
                }}>Feb 19, 2024 10:23 AM</Text>
              <TouchableOpacity
                style={{
                  backgroundColor:COLORS.themeColor,
                  padding:normalize(4),
                  borderRadius:normalize(4),
                  marginTop:normalize(6)
                }}
              >
                <Text style={{
                  color:'#fff',
                  fontSize:normalize(9),
                  textAlign: 'center'
                }}>Open</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems:'center',
          marginVertical:normalize(10),
        }}>
          <TouchableOpacity style={{
            borderColor:COLORS.themeColor,
            borderWidth:1,
            paddingHorizontal:normalize(7),
            paddingVertical:normalize(3),
            borderRadius:normalize(3)
          }}>
                <Text style={{
                  fontSize: normalize(10),
                  color:COLORS.themeColor
                }}>View All</Text>
          </TouchableOpacity>
        </View>
    </View>
          );
        }}
       
      
      />

      


    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
