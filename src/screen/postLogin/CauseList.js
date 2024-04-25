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
      CauseListRequest,
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
const CauseList = ({navigation}) => {
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
              dispatch(CauseListRequest());
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
            dispatch(CauseListRequest());
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
      text={'Cause List'}
    />
    <Loader visible={PostReducer.loading && search == ''} />
    <View
        style={{
          width: Dimensions.get('screen').width - 30,
          marginTop: normalize(10),
          flexGrow:0,
          alignSelf:'center'
        }}>
            <View style={{marginBottom:normalize(10)}}>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingLeft: 10,
              }}
              placeHolderText="Select Date"
              beforeIcon={''}
              keyboardType={'default'}
              afterIcon={ICON.calender}
              selectBox={true}
              value={year !== null && moment(year).format('YYYY-MM-DD')}
              onChangingText={item => {
                // setYear(item);
              }}
              OnOpenModal={item => {
                setSelectYear(true);
              }}
            />
            {year !== null &&
            <TouchableOpacity
            onPress={()=>{
                setYear(null)
            }}
            >
                <Text style={{color:'red', marginTop:normalize(2),textAlign:'right'}}>Clear</Text>
            </TouchableOpacity>
}
    </View>


 <FlatList
          
          data={PostReducer?.getCause}
          style={{borderBottomWidth: normalize(1), borderBottomColor: '#DDD'}}
          renderItem={({item, index}) => {
            return (


    <View style={{
          backgroundColor: '#002D5233',
          padding: normalize(7),
          marginVertical: normalize(5),
          borderRadius: normalize(10),
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: '#002D5233',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems:'center'
    }}>
        <Text>
            {moment(item?.date).format('DD-MM-YYYY')}
        </Text>
        <TouchableOpacity
                          style={{
                            width: normalize(30),
                            height: normalize(30),
                            backgroundColor: '#35A4431A',
                            borderRadius: normalize(3),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: normalize(5),
                          }}
                          onPress={() => {
                           Linking.openURL(item?.file);
                          }}>
                          <Image
                            source={ICON.import}
                            style={{
                              height: normalize(15),
                              width: normalize(15),
                            }}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
    </View>
            )
        }}
        
        ListEmptyComponent={() => {
            return (
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height / 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={IMAGE?.no_data}
                  style={{
                    width: normalize(100),
                    height: normalize(100),
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          }}
        
        />
    </View>
    <DatePicker
          modal
          open={selectYear}
          date={year !== null ? year : new Date()}
          onConfirm={date => {
            setYear(date);
            setSelectYear(false);
            IsInternetConnected()
                  .then(() => {
                    dispatch(CauseListRequest({search: moment(date).format('YYYY-MM-DD')}));
                  })
                  .catch(() => {
                    ToastMessage('Network connection issue');
                  });
          }}
          onCancel={() => {
            setSelectYear(false);
          }}
          mode="date"
          textColor={'#000'}
          theme="light"
        />
  </View>
  )
}

export default CauseList