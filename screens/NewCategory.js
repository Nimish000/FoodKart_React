import { View, Text, Dimensions, Image, TouchableWithoutFeedback, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useCameraPermissions, useMediaLibraryPermissions, launchCameraAsync, launchImageLibraryAsync, PermissionStatus } from 'expo-image-picker';
import { Colorss } from '../Colors/Colors';
import { EndPoints } from '../Utils/Service/Endpoint';
import { Service } from '../Utils/Service/Service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function NewCategory({ navigation }) {
  const [resImage, setImage] = useState();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

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
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
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
      setImage(image.assets[0].uri);
    } else {
      image = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      setImage(image.assets[0].uri);
    }
  }

  async function submitHandler() {
    const formData = new FormData();
    formData.append('name', name);

    formData.append('url', {
      uri: resImage,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      Service.postFormDataFetch(
        EndPoints.upload_categories,
        formData,
        (res) => {
          console.log(res);
          if (res.result_flag === 1) {
            alert('Item uploaded successfully');
          } else {
            alert('Failed to upload item');
          }
        },
        (err) => {
          console.log("###", err);
        }
      );
    } catch (error) {
      console.error('Error uploading item:', error);
      alert('Error uploading item');
    }
  }

  const { width, height } = Dimensions.get("window");

  const scaleFactor = width / 375; 
  const baseFontSize = 16;
  const dynamicFontSize = baseFontSize * scaleFactor;

  function w(value) {
    const width = Dimensions.get("window").width / 100;
    return width * value;
  }

  function h(value) {
    const height = Dimensions.get("window").height / 100;
    return height * value;
  }

  return (
    <KeyboardAwareScrollView backgroundColor={'black'} style={{ paddingTop: h(4.5), flex: 1 }}>
      <View style={{ height: h(4), backgroundColor: 'black', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
          <Image source={require('../assets/drawables/back.png')} style={{ height: '50%', width: w(15), resizeMode: 'contain', position: 'absolute', zIndex: 1 }} />
        </TouchableWithoutFeedback>
        <Text style={{ fontSize: dynamicFontSize, color: Colorss.white, flex: 1, textAlign: 'center' }}>Add New Category</Text>
      </View>
      <View style={{ backgroundColor: Colorss.white, flex: 1,height:h(96),paddingTop:h(10) }}>
        <View style={{ backgroundColor: '#49D5882D', marginHorizontal: w(5), padding: w(5), borderRadius: w(5), justifyContent: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: dynamicFontSize * 0.9, paddingStart: w(1) }}>Name</Text>
            <TextInput
              placeholder='Enter Name Here...'
              style={{ backgroundColor: Colorss.white, borderRadius: w(5), padding: w(1.9), marginTop: h(0.5) }}
              value={name}
              onChangeText={setName}
            />
          </View>
          {/* <View style={{ flexDirection: 'column', marginTop: h(2) }}>
            <Text style={{ fontSize: dynamicFontSize * 0.9, paddingStart: w(1) }}>Price</Text>
            <TextInput
              placeholder='Enter Price Here...'
              keyboardType='numeric'
              style={{ backgroundColor: Colorss.white, borderRadius: w(5), padding: w(1.9), marginTop: h(0.5) }}
              value={price}
              onChangeText={setPrice}
            />
          </View>
          <View style={{ flexDirection: 'column', marginTop: h(2) }}>
            <Text style={{ fontSize: dynamicFontSize * 0.9, paddingStart: w(1) }}>Description</Text>
            <TextInput
              placeholder='Enter Description Here...'
              style={{ backgroundColor: Colorss.white, borderRadius: w(5), padding: w(1.9), marginTop: h(0.5) }}
              value={description}
              onChangeText={setDescription}
            />
          </View> */}
          <View style={{ flexDirection: 'column', marginTop: h(2) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: dynamicFontSize * 0.9, paddingStart: w(1) }}>Upload Image</Text>
              <View style={{ paddingStart: w(3), paddingEnd: w(3) }}>
                <Button onPress={() => takeImageHandler()} title='Take Image' />
              </View>
              <Button onPress={() => takeImageHandler(false)} title='Upload Image ' />
            </View>
            <View style={{ backgroundColor: Colorss.white, borderRadius: w(5), padding: w(1.9), marginTop: h(0.5), alignItems: 'center' }}>
              {resImage && <Image source={{ uri: resImage }} style={{ width: '90%', height: h(20), borderRadius: w(5), resizeMode: 'contain' }} />}
              {!resImage && <Text>Upload Image</Text>}
            </View>
          </View>
          <Button title='Upload' onPress={submitHandler} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
