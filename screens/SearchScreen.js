import { View, Text, Dimensions, Image, TextInput, TouchableWithoutFeedback, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SvgXml } from 'react-native-svg';
import { Colorss } from '../Colors/Colors';
import Captcha from '../Utils/Captcha';
import {AppUtil, AppUtils, dynamicFontSize} from "../Utils/AppUtils"
import { Ionicons } from '@expo/vector-icons';
import Categories from '../components/Categories';
import SearchRestaurants from '../components/Search/SearchRestaurants';

export default function SearchScreen({navigation}) {
 
const[isVisible,setVisible]=useState()

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
    
    <View style={{flex:1,backgroundColor:Colorss.black,paddingTop:h(4.5)}}>
      <ImageBackground source={require('../assets/drawables/Pattern.png')} style={{flex: 1,
    resizeMode: 'contain', // or 'stretch' as needed
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',}}/>
{/* header (search& back) */}
<View style={{
  marginTop:AppUtil.getHP(2),flexDirection:'row',justifyContent:'space-between'
}}>
  <Text style={{color:Colorss.white,fontSize:dynamicFontSize*2.4,fontWeight:'800',width:AppUtil.getWP(60),marginStart:AppUtil.getWP(7)}}>
    Find Your Favourite Food
  </Text>
  <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}>


<Image source={require('../assets/drawables/back.png')} style={{width:w(5),resizeMode:'contain',marginStart:w(1),marginEnd:AppUtil.getWP(10)}}/>
</TouchableWithoutFeedback>
</View>

<TouchableWithoutFeedback  onPress={()=>navigation.navigate('SearchRestaurants')}>
  <View style={styles.container}>

      <Ionicons name="search" size={24} color="#757575" style={styles.icon} />
      <Text
        
      
        style={styles.textInput}
        
      >
        Search For Food
      </Text>
    </View>
    </TouchableWithoutFeedback>
    <View style={styles.viewContainer}>
    

    <Text style={{color:Colorss.white,fontSize:dynamicFontSize}}>
        Cousine
      </Text>
      

      <View style={{flexDirection:'row',padding:AppUtil.getWP(3)}}>
      <Categories data={"North Indian"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'North Indian'})}/>
    <Categories data={"Chinese"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'Chinese'})}/>
    <Categories data={"Italian"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'Italian'})}/>

      </View>
    </View>

    <View style={styles.viewContainer}>
    

    <Text style={{color:Colorss.white,fontSize:dynamicFontSize}}>
        Type
      </Text>
      

      <View style={{flexDirection:'row',padding:AppUtil.getWP(3)}}>
         <Categories data={"Starters"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'Starters'})}/>
    <Categories data={"Main Course"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'Main Course'})}/>
    <Categories data={"Soup"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'Soups'})}/>
    <Categories data={"Desert"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'Desert'})}/>



      </View>
    </View>

    <View style={styles.viewContainer}>
    

    <Text style={{color:Colorss.white,fontSize:dynamicFontSize}}>
        Dishes
      </Text>
      

      <View style={{flexDirection:'row',padding:AppUtil.getWP(3)}}>
          <Categories data={"Malai Chaap"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'Malai Chaap'})}/>
    <Categories data={"Shahi Paneer"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'Shahi Paneer'})}/>
    <Categories data={"Dal Makhani"} onPress={()=>navigation.navigate('SearchRestaurants',{value:'Dal Makhani'})}/>
    

    


      </View>
    </View>


    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    padding: AppUtil.getWP(3), // Adjust as needed

    paddingVertical: AppUtil.getHP(2), // Adjust as needed
    flexDirection: 'row',
    backgroundColor: Colorss.grey, // Adjust as needed
    borderRadius: AppUtil.getWP(3)
    ,backgroundColor: Colorss.grey, // Adjust as needed
    marginTop:AppUtil.getHP(2)
    
  },
  icon: {
    marginRight: AppUtil.getWP(1), // Adjust as 
    
  },
  textInput: {
    flex: 1,
   color:Colorss.lightGrey,
    marginHorizontal: AppUtil.getWP(5), // Adjust as needed
     // Adjust as needed
    fontSize: dynamicFontSize, // Adjust as needed
  },
  viewContainer:{
    marginTop:AppUtil.getHP(2),
    marginStart:AppUtil.getWP(2)
  }
});