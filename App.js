import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'

import AccountScreen from './screens/AccountScreen'

import CartScreen from './screens/CartScreen'
import SplashScreen from 'expo-splash-screen';

import { createDrawerNavigator } from "@react-navigation/drawer";
import  SplashScreenn from './screens/SplashScreen';
import { useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
// SplashScreen.hideAsync()
export default function App() {

  useEffect(() => {
    // Prevent the default splash screen from auto-hiding
   
  }, []);


function HomeDrawer(){
  return(
    <Drawer.Navigator screenOptions={{headerShown:false}}>
      <Drawer.Screen name='HomeScreen' component={HomeScreen}/>
    </Drawer.Navigator>
  )
}


function HomeHandler(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='HomeDrawer' component={HomeDrawer}/>
    </Stack.Navigator>
  )
}
function SearchHandler(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='SearchScreen' component={SearchScreen}/>
    </Stack.Navigator>
  )
}
function AccountHandler(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='AccountScreen' component={AccountScreen}/>
    </Stack.Navigator>
  )
}
function CartHandler(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='CartScreen' component={CartScreen}/>
    </Stack.Navigator>
  )
}

  function TabScreens(){
    return(
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='HomeHandler' component={HomeHandler}/>
        <Tab.Screen name='SearchHandler' component={SearchHandler}/>
        <Tab.Screen name='AccountHandler' component={AccountHandler}/>
        <Tab.Screen name='CartHandler' component={CartHandler}/>

      </Tab.Navigator>
    )
  }
  function Start(){
    return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='BottomTabs' component={TabScreens}/>
      </Stack.Navigator>
    )
  }
  return (
   <>
   <StatusBar style='light'/>
   <NavigationContainer>
    <Start/>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
