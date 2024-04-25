import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS, ICON} from '../Theme';
import normalize from './normalize';
import {Dialog} from 'react-native-paper';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {updatePageName} from '../../redux/reducer/PostReducer';
import {navigate} from './RootNavigation';
import SideMenu from './SideMenu';
// import SideMenu from '../../components/SideMenu';

export default function Header(props) {
  const [isSideMenuDisplay, setIsSideMenuDisplay] = useState(false);
  const PostReducer = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <SideMenu
        isOpen={isSideMenuDisplay}
        onOff={item => {
          setIsSideMenuDisplay(false);
        }}
        navigation={props.navigation}
      />
      {/* {isSideMenuDisplay ? (
        <View>
          <Modal
            isVisible={isSideMenuDisplay}
            onBackdropPress={() => setIsSideMenuDisplay(false)}
            animationIn="fadeInLeft">
            <View
              style={{
                position: 'absolute',
                left: normalize(0),
                backgroundColor: '#EAEAEA',
                height: Dimensions?.get('window')?.height,
                width: Dimensions?.get('window')?.width / 1.3,
                marginLeft: -normalize(20),
              }}>
              <View
                style={{
                  height: '80%',
                  width: Dimensions?.get('window')?.width / 1.3,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    padding: normalize(10),
                    width: Dimensions?.get('window')?.width / 1.3,
                    marginTop: normalize(18),
                    borderBottomWidth: normalize(1),
                    borderBottomColor: '#ddd',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginLeft: -normalize(50),
                  }}>
                  <Image
                    source={ICON?.menu}
                    style={{height: normalize(15), width: normalize(15)}}
                  />
                  <Text
                    style={{
                      marginLeft: normalize(10),
                      fontSize: normalize(14),
                    }}>
                    Legalmeet
                  </Text>
                </View>
                <ScrollView
                  style={{paddingLeft: normalize(20)}}
                  showsVerticalScrollIndicator={false}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      padding: normalize(10),
                      width: '90%',
                      marginTop: normalize(10),
                    }}
                    onPress={() => {
                      props?.navigation?.navigate('Cases');
                      setIsSideMenuDisplay(false);
                    }}>
                    <Image
                      source={ICON?.judge}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: '#555555',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        tintColor: '#555555',
                        fontSize: normalize(13),
                      }}>
                      My Cases
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      padding: normalize(10),
                      width: '90%',
                      marginTop: normalize(10),
                    }}
                    onPress={() => {
                      props?.navigation?.navigate('Bills');
                      setIsSideMenuDisplay(false);
                    }}>
                    <Image
                      source={ICON.bn_bill}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: '#555555',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        tintColor: '#555555',
                        fontSize: normalize(13),
                      }}>
                      My Bills
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      padding: normalize(10),
                      width: '90%',
                      marginTop: normalize(10),
                      borderTopColor: '#999999',
                    }}
                    onPress={() => {
                      navigate('Report');
                    }}>
                    <Image
                      source={ICON.report}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: '#555555',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        tintColor: '#555555',
                        fontSize: normalize(13),
                      }}>
                      Consultation List
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      padding: normalize(10),
                      width: '90%',
                      marginTop: normalize(10),
                      borderTopColor: '#999999',
                    }}
                    onPress={() => {
                      navigate('ServiceRequest');
                      setIsSideMenuDisplay(false);
                    }}>
                    <Image
                      source={ICON.request}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: '#555555',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        tintColor: '#555555',
                        fontSize: normalize(13),
                      }}>
                      My Services
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      padding: normalize(10),
                      width: '90%',
                      marginTop: normalize(10),
                      borderTopColor: '#999999',
                    }}
                    onPress={() => {
                      navigate('Appointment');
                      setIsSideMenuDisplay(false);
                    }}>
                    <Image
                      source={ICON.request}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: '#555555',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        tintColor: '#555555',
                        fontSize: normalize(13),
                      }}>
                      Subscription
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      padding: normalize(10),
                      width: '90%',
                      marginTop: normalize(10),
                      borderTopColor: '#999999',
                    }}
                    onPress={() => {
                      navigate('HelpCenter');
                    }}>
                    <Image
                      source={ICON.settings}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: '#555555',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        tintColor: '#555555',
                        fontSize: normalize(13),
                      }}>
                      Help Center
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      padding: normalize(10),
                      width: '90%',
                      marginTop: normalize(10),
                      borderTopColor: '#999999',
                    }}
                    onPress={() => {
                      navigate('CMSPage', {page: 'About Us'});
                    }}>
                    <Image
                      source={ICON.settings}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: '#555555',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        tintColor: '#555555',
                        fontSize: normalize(13),
                      }}>
                      About Us
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      padding: normalize(10),
                      width: '90%',
                      marginTop: normalize(10),
                      borderTopColor: '#999999',
                    }}
                    onPress={() => {
                      navigate('CMSPage', {page: 'Term & Conditions'});
                    }}>
                    <Image
                      source={ICON.settings}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: '#555555',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        tintColor: '#555555',
                        fontSize: normalize(13),
                      }}>
                      Terms and Conditions
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      padding: normalize(10),
                      width: '90%',
                      marginTop: normalize(10),
                      borderTopColor: '#999999',
                    }}
                    onPress={() => {
                      navigate('CMSPage', {page: 'Privacy Policy'});
                    }}>
                    <Image
                      source={ICON.settings}
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        tintColor: '#555555',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        tintColor: '#555555',
                        fontSize: normalize(13),
                      }}>
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>

                  <View style={{marginTop: normalize(40)}}></View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      ) : null} */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (!props?.isMenuPresent) {
              props?.navigation?.goBack();
            } else {
              setIsSideMenuDisplay(true);
            }
          }}>
          <Image
            source={props?.isMenuPresent ? ICON.menu : ICON.arrow_left}
            style={{
              height: props?.isMenuPresent ? normalize(24) : normalize(24),
              width: props?.isMenuPresent ? normalize(24) : normalize(24),
              tintColor: 'rgba(33, 31, 32, 1)',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'rgba(33, 31, 32, 1)',
            marginLeft: normalize(12),
            fontWeight: '800',
            fontSize: normalize(14),
          }}>
          {props?.text}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '18%',
          justifyContent: 'space-between',
          alignItemsL: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            // if (!props?.isMenuPresent) props.navigation.goBack();
          }}>
          {props?.isMenuPresent ? (
            <TouchableOpacity
              onPress={() => {
                if (props?.isMenuPresent)
                  props.navigation.navigate('NotificationList');
              }}>
              <Image
                source={ICON.noti}
                style={{
                  height: props?.isMenuPresent ? normalize(20) : normalize(20),
                  width: props?.isMenuPresent ? normalize(20) : normalize(20),
                  // tintColor: 'rgba(33, 31, 32, 1)',
                }}
                resizeMode="contain"
              />
              <View
                style={{
                  height: normalize(14),
                  width: normalize(14),
                  borderRadius: normalize(7),
                  backgroundColor: COLORS?.red,
                  position: 'absolute',
                  top: -normalize(5),
                  right: normalize(0),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: COLORS?.WHITE, fontSize: normalize(8)}}>
                  {PostReducer?.profileData?.unread_notification_count}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (props?.isMenuPresent) props.navigation.navigate('Profile');
          }}>
          {props?.isMenuPresent ? (
            <Image
              source={ICON.user_s}
              style={{
                height: props?.isMenuPresent ? normalize(20) : normalize(20),
                width: props?.isMenuPresent ? normalize(20) : normalize(20),
                marginTop: normalize(1),
                // tintColor: 'rgba(33, 31, 32, 1)',
              }}
              resizeMode="contain"
            />
          ) : null}
        </TouchableOpacity>
      </View>

      {/* {props?.isMenuPresent ? (
        <TouchableOpacity
          onPress={() => {
            setShowSideMenuOption(!showSideMenuOption);
          }}>
          <Image
            source={ICONS.sidemenu}
            style={{
              height: normalize(20),
              width: normalize(20),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    height: normalize(40),
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    paddingHorizontal: normalize(10),
    justifyContent: 'space-between',
    borderBottomWidth: normalize(1),
    borderBottomColor: '#ddd',
    elevation: normalize(8),
    shadowColor: '#000014',
  },
});
