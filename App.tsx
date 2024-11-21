import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Splash from './Splash';
import SignUp from './SignUp';
import Home from './Home';
import Go from './Go';
import Music from './Music';
import Yoga from './Yoga';
import Grateful from './Grateful';
import BMI from './BMI';
import Sleep from './Sleep'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const  TabNavigator = () => {
 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Image source={require('./images/house.png')} />;
          } else if (route.name === 'Go') {
            return <Image source={require('./images/runner.png')} />;
          }else if (route.name === 'Grateful') {
            return <Image source={require('./images/book.png')} />;
          }else if (route.name === 'Yoga') {
            return <Image source={require('./images/lotus.png')} />;
          }else if (route.name === 'Music') {
            return <Image source={require('./images/music-player.png')} />;
          }
        },
        tabBarLabel: () => null,  // Ẩn tiêu đề bên dưới icon
        tabBarActiveTintColor: '#58bb3c',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home', headerShown: false }} />
      <Tab.Screen name="Go" component={Go} options={{ title: 'Go', headerShown: false }} />
      <Tab.Screen name="Grateful" component={Grateful} options={{ title: 'Grateful', headerShown: false }} />
      <Tab.Screen name="Music" component={Music} options={{ title: 'Music', headerShown: false }} />
      <Tab.Screen name="Yoga" component={Yoga} options={{ title: 'Yoga', headerShown: false }} />
     
    </Tab.Navigator>
  );
};


const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={Splash} options={{ title: 'Splash', headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'SignUp', headerShown: false }} />
      <Stack.Screen name="Home" component={TabNavigator} options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="BMI" component={BMI} options={{ title: 'BMI', headerShown: false }} />
      <Stack.Screen name="Sleep" component={Sleep} options={{ title: 'Sleep', headerShown: false }} />
    </Stack.Navigator>
  );
};
const App = () => {
  return ( 
  
  

 
  <NavigationContainer>
  <StackNavigator />
</NavigationContainer>

  );
  
}

export default App

const styles = StyleSheet.create({})