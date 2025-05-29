import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';


const SplashScreenn = ({ navigation }) => {
  useEffect(() => {
    // Simulate a delay (e.g., loading resources or data)
    const delay = setTimeout(() => {
      // Navigate to your main screen
      // SplashScreen.hideAsync().catch(console.warn);
      // navigation.replace('Intro1Screen'); // Replace with your main screen's name
    }, 2000); // Adjust the delay as needed

    // Clear the timeout on component unmount
    return () => clearTimeout(delay);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/drawables/logo.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C05D5D', // Set the background color
  },
  image: {
    width: "70%", // Adjust the width and height according to your design
    height: "70%",
    resizeMode:'contain'
  },
});

export default SplashScreenn;
