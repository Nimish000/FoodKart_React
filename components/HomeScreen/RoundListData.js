import { View, Text, Dimensions, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colorss } from '../../Colors/Colors';
import { _baseURL, AppUtil } from '../../Utils/AppUtils';
import { useNavigation } from '@react-navigation/native';

export default function RoundListData({id,url,name}) {

  const navigation=useNavigation()

  const { width, height } = Dimensions.get("window");
  console.log(id,url,name)
 
  // Calculate a scaling factor based on the screen width
  const scaleFactor = width / 375; // Adjust 375 based on your design reference width

  // Define the base font size for your design
  const baseFontSize = 16;

  // Calculate the dynamic font size
  const dynamicFontSize = baseFontSize * scaleFactor;
  // const fontSize=FontSize font={16}
  function w(value) {
    const width = Dimensions.get("window").width / 100; // now width is 1% of screen width
    return width * value;
  }
  function h(value) {
    const height = Dimensions.get("window").height / 100; // now height is 1% of screen height
    return height * value;
  }
  
  const img=`${_baseURL}${url.replace(/\\/g, '/')}`

  console.log("img++> "+ img)
  // const img=`../../${url}`
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('SearchRestaurants',{value:name})}  style={{width: w(18),marginStart:w(4),marginBottom:h(1),overflow:'hidden'}}>
      <Image source={{uri:img}} style={{width:w(17),height: w(17),borderRadius:w(17)}}/>
     
      {/* <Image source={{uri:`${url}`}} style={{width: "100%",height: w(17),borderRadius:w(7)}}/> */}
      <Text style={{color:'white',alignSelf:'center',fontSize:dynamicFontSize*0.6}}>{name}</Text>
    </TouchableOpacity>
  )
}