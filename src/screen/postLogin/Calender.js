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
  TextInput,
  Alert,
  Linking,
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
import {
  caseDetailRequest,
  TentativeCauseListRequest,
  clientListRequest,
  updatePageName,
  caseHearingPdfLinkRequest,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import RNFetchBlob from 'rn-fetch-blob';
var status = '';
const Calender = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [directionAlert, setDirectionAlert] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [makeObject, setMakeObject] = useState();
  const [selectedDay, setSelectedDay] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedDayHearings, setSelectedDayHearings] = useState([]);
  const CaseHeairingPdfLink = useSelector(state => state.PostReducer?.caseHearingPdfLinkResponse);
console.log("CaseHeairingPdfLink", CaseHeairingPdfLink)
console.log("PostReducer?.TentativeCause", PostReducer)


  if (status == '' || status != PostReducer?.status) {
    switch (PostReducer?.status) {
      case 'post/clientDeleteRequest':
        status = PostReducer?.status;
        break;
      case 'post/clientDeleteSuccess':
        status = PostReducer?.status;
        IsInternetConnected()
          .then(() => {
            dispatch(clientListRequest());
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
        break;
    }
  }


  useEffect(() => {
    let dateArray = [...selectedDays];
    var array =  [];
    console.log('1234', PostReducer?.hearingList);
    PostReducer?.hearingList?.forEach(element => {
      dateArray.push(element?.date_original);
      console.log('1234', dateArray);
      if (element?.date_original == selectedDay) {
       array = [...array, element];
        // setSelectedDayHearings([...PostReducer?.hearingList, element]);
      }
    });
    console.log('1234', array);
    setSelectedDayHearings(array)
    setSelectedDays(dateArray);
    console.log('Result: ', dateArray);
    var json = {};
    console.log(dateArray?.length);
    dateArray?.forEach((element, index) => {
      json = {
        ...json,
        [element]: {
          selected: true,
          startingDay: true,
          endingDay: true,
          color: COLORS.themeColor,
          textColor: 'white',
        },
      };
    });
    setMakeObject(json);




  }, [selectedDay]);


  // useEffect(() => {
  //   IsInternetConnected()
  //     .then(() => {
  //       dispatch(TentativeCauseListRequest({date: selectedDay}));
  //     })
  //     .catch(() => {
  //       ToastMessage('Network connection issue');
  //     });

  //     // const getExtension = (url) => {
  //     //   return url.split('.').pop();
  //     // };

  // }, []);


  const downloadFile = () => {
    const url = 'https://example.com/file.pdf';
    
    // Fetch the file
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path: RNFetchBlob.fs.dirs.DownloadDir + "/file.pdf",
        description : 'Downloading file.'
      }
    })
    .fetch('GET', url)
    .then(res => {
      console.log('File downloaded:', res.path());
    })
    .catch(error => {
      console.error('Error downloading file:', error);
    });
  }


  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(caseHearingPdfLinkRequest({date: selectedDay}));
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });

  }, [selectedDay]);






  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }



  function onPressDownload(uri) {

    let date = new Date();

    let image_URL = uri;

    let ext = getExtention(image_URL);
    ext = '.' + ext[0];

    const {config, fs} = RNFetchBlob;


    let PictureDir = fs.dirs.DownloadDir;

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
 
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    console.log("all",options, uri);
 
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', res);
    
 
        Toast('Photo downloaded successfully at');
      })
      .catch(err => {
        console.log("err",err);
       
      });
  }







  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header isMenuPresent={false} navigation={navigation} text={'Calendar'} />
      <Loader visible={PostReducer.loading} />
      <ScrollView
        style={{paddingHorizontal: normalize(20), paddingTop: normalize(10)}}>
        <View style={{marginBottom: normalize(10)}}>
          <Calendar
            // Customize the appearance of the calendar
            style={styles.calendar}
            minDate={moment(new Date()).format('YYYY-MM-DD')}
            // style={[styles.calendar, styles.customCalendar]}
            // Specify the current date
            current={moment(new Date()).format('YYYY-MM-DD')}
            // Callback that gets called when the user selects a day
            onDayPress={day => {
              console.log('selected day', day.dateString);
              setSelectedDay(day.dateString);
             

              
              let array = [];
              PostReducer?.hearings?.forEach(element => {
                if (element?.date_original == day.dateString) {
                  array.push(element);
                  // setSelectedDayHearings([...selectedDayHearings, element]);
                }
              });
              setSelectedDayHearings(array);
              // if(selectedDayHearings?.length)
              // let dateArray = [...selectedDays];
              // console.log('AAAA ', dateArray);
              //
              // if (dateArray?.length == 0) {
              //   dateArray.push(day.dateString);
              // } else {
              //   console.log(new Date(day.dateString));
              //   console.log(
              //     new Date(day.dateString) >
              //       new Date(dateArray[dateArray.length - 1]),
              //   );
              // var prevDate = new Date(day.dateString);
              // prevDate.setDate(prevDate.getDate() - 1);
              // console.log(prevDate);
              // var nextDate = new Date(day.dateString);
              // nextDate.setDate(nextDate.getDate() + 1);
              // console.log(nextDate);
              // if (
              //   new Date(day.dateString) >
              //   new Date(dateArray[dateArray.length - 1])
              // ) {
              // let i = 1;
              // while (1) {
              //   var nextDate = new Date(dateArray[dateArray.length - 1]);
              //   nextDate.setDate(nextDate.getDate() + 1);

              //   if (nextDate <= new Date(day.dateString)) {
              //     dateArray.push(moment(nextDate).format('YYYY-MM-DD'));
              //   } else {
              //     break;
              //   }
              // }
              // }
              //  else {
              //   dateArray = [day.dateString];
              // }
              // if (
              //   dateArray[dateArray.length - 1] ==
              //     moment(prevDate).format('YYYY-MM-DD') ||
              //   dateArray[0] == moment(nextDate).format('YYYY-MM-DD')
              // ) {
              //   dateArray.push(day.dateString);
              // } else {
              //   dateArray = [day.dateString];
              // }
              // }
              // if (
              //   dateArray.findIndex((item, ind) => {
              //     return item == day.dateString;
              //   }) == -1
              // ) {
              //   dateArray.push(day.dateString);
              // } else {
              //   dateArray.splice(
              //     dateArray.findIndex((item, ind) => {
              //       return item == day.dateString;
              //     }),
              //     1,
              //   );
              // }

              // dateArray.sort(function (a, b) {
              //   var dateA = new Date(a);
              //   var dateB = new Date(b);

              //   if (dateA < dateB) {
              //     return -1;
              //   }
              //   if (dateA > dateB) {
              //     return 1;
              //   }
              //   return 0;
              // });
              // // console.log(dateArray);

              // setSelectedDays(dateArray);
              // var json = {};
              // console.log(dateArray?.length);
              // dateArray.forEach((element, index) => {
              //   json = {
              //     ...json,
              //     [element]: {
              //       selected: true,
              //       startingDay: true,
              //       endingDay: true,
              //       color: COLORS.themeColor,
              //       textColor: 'white',
              //     },
              //   };
              // });

              // // dateArray.forEach((element, index) => {
              // //   if (index == 0) {
              // //     json = {
              // //       [element]: {
              // //         startingDay: true,
              // //         color: COLORS.deep_pink,
              // //         textColor: 'white',
              // //       },
              // //     };
              // //   } else if (index == dateArray.length - 1) {
              // //     json = {
              // //       ...json,
              // //       [element]: {
              // //         selected: true,
              // //         endingDay: true,
              // //         color: COLORS.deep_pink,
              // //         textColor: 'white',
              // //       },
              // //     };
              // //   } else {
              // //     json = {
              // //       ...json,
              // //       [element]: {
              // //         selected: true,
              // //         color: COLORS.deep_pink,
              // //         textColor: 'white',
              // //       },
              // //     };
              // //   }
              // // });
              // console.log(json);
              // setMakeObject(json);
            }}
            // Mark specific dates as marked
            markingType={'period'}
            markedDates={makeObject == '' ? '' : makeObject}
            // markedDates={{
            //   '2023-10-15': {
            //     marked: true,
            //     dotColor: '#50cebb',
            //     customStyles: {
            //       container: {
            //         backgroundColor: 'white',
            //         elevation: 2,
            //       },
            //       text: {
            //         color: 'blue',
            //       },
            //     },
            //   },
            //   '2023-10-16': {
            //     customStyles: {
            //       container: {
            //         backgroundColor: 'white',
            //         elevation: 2,
            //       },
            //       text: {
            //         color: 'blue',
            //       },
            //     },
            //     selected: true,
            //     marked: true,
            //     selectedColor: COLORS.deep_pink,
            //   },
            //   '2023-10-17': {
            //     customStyles: {
            //       container: {
            //         backgroundColor: 'white',
            //         elevation: 2,
            //       },
            //       text: {
            //         color: 'blue',
            //       },
            //     },
            //     selected: true,
            //     marked: true,
            //     selectedColor: COLORS.deep_pink,
            //   },
            // }}
            // theme={{
            //   backgroundColor: '#ffffff',
            //   calendarBackground: '#ffffff',
            //   textSectionTitleColor: '#FFF',
            //   // textSectionTitleDisabledColor: '#d9e1e8',
            //   selectedDayBackgroundColor: '#ffffff',
            //   selectedDayTextColor: '#ffffff',
            //   todayTextColor: '#000',
            //   // dayTextColor: '#2d4150',

            //   textDisabledColor: '#FFF',
            //   selectedDotColor: '#ffffff',
            //   arrowColor: '#77838F',
            //   disabledArrowColor: '#d9e1e8',
            //   monthTextColor: '#000',
            //   indicatorColor: '#000',
            //   textDayFontFamily: FONTS.Fredoka_Regular,
            //   textMonthFontFamily: FONTS.Fredoka_Regular,
            //   textDayHeaderFontFamily: FONTS.Fredoka_Regular,
            //   textDayFontSize: normalize(12),
            //   textMonthFontSize: normalize(14),
            //   textDayHeaderFontSize: normalize(10),
            // }}
          />
        </View>
        <View  style={{
                  padding: normalize(10),
                  borderWidth: normalize(1),
                  borderRadius: normalize(10),
                  marginBottom: normalize(10),
                  borderColor: COLORS.themeColor,
                  backgroundColor: '#FFF',
                }}>

        <FlatList
          data={selectedDayHearings}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  borderBottomWidth:index !== selectedDayHearings.length - 1 ?  normalize(1) : null,
                  marginBottom: index !== selectedDayHearings.length - 1 ? normalize(7) : null,
                  borderBottomColor:  '#ccc',
                  backgroundColor: '#FFF',
                  paddingBottom: index !== selectedDayHearings.length - 1 ? normalize(7) : null,
                }}
                onPress={() => {
                  if (PostReducer?.profileData?.is_subscribed) {
                  IsInternetConnected()
                  .then(() => {
                    dispatch(
                      caseDetailRequest({
                        case_id: item?.case_id,
                      }),
                    );
                  })
                  .catch(() => {
                    ToastMessage('Network connection issue');
                  });
                  } else {
                    navigation.navigate('expire');
                  }


                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    paddingBottom: normalize(5),
                  }}>
                  <View>
                    <Text
                      // numberOfLines={1}
                      style={{color: COLORS.themeColor, fontWeight: '800'}}>
                      Case No: {item?.case_no ? item?.case_no + '-' + item?.year_of_case : 'N/A'}
                    </Text>
                    <Text
                      // numberOfLines={1}
                      style={{color: COLORS.themeColor, fontWeight: '800'}}>
                      Party Name: {item?.petitioner}
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
               
                {/* {!isEmpty(item?.case_details?.petitioner) ? (
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
                      {item?.case_details?.petitioner}
                    </Text>
                  </View>
                ) : null} */}
                {/* {!isEmpty(item?.case_details?.type_details?.description) ? (
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
                ) : null} */}
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height / 10,
                  alignItems: 'center',
                  flexDirection:'row',
                }}>
                  <Text>No Cases</Text>
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


