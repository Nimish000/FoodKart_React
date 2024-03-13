import { View, Text, Image, ScrollView, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colorss } from "../Colors/Colors";
import {Service} from "../Utils/Service/Service.js"
import Endpoint, { EndPoints } from "../Utils/Service/Endpoint.js"
import { UserManager } from "../manager/UserManager.js";
import { AppUtil, dynamicFontSize } from "../Utils/AppUtils.js";

export default function LoginScreen({navigation}) {
  const [isPassword, setPassword] = useState('Nimish@123')
    const [isEmail, setEmail] = useState('nimishsttl@gmail.com')
  const[isLoadMore,setLoadMore]=useState(false)
  function loadmoreHandler(){
    setLoadMore(!isLoadMore)
  }

const onLoginRequest = () => {


      
    
          var formData = new FormData()
          formData.append('email', isEmail)
          formData.append('password', isPassword)
          // formData.append('device_id', deviceId)
    
          Service.postFormDataFetch(EndPoints.login, formData, (res) => {

            UserManager.token = res?.data?.token;
            // UserManager.name = res?.userDetails?.contact_name;
            // UserManager.email = res?.userDetails?.email;
            // UserManager.userId = res?.userDetails?.id;
            // UserManager.mobile = res?.userDetails?.mobile_number;
            // UserManager.userEmail = isEmail;
            // UserManager.userPassword = isPassword;
            // UserManager.deviceId = deviceId;
    console.log(res)
    console.log(UserManager.token)
    getServicesList()

    // navigation.navigate('BottomTabs')
            // res.userEmail = isEmail;
            // res.userPassword = isPassword;
            // res.deviceId = deviceId;
    
            // AsyncStorage.setItem('@vendor', JSON.stringify(res))
    
            // navigation.dispatch(StackActions.replace('VenderHomeRoot'));

          }, (err) => {
            console.log("###", err);
          }
          );
    
        
      }
      const getServicesList = () => {

        var endPoint = EndPoints.getProfile ;
        Service.getUsingToken(endPoint, (res) => {
            console.log("data----->")
        },
            (err) => {
            }
        );
    };




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
        <Pressable onPress={onLoginRequest} style={({pressed})=>[pressed&&styles.pressed,styles.pressable]}
         
        >
          <View  style={{flexDirection:'row'}}>

          <Image source={require('../assets/drawables/google.png')} style={{height: AppUtil.getWP(7),width: AppUtil.getWP(7),resizeMode:'contain'}}/>
          <View style={{justifyContent:'center',flexDirection:'row',flex:1}}>

          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize:  dynamicFontSize*1.2,
              fontWeight: "400",
              
            }}
            >
            Sign In with Google
          </Text>
            </View>

              </View>
        </Pressable >
          {!isLoadMore&&<TouchableOpacity onPress={loadmoreHandler}>

        <Text style={{color:'white',fontSize:dynamicFontSize*1.2,alignSelf:'center',marginTop:AppUtil.getHP(3),marginBottom:AppUtil.getHP(3)}}>Load More..</Text>
          </TouchableOpacity>}

          {isLoadMore&&<View>
          <Pressable onPress={()=>navigation.navigate('SignInWithEmail')} style={({pressed})=>[pressed&&styles.pressed,styles.pressable]}
         
         >
           <View  style={{flexDirection:'row'}}>
 
           <Image source={require('../assets/drawables/mail.png')} style={{height: AppUtil.getWP(7),width: AppUtil.getWP(7),resizeMode:'contain'}}/>
           <View style={{justifyContent:'center',flexDirection:'row',flex:1}}>
 
           <Text
             style={{
               color: "white",
               alignSelf: "center",
               fontSize: dynamicFontSize*1.2,
               fontWeight: "400",
               
             }}
             >
             Sign In with Email
           </Text>
             </View>
 
               </View>
         </Pressable >
         <Pressable onPress={()=>navigation.navigate('SignInWithMobile')} style={({pressed})=>[pressed&&styles.pressed,styles.pressable]}
         
        >
          <View  style={{flexDirection:'row'}}>

          <Image source={require('../assets/drawables/phone.png')} style={{height: AppUtil.getWP(7),width: AppUtil.getWP(7),resizeMode:'contain'}}/>
          <View style={{justifyContent:'center',flexDirection:'row',flex:1}}>

          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize:  dynamicFontSize*1.2,
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
