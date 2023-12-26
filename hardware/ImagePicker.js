import { View, Text, Button, Alert,Image } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

export default function ImagePicker({onPress}) {
    const[resImage,setImage]=useState()
    const [cameraPermissionInformation, requestPermission] =
      useCameraPermissions();
  async function verifyPermissions() {
    
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Permissions Denied, Go Back");
      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image.assets[0].uri);
    setImage(image.assets[0].uri)
    onPress(image.assets[0].uri)
  }
  return (
    <View>
      <Button onPress={takeImageHandler} title="Button" />
      <Image style={{height: 50,width: 50,}}source={{uri:resImage}}/>
    </View>
  );
}
