import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { _baseURL, AppUtil, dynamicFontSize } from "../Utils/AppUtils";
import { Colorss } from "../Colors/Colors";
import SvgSelector from "../Utils/SvgSelector";
import RecentOrderItem from "../components/AccountScreen/RecentOrderItem";
import RecentOrders from "../components/AccountScreen/RecentOrders";
import EditModal from "../components/AccountScreen/EditModal";
import { TextInput } from "react-native-paper";
import { useCameraPermissions, useMediaLibraryPermissions, launchCameraAsync, launchImageLibraryAsync, PermissionStatus } from 'expo-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function ProfileScreen() {
  useEffect(() => {
    if (resImage == "") {
      setImage(`${_baseURL}uploads/1747941919716.jpg`);
    }
  }, [resImage]);

  const [isEditable, setEditable] = useState(false);
  const [name, setName] = useState("Nimish Sharma");
  const [email, setEmail] = useState("nimish@gmail.com");
  const [address, setAddress] = useState("Xyz Building");

  //Camera Code Starts
  const [resImage, setImage] = useState("");
  const [cameraPermissionInformation, requestCameraPermission] =
    useCameraPermissions();
  const [mediaLibraryPermissionInformation, requestMediaLibraryPermission] =
    useMediaLibraryPermissions();

  async function verifyPermissions() {
    const cameraPermissionGranted = await handlePermission(
      cameraPermissionInformation,
      requestCameraPermission,
      "Camera"
    );
    const mediaLibraryPermissionGranted = await handlePermission(
      mediaLibraryPermissionInformation,
      requestMediaLibraryPermission,
      "Media Library"
    );

    return cameraPermissionGranted && mediaLibraryPermissionGranted;
  }
  async function handlePermission(
    permissionInformation,
    requestPermission,
    permissionType
  ) {
    if (permissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (permissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        `Permissions Denied for ${permissionType}`,
        `Please enable ${permissionType.toLowerCase()} permission in your device settings.`
      );
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
      return false;
    }

    return true;
  }

  async function takeImageHandler(useCamera = false) {
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

  return (
    <View style={{ flex: 1, backgroundColor: "#000",paddingTop:AppUtil.getHP(4) }}>
      {/* Background Image */}
      <Image source={{ uri: resImage }} style={styles.backgroundImage} />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          {/* Top Info */}
          <View style={styles.headerSection}>
            <View style={styles.memberTag}>
              <Text style={styles.memberText}>Elite Pass</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text style={styles.userName}>{name}</Text>
              <TouchableOpacity onPress={() => setEditable(!isEditable)}>
                <SvgSelector
                  name={"editP"}
                  fill={Colorss.green}
                  w={AppUtil.getWP(8)}
                  h={AppUtil.getWP(8)}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.userEmail}>{email}</Text>
          </View>

          {/* Voucher */}
          {/* <View style={styles.voucherCard}>
            <Text style={{ color: '#fff' }}>🎁 You Have 3 Voucher</Text>
          </View> */}

          {/* Favorite List (repeatable card) */}
          <RecentOrders />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        visible={isEditable}
        backdropColor={"#0000006F"}
        transparent={true}
      >
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: Colorss.black,
            marginTop: AppUtil.getHP(20),
           
            borderRadius: AppUtil.getWP(5),
            padding: AppUtil.getWP(5),
          }}
        >
          <Text style={styles.Modalheading}>Edit Profile</Text>
          <View
            style={{ backgroundColor: Colorss.lightGrey, height: 1, marginTop: 5 }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: AppUtil.getHP(2),
              paddingHorizontal: AppUtil.getWP(4),
            }}
          >
            {/* Profile Image */}
            <View style={{ marginRight: AppUtil.getWP(4) }}>
              <Image
                style={{
                  width: AppUtil.getWP(22),
                  height: AppUtil.getWP(22),
                  borderRadius: AppUtil.getWP(11),
                  borderWidth: 2,
                  borderColor:Colorss.lightGrey,
                }}
                source={{ uri: resImage }}
              />
            </View>

            {/* Text and Buttons */}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.imageBtn}
                onPress={() => takeImageHandler()}
              >
                <Text style={styles.imageBtnText}>Edit Profile Picture</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextInput
            style={styles.ModalTextInput}
            value={name}
            onChangeText={setName}
            editable={isEditable}
            multiline={false}
            label={"Full Name"}
            mode="outlined"
           
            
            
            activeOutlineColor={Colorss.white}
            textColor={Colorss.white}
          />
          <TextInput
            style={styles.ModalTextInput}
            value={email}
            onChangeText={setEmail}
            editable={false}
            multiline={false}
            label={"Email"}
            mode="outlined"
            activeOutlineColor={Colorss.white}
           textColor={Colorss.white}
          />
          <TextInput
            style={styles.ModalTextInput}
            value={address}
            onChangeText={setAddress}
            editable={true}
            multiline={false}
            label={"Address"}
            mode="outlined"
            activeOutlineColor={Colorss.white}
            textColor={Colorss.white}
          />

          <TouchableOpacity
            onPress={() => setEditable(false)}
            style={{
              backgroundColor: Colorss.red,
              padding: AppUtil.getWP(2),
              borderRadius: AppUtil.getWP(5),
              margin: AppUtil.getHP(3),
            }}
          >
            <Text style={styles.ModalButton}>Update</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: AppUtil.getHP(35),
    marginTop:AppUtil.getHP(4),
    position: "absolute",
  },
  scrollContent: {
    paddingTop: AppUtil.getHP(24), // ensures overlap
  },
  contentContainer: {
    backgroundColor: Colorss.black,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    minHeight: AppUtil.getHP(93), // allows full scroll takeover
  },
  headerSection: {
    marginBottom: 20,
  },
  memberTag: {
    backgroundColor: "#aa8800",
    alignItems: "center",
    marginHorizontal: AppUtil.getWP(25),
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  memberText: {
    color: "#000",
    fontWeight: "bold",
  },
  userName: {
    flex: 1,
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  userEmail: {
    textAlign: "left",
    color: "#aaa",
    fontSize: 14,
    marginTop: 4,
  },
  voucherCard: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  Modalheading: {
    fontSize: dynamicFontSize * 1.4,
    textAlign: "center",
    fontWeight: 700,
    color:Colorss.white
  },
  ModalButton: {
    fontSize: dynamicFontSize * 1.2,
    textAlign: "center",
    color:Colorss.white
  },
  ModalTextInput: {
    fontSize: dynamicFontSize * 1.2,
    backgroundColor: Colorss.modalTextInput,

    marginTop: AppUtil.getHP(1),
    borderRadius: AppUtil.getHP(1),
    color:Colorss.white
  },
  imageBtn: {
    backgroundColor: Colorss.red,
    paddingVertical: AppUtil.getHP(1),
    paddingHorizontal: AppUtil.getWP(4),
    borderRadius: AppUtil.getWP(2),
    marginRight: AppUtil.getWP(2),
  },
  imageBtnText: {
    color: "#fff",
    fontSize: AppUtil.getHP(1.6),
    fontWeight: "500",
    alignSelf:'center'
  },
});
