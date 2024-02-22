import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const setupPushNotifications = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    // Explicitly provide your projectId
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: 'foodkart-react', // Replace with your actual projectId
    });

    const pushToken = tokenData.data;

    console.log('Push Token:', pushToken);
    // Send this pushToken to your server for later use
  } catch (error) {
    console.error('Error setting up push notifications:', error);
  }
};



const YourComponent = () => {
  useEffect(() => {
    setupPushNotifications();
  }, []);

  // ... (rest of the code)
};

export default YourComponent;

  

