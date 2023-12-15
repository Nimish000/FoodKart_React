import { View, Text, Image, ScrollView, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colorss } from "../Colors/Colors";

export default function LoginScreen({navigation}) {
  const[isLoadMore,setLoadMore]=useState(false)
  function loadmoreHandler(){
    setLoadMore(!isLoadMore)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View style={{  alignItems: "center", }}>
          <Image
            style={{ height: 180, width: 250,resizeMode:'cover', marginTop: "20%" }}
            source={require("../assets/drawables/logo.png")}
          />
        </View>
        <View >
        <Pressable style={({pressed})=>[pressed&&styles.pressed,styles.pressable]}
         
        >
          <View  style={{flexDirection:'row'}}>

          <Image source={require('../assets/drawables/google.png')} style={{height: 35,width: 35,resizeMode:'contain'}}/>
          <View style={{justifyContent:'center',flexDirection:'row',flex:1}}>

          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 22,
              fontWeight: "400",
              
            }}
            >
            Sign In with Google
          </Text>
            </View>

              </View>
        </Pressable >
          {!isLoadMore&&<TouchableOpacity onPress={loadmoreHandler}>

        <Text style={{color:'white',fontSize:20,alignSelf:'center',marginTop:10,marginBottom:10}}>Load More..</Text>
          </TouchableOpacity>}

          {isLoadMore&&<View>
          <Pressable onPress={()=>navigation.navigate('BottomTabs')} style={({pressed})=>[pressed&&styles.pressed,styles.pressable]}
         
         >
           <View  style={{flexDirection:'row'}}>
 
           <Image source={require('../assets/drawables/mail.png')} style={{height: 35,width: 35,resizeMode:'contain'}}/>
           <View style={{justifyContent:'center',flexDirection:'row',flex:1}}>
 
           <Text
             style={{
               color: "white",
               alignSelf: "center",
               fontSize: 22,
               fontWeight: "400",
               
             }}
             >
             Sign In with Email
           </Text>
             </View>
 
               </View>
         </Pressable >
         <Pressable  style={({pressed})=>[pressed&&styles.pressed,styles.pressable]}
         
        >
          <View  style={{flexDirection:'row'}}>

          <Image source={require('../assets/drawables/phone.png')} style={{height: 35,width: 35,resizeMode:'contain'}}/>
          <View style={{justifyContent:'center',flexDirection:'row',flex:1}}>

          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 22,
              fontWeight: "400",
              
            }}
            >
            Sign In with Mobile
          </Text>
            </View>

              </View>
        </Pressable >
        
          </View>}
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
