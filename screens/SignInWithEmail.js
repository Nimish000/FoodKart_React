import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colorss } from "../Colors/Colors.js";
import { Service } from "../Utils/Service/Service.js";
import Endpoint, { EndPoints } from "../Utils/Service/Endpoint.js";
import { UserManager } from "../manager/UserManager.js";
import { AppUtil, dynamicFontSize } from "../Utils/AppUtils.js";
import { Ionicons } from '@expo/vector-icons';
import { validateLogin } from "../Utils/Validations.js";


export default function SignInWithEmail({ navigation }) {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };




 

  const onLoginRequest = () => {
    var formData = new FormData();
    const validationResult = validateLogin(email, password);

    if (validationResult.isValid) {
      // Perform login logic
      console.log('Login successful');
      navigation.navigate('BottomTabs')

    } else {
      // Display validation error message
      Alert.alert('Validation Error', validationResult.errorMessage);
    }

    formData.append("email", email);
    formData.append("password", password);
    // formData.append('device_id', deviceId)

    // Service.postFormDataFetch(
    //   EndPoints.login,
    //   formData,
    //   (res) => {
    //     UserManager.token = res?.data?.token;
    //     // UserManager.name = res?.userDetails?.contact_name;
    //     // UserManager.email = res?.userDetails?.email;
    //     // UserManager.userId = res?.userDetails?.id;
    //     // UserManager.mobile = res?.userDetails?.mobile_number;
    //     // UserManager.userEmail = isEmail;
    //     // UserManager.userPassword = isPassword;
    //     // UserManager.deviceId = deviceId;
    //     console.log(res);
    //     console.log(UserManager.token);
    //     getServicesList();

       
      // ,
      // (err) => {
      //   console.log("###", err);
      // }
    
  };
  const getServicesList = () => {
    var endPoint = EndPoints.getProfile;
    Service.getUsingToken(
      endPoint,
      (res) => {
        console.log("data----->");
      },
      (err) => {}
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: AppUtil.getHP(4.5),
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "" }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              height: 180,
              width: 250,
              resizeMode: "cover",
              marginTop: "20%",
            }}
            source={require("../assets/drawables/logo.png")}
          />
        </View>
        <View style={{marginTop:AppUtil.getHP(8)}}>
        <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#757575"
        style={styles.textInput}
        // secureTextEntry={!showPassword}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity  style={styles.iconContainer}>
        <Ionicons name={'mail'} size={24} color="#757575" />
      </TouchableOpacity>
    </View>
         
           <View style={styles.container}>
      <TextInput
        placeholder="Password"
        placeholderTextColor="#757575"
        style={styles.textInput}
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#757575" />
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={onLoginRequest} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  
  textInput: {
    flex: 1,
    
    fontSize: AppUtil.dynamicFontSize,
    color: Colorss.white,
  },
  container: {
    flex: 1,
    paddingStart: AppUtil.getWP(6),
    marginTop: AppUtil.getHP(2),
    borderWidth: 1,
    marginHorizontal: AppUtil.getWP(4),
    padding: AppUtil.getWP(2),
    backgroundColor: Colorss.grey,
    borderRadius: AppUtil.getWP(5),
    fontSize: AppUtil.dynamicFontSize,
    color: Colorss.white,
    flexDirection:"row"
  },
 
  iconContainer: {
    padding: 8,
  },
  buttonContainer: {
    backgroundColor: Colorss.green, // Change the background color to your preference
    padding: AppUtil.getHP(2),
    marginTop: AppUtil.getHP(13),
    marginHorizontal:AppUtil.getWP(20),
    borderRadius: AppUtil.getHP(2),
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // Change the text color to your preference
    fontSize: dynamicFontSize,
    fontWeight: 'bold',
  },
});
