import {ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Splash = (props) => {
  const {navigation} = props;
  const click =()=>{
    navigation.navigate('Login');
  }
  const click2 =()=>{
    navigation.navigate('SignUp');
  }
  return (
    <ImageBackground style={st.bg} source={require('./images/bg.jpg')} >
 <View style={st.view}>
  <Text style={st.text1}>Hello!</Text>
  <Text style={st.text2}>Welcome to my health app </Text>

<Pressable onPress={click}>
<Text style={st.btn1}>SING IN</Text>
    </Pressable>
    <Pressable onPress={click2}>
<Text style={st.btn2}>SING UP</Text>
    </Pressable>
</View>
    </ImageBackground>
   
  )
}

export default Splash

const st = StyleSheet.create({
  bg:{
    flex: 1,
    resizeMode: 'cover', // Đảm bảo hình ảnh phủ đầy màn hình
    justifyContent: 'center'
  },
  view:{
width:'70%',
height:300,
alignSelf:'center',
borderWidth:1,
borderColor:'white',

borderRadius:10,
backgroundColor: 'rgba(128, 128, 128, 0.8)',
padding: 16, // Thêm khoảng cách bên trong view
    justifyContent: 'center' //


  },
  text1:{
    fontSize:20,
    fontWeight:'600',
    color:'white',
    margin:10
  },
  text2:{
    fontSize:14,
    fontWeight:'400',
    color:'white',
    marginLeft:10,
    marginBottom:10
  },
  // container2:{
  //   justifyContent:'space-around',
  //   flexDirection:'row'
    
  // },
  btn1:{
width:'70%',
height:30,
backgroundColor:'#58bb3c',
margin:6,
borderRadius:10,
textAlign:'center',
color:'white',
fontWeight:'500',
padding:5,
alignSelf:'center'
  },
  btn2:{
    width:'70%',
height:30,
borderWidth:1,
margin:6,
borderRadius:10,
textAlign:'center',
borderColor:'white',
fontWeight:'500',
color:'white',
padding:5,
alignSelf:'center'
  }
  

})