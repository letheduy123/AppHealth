import { Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const {navigation}=props;
 
  const click2=()=>{
    navigation.navigate('SignUp')
  }

  const handleLogin = async () => {
       // Kiểm tra xem email và password có trống không
       if (!email || !password) {
        setError('Email và mật khẩu không được để trống');
        return;
      }
  
      // Kiểm tra định dạng email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError('Địa chỉ email không hợp lệ');
        return;
      }
    try {
      await auth().signInWithEmailAndPassword(email, password);
      // Điều hướng đến trang Home sau khi đăng nhập thành công
      navigation.navigate('Home')
     
    } catch (e) {
      setError(e.message);
    }
  };

  return (
 
  <ImageBackground style={st.bg} source={require('./images/bg.jpg')} >
  <View style={st.view}>
  <Image style={{width:40,height:40,margin:10}} source={require('./images/leaf.png')}/>
  <TextInput
        style={st.input}
        placeholder="Username"
       
      />
        <TextInput
        style={st.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={st.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
       
      />
       {error ? <Text>{error}</Text> : null}
     
 <Pressable onPress={handleLogin}>
 <Text style={st.btn1}>SING IN</Text>
     </Pressable >
     <Text style={st.text0}>Forgot password ?</Text>
     <Pressable style={st.btn3}>
      
      <Image style={{width:21,height:21}} source={require('./images/google1.png')}/>
      <Text style={st.btn2}>SING IN WITH GOOGLE</Text>
      
     

     </Pressable>
     <Text style={st.text3}>Don't have an account? <Text style={st.text4} onPress={click2}>Sign up</Text></Text>
 </View>
     </ImageBackground>
  )
}

export default Login

const st = StyleSheet.create({

  input:{
      width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius:10,
    fontSize:15,
    paddingHorizontal: 8,
  },

  bg:{
    flex: 1,
    resizeMode: 'cover', // Đảm bảo hình ảnh phủ đầy màn hình
    justifyContent: 'center'
  },
  view:{
width:'70%',
height:480,
alignSelf:'center',
borderWidth:1,
borderColor:'white',
alignItems:'center',
margin:10,
borderRadius:10,
backgroundColor: 'rgba(128, 128, 128, 0.8)',
padding: 16, // Thêm khoảng cách bên trong view
  


  },
  text0:{
    fontSize:14,
    fontWeight:'500',
    color:'white',
    marginTop:8,marginBottom:12
    
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
 
  btn1:{
width:250,
height:35,
backgroundColor:'#58bb3c',
margin:6,
borderRadius:10,
textAlign:'center',
color:'white',
fontSize:17,
fontWeight:'500',
padding:6,
alignSelf:'center'
  },
  btn2:{
    fontSize: 13,
     fontWeight: '400',
      marginTop:2,
       color:'white' 

  },
  btn3:{
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    width: 240,
    height: 35,
    flexDirection: 'row',
    justifyContent:'space-around',
   
    marginBottom:8
   
  
  },

  opa:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  text3:{
color:'white',
fontSize:14,
fontWeight:'400'
  },
  text4:{
    color:'yellow',
    fontSize:13,
fontWeight:'400'
  }

})