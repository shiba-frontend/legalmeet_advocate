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
import CaseDetails from '../screen/postLogin/CaseDetails111';
import AddNote from '../screen/postLogin/AddNote';
import AddHearing from '../screen/postLogin/AddHearing';
import MemberList from '../screen/postLogin/MemberList';
import AddMember from '../screen/postLogin/AddMember';
import {COLORS} from '../utils/Theme';
import FeedDetails from '../screen/feed/FeedDetails';
import DisplayBoard from '../screen/others/DisplayBoard';
import AllHearing from '../screen/postLogin/AllHearing';
import ResendOTP from '../screen/auth/ResendOTP';
import Bills from '../screen/postLogin/Bills';
import TalkAdvocate from '../screen/postLogin/TalkAdvocate';
import CallRequest from '../screen/postLogin/CallRequest';
import Service from '../screen/postLogin/Service';
import ServiceDetails from '../screen/postLogin/ServiceDetails';
import Appointment from '../screen/postLogin/Appointment';
import AdvocateListing from '../screen/postLogin/AdvocateListing';
import CasesDetails from '../screen/postLogin/CaseDetails111';
import {navigationRef} from '../utils/helpers/RootNavigation';
import ServiceRequest from '../screen/postLogin/ServiceRequest';
import HelpCenter from '../screen/postLogin/HelpCenter';
import Report from '../screen/postLogin/Report';
import AdvocateDetail from '../screen/postLogin/AdvocateDetail';
import EnqueryDetail from '../screen/postLogin/EnqueryDetail';
import CMSPage from '../screen/postLogin/CMSPage';
import Welcome from '../screen/auth/Welcome';
import NotificationList from '../screen/postLogin/Notification';
import {favouriteListFailure} from '../redux/reducer/PostReducer';
import FavouriteList from '../screen/postLogin/FavouriteList';
import MyServiceDetails from '../screen/postLogin/MyServiceDetails';
import AddServiceDocument from '../screen/postLogin/AddServiceDocument';
import OrderDetails from '../screen/postLogin/OrderDetails';
import Feed from '../screen/feed/Feed';
import Ebook from '../screen/postLogin/Ebook';
import Judgement from '../screen/postLogin/Judgement';
import DraftListWithLanguage from '../screen/postLogin/DraftListWithLanguage';
import DraftList from '../screen/postLogin/DraftList';
import Calender from '../screen/postLogin/Calender';
import Enquiry from '../screen/postLogin/Enquiry';
import EnqueryList from '../screen/postLogin/EnqueryList';
import Message from '../screen/postLogin/Message';
import BankDetails from '../screen/postLogin/profile/BankDetails';
import Invoice from '../screen/postLogin/Invoice';
import GenerateInvoice from '../screen/postLogin/GenerateInvoice';
import EbookCategory from '../screen/postLogin/EbookCategory';
import CaseHearingDocumentAdd from '../screen/postLogin/CaseHearingDocumentAdd';
import JudgementDetail from '../screen/postLogin/JudgementDetail';
import RequestList from '../screen/postLogin/RequestList';
import AddRequest from '../screen/postLogin/AddRequest';
import SubscriptionAlert from '../screen/others/SubscriptionAlert';
import CaseHearingNoteAdd from '../screen/postLogin/CaseHearingNoteAdd';
import CauseList from '../screen/postLogin/CauseList';
import AllTodayCase from '../screen/postLogin/AllTodayCase';
import AssignedEnqueryList from '../screen/postLogin/AssignedEnqueryList';
const Stack = createStackNavigator();

const Navigation = () => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const PostReducer = useSelector(state => state.PostReducer);
  function isEmpty(item) {
    if (item == '' || item == null || item == undefined) return true;
    return false;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{colors: {background: COLORS.WhiteBg}}}>
      {AuthReducer.isFlag ? (
        <Splash />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {AuthReducer?.authToken == null ? (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="EnterOTP" component={EnterOTP} />
              <Stack.Screen name="ResendOTP" component={ResendOTP} />
              <Stack.Screen name="CMSPage" component={CMSPage} />
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
              <Stack.Screen
                name="NotificationList"
                component={NotificationList}
              />
              <Stack.Screen
                name="AdvocateListing"
                component={AdvocateListing}
              />
              <Stack.Screen name="AboutMe" component={AboutMe} />
              <Stack.Screen
                name="ProfessionalDetails"
                component={ProfessionalDetails}
              />
              <Stack.Screen name="FavouriteList" component={FavouriteList} />
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
              <Stack.Screen name="MemberList" component={MemberList} />
              <Stack.Screen name="ServiceRequest" component={ServiceRequest} />
              <Stack.Screen name="HelpCenter" component={HelpCenter} />
              <Stack.Screen name="Report" component={Report} />
              <Stack.Screen name="AdvocateDetail" component={AdvocateDetail} />
              <Stack.Screen name="CaseDocument" component={CaseDocument} />
              <Stack.Screen name="CasesDetails" component={CasesDetails} />
              <Stack.Screen name="ClientDocument" component={ClientDocument} />
              <Stack.Screen name="ClientInvoice" component={ClientInvoice} />
              <Stack.Screen name="Cases" component={Cases} />
              <Stack.Screen name="CaseDetails" component={CaseDetails} />
              <Stack.Screen name="AddNote" component={AddNote} />
              <Stack.Screen name="AddHearing" component={AddHearing} />
              <Stack.Screen name="AddMember" component={AddMember} />
              <Stack.Screen name="feeddetails" component={FeedDetails} />
              <Stack.Screen name="displayboard" component={DisplayBoard} />
              <Stack.Screen name="AllHearing" component={AllHearing} />
              <Stack.Screen name="Bills" component={Bills} />
              <Stack.Screen name="orderDetails" component={OrderDetails} />
              <Stack.Screen name="Appointment" component={Appointment} />
              <Stack.Screen name="TalkAdvocate" component={TalkAdvocate} />
              <Stack.Screen name="CallRequest" component={CallRequest} />
              <Stack.Screen name="Service" component={Service} />
              <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
              <Stack.Screen name="Judgement" component={Judgement} />
              <Stack.Screen name="DraftList" component={DraftList} />
              <Stack.Screen name="Calender" component={Calender} />
              <Stack.Screen name="Enquiry" component={Enquiry} />
              <Stack.Screen name="EnqueryList" component={EnqueryList} />
              <Stack.Screen name="RequestList" component={RequestList} />
              <Stack.Screen name="AddRequest" component={AddRequest} />
              <Stack.Screen name="asignedenquery" component={AssignedEnqueryList} />
              <Stack.Screen
                name="DraftListWithLanguage"
                component={DraftListWithLanguage}
              />
              <Stack.Screen
                name="MyServiceDetails"
                component={MyServiceDetails}
              />
              <Stack.Screen
                name="addDocumentService"
                component={AddServiceDocument}
              />
              <Stack.Screen name="EnqueryDetail" component={EnqueryDetail} />
              <Stack.Screen name="CMSPage" component={CMSPage} />
              <Stack.Screen name="Feed" component={Feed} />
              <Stack.Screen name="Ebook" component={Ebook} />
              <Stack.Screen name="Ebook-category" component={EbookCategory} />
              <Stack.Screen name="Message" component={Message} />

              <Stack.Screen name="BankDetails" component={BankDetails} />
              <Stack.Screen
                name="GenerateInvoice"
                component={GenerateInvoice}
              />
              <Stack.Screen name="Invoice" component={Invoice} />
              <Stack.Screen
                name="CaseHearingDocumentAdd"
                component={CaseHearingDocumentAdd}
              />
              <Stack.Screen
                name="JudgementDetail"
                component={JudgementDetail}
              />
              <Stack.Screen name="expire" component={SubscriptionAlert} />
              <Stack.Screen
                name="CaseHearingNoteAdd"
                component={CaseHearingNoteAdd}
              />
              <Stack.Screen
                name="CauseList"
                component={CauseList}
              />
               <Stack.Screen
                name="AlltodayCase"
                component={AllTodayCase}
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
