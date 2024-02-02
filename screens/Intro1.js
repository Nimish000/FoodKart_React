
import { View, Text, Image, ScrollView, Pressable, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colorss } from "../Colors/Colors";
import SvgSelector from "../Utils/SvgSelector";
const { width, height } = Dimensions.get("window");
 

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

export default function Intro1({navigation}) {
    function navigatonHandler(){
        navigation.navigate('Intro2Screen')
    }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, flexDirection:'column' }}
    >
      {/* <View style={{  alignItems: "center" ,height:h(50),position:'absolute', width:w(100),zIndex:-1,top:h(5)}}> */}
      <View style={{  alignItems: "center" ,height:h(50),top:h(5)}}>
        {/* <Image
          style={{ height: 180, width: 250,resizeMode:'cover', marginTop: "20%" }}
          source={require("../assets/drawables/logo.png")}
        /> */}
        <SvgSelector name={"Intro11"}/>
      </View>
      <View style={{  }}>
        <Text style={{color:'white',marginTop:h(10),width:w(60),textAlign:'center',fontSize:dynamicFontSize*1.6,alignSelf:'center',fontWeight:'700'}}>Find your  Comfort Food here</Text>
        <Text style={{color:'white',marginTop:h(5),width:w(70),textAlign:'center',alignSelf:'center',fontWeight:'400'}}>Here You Can find a chef or dish for every taste and color. Enjoy!</Text>
<TouchableOpacity style={{backgroundColor:Colorss.green,width:w(25),height:w(13),justifyContent:'center',borderRadius:w(3),alignSelf:'center',marginTop:h(4)}} onPress={navigatonHandler}>
        <Text style={{color:'white',fontSize:dynamicFontSize,alignSelf:'center',fontWeight:'400'}}>Next</Text>
        </TouchableOpacity>
      </View>
      

    </ScrollView>
  </SafeAreaView>
);
}
const styles=StyleSheet.create({
pressed:{
  opacity:0.75,
  backgroundColor:'#494D47'
},
pressable:{
  borderRadius: 25,
  borderWidth: 2,
  borderColor: Colorss.green,
  marginHorizontal: "19%",
  backgroundColor: "#333131",
  flexDirection: "row",
  padding:10,
  alignItems:'center',
  overflow:'hidden',
  marginTop:15,
  marginBottom:10

}
})
