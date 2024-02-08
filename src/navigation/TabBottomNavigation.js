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
import RequestList from '../screen/postLogin/RequestList';
const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');
const TabBottomNavigation = ({navigation, action}) => {
  const route = useRoute();
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.themeColor,
        tabBarInactiveTintColor: '#666666',
        tabBarAllowFontScaling: true,
        headerShown: false,
        tabBarStyle: {
          height: normalize(42),
          backgroundColor: COLORS.themeColor,
          borderRadius: normalize(8),
          marginHorizontal: normalize(10),
          paddingBottom: normalize(3),
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{
                color: color == COLORS.themeColor ? '#FFF' : '#CCC',
                fontWeight: '800',
                marginTop: normalize(5),
              }}>
              Home
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                //borderTopWidth: 2,
                //borderTopColor: color == COLORS.PINK ? COLORS.PINK : '#FFF',

                width: width / 4,
                alignItems: 'center',
                paddingTop: normalize(5),
              }}>
              <Image
                source={ICON?.home}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  tintColor: color == COLORS.themeColor ? '#FFF' : '#CCC',
                }}
              />
            </View>
          ),
          unmountOnBlur: false,
        }}
        component={Dashboard}
      />
      <Tab.Screen
        name="Members"
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{
                color: color == COLORS.themeColor ? '#FFF' : '#CCC',
                fontWeight: '800',

                marginTop: normalize(5),
              }}>
              Members
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                width: width / 4,
                alignItems: 'center',
                paddingTop: normalize(5),
              }}>
              <Image
                source={ICON?.member}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  tintColor: color == COLORS.themeColor ? '#FFF' : '#CCC',
                }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
        component={MemberList}
      />

      <Tab.Screen
        name="Requests"
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{
                color: color == COLORS.themeColor ? '#FFF' : '#CCC',
                fontWeight: '800',

                marginTop: normalize(5),
              }}>
              Requests
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                width: width / 4,
                alignItems: 'center',
                paddingTop: normalize(5),
              }}>
              <Image
                source={ICON?.request}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  tintColor: color == COLORS.themeColor ? '#FFF' : '#CCC',
                }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
        component={RequestList}
      />
      <Tab.Screen
        name="Feed"
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{
                color: color == COLORS.themeColor ? '#FFF' : '#CCC',
                fontWeight: '800',
                marginTop: normalize(5),
              }}>
              Feed
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                width: width / 4,
                alignItems: 'center',
                paddingTop: normalize(5),
              }}>
              <Image
                source={ICON?.wave}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  tintColor: color == COLORS.themeColor ? '#FFF' : '#CCC',
                }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
        component={Feed}
      />
    </Tab.Navigator>
  );
};

export default TabBottomNavigation;
