import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, StatusBar, AppRegistry, NativeModules, DeviceEventEmitter, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PushNotification, {Importance} from 'react-native-push-notification';
import RemotePushController from './services/RemotePushController.js';
import auth, { firebase } from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Measure from './Measure.js';

import Home from './components/home/home.js';
import Settings from './components/settings/settings.js';
import Register from './components/settings/register.js';
import Login from './components/login.js';
import ReportFault from './components/home/reportFault.js';
import seeFaults from './components/settings/seeFaults.js';

const Tab = createBottomTabNavigator();
const ForeStack = createStackNavigator();
const HomeStack = createStackNavigator();

//const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');
//const userId = auth().currentUser.uid;

function ForemanStackScreen() {
  return (
    <ForeStack.Navigator>
      <ForeStack.Screen name="Foreman" component={Settings} />
      <ForeStack.Screen name="Register" component={Register} />
      <ForeStack.Screen name="Site Faults" component={seeFaults} />
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

const App = ({ lol, data }) => {

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
      subscriber; // unsubscribe on unmount
    /*_subscribe();
    return () => _unsubscribe();*/
  }, []);

  /*useEffect(() => {
    DeviceEventEmitter.addListener('Measure', (event) => {
      console.log('Receiving Measure event');
      setLol(true);
      setTimeout(() => {
        setLol(false);
      }, 1000);
    });
  });*/

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
      <Tab.Navigator tabBarOptions={{activeTintColor: '#4788c6', inactiveTintColor: 'gray'}} screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused 
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Foreman') {
            iconName = focused
              ? 'card-bulleted-settings'
              : 'card-bulleted-settings-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })} /*tabBarOptions={{activeBackgroundColor: '#b6dbfd', inactiveBackgroundColor: '#b6dbfd'}}*/ initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeStackScreen}/>
          <Tab.Screen name="Foreman" component={ForemanStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    {/*<RemotePushController />*/}
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  text: {
    fontSize: 40
  },
});

const mapStateToProps = store => ({
  lol: store.App.lol,
  data: store.App.data,
});

export default connect(mapStateToProps)(App);