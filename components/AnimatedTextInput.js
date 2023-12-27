import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Animated, Easing, Pressable } from "react-native";

function ChangingPlaceholderTextInput({ navigation }) {
  const placeholders = [
    "Search North Indian",
    "Search Pizza",
    "Search Sushi",
    "Search Chinese",
    "Search Mexican",
    "Search Italian",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const translateYNew = new Animated.Value(-20);
  const opacityNew = new Animated.Value(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);

    // Animation for the new placeholder
    Animated.parallel([
      Animated.timing(translateYNew, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacityNew, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    return () => clearInterval(interval);
  }, [placeholderIndex]);

  function searchHandler() {
    navigation.navigate('SearchHandler');
  }

  return (
    <View style={styles.container} onPress={searchHandler}>
      <Animated.View
        style={[
          styles.input,
          {
            transform: [{ translateY: translateYNew }],
            opacity: opacityNew,
          },
        ]}
      >
        <TextInput
          style={styles.inputText}
          placeholder={placeholders[placeholderIndex]}
          placeholderTextColor="gray"
          editable={false}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    
    padding: 1,
    justifyContent: "center", // Add this to center the Pressable content
  },
  input: {
    paddingStart: 10,
    width: "100%",
    height: "100%",
  },
  inputText: {
    padding: 10,
  },
});

export default ChangingPlaceholderTextInput;
