import { Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
const SignUp = (props) => {
  const {navigation}=props;
  // const click=()=>{
  //   navigation.navigate('Login')
  // }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resPassword, setResPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
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
    if (password !== resPassword) {
      setError("Respass không trùng Passwords");
      return;
  }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      
      navigation.navigate('Login');
   
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
       <TextInput
        style={st.input}
        placeholder="ResPassword"
        value={resPassword}
        onChangeText={setResPassword}
        secureTextEntry
      />
  {error ? <Text style={st.errorText}>{error}</Text> : null}
 
 <Pressable onPress={handleSignUp}>
 <Text style={st.btn1}>SING UP</Text>
     </Pressable >
     <Text style={st.text3}>I have an account? <Text style={st.text4} onPress={()=>navigation.navigate('Login')} >Sign in</Text></Text>
   
  
 </View>
     </ImageBackground>
  )
}

export default SignUp

const st = StyleSheet.create({

  input:{
      width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius:10
  },

  bg:{
    flex: 1,
    resizeMode: 'cover', // Đảm bảo hình ảnh phủ đầy màn hình
    justifyContent: 'center'
  },
  view:{
width:'70%',
height:400,
alignSelf:'center',
borderWidth:1,
borderColor:'white',
alignItems:'center',
borderRadius:10,
backgroundColor: 'rgba(128, 128, 128, 0.8)',
padding: 16, // Thêm khoảng cách bên trong view
    justifyContent: 'center' //


  },
  text0:{
    fontSize:12,
    fontWeight:'400',
    color:'white',
    
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
height:30,
backgroundColor:'#58bb3c',
margin:6,
borderRadius:10,
textAlign:'center',
color:'white',
marginBottom:15,
fontWeight:'500',
padding:5,
alignSelf:'center'
  },
  btn2:{
    fontSize: 13,
     fontWeight: '400',
      
       color:'white' 

  },
  btn3:{
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    width: 250,
    height: 30,
    flexDirection: 'row',
    justifyContent:'space-around',
    marginTop: 10,
    marginBottom:8
   
  
  },

  opa:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  text3:{
color:'white',
fontSize:12,
fontWeight:'400'
  },
  text4:{
    color:'yellow',
    fontSize:12,
fontWeight:'400'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
})