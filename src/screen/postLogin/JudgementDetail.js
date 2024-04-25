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
  useWindowDimensions 
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
  clientDeleteRequest,
  clientListRequest,
  judgementRequest,
  updatePageName,
} from '../../redux/reducer/PostReducer';
import call from 'react-native-phone-call';
import {useCallback} from 'react';
import {debounce} from 'lodash';
import {WebView} from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
var status = '';
const JudgementDetail = ({navigation, route}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const PostReducer = useSelector(state => state.PostReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const uri = route?.params?.item?.pdf_path;
  const { width } = useWindowDimensions();
  const value = route?.params?.item

  const source = {
    html: route?.params?.item?.description
  };
  console.log('jadgement list', value);

  // if (status == '' || status != PostReducer?.status) {
  //   switch (PostReducer?.status) {
  //     case 'post/clientDeleteRequest':
  //       status = PostReducer?.status;
  //       break;
  //     case 'post/clientDeleteSuccess':
  //       status = PostReducer?.status;
  //       IsInternetConnected()
  //         .then(() => {
  //           dispatch(clientListRequest());
  //         })
  //         .catch(() => {
  //           ToastMessage('Network connection issue');
  //         });
  //       break;
  //   }
  // }
  useEffect(() => {
    // IsInternetConnected()
    //   .then(() => {
    //     dispatch(judgementRequest({search: ''}));
    //   })
    //   .catch(() => {
    //     ToastMessage('Network connection issue');
    //   });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Judgement Detail'}
      />
      <View style={{flex: 1, flexGrow:1, padding:normalize(15)}}>
      <ScrollView>
      <View style={{marginBottom:normalize(6)}}>
        <Text style={{
                        color: '#000',
                        fontSize: normalize(12),
                        fontWeight: '800',
                        marginTop: normalize(2),
                      }}>Section :</Text>
       
          <Text style={{color:'#000', fontSize:normalize(10)}}>{route?.params?.item?.section_no}</Text>
          </View>
          <View style={{marginBottom:normalize(6)}}>
        <Text style={{
                        color: '#000',
                        fontSize: normalize(12),
                        fontWeight: '800',
                        marginTop: normalize(2),
                      }}>Publish Date :</Text>
       
          <Text style={{color:'#666', fontSize:normalize(10)}}>{route?.params?.item?.date}</Text>
          </View>
        <View style={{marginBottom:normalize(6)}}>
        <Text style={{
                        color: '#000',
                        fontSize: normalize(12),
                        fontWeight: '800',
                        marginTop: normalize(2),
                      }}>Title :</Text>
       
          <Text style={{color:'#000', fontSize:normalize(10)}}>{route?.params?.item?.title}</Text>
          </View>
          <View style={{marginBottom:normalize(6)}}>
        <Text style={{
                        color: '#000',
                        fontSize: normalize(12),
                        fontWeight: '800',
                        marginTop: normalize(2),
                      }}>Legalmeet Citation :</Text>
       
          <Text style={{color:'#000', fontSize:normalize(10)}}>{route?.params?.item?.legelmeet_citation}</Text>
          </View>
          <View style={{marginBottom:normalize(6)}}>
        <Text style={{
                        color: '#000',
                        fontSize: normalize(12),
                        fontWeight: '800',
                        marginTop: normalize(2),
                      }}>Equivalent Citatation :</Text>
       
          <Text style={{color:'#000', fontSize:normalize(10)}}>{route?.params?.item?.equivalent_citation}</Text>
          </View>
        
          <View style={{marginBottom:normalize(6)}}>
        <Text style={{
                        color: '#000',
                        fontSize: normalize(12),
                        fontWeight: '800',
                        marginTop: normalize(2),
                      }}>Short:</Text>
       
          <Text style={{color:'#000', fontSize:normalize(10)}}>{route?.params?.item?.short_desc}</Text>
          </View>

          <View style={{marginBottom:normalize(6)}}>
        <Text style={{
                        color: '#000',
                        fontSize: normalize(12),
                        fontWeight: '800',
                        marginTop: normalize(2),
                      }}>Description:</Text>
        <RenderHtml
      contentWidth={width}
      source={source}
    />
      
          </View>
        
          {/* <View style={{marginBottom:normalize(6)}}>
        <Text style={{
                        color: '#000',
                        fontSize: normalize(12),
                        fontWeight: '800',
                        marginTop: normalize(2),
                      }}>Description:</Text>
       
          <Text style={{color:'#666', fontSize:normalize(10)}}>{route?.params?.item?.description}</Text>
          </View> */}
          </ScrollView>
       
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: normalize(30),
            right: normalize(30),
            height: normalize(50),
            width: normalize(50),
            borderRadius: normalize(25),
            borderWidth: normalize(1),
            backgroundColor: COLORS?.WhiteBg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            Linking?.openURL(uri);
          }}>
          <Image
            source={ICON?.import}
            style={{height: normalize(25), width: normalize(25)}}
          />
        </TouchableOpacity>
        {/* <WebView
          source={{
            uri: uri,
          }}
          // onNavigationStateChange={navState => {
          //   console.log(navState);
          // }}
          style={{flex: 1}}
        /> */}
      </View>
    </SafeAreaView>
    // <WebView
    //   source={{
    //     uri: uri,
    //   }}
    //   // onNavigationStateChange={navState => {
    //   //   console.log(navState);
    //   // }}
    //   style={{flex: 1}}
    // />
  );
};

export default JudgementDetail;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
