import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Image, Text, View, Dimensions} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {COLORS, ICON} from '../utils/Theme';

import Dashboard from '../screen/postLogin/Dashboard';
import normalize from '../utils/helpers/normalize';
import MemberList from '../screen/postLogin/MemberList';
import Feed from '../screen/feed/Feed';
import Cases from '../screen/postLogin/Cases';
import Bills from '../screen/postLogin/Bills';
import Service from '../screen/postLogin/Service';
import Calender from '../screen/postLogin/Calender';
import EnqueryList from '../screen/postLogin/EnqueryList';
import Ebook from '../screen/postLogin/Ebook';
import EbookCategory from '../screen/postLogin/EbookCategory';
import Wallet from '../screen/postLogin/Wallet';
const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');
const TabBottomNavigation = ({navigation, action}) => {
  const route = useRoute();
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.themeColor,
        tabBarInactiveTintColor: '#DDD',
        tabBarAllowFontScaling: true,
        headerShown: false,
        tabBarStyle: {
          height: normalize(45),
          backgroundColor: COLORS.WHITE,
          // borderTopLeftRadius: normalize(8),
          // borderTopRightRadius: normalize(8),
          //borderTopColor: '#000014',
          //borderTopWidth: normalize(1.5),
          paddingBottom: normalize(3),
          // elevation: normalize(8),
          // shadowColor: '#000014',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{
                color: color == COLORS.themeColor ? COLORS.themeColor : '#DDD',
                fontWeight: '800',
                marginTop: normalize(2),
                fontSize: normalize(10),
              }}>
              Home
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                //borderTopWidth: 2,
                //borderTopColor: color == COLORS.PINK ? COLORS.PINK : '#FFF',

                width: width / 3.8,
                alignItems: 'center',
                paddingTop: normalize(6),
              }}>
              <Image
                source={ICON?.bn_home}
                style={{
                  height: normalize(24),
                  width: normalize(24),
                  tintColor:
                    color == COLORS.themeColor ? COLORS.themeColor : '#DDD',
                }}
              />
            </View>
          ),
          unmountOnBlur: false,
        }}
        component={Dashboard}
      />
      <Tab.Screen
        name="MemberList"
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{
                color: color == COLORS.themeColor ? COLORS.themeColor : '#DDD',
                fontWeight: '800',
                fontSize: normalize(10),
                marginTop: normalize(2),
              }}>
              Members
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                width: width / 3.8,
                alignItems: 'center',
                paddingTop: normalize(6),
              }}>
              <Image
                source={ICON?.members}
                style={{
                  height: normalize(24),
                  width: normalize(24),
                  tintColor:
                    color == COLORS.themeColor ? COLORS.themeColor : '#DDD',
                }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
        component={MemberList}
      />

      <Tab.Screen
        name="Ebook-category"
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{
                color: color == COLORS.themeColor ? COLORS.themeColor : '#DDD',
                fontWeight: '800',
                fontSize: normalize(10),
                marginTop: normalize(2),
              }}>
              Ebooks
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                width: width / 3.8,
                alignItems: 'center',
                paddingTop: normalize(6),
              }}>
              <Image
                source={ICON?.ebook}
                style={{
                  height: normalize(24),
                  width: normalize(24),
                  tintColor:
                    color == COLORS.themeColor ? COLORS.themeColor : '#DDD',
                }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
        component={EbookCategory}
      />
      <Tab.Screen
        name="Wallet"
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{
                color: color == COLORS.themeColor ? COLORS.themeColor : '#DDD',
                fontWeight: '800',
                marginTop: normalize(2),
                fontSize: normalize(10),
              }}>
              Wallet
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                width: width / 4.2,
                alignItems: 'center',
                paddingTop: normalize(6),
              }}>
              <Image
                source={ICON?.bn_bill}
                style={{
                  height: normalize(24),
                  width: normalize(24),
                  tintColor:
                    color == COLORS.themeColor ? COLORS.themeColor : '#DDD',
                }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
        component={Wallet}
      />
    </Tab.Navigator>
  );
};

export default TabBottomNavigation;
