import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
    Linking,
    TextInput,
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
      allHearingRequest,
      caseDetailRequest,
  } from '../../redux/reducer/PostReducer';
  import IsInternetConnected from '../../utils/helpers/IsInternetConnected';
  import {ToastMessage} from '../../utils/helpers/Toast';
  import Modal from 'react-native-modal';
  import InputText from '../../components/InputText';
  import {navigate} from '../../utils/helpers/RootNavigation';
import Loader from '../../utils/helpers/Loader';
import moment from 'moment';

import DatePicker from 'react-native-date-picker';
  var status = '';

const AllTodayCase = ({navigation}) => {

    const [search, setSearch] = useState('');
    const [selectYear, setSelectYear] = useState(false);
    const [year, setYear] = useState(null );
    const PostReducer = useSelector(state => state.PostReducer);

    const dispatch = useDispatch();

    if (status == '' || PostReducer?.status != status) {
      switch (PostReducer?.status) {
        case 'post/caseDeleteRequest':
          status = PostReducer?.status;
          break;
        case 'post/caseDeleteSuccess':
          status = PostReducer?.status;
          IsInternetConnected()
            .then(() => {
                dispatch(allHearingRequest());
            })
            .catch(() => {
              ToastMessage('Network connection issue');
            });
          break;
      }
    }
    useEffect(() => {
        IsInternetConnected()
          .then(() => {
            dispatch(allHearingRequest());
          })
          .catch(() => {
            ToastMessage('Network connection issue');
          });
      }, [year]);




  return (
    <View
    style={{
      backgroundColor: '#fff',
      flex: 1,
    }}>
    <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
    <Header
      isMenuPresent={false}
      navigation={navigation}
      text={'Today Case List'}
    />
    <Loader visible={PostReducer.loading && search == ''} />
    <View
        style={{
          width: Dimensions.get('screen').width - 30,
          marginTop: normalize(10),
          flexGrow:0,
          alignSelf:'center'
        }}>
           
           <FlatList
                    data={PostReducer?.todayhearing}
                    style={
                      {
                        // width: Dimensions.get('screen').width / 2.5,
                        // alignSelf: 'center',
                      }
                    }
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{

                            padding: normalize(10),
                            borderWidth: normalize(1),
                            borderRadius: normalize(10),
                            marginBottom: normalize(10),
                            borderColor: COLORS.themeColor,
                            backgroundColor: '#FFF',
                          }}
                          onPress={() => {
                            // dispatch(caseDetailRequest(item));
                            // navigation?.navigate('CasesDetails');
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
                                color: '#222',
                                marginLeft: normalize(0),
                                fontWeight: '800',
                              }}>
                              Case No:
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={{
                                width: '85%',
                                color: '#000',
                                marginLeft: normalize(5),
                                fontWeight: '800',
                              }}>
                              {item?.case_no + '-' + item?.year_of_case}
                            </Text>
                          </View>

                        
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={ICON.user_s_s}
                              style={{
                                height: normalize(14),
                                width: normalize(14),
                                tintColor: '#222',
                              }}
                              resizeMode="contain"
                            />
                            <Text
                              numberOfLines={1}
                              style={{
                                color: '#000',
                                marginLeft: normalize(5),
                              }}>
                              {item?.petitioner}
                            </Text>
                          </View>
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


    </View>
   
  </View>
  )
}

export default AllTodayCase