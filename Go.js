
import { StyleSheet, Image, Text, View, Pressable, ImageBackground, TextInput, Modal, Alert, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';

const Go = () => {
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [stepGoal, setStepGoal] = useState('');
  const [distanceGoal, setDistanceGoal] = useState('');
  const [savedStepGoal, setSavedStepGoal] = useState(null);
  const [savedDistanceGoal, setSavedDistanceGoal] = useState(null);
  const intervalRef = useRef(null);

  const toggleCounting = () => {
    if (isCounting) {
      setIsCounting(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      setIsCounting(true);
      intervalRef.current = setInterval(() => {
        setSteps(prevSteps => prevSteps + 1);
        setDistance(prevDistance => prevDistance + 0.0005); // Giả sử 0.05 km cho mỗi 100 bước
      }, 1000); // Cập nhật mỗi giây
    }
  };

  const handleReset = () => {
    setSteps(0);
    setDistance(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsCounting(false);
  };

  const handleSaveGoal = () => {
    if (stepGoal && distanceGoal) {
      setSavedStepGoal(stepGoal);
      setSavedDistanceGoal(distanceGoal);
      setModalVisible(false);
      setStepGoal('');
      setDistanceGoal('');
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập đủ thông tin mục tiêu.");
    }
  };

  return (
    <ScrollView>

 
    <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('./images/nen.jpg')}>
      <View>
        <View style={styles.header}>
          <Image style={styles.icon} source={require('./images/runner.png')} />
          <Text style={styles.title}>Vận động</Text>
          <Image style={styles.icon} source={require('./images/menu.png')} />
        </View>
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white', margin: 10 ,marginLeft:30}}>Mục tiêu bước chân</Text>
            <Pressable style={{ width: 130, height: 40, borderWidth: 2, borderColor: 'white', borderRadius: 10, padding: 5, marginLeft: 40 }}>
              <Text style={styles.goal}>{savedStepGoal ? `${steps}/${savedStepGoal} bước` : ''}</Text>
            </Pressable>
          </View>

          <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Đặt mục tiêu</Text>
          </Pressable>
        </View>
        <Image style={{width:'98%',alignSelf:'center',borderRadius:10,marginTop:10,height:250}} source={require('./images/chaybo.jpg')} />
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <View>
        <Text style={styles.headerText}>Số bước: </Text>
        <Pressable style={{width:90,height:90,borderColor:'red',borderWidth:1,borderRadius:150,backgroundColor:'white',padding:12}}>
        <Text style={{fontSize:40,fontWeight:'500',color:'black'}}> {steps}</Text>
        </Pressable>
      
        </View>
        <View>
        <Text style={styles.headerText1}>Quãng đường </Text>
        <Pressable style={{width:90,height:90,borderColor:'red',borderWidth:1,borderRadius:150,backgroundColor:'white',padding:21,marginLeft:80}}>
        <Text  style={{fontSize:20,fontWeight:'500',color:'black'}}>{distance.toFixed(2)}  km</Text>
        
        </Pressable>
        </View>
        
    
        </View>
      
        
       
        <View style={styles.buttonContainer}>
          <Pressable style={styles.toggleButton} onPress={toggleCounting}>
            <Text style={styles.buttonText}>{isCounting ? 'Dừng Lại' : 'Bắt Đầu'}</Text>
          </Pressable>
          <Pressable style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        </View>
        {steps < savedStepGoal ? (
          <Text style={styles.encouragementText}>Hãy cố gắng lên, bạn đang làm rất tốt!</Text>
        ) : (
          <View style={styles.completionContainer}>
            <Text style={styles.completionText}>Bạn đã hoàn thành mục tiêu!</Text>
            <Image style={styles.completionImage} source={require('./images/prize.png')} />
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nhập mục tiêu</Text>
            <TextInput
              style={styles.input}
              placeholder="Số bước chân"
              value={stepGoal}
              onChangeText={setStepGoal}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Quãng đường (km)"
              value={distanceGoal}
              onChangeText={setDistanceGoal}
              keyboardType="numeric"
            />
            <Pressable style={[styles.modalButton, { backgroundColor: 'green' }]} onPress={handleSaveGoal}>
              <Text style={styles.buttonText}>Lưu</Text>
            </Pressable>
            <Pressable style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Hủy</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </ImageBackground>
    </ScrollView>
  );
};

export default Go;

const styles = StyleSheet.create({

  header: {
    width: '100%',
    height: 50,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    marginRight: 190,
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    margin: 10,
    color:'white',
    marginEnd:40,
    alignSelf:'center'
  },
  headerText1: {
    fontSize: 23,
    margin: 10,
    color:'white',
 marginLeft:40,
    alignSelf:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 20,
 
  },
  toggleButton: {
    backgroundColor: 'green',
    paddingTop:26,
    padding: 10,
    marginLeft: 10,
    borderRadius: 50,
    width:80,height:80,


    alignSelf:'center'
  },
  resetButton: {
    backgroundColor: 'gray',
    paddingTop:26,
    padding: 9,
    paddingLeft:19,
    marginRight: 10,
    borderRadius: 50,
    width:80,height:80,

    alignSelf:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: '30%',
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    backgroundColor: 'blue',
    borderColor: 'white',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goal: {
    fontSize: 18,
    paddingLeft: 15,
    fontWeight: '500',
    color: 'white',
  },
  encouragementText: {
    fontSize: 18,
    color: 'green',
    marginTop: 20,
    alignSelf: 'center',
  },
  completionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  completionText: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  completionImage: {
    width: 100,
    height: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButton: {
    width: 100,
    height: 40,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});