import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './components/nav.js';
import Home from './components/home/home.js';
import Settings from './components/settings/settings.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { map, filter } from "rxjs/operators";

const Tab = createBottomTabNavigator();

export default function App() {

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
    timestamp: 0,
  });

  setUpdateIntervalForType(SensorTypes.accelerometer, 100);

  /*const _fast = () => {
    Accelerometer.setUpdateInterval(100);
  };*/

  const subscription = accelerometer
  .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 20))
  .subscribe(
    speed => alert(`You moved your phone with ${speed}`),
    error => {
      alert("The sensor is not available");
    }
  );

  useEffect(() => {
    setTimeout(() => {
      subscription.unsubscribe();
    }, 1000);
    //accelerometer.subscribe(({ x, y, z, timestamp }) => alert(timestamp))
  });

  return (
    <>
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{labelStyle: styles.tabBarStyle}} initialRouteName="Home">
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', \
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  text: {
    fontSize: 40
  }
});
