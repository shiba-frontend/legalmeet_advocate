
import React from 'react'
import { COLORS, IMAGE } from '../../utils/Theme'
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
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/normalize';


const SubscriptionAlert = ({navigation}) => {
  return (
    <View style={{flex:1}}>
         <MyStatusBar barStyle={'light-content'} backgroundColor={COLORS.themeColor} />
        <View style={{backgroundColor:COLORS.themeColor,flex:2}}>
        <TouchableOpacity 
        style={{
            position: 'absolute',
            top:normalize(15),
            right:normalize(15),
            zIndex:1000
          }}
        onPress={()=>navigation.navigate("TabBottomNavigation")}
        >
                <Image
                  source={IMAGE?.remove}
                  style={{
                    width:normalize(30),
                    height:normalize(30),
                  }}
                  resizeMode="contain"
         
                />
                </TouchableOpacity>
        <Image
                  source={IMAGE?.employee_benefits}
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 1.5,
                  }}
                  resizeMode="contain"
                />
              
        </View>
        <View style={{backgroundColor:'#fff', flex:2, padding:normalize(20)}}>
        <Text style={{
            color:COLORS.themeColor,
            fontSize:normalize(18),
            textAlign: 'center',
            fontWeight:'700'
        }}>Good news! There's still time to renew and it's as easy as ever with these options</Text>
        <Text style={{
            color:COLORS.themeColor,
            fontSize:normalize(13),
            textAlign: 'center',
            fontWeight:'500',
            marginVertical:normalize(30)
        }}>Special offer only for you</Text>
        <TouchableOpacity style={{
            backgroundColor:COLORS.themeColor,
            paddingHorizontal:normalize(10),
            paddingVertical:normalize(12),
            borderRadius:normalize(20)
        }}
        onPress={() =>navigation.navigate("Appointment")}
        >
            <Text
            style={{
                color:COLORS.secondarColor,
                fontSize:normalize(15),
                textAlign: 'center',
                fontWeight:'500',
            }}
            >Upgrade Now</Text>
        </TouchableOpacity>
     
        </View>
    
    </View>
  )
}

export default SubscriptionAlert