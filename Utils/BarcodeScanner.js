import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera';

const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState('');

  useEffect(() => {
    (async () => {
      await requestCameraPermission();
    })();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync(); // Corrected method name
    setHasPermission(status === 'granted');

    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'Please grant camera permission to use the barcode scanner.',
        [{ text: 'OK', onPress: () => requestCameraPermission() }]
      );
    }
  };

  const handleBarcodeScan = ({ data }) => {
    setScanned(true);
    setBarcodeData(data);
    // console.log(barcodeData)
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
      />
      {scanned && (
        <View style={{ position: 'absolute', bottom: 116, left: 16, right: 16, backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <Text style={{ fontSize: 16 }}>Scanned Barcode Data:</Text>
          <Text>{barcodeData}</Text>
        </View>
      )}
    </View>
  );
};

export default BarcodeScanner;
