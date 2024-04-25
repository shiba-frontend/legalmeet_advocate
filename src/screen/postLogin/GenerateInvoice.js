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
import {
  caseData,
  caseListRequest,
  caseTypeRequest,
  clientDetailRequest,
  clientListRequest,
  courtListRequest,
  generateInvoiceRequest,
  memberListRequest,
  stateListRequest,
  updateProfileRequest,
} from '../../redux/reducer/PostReducer';
import Header from '../../utils/helpers/Header';
import Modal from 'react-native-modal';

var status = '';
const GenerateInvoice = ({navigation, route}) => {
  const [client, setClient] = useState('');
  const [court, setCourt] = useState('');
  const [state, setState] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [member, setMember] = useState([]);
  const [postcode, setPostcode] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [item, setItem] = useState('');

  const [multipleitem, setmultipleitem] = useState([
    {
      item:'',
      price:'',
      description:'',
    }
  ]);

  const [selectClient, setSelectClient] = useState(false);

  const [selectMember, setSelectMember] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  function isEmpty(item) {
    if (item == '' || item == undefined || item == null) return true;
    return false;
  }

  //Search adv
  const [ClientList, setClientList] = useState([]);
  const [searchclientname, setsearchclientname] = useState('');

  console.log('--------------------------------', PostReducer?.cases);

  console.log('client', client);

  useEffect(() => {
    IsInternetConnected()
      .then(() => {
        dispatch(caseListRequest());
        dispatch(clientListRequest());
        route?.params?.pageName != 'add'
          ? dispatch(clientListRequest())
          : setClient(PostReducer?.clientDetail);
      })
      .catch(() => {
        ToastMessage('Network connection issue');
      });

    if (!isEmpty(route?.params?.item)) {
      console.log(route?.params?.item?.court_details);
      setPostcode(String(route?.params?.item?.pin));
      setClient({
        id: route?.params?.item?.client_id,
        name: route?.params?.item?.client,
      });
      setMember(route?.params?.item?.members);
      setCaseNumber(route?.params?.item?.case_id);
    }
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    setClientList(PostReducer?.clients);
  }, [PostReducer?.clients]);
  const handleSearch = text => {
    if (text) {
      setsearchclientname(text);

      const filtered = ClientList.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );

      setClientList(filtered);
    } else {
      setClientList(PostReducer?.clients);
      setsearchclientname(text);
    }
  };

  const handleChange = (index, value, key)=>{

    const rowsInput = [...multipleitem];
    rowsInput[index][key] = value;
    setmultipleitem(rowsInput);
  
 
 
}


  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
      <Header
        isMenuPresent={false}
        navigation={navigation}
        text={'Generate Invoice'}
      />
      <Loader visible={PostReducer.loading} />
      {/* Client list */}
      <Modal
        isVisible={selectClient}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectClient(false);
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
          <View style={{padding: normalize(10)}}>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: Dimensions.get('screen').width - 25,
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: '#e7e7e7',
                borderWidth: 1,
              }}
              placeHolderText="Search client name"
              beforeIcon={''}
              keyboardType={'default'}
              maxLength={100}
              value={searchclientname}
              onChangingText={handleSearch}
            />
          </View>

          <FlatList
            data={ClientList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: normalize(10),
                  }}
                  onPress={() => {
                    dispatch(clientDetailRequest({client_id: item?.id}));
                    dispatch(caseListRequest({client_id: item?.id}));
                    setClient(item);
                    setSelectClient(false);
                  }}>
                  <View
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: normalize(40),
                      backgroundColor: '#f3f3f3',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(8),
                      }}>
                      {item?.name?.split(' ')[0]?.substring(0, 1)}{' '}
                      {item?.name?.split(' ')[1]?.substring(0, 1)}
                    </Text>
                  </View>
                  <View>
                    <Text>{item?.name}</Text>
                    <Text>{item?.mobile_number}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>

      {/* Member list */}
      <Modal
        isVisible={selectMember}
        animationIn="slideInUp"
        animationOut="slideInDown"
        animationInTiming={800}
        animationOutTiming={100}
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectMember(false);
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
            data={PostReducer?.cases}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: normalize(1),
                    borderColor: '#e7e7e7',
                    padding: normalize(10),
                    width: Dimensions.get('screen').width,
                    paddingRight: normalize(10),
                  }}
                  onPress={() => {
                    setMember(item);
                    // setState(item);
                    setSelectMember(false);
                  }}>
                  <Text
                    style={{
                      color: member.case_id != -1 ? COLORS.themeColor : '#000',
                    }}>
                    {item?.case_id} - {item?.year_of_case}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
      <ScrollView>
        <View style={{alignItems: 'center', marginBottom: normalize(10)}}>
          <View style={{marginTop: normalize(10), width: '90%'}}>
            {route?.params?.pageName != 'add' ? (
              <View>
                <Text
                  style={{
                    marginVertical: normalize(7),
                    fontWeight: '600',
                    fontSize: normalize(13),
                  }}>
                  Select Client
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
                  value={client?.name}
                  onChangingText={item => {
                    // setName(item);
                  }}
                  OnOpenModal={item => {
                    if (PostReducer?.clients?.length > 0) setSelectClient(true);
                    else ToastMessage('No client list is available');
                  }}
                />
              </View>
            ) : null}
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Select Case
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText={'Select'}
              beforeIcon={''}
              keyboardType={'default'}
              selectBox={true}
              afterIcon={ICON.select_box_icon}
              // maxLength={10}
              value={member?.case_id}
              onChangingText={item => {
                // setName(item);
              }}
              OnOpenModal={item => {
                if (PostReducer?.allCaseList?.length > 0) setSelectMember(true);
                else ToastMessage('No case list is available');
              }}
            />
          </View>
          {multipleitem.map((item, index)=>{
            return <View key={index} style={{
              borderWidth: 1,
              borderColor:COLORS.themeColor,
              borderRadius:normalize(7),
              width: '90%',
              padding:normalize(10),
              marginVertical: normalize(15)
            }}>
              {index >0 && 
              <TouchableOpacity style={{
              justifyContent:'center',
              alignItems:'center',
              position:'absolute',
              top:normalize(-8),
              right:normalize(-5)
              }}
              onPress={()=>{
                const rows = [...multipleitem];
                rows.splice(index, 1);
                setmultipleitem(rows);
              }}
              >
                    <Image source={IMAGE.remove} style={{
                      width: normalize(25),
                      height: normalize(25)
                    }}   />
            
              </TouchableOpacity>
          }
                <View>
            <Text
              style={{
                marginBottom: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Enter Item
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter item"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={6}
              value={item.item}
              onChangingText={text => {
                handleChange(index, text, 'item');
              }}
            />
          </View>
                        <View >
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Enter Price
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter price"
              beforeIcon={''}
              keyboardType={'phone-pad'}
              // maxLength={6}
              value={item.price}
              onChangingText={text => {
                handleChange(index, text, 'price');
              }}
            />
          </View>
          <View>
            <Text
              style={{
                marginVertical: normalize(7),
                fontWeight: '600',
                fontSize: normalize(13),
              }}>
              Enter Description
            </Text>
            <InputText
              inputStyle={{
                backgroundColor: '#FFF',
                width: '100%',
                borderRadius: 10,
                paddingHorizontal: normalize(7),
                paddingVertical: normalize(3),
                borderColor: COLORS.themeColor,
                borderWidth: 1,
              }}
              placeHolderText="Enter description"
              beforeIcon={''}
              keyboardType={'default'}
              // maxLength={6}
              value={item.description}
              onChangingText={text => {
                handleChange(index, text, 'description');
              }}
            />
          </View>
                 </View>
          })}
          <View>
              <TouchableOpacity style={{
                backgroundColor: COLORS.secondarColor,
                paddingHorizontal:normalize(15),
                paddingVertical:normalize(6),
                borderRadius:normalize(4)
              }}
              
              onPress={()=>{
                if(multipleitem[0].item == ''){
                  ToastMessage('Enter invoice item');
                } else {

                
                const rowsInput={
                  item:'',
                  price:'',
                  description:''  
              } 
              setmultipleitem([...multipleitem, rowsInput])
            }
              }}
              
              >
                <Text>Add Another</Text>
              </TouchableOpacity>
          </View>

        

        

        

          <View style={{marginTop: normalize(20), width: '90%'}}>
            <TouchableOpacity
              style={{
                padding: normalize(10),
                backgroundColor: COLORS.STATUS_BAR,
                borderRadius: normalize(10),
                alignItems: 'center',
              }}
              onPress={() => {
                if (client == '') {
                  ToastMessage('Client required');
                } else if (member == '') {
                  ToastMessage('Case required');
                }  else {
                  IsInternetConnected()
                    .then(() => {
                      dispatch(
                        generateInvoiceRequest({
                          case_id: member?.id,
                          client_id: client?.id,
                          invoice_details:multipleitem
                          // price: price,
                          // description: description,
                          // item: item,
                        }),
                      );
                    })
                    .catch(() => {
                      ToastMessage('Network connection issue');
                    });
                }
              }}>
              <Text style={{color: COLORS.secondarColor, letterSpacing: normalize(2)}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GenerateInvoice;

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
