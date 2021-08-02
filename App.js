import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PushNotification, {Importance} from 'react-native-push-notification';
import RemotePushController from './services/RemotePushController.js';
import auth, { firebase } from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './components/home/home.js';
import Settings from './components/settings/settings.js';
import Register from './components/settings/register.js';
import Login from './components/login.js';
import ReportFault from './components/home/reportFault.js';

const Tab = createBottomTabNavigator();
const ForeStack = createStackNavigator();
const HomeStack = createStackNavigator();

function ForemanStackScreen() {
  return (
    <ForeStack.Navigator>
      <ForeStack.Screen name="Foreman" component={Settings} />
      <ForeStack.Screen name="Register" component={Register} />
    </ForeStack.Navigator>
  )
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Report a Fault" component={ReportFault} />
    </HomeStack.Navigator>
  )
}

export default function App() {


  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(!user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, [])

  if (initializing) return null;

  return user ? (
    <SafeAreaView style={styles.safe}>
      <View>
        <Login/>
      </View>
    </SafeAreaView>
  ) : (
    <>
    <StatusBar translucent={true} backgroundColor="rgba(236, 236, 236, 0.8)"/>
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{labelStyle: styles.tabBarStyle}} screenOptions={({route}) => ({
        tabBarIcon: ({ color, size }) => {
          return <MaterialCommunityIcons name={'home'} size={size} color={color} />;
        }
      })} initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Settings" component={ForemanStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    <RemotePushController />
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  text: {
    fontSize: 40
  }
});
