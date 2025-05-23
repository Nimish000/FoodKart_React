import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { _baseURL } from "../../Utils/AppUtils";

export default function RecentOrderItem({item,restaurantName,price,img}) {
  return (
    <View>
    

      <View style={styles.foodCard}>
        <Image
          source={{ uri: img }}
          style={styles.foodImage}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text numberOfLines={1} style={styles.foodName}>
            {item}
          </Text>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <Text style={styles.price}>₹ {price}</Text>
        </View>
        <View style={styles.buyButton}>
          <Text style={{ color: "#fff" }}>Buy Again</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
});
