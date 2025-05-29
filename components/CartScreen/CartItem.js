import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { _baseURL } from "../../Utils/AppUtils";

export default function CartItem({
  name,
  price,
  description,
  rating,
  qty,
  isVeg,
  url,
  onPress,
  onRemove,
  
}) {
  // const [qty, setQty] = useState(quantity);

  const img = `${_baseURL}${url.replace(/\\/g, "/")}`;

  return (
    <View>
      {!!qty && (
        <View style={styles.cartCard}>
          <Image source={{ uri: img }} style={styles.itemImage} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text numberOfLines={1} style={styles.itemName}>
              {name}
            </Text>
            <Text style={styles.price}>₹ {price}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={onRemove}
                style={styles.quantityButton}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{qty}</Text>
              <TouchableOpacity onPress={onPress} style={styles.quantityButton}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={onPress} style={styles.removeButton}>
            <Text style={{ color: "#fff" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartCard: {
    backgroundColor: "#222",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemName: {
    color: "#fff",
    fontSize: 16,
  },
  price: {
    color: "#39ff14",
    fontWeight: "bold",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  quantityText: {
    marginHorizontal: 10,
    color: "#fff",
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 10,
  },
});
