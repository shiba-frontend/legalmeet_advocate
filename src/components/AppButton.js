import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const AppButton = (props) => {
 function isEmpty(item){
  if(item == null || item == '' || item == undefined) return true;
  return false;
 }
  return (
    <TouchableOpacity onPress={props.onPress} style={[props.buttonStyle,{flexDirection:'row', justifyContent:'center'}]}>
        <Text style={[props.textStyle, {textAlign:'center'}]}>{props.name}</Text>
        {!isEmpty(props.icon)?
        <Image source={props.icon} style={{height: 20, width: 20, position:'absolute', right: 20}} resizeMode='contain' />:null}
    </TouchableOpacity>
  )
}

export default AppButton

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