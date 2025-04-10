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
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {courtListRequest} from '../../redux/reducer/PostReducer';
import Modal from 'react-native-modal';
var status = '';

const DisplayBoard = ({navigation}) => {
  const PostReducer = useSelector(state => state.PostReducer);
  const [searchData, setSearchData] = useState('Search Court...');
  const [selectResult, setSelectResult] = useState('');
  const [selectCourt, setSelectCourt] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(courtListRequest());
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });
  }, []);
  if (status == '' || PostReducer?.status != status) {
    switch (PostReducer?.status) {
      case 'post/courtListRequest':
        status = PostReducer?.status;
        break;
      case 'post/courtListSuccess':
        status = PostReducer?.status;
        setSelectResult(PostReducer?.courtLists?.[0]);
        setSearchData(PostReducer?.courtLists?.[0]?.name);
        break;
      case 'post/courtListFailure':
        status = PostReducer?.status;
        break;
    }
  }

  const RefreshHandle = () => {
    // if(selectResult == ''){
    //   dispatch(courtListRequest());
    // } else {
    //   setSelectResult(selectResult?.link);
    // }
    dispatch(courtListRequest());
  }

  console.log("Refresh", selectResult)



  return (
    <SafeAreaView
    style={{
      flex: 1,
    }}>
    <MyStatusBar
      barStyle={'dark-content'}
      backgroundColor={COLORS.WHITE}
    />
    <Header
      isMenuPresent={false}
      navigation={navigation}
      text={'Display Board'}
    />
    {/* Court list */}
    <Modal
      isVisible={selectCourt}
      animationIn="slideInUp"
      animationOut="slideInDown"
      animationInTiming={800}
      animationOutTiming={100}
      hasBackdrop={true}
      onBackdropPress={() => {
        setSelectCourt(false);
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
        <FlatList
          data={PostReducer?.courtLists}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  borderBottomWidth: normalize(1),
                  borderColor: '#e7e7e7',
                  padding: normalize(10),
                  width: Dimensions.get('screen').width,
                }}
                onPress={() => {
                  setSelectResult(item);
                  setSearchData(item?.name);
                  // setCourt(item);
                  setSelectCourt(false);
                }}>
                <Text>{item?.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
   
    <TouchableOpacity
      style={{
        width: '93%',
        padding: normalize(12),
        borderWidth: normalize(1),
        borderRadius: normalize(10),
        margin: normalize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={() => {
        setSelectCourt(true);
      }}>
      <Text>{searchData}</Text>
      <View>
        <Image
          source={ICON.select_box_icon}
          style={{height: normalize(12), width: normalize(12)}}
        />
      </View>
    </TouchableOpacity>
<View style={{justifyContent:'flex-end', alignItems:'flex-end', marginRight:normalize(15), marginVertical:normalize(10)}}>
<TouchableOpacity onpress={() => { WebViewRef && WebViewRef.reload(); }} style={{borderWidth:1, borderColor:'#ccc',paddingHorizontal:normalize(10),paddingVertical:normalize(3),borderRadius:normalize(5)}}>
      <Text>Refresh</Text>
    </TouchableOpacity>
</View>
 
    
    {selectResult?.link ? (
      <WebView source={{uri: selectResult?.link}} style={{flex: 1}}  ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)} />
    ) : null}
  </SafeAreaView>
  )
}

export default DisplayBoard