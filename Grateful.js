import { Pressable, StyleSheet,Image, Text, TextInput,TextDecoder, View,FlatList, ScrollView ,ImageBackground} from 'react-native'
import { Provider } from 'react-redux'
import React, { useState } from 'react'
import store from './src/redux/store';
import TodoScreen from './src/screens/todoScreen.js';

const Grateful = () => {
 

  return (
    

    <Provider store={store}>
    <TodoScreen/>
   </Provider>
   

  )
}

export default Grateful

