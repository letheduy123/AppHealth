import { Pressable, StyleSheet, Text, TextInput, View,Alert, ImageBackground, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

const BMI = () => {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [advice, setAdvice] = useState('');
    const [bmiColor, setBmiColor] = useState('black');

    const calculateBMI = () => {
        if (!height || !weight) {
          Alert.alert('Lỗi', 'Vui lòng nhập chiều cao và cân nặng.');
         
          return;
        }
        const heightInMeters = parseFloat(height) / 100;
        const weightInKg = parseFloat(weight);
        const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(bmiValue);
        provideAdvice(bmiValue);
        setAge('');
        setHeight('');
        setWeight('');
      };
    
      const provideAdvice = (bmiValue) => {
        let adviceText = '';
        let color = 'black';
        if (bmiValue < 18.5) {
          adviceText = 'Bạn thiếu cân. Hãy ăn nhiều hơn và duy trì chế độ dinh dưỡng hợp lý.';
          color = 'yellow';
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
          adviceText = 'Bạn có cân nặng bình thường. Hãy duy trì chế độ ăn uống và luyện tập đều đặn.';
          color = 'green';
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
          adviceText = 'Bạn thừa cân. Hãy cân nhắc việc tập luyện thể dục và ăn uống lành mạnh.';
          color = 'orange';
        } else {
          adviceText = 'Bạn bị béo phì. Hãy tham khảo ý kiến bác sĩ để có chế độ ăn uống và tập luyện phù hợp.';
          color = 'red';
        }

        setAdvice(adviceText);
        setBmiColor(color);
      };
    
    
  return (
    <ImageBackground style={st.bg} source={require('./images/nen.jpg')}>

<ScrollView>
    <View>
      <View style={{width:'100%',height:50,backgroundColor:'green',flexDirection:'row',justifyContent:'space-between'}}>
        <Image style={{margin:10}} source={require('./images/bmi3.png')}/>
      <Text style={st.title}>Thống kê chỉ số cơ thể BMI</Text>
      <Image style={{margin:10}} source={require('./images/more.png')}/>

      </View>


      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
      <Text style={st.label}>Độ tuổi</Text>
      <TextInput
        style={st.input1}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Nhập độ tuổi"
      />
      <Image style={{margin:10}} source={require('./images/grandfather.png')}/>

      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
      <Text style={st.label}>Chiều cao</Text>
      <TextInput
      style={st.input}
      keyboardType="numeric"
      value={height}
      onChangeText={setHeight}
      placeholder="Nhập chiều cao (cm)"
      />
      <Image style={{margin:10}} source={require('./images/height.png')}/>

      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
      <Text style={st.label}>Cân nặng</Text>
      <TextInput
         style={st.input}
         keyboardType="numeric"
         value={weight}
         onChangeText={setWeight}
         placeholder="Nhập cân nặng (kg)"
      />
      <Image style={{margin:10}} source={require('./images/weighing-machine.png')}/>

      </View>
    
    
    
       
    
    <Pressable style={st.button} onPress={calculateBMI}>
        <Text style={st.buttonText}>Tính BMI</Text>
      </Pressable>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <View style={st.block1}>
        <Text style={st.text}>Nhẹ cân</Text>
        <Text style={st.text1}>16 - 18.5</Text>

      </View>
      <View style={st.block2}>
        <Text style={st.text}>Bình thường</Text>
        <Text style={st.text1}>18.5 - 22.5</Text>

      </View>
      <View style={st.block3}>
        <Text style={st.text}>Thừa cân</Text>
        <Text style={st.text1}>23 - 30</Text>
      </View>
      </View>
     

      {bmi && (
        <View style={st.resultContainer}>
          <Text style={[st.resultText,{color:bmiColor}]}>Chỉ số BMI của bạn là: {bmi}</Text>
          <Text style={st.adviceText}>{advice}</Text>
        </View>
      )}
 









    </View>
    </ScrollView>
    </ImageBackground>
  )
}

export default BMI

const st = StyleSheet.create({
  bg:{
    flex: 1,
    resizeMode: 'cover', // Đảm bảo hình ảnh phủ đầy màn hình
   
  },
   
      title: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginTop:10,marginRight:70,
        color:'white',
      
     
      },
      label: {
        fontSize: 18,
      
        fontWeight:'500',
        color:'white',margin:10
      },
      input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
        width:'50%',
       
        alignSelf:'center',
        backgroundColor: '#fff',
      },
      input1: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
        width:'50%',
        marginLeft:22,
        alignSelf:'center',
        backgroundColor: '#fff',
      },
      button: {
        backgroundColor: 'green',
     padding:6,
        borderRadius: 15,margin:40,
        width:'60%',height:40,alignSelf:'center',
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
      },
      block1:{
        width:120,
        height:45,
        backgroundColor:'orange',
       
        borderRadius:10
      },
      block2:{
        width:120,
        height:45,
        backgroundColor:'green',
       
        borderRadius:10
      },
      block3:{
        width:120,
        height:45,
        backgroundColor:'red',
       
        borderRadius:10
      },
      text:{
fontSize:18,
fontWeight:'500',
color:'white',
paddingLeft:7,textAlign:'center'

      },
      text1:{
        fontSize:15,
        fontWeight:'400',
        color:'white',
        
        paddingLeft:7,textAlign:'center'
      },
      resultContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#e0f7fa',
        width:'95%',
        alignSelf:'center',
        alignItems: 'center',
      },
      resultText: {
        fontSize: 18,
        color: 'green',
      },
      adviceText: {
        marginTop: 10,
        fontSize: 16,
        color: '#007BFF',
        textAlign: 'center',
      },
})