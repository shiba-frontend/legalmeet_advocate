import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useDispatch, useSelector} from 'react-redux';

import Splash from '../screen/splash/Splash';
import Login from '../screen/auth/Login';
import EnterOTP from '../screen/auth/EnterOTP';
import BasicInformation from '../screen/postLogin/BasicInformation';
import Dashboard from '../screen/postLogin/Dashboard';
import TabBottomNavigation from './TabBottomNavigation';
import Profile from '../screen/postLogin/profile/Profile';
import AboutMe from '../screen/postLogin/profile/AboutMe';
import ProfessionalDetails from '../screen/postLogin/profile/ProfessionalDetails';
import ProfileImage from '../screen/postLogin/profile/ProfileImage';
import MyAddress from '../screen/postLogin/profile/MyAddress';
import PersonalInformation from '../screen/postLogin/profile/PersonalInformation';
import Client from '../screen/postLogin/Client';
import AddClient from '../screen/postLogin/AddClient';
import AddCase1 from '../screen/postLogin/AddCase1';
import AddCase2 from '../screen/postLogin/AddCase2';
import ClientAddBasicDetail from '../screen/postLogin/ClientAddBasicDetail';
import CaseDocument from '../screen/postLogin/CaseDocument';
import ClientDocument from '../screen/postLogin/ClientDocument';
import Cases from '../screen/postLogin/Cases';
import ClientInvoice from '../screen/postLogin/ClientInvoice';
import CaseDetails from '../screen/postLogin/CaseDetails';
import AddNote from '../screen/postLogin/AddNote';
import AddHearing from '../screen/postLogin/AddHearing';
import MemberList from '../screen/postLogin/MemberList';
import AddMember from '../screen/postLogin/AddMember';
import {COLORS} from '../utils/Theme';
import FeedDetails from '../screen/feed/FeedDetails';
import DisplayBoard from '../screen/others/DisplayBoard';
import Calender from '../screen/postLogin/Calender';
import Enquiry from '../screen/postLogin/Enquiry';
import AddRequest from '../screen/postLogin/AddRequest';
import Subscription from '../screen/postLogin/Subscription';
import Judgement from '../screen/postLogin/Judgement';
import DraftList from '../screen/postLogin/DraftList';
import DraftListWithLanguage from '../screen/postLogin/DraftListWithLanguage';

const Stack = createStackNavigator();

const Navigation = () => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }

  return (
    <NavigationContainer theme={{colors: {background: COLORS.WhiteBg}}}>
      {AuthReducer.isFlag ? (
        <Splash />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {AuthReducer?.authToken == null ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="EnterOTP" component={EnterOTP} />
            </>
          ) : isEmpty(PostReducer?.profileData?.name) ? (
            <>
              <Stack.Screen
                name="BasicInformation"
                component={BasicInformation}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="TabBottomNavigation"
                component={TabBottomNavigation}
              />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="AboutMe" component={AboutMe} />
              <Stack.Screen
                name="ProfessionalDetails"
                component={ProfessionalDetails}
              />
              <Stack.Screen name="ProfileImage" component={ProfileImage} />
              <Stack.Screen name="MyAddress" component={MyAddress} />
              <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformation}
              />
              <Stack.Screen name="Client" component={Client} />
              <Stack.Screen name="AddClient" component={AddClient} />
              <Stack.Screen name="AddCase1" component={AddCase1} />
              <Stack.Screen name="AddCase2" component={AddCase2} />
              <Stack.Screen
                name="ClientAddBasicDetail"
                component={ClientAddBasicDetail}
              />
              <Stack.Screen name="CaseDocument" component={CaseDocument} />
              <Stack.Screen name="ClientDocument" component={ClientDocument} />
              <Stack.Screen name="ClientInvoice" component={ClientInvoice} />
              <Stack.Screen name="Cases" component={Cases} />
              <Stack.Screen name="CaseDetails" component={CaseDetails} />
              <Stack.Screen name="AddNote" component={AddNote} />
              <Stack.Screen name="AddHearing" component={AddHearing} />
              <Stack.Screen name="AddMember" component={AddMember} />
              <Stack.Screen name="feeddetails" component={FeedDetails} />
              <Stack.Screen name="displayboard" component={DisplayBoard} />
              <Stack.Screen name="Calender" component={Calender} />
              <Stack.Screen name="Enquiry" component={Enquiry} />
              <Stack.Screen name="AddRequest" component={AddRequest} />
              <Stack.Screen name="Subscription" component={Subscription} />
              <Stack.Screen name="Judgement" component={Judgement} />
              <Stack.Screen name="DraftList" component={DraftList} />
              <Stack.Screen
                name="DraftListWithLanguage"
                component={DraftListWithLanguage}
              />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;

{
  /*  */
}
