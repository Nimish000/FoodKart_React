import React, { useState } from "react";
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
  TextInput,
} from "react-native";
import { AppUtil } from "../Utils/AppUtils";
import { Colorss } from "../Colors/Colors";
import SvgSelector from "../Utils/SvgSelector";

export default function ProfileScreen() {
  const [isEditable, setEditable] = useState(false);
  const[name,setName]=useState("Nimish Sharma");
  const[email, setEmail]=useState("nimish@gmail.com");

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Background Image */}
      <Image
        source={{ uri: "http://192.168.1.9:5000/uploads/1747941919716.jpg" }}
        style={styles.backgroundImage}
      />
      {isEditable && (
        <View
          style={{
            position: "absolute",
            marginTop: AppUtil.getHP(20),
            alignSelf: "flex-end",
            marginEnd: AppUtil.getWP(5),
          }}
        >
          <SvgSelector
            name={"camera"}
            fill={Colorss.black}
            w={AppUtil.getWP(8)}
            h={AppUtil.getWP(8)}
          />
        </View>
      )}

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
              <TextInput style={styles.userName}
            value={name}
            onChangeText={setName}
            editable={isEditable}
            />
              <TouchableOpacity onPress={()=>setEditable(!isEditable)} > 

              <SvgSelector
                name={"editP"}
                fill={Colorss.green}
                w={AppUtil.getWP(8)}
                h={AppUtil.getWP(8)}
              />
              </TouchableOpacity>

            </View>

            <TextInput style={styles.userEmail}
            value={email}
            onChangeText={setEmail}
            editable={isEditable}
            />
          </View>

          {/* Voucher */}
          {/* <View style={styles.voucherCard}>
            <Text style={{ color: '#fff' }}>🎁 You Have 3 Voucher</Text>
          </View> */}

          {/* Favorite List (repeatable card) */}
          <Text style={styles.sectionTitle}>Recent Orders</Text>

          {[1, 2, 3].map((_, index) => (
            <View key={index} style={styles.foodCard}>
              <Image
                source={{ uri: "https://picsum.photos/60/60" }}
                style={styles.foodImage}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.foodName}>Spacy fresh crab</Text>
                <Text style={styles.restaurantName}>Waroenk kita</Text>
                <Text style={styles.price}>$ 35</Text>
              </View>
              <View style={styles.buyButton}>
                <Text style={{ color: "#fff" }}>Buy Again</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: AppUtil.getHP(35),
    position: "absolute",
  },
  scrollContent: {
    paddingTop: AppUtil.getHP(28), // ensures overlap
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
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  foodCard: {
    backgroundColor: "#222",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  foodName: {
    color: "#fff",
    fontSize: 16,
  },
  restaurantName: {
    color: "#aaa",
    fontSize: 12,
  },
  price: {
    color: "#39ff14",
    fontWeight: "bold",
    marginTop: 5,
  },
  buyButton: {
    backgroundColor: "#16c784",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 10,
  },
});
