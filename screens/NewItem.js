import { View, Text, Dimensions, Image, TouchableWithoutFeedback, TextInput, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colorss } from '../Colors/Colors';
import SvgSelector from '../Utils/SvgSelector';
import { PermissionStatus, launchCameraAsync, launchImageLibraryAsync, useCameraPermissions,useMediaLibraryPermissions } from 'expo-image-picker';


export default function NewItem({navigation}) {
  const[resImage,setImage]=useState()
  const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions();
const [mediaLibraryPermissionInformation, requestMediaLibraryPermission] = useMediaLibraryPermissions();

async function verifyPermissions() {
  const cameraPermissionGranted = await handlePermission(cameraPermissionInformation, requestCameraPermission, 'Camera');
  const mediaLibraryPermissionGranted = await handlePermission(
    mediaLibraryPermissionInformation,
    requestMediaLibraryPermission,
    'Media Library'
  );

  return cameraPermissionGranted && mediaLibraryPermissionGranted;
}

async function handlePermission(permissionInformation, requestPermission, permissionType) {
  if (permissionInformation.status === PermissionStatus.UNDETERMINED) {
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  if (permissionInformation.status === PermissionStatus.DENIED) {
    Alert.alert(`Permissions Denied for ${permissionType}`, `Please enable ${permissionType.toLowerCase()} permission in your device settings.`);
    return false;
  }

  return true;
}

async function takeImageHandler(useCamera = true) {
  const hasPermission = await verifyPermissions();

  if (!hasPermission) {
    return;
  }

  let image;

  if (useCamera) {
    image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(image.assets[0].uri)
  } else {
    image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(image.assets[0].uri)
  }}
  
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
    <>
    
    <View backgroundColor={'black'} style={{paddingTop:h(4.5),flex:1}}   >
      
        <View style={{height: h(4),backgroundColor:'black',flexDirection:'row',alignItems:'center'}}>
            <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}>
            <Image source={require('../assets/drawables/back.png')} style={{height:'50%', width:w(15),resizeMode:'contain', position:'absolute',zIndex:1}}/>
            </TouchableWithoutFeedback>
<Text style={{fontSize:dynamicFontSize,color:Colorss.white,flex:1,textAlign:'center'}}>Add New Item</Text>
        </View>
        <View style={{backgroundColor:Colorss.white,flex:1,justifyContent:'center'}}>
        <View style={{backgroundColor:'#49D5882D',marginHorizontal:w(5),padding:w(5),borderRadius:w(5),justifyContent:'center'}}>
            <View style={{flexDirection:'column'}}>

        <Text style={{fontSize:dynamicFontSize*0.9,paddingStart:w(1)}}>Name</Text>
        <TextInput placeholder='Enter Name Here...' style={{backgroundColor:Colorss.white,borderRadius:w(5),padding:w(1.9),marginTop:h(0.5)}}/>

            </View>
            <View style={{flexDirection:'column',marginTop:h(2)}}>

        <Text style={{fontSize:dynamicFontSize*0.9,paddingStart:w(1)}}>Price</Text>
        <TextInput placeholder='Enter Price Here...' keyboardType='numeric' style={{backgroundColor:Colorss.white,borderRadius:w(5),padding:w(1.9),marginTop:h(0.5)}}/>

            </View>
            <View style={{flexDirection:'column',marginTop:h(2)}}>

        <Text style={{fontSize:dynamicFontSize*0.9,paddingStart:w(1)}}>Description</Text>
        <TextInput placeholder='Enter Description Here...' style={{backgroundColor:Colorss.white,borderRadius:w(5),padding:w(1.9),marginTop:h(0.5)}}/>

            </View>
            <View style={{flexDirection:'column',marginTop:h(2)}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text style={{fontSize:dynamicFontSize*0.9,paddingStart:w(1)}}>Upload Image</Text>
     <View style={{paddingStart:w(3),paddingEnd:w(3)}}>

       <Button onPress={()=>takeImageHandler()} title='Take Image' />
     </View>
       <Button onPress={()=>takeImageHandler(false)} title='Upload Image ' />
        </View>
        <View style={{backgroundColor:Colorss.white,borderRadius:w(5),padding:w(1.9),marginTop:h(0.5),alignItems:'center'}}>
            
        {resImage&&<Image source={{uri:resImage}} style={{width:'90%',height:h(20),borderRadius:w(5),resizeMode:'contain'}}/>}
        {!resImage&&<Text>Upload Image</Text>}
        </View>
            </View>

        </View>

      </View>
    </View>
    </>
  )
}