import { View, StatusBarStyle, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];
const Statusbar = (props) => {
  
  return (
    <StatusBar
    animated={true}
    backgroundColor={props.color}
    barStyle={'default'}
    showHideTransition={'fade'}
    hidden={false}
  />
  )
}

export default Statusbar

const styles = StyleSheet.create({
  
    primary:{
       backgroundColor:'#000',
       paddingHorizontal:10,
       paddingVertical:15,
       borderRadius:10,  
       borderWidth:1,
       borderColor:'#EDCF60',
       width:'100%'
    },
    primary_label:{
        color:'#EDCF60',
        fontSize:16,
        textAlign:'center',
        fontWeight:'600',
        textTransform:'uppercase'
    },
    secondary:{
        backgroundColor:'#DEA845',
        paddingHorizontal:10,
        paddingVertical:15,
        borderRadius:10,  
        borderWidth:1,
        borderColor:'#000'
     },
    secondary_label:{
         color:'#000',
         fontSize:16,
         textAlign:'center',
         fontWeight:'600',
         textTransform:'uppercase'
     },
  });