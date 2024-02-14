import React, { useState } from 'react';
import { Button, Text, TextInput, View, ImageBackground } from 'react-native';
// import { BlurView } from 'react-native-blur';

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Captcha = () => {
  const [captchaText, setCaptchaText] = useState(generateRandomString(6));
  const [userInput, setUserInput] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const regenerateCaptcha = () => {
    setCaptchaText(generateRandomString(6));
    setUserInput('');
    setIsCaptchaValid(false);
  };

  const handleInputChange = (text) => {
    setUserInput(text);
    setIsCaptchaValid(text === captchaText);
  };

  return (
    <ImageBackground
      source={ require('../assets/drawables/banner.png')} // Replace 'your_image_uri_here' with your image URI
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      blurRadius={10} // Adjust the blur radius as needed
    >
      {/* <BlurView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        blurType="light" // Adjust the blur type as needed
        blurAmount={10} // Adjust the blur amount as needed
        reducedTransparencyFallbackColor="white" // Fallback color when transparency is not supported
      > */}
      <ImageBackground source={require('../assets/drawables/scratc.jpg')} style={{height:25,width:100,justifyContent:'center',alignItems:'center'}}>

        <Text style={{ color: '#FFFFFFBE',fontSize:20, }}> {captchaText}</Text>
      </ImageBackground>
        <TextInput
          style={{ color: 'white', borderWidth: 1, borderColor: 'white', padding: 5,width:170 }}
          value={userInput}
          onChangeText={handleInputChange}
        />
        {isCaptchaValid ? <Text style={{ color: 'green' }}>Captcha is valid!</Text> : null}
        <Button onPress={regenerateCaptcha} title='Regenerate' color='#841584' />
      {/* </BlurView> */}
      
    </ImageBackground>
  );
};

export default Captcha;

