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
import { Ionicons } from "@expo/vector-icons";
import { validateLogin } from "../Utils/Validations.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Register({ navigation }) {


 const validateRegister = ({ name, email, password, mobile }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;

  if (!name || name.trim().length < 2) {
    return { isValid: false, errorMessage: "Name must be at least 2 characters long." };
  }

  if (!email || !emailRegex.test(email)) {
    return { isValid: false, errorMessage: "Please enter a valid email address." };
  }

  if (!password || password.length < 6) {
    return { isValid: false, errorMessage: "Password must be at least 6 characters long." };
  }

  if (!mobile || !mobileRegex.test(mobile)) {
    return { isValid: false, errorMessage: "Mobile number must be 10 digits." };
  }

  return { isValid: true };
};


  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLoginReq = () => {
    var formData = new FormData();

    const validationResult = validateLogin(email, password);

    if (validationResult.isValid) {
      // Perform login logic
      formData.append("email", email);
      formData.append("password", password);
      // formData.append('device_id', deviceId)

      Service.postFormDataFetch(
        EndPoints.login,
        formData,
        (res) => {
          UserManager.token = res?.data?.token;

          console.log(res);
          console.log(UserManager.token);
          console.log("Login successful");
          Alert.alert("Login Successfully");
          navigation.navigate("BottomTabs");
        },
        (err) => {
          console.log("###", err);
        }
      );
    } else {
      // Display validation error message
      Alert.alert("Validation Error", validationResult.errorMessage);
    }
  };
  const onRegisterRequest = () => {

 const validationResult = validateRegister({ name, email, password, mobile });

  if (!validationResult.isValid) {
    Alert.alert("Validation Error", validationResult.errorMessage);
    return;
  }


    var formData = new FormData();
    formData.append("name", name);

    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "admin");
    formData.append("mobile", mobile);

    // formData.append('device_id', deviceId)

    Service.postFormDataFetch(
      EndPoints.register,
      formData,
      (res) => {
        // UserManager.token = res?.data?.token;
        // UserManager.name = res?.userDetails?.contact_name;
        // UserManager.email = res?.userDetails?.email;
        // UserManager.userId = res?.userDetails?.id;
        // UserManager.mobile = res?.userDetails?.mobile_number;
        // UserManager.userEmail = isEmail;
        // UserManager.userPassword = isPassword;
        // UserManager.deviceId = deviceId;
        console.log(res);
        if (res?.result_flag == 1) {
          Alert.alert(res.message);
                navigation.replace("SignInWithEmail");

        } else {
          Alert.alert(res.message);
        }
        

        // console.log(UserManager.token);
        // getServicesList()

        // navigation.navigate('BottomTabs')
        // res.userEmail = isEmail;
        // res.userPassword = isPassword;
        // res.deviceId = deviceId;

        // AsyncStorage.setItem('@vendor', JSON.stringify(res))

        // navigation.dispatch(StackActions.replace('VenderHomeRoot'));
      },
      (err) => {
        console.log("###", err);
        Alert.alert(err);
      }
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
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "" }}
      >
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
        <View style={{ marginTop: AppUtil.getHP(8) }}>
          {/* name */}
          <View style={styles.container}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#757575"
              style={styles.textInput}
              // secureTextEntry={!showPassword}
              value={name}
              onChangeText={(text) => setName(text.trimStart())}
            />
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name={"person"} size={24} color="#757575" />
            </TouchableOpacity>
          </View>
          {/* email */}
          <View style={styles.container}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#757575"
              style={styles.textInput}
              // secureTextEntry={!showPassword}
              value={email}
              onChangeText={(text) => setEmail(text.trim())}
            />
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name={"mail"} size={24} color="#757575" />
            </TouchableOpacity>
          </View>
          {/* password */}
          <View style={styles.container}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#757575"
              style={styles.textInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconContainer}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#757575"
              />
            </TouchableOpacity>
          </View>
          {/* mobile */}
          <View style={styles.container}>
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#757575"
              style={styles.textInput}
              maxLength={10}
              // secureTextEntry={!showPassword}
              value={mobile}
              onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
            />
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name={"phone-portrait"} size={24} color="#757575" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={onRegisterRequest}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
    flexDirection: "row",
  },

  iconContainer: {
    padding: 8,
  },
  buttonContainer: {
    backgroundColor: Colorss.green, // Change the background color to your preference
    padding: AppUtil.getHP(2),
    marginTop: AppUtil.getHP(8),
    marginHorizontal: AppUtil.getWP(20),
    borderRadius: AppUtil.getHP(2),
    marginBottom: AppUtil.getHP(8),
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff", // Change the text color to your preference
    fontSize: dynamicFontSize,
    fontWeight: "bold",
  },
});
