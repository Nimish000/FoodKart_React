import { View, Text, Image, TextInput, ScrollView, TouchableWithoutFeedback, ImageBackground } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { SvgXml } from 'react-native-svg';
import { Colorss } from "../Colors/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewPager from "../components/ViewPager";
// import FontSize from '../Utils/FontSize';

// const width = Dimensions.get('window').width / 100;  // now width is 1% of screen width
// const height = Dimensions.get('window').height / 100;  // now height is 1% of screen height

export default function HomeScreen({navigation}) {
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
    return width*value
  }
  function h(value) {
    const height = Dimensions.get("window").height / 100; // now height is 1% of screen height
    return height*value
  }
 

  return (
    <SafeAreaView style={{backgroundColor:'black',flex:1}}>

          <View style={{height: h(6),backgroundColor:Colorss.black,flexDirection:'row' ,justifyContent:'center'}}>
            <TouchableWithoutFeedback onPress={ ()=>{ navigation.openDrawer()}  }>

          <Image source={require('../assets/drawables/logo.png')} style={{ position: 'absolute', top: 0, left: 0 ,height:"100%",width: w(20),resizeMode:'contain',alignSelf:'flex-start'}}/>

            </TouchableWithoutFeedback>

            <Image source={require('../assets/drawables/gif2.gif')} style={{width: w(40),padding:'auto',height: "100%",alignSelf:'center',resizeMode:'cover'}}/>
              
              

          </View>
    <ScrollView style={{flex:1,backgroundColor:'white'}}>
          <ImageBackground source={require('../assets/drawables/bgHome.jpg') } style={{height: h(94) }  } resizeMode="cover">

          <View style={{height: h(20),marginTop:h(1.5),backgroundColor:'green',marginHorizontal:w(1.5),borderRadius:h(2),overflow:'hidden'}}>
          <ViewPager/>
          </View>
          
          </ImageBackground>

    </ScrollView>
    </SafeAreaView>

  )
}
