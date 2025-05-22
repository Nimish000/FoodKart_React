import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function ItemContainerData({_id,url,name,price,description}) {
    const { width, height } = Dimensions.get("window");
  console.log(_id,url,name)
 
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
  const img=`http://192.168.1.9:5000/${url.replace(/\\/g, '/')}`

  return (
    <TouchableOpacity  style={{height: w(40),width: w(40),marginBottom:w(2),marginHorizontal:w(5),marginTop:h(1),overflow:'hidden',borderWidth:0}}>
      <Image source={{uri:img}} style={{width: "100%",height: "70%",borderRadius:w(1)}}/>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:w(5)}}>

      
      <Text style={{color:'white',alignSelf:'center',fontSize:dynamicFontSize*1}}>{name}</Text>
      <Text style={{color:'white',alignSelf:'center',fontSize:dynamicFontSize*1}}>{price}</Text>
      </View>
    </TouchableOpacity>
  )
}