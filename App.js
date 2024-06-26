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
import { SvgXml } from 'react-native-svg';
import { Colorss } from './Colors/Colors';
import ContextProvider from './store/context';
import NewItem from './screens/NewItem';
import { CustomTabBar } from './components/CustomTabBar';
import Intro1 from './screens/Intro1';
import Intro2 from './screens/Intro2';
import SignInWithEmail from './screens/SignInWithEmail';
import SignInWithMobile from './screens/SignInWithMobile';
import Register from './screens/Register';


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
      <Drawer.Screen name='NewItemScreen' component={NewItem}/>
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
    function accountSvg({fillColor}){
    const accountIconSvg = `<svg width="50" height="50" viewBox="0 0 50 50" fill="green" xmlns="http://www.w3.org/2000/svg"><path d="M25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0ZM25 7.5C29.15 7.5 32.5 10.85 32.5 15C32.5 19.15 29.15 22.5 25 22.5C20.85 22.5 17.5 19.15 17.5 15C17.5 10.85 20.85 7.5 25 7.5ZM25 43C18.75 43 13.225 39.8 10 34.95C10.075 29.975 20 27.25 25 27.25C29.975 27.25 39.925 29.975 40 34.95C36.775 39.8 31.25 43 25 43Z" fill="${fillColor}"/></svg>`;
  return accountIconSvg 
  }
    function seachSvg({fillColor}){
      const searchIconSvg = `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M59.415 56.7188L43.9293 41.475C47.9831 37.0687 50.475 31.2563 50.475 24.8438C50.475 11.1187 39.1762 0 25.2375 0C11.2987 0 0 11.1187 0 24.8438C0 38.55 11.2987 49.6687 25.2375 49.6687C31.26 49.6687 36.7838 47.5876 41.1225 44.1188L56.67 59.4186C57.4294 60.1686 58.6575 60.1686 59.415 59.4186C60.1744 58.6874 60.1744 57.4688 59.415 56.7188Z" fill="${fillColor}"/>
    </svg>
    `;
  return searchIconSvg}
    function cartSvg({fillColor}){const cartIconSvg = `<svg width="144" height="108" viewBox="0 0 144 108" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.63294 0.0363263C5.25892 0.416169 3.13303 1.72353 1.72293 3.6708C0.312837 5.61808 -0.265953 8.04575 0.11389 10.4198C0.493733 12.7938 1.80109 14.9197 3.74837 16.3298C5.69564 17.7399 8.12332 18.3187 10.4973 17.9388H37.3511L38.9623 22.4144L46.3023 44.7926L53.6423 67.1707C54.3584 69.498 57.4019 71.6463 59.7292 71.6463H122.388C124.894 71.6463 127.759 69.498 128.475 67.1707L142.976 22.4144C143.692 20.0871 142.618 17.9388 140.111 17.9388H60.6243L53.8214 5.04902C53.0968 3.56955 51.978 2.31873 50.5882 1.43429C49.1983 0.549851 47.5914 0.0661073 45.9443 0.0363263L10.1393 0.0363263C9.6033 -0.0121088 9.06404 -0.0121088 8.52806 0.0363263C8.17033 0.0148239 7.81164 0.0148239 7.45391 0.0363263L7.63294 0.0363263ZM64.2048 89.5488C59.1921 89.5488 55.2536 93.4873 55.2536 98.5C55.2536 103.513 59.1921 107.451 64.2048 107.451C69.2175 107.451 73.1561 103.513 73.1561 98.5C73.1561 93.4873 69.2175 89.5488 64.2048 89.5488ZM117.912 89.5488C112.9 89.5488 108.961 93.4873 108.961 98.5C108.961 103.513 112.9 107.451 117.912 107.451C122.925 107.451 126.864 103.513 126.864 98.5C126.864 93.4873 122.925 89.5488 117.912 89.5488Z" fill="${fillColor}"/>
    </svg>
    `;
  return cartIconSvg
  }
    function homeSvg({fillColor}){
      const homeIconSvg = `<svg width="35" height="31" viewBox="0 0 35 31" fill="green" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.2189 0L0 12.9142H4.30473V30.1331H12.9142V21.5237H21.5237V30.1331H30.1331V12.7851L34.4379 12.9142L17.2189 0Z" fill="${fillColor}"/>
    </svg>
    `;
    return homeIconSvg
    }

    return(
      <Tab.Navigator 
      
      screenOptions={({ route }) => ({
        headerShown:false,
        
        tabBarStyle: {
          backgroundColor: 'black', // Set the background color to black
        },
        tabBarActiveTintColor: Colorss.green, // Set the active tab text color
        tabBarInactiveTintColor: 'gray', // Set the inactive tab text color
        
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconName;

        //   if (route.name === 'HomeHandler') {
        //     iconName = focused ? <SvgXml xml={homeSvg({fillColor: Colorss.active})
        //     } width={size} height={size} color={color}/> : <SvgXml xml={homeSvg({fillColor: Colorss.inActive})
        //     } width={size} height={size} color={color}/>
        //   } else if (route.name === 'SearchHandler') {
        //     iconName = focused ? <SvgXml xml={seachSvg({fillColor: Colorss.active})
        //     } width={size} height={size} color={color}/> : <SvgXml xml={seachSvg({fillColor: Colorss.inActive})
        //     } width={size} height={size} color={color}/>
        //   } else if (route.name === 'AccountHandler') {
        //     iconName = focused ? <SvgXml xml={accountSvg({fillColor: Colorss.active})
        //     } width={size} height={size} color={color}/> : <SvgXml xml={accountSvg({fillColor: Colorss.inActive})
        //     } width={size} height={size} color={color}/>
        //   } else if (route.name === 'CartHandler') {
        //     iconName = focused ? <SvgXml xml={cartSvg({fillColor: Colorss.active})
        //     } width={size} height={size} color={color}/> : <SvgXml xml={cartSvg({fillColor: Colorss.inActive})
        //     } width={size} height={size} color={color}/>
        //   }

        //   // You can return any component that you like here!
        //   return iconName;
        // },
      })}
      tabBar={(props) => <CustomTabBar {...props} />}
      
    >
        <Tab.Screen name='HomeHandler' component={HomeHandler}/>
        <Tab.Screen name='SearchHandler' component={SearchHandler}/>
        <Tab.Screen name='AccountHandler' component={AccountHandler}/>
        <Tab.Screen name='CartHandler' component={CartHandler}/>

      </Tab.Navigator>
    )
  }
  function Start(){
    return(
      <Stack.Navigator screenOptions={{headerShown:false,}}>
        <Stack.Screen name='Intro1Screen' component={Intro1}  options={{}}/>
        <Stack.Screen name='Intro2Screen' component={Intro2} options={{}}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{}}/>
        <Stack.Screen name='SignInWithEmail' component={SignInWithEmail} options={{}}/>
        <Stack.Screen name='SignInWithMobile' component={SignInWithMobile} options={{}}/>
        <Stack.Screen name='Register' component={Register} options={{}}/>



        <Stack.Screen name='BottomTabs' component={TabScreens}/>
      </Stack.Navigator>
    )
  }


  
  return (
   <>
   <StatusBar style='light' backgroundColor='transparent'/>
   <ContextProvider>
   <NavigationContainer>
    <Start/>
    </NavigationContainer>
    </ContextProvider>
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