{selectedDayHearings.length == 0 ? null :

         <View>
                      <TouchableOpacity style={{
                        backgroundColor:COLORS.themeColor,
                        padding:normalize(9),
                        borderRadius:normalize(5),
                        marginTop:normalize(10)
                      }}
                      
                      onPress={() => {
                    
                       
                    
                          const url = CaseHeairingPdfLink?.link;
                          console.log("url",url)
                          // Fetch the file
                          RNFetchBlob.config({
                            fileCache: true,
                            addAndroidDownloads : {
                              useDownloadManager : true,
                              notification : true,
                              path: RNFetchBlob.fs.dirs.DownloadDir + "/file.pdf",
                              description : 'Downloading file.'
                            }
                          })
                          .fetch('GET', url)
                          .then(res => {
                            console.log('File downloaded:', res.path());
                          })
                          .catch(error => {
                            console.error('Error downloading file:', error);
                          });
                        
                        
                      }}
                      
                      >
                          <Text style={{
                            color:COLORS.secondarColor,
                            textAlign:'center',
                            fontSize:normalize(12)
                          }}>Export PDF</Text>
                      </TouchableOpacity>
                  </View>}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calender;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  calendar: {
    marginBottom: 10,
    borderWidth: normalize(1),
    borderRadius: normalize(10),
    borderColor: '#DDD',
  },
});