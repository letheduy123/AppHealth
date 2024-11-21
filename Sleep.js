

// import { Pressable, Image, Text, StyleSheet, TextInput, View, Alert, Platform, ImageBackground, Modal, Button } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from 'react-native-push-notification';
// import Sound from 'react-native-sound';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const Sleep = () => {
//     const [sleepGoal, setSleepGoal] = useState('');
//     const [wakeTime, setWakeTime] = useState('');
//     const [alarmSound, setAlarmSound] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [weeklyGoal, setWeeklyGoal] = useState('');
//     const [sleepData, setSleepData] = useState([]);
    

//     useEffect(() => {
//         const requestAlarmPermission = async () => {
//             if (Platform.OS === 'android' && Platform.Version >= 31) {
//                 const result = await check(PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM);
//                 if (result !== RESULTS.GRANTED) {
//                     await request(PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM);
//                 }
//             }
//         };

//         requestAlarmPermission();

//         PushNotification.configure({
//             onNotification: function (notification) {
//                 console.log("NOTIFICATION:", notification);
//                 playAlarm();
//             },
//             requestPermissions: Platform.OS === 'ios'
//         });

//         const loadSleepData = async () => {
//             try {
//                 const savedSleepGoal = await AsyncStorage.getItem('sleepGoal');
//                 const savedWakeTime = await AsyncStorage.getItem('wakeTime');
//                 const savedWeeklyGoal = await AsyncStorage.getItem('weeklyGoal');
//                 const savedSleepData = await AsyncStorage.getItem('sleepData');
                
//                 if (savedSleepGoal) setSleepGoal(savedSleepGoal);
//                 if (savedWakeTime) setWakeTime(savedWakeTime);
//                 if (savedWeeklyGoal) setWeeklyGoal(savedWeeklyGoal);
//                 if (savedSleepData) setSleepData(JSON.parse(savedSleepData));
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         loadSleepData();
//     }, []);

//     useEffect(() => {
//         const sound = new Sound('https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3', Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 console.log('Failed to load the sound', error);
//                 return;
//             }
//             setAlarmSound(sound);
//         });

//         return () => {
//             if (alarmSound) {
//                 alarmSound.release();
//             }
//         };
//     }, []);

//     const saveData = async () => {
//         try {
//             await AsyncStorage.setItem('sleepGoal', sleepGoal);
//             await AsyncStorage.setItem('wakeTime', wakeTime);
//             await AsyncStorage.setItem('weeklyGoal', weeklyGoal);
//             await AsyncStorage.setItem('sleepData', JSON.stringify(sleepData));
//             Alert.alert("Thông báo", "Đã lưu số giờ ngủ .");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const calculateWakeTime = () => {
//         const sleepGoalInHours = parseFloat(sleepGoal);
//         if (isNaN(sleepGoalInHours)) {
//             Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ hợp lệ.");
//             return;
//         }

//         const now = new Date();
//         const wakeTimeDate = new Date(now.getTime() + sleepGoalInHours * 60 * 60 * 1000);
//         const wakeHours = wakeTimeDate.getHours();
//         const wakeMinutes = wakeTimeDate.getMinutes();

//         setWakeTime(`${String(wakeHours).padStart(2, '0')}:${String(wakeMinutes).padStart(2, '0')}`);
//     };

//     const scheduleWakeNotification = () => {
//         const sleepGoalInHours = parseFloat(sleepGoal);
//         if (isNaN(sleepGoalInHours)) {
//             Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ hợp lệ.");
//             return;
//         }

//         const now = new Date();
//         const wakeTimeDate = new Date(now.getTime() + sleepGoalInHours * 60 * 60 * 1000);

//         if (wakeTimeDate > now) {
//             PushNotification.localNotificationSchedule({
//                 message: "It's time to wake up!",
//                 date: wakeTimeDate,
//                 allowWhileIdle: true,
//             });
//             Alert.alert("Thông báo", "Đã lên lịch báo thức.");
//         } else {
//             Alert.alert("Thông báo", "Thời gian dậy phải lớn hơn thời gian hiện tại.");
//         }
//     };

//     const playAlarm = () => {
//         if (alarmSound) {
//             alarmSound.play((success) => {
//                 if (success) {
//                     console.log('Successfully finished playing');
//                 } else {
//                     console.log('Playback failed due to audio decoding errors');
//                 }
//             });
//         }
//     };

//     const handleSave = () => {
//         if (!sleepGoal) {
//             Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ.");
//             return;
//         }

//         calculateWakeTime();
//         const newSleepData = [...sleepData, parseFloat(sleepGoal)];
//         setSleepData(newSleepData);
//         saveData();
//     };

//     const calculateTotalSleep = () => {
//         return sleepData.reduce((total, hours) => total + hours, 0);
//     };

//     return (
//         <ImageBackground style={st.bg} source={require('./images/nen.jpg')}>
//             <View>
//                 <View style={{width:'100%',height:50,backgroundColor:'#132638',flexDirection:'row',justifyContent:'space-between'}}>
//                     <Image style={{margin:10}} source={require('./images/sleep.png')}/>
//                     <Text style={st.title}>Nghỉ ngơi</Text>
//                     <Image style={{margin:10}} source={require('./images/menu.png')}/>
//                 </View>
//                 <View style={{flexDirection:'row',justifyContent:'space-around'}}>
//                     <View>
//                     <Text style={{fontSize:15,fontWeight:'500',color:'white',margin:6}}>  Mục tiêu tuần</Text>
//                     <Pressable style={{width:100,height:40,borderWidth:2,borderRadius:10,borderColor:'white',padding:7,paddingLeft:20,margin:10}}>
//                     <Text style={st.weeklyGoalText}>{calculateTotalSleep()} / {weeklyGoal}</Text>
//                     </Pressable>
//                     </View>
                 
                   
//                     <Pressable
//                         style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 8, backgroundColor: 'blue', borderColor:'white', margin:10 }}
//                         onPress={() => setModalVisible(true)}
//                     >
//                         <Text style={{ fontSize: 15, fontWeight:'500', color: 'white' }}>      Mục tiêu</Text>
//                     </Pressable>
//                 </View>
//                 <Image style={{width:'100%',height:230}} source={require('./images/NenSleep.jpg')} />
//                 <TextInput
//                     style={{ width: '98%', height: 35, margin: 10, alignSelf: 'center', borderWidth: 2, borderRadius: 10, padding:5, borderColor:'white', color:"white", fontSize:15, fontWeight:'400' }}
//                     placeholder='Giờ ngủ'
//                     value={sleepGoal}
//                     onChangeText={setSleepGoal} 
//                     keyboardType='numeric'
//                 />
//                 <Pressable
//                     style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 7, backgroundColor: 'green', borderColor:'white'}}
//                     onPress={handleSave}
//                 >
//                     <Text style={{ fontSize: 16, fontWeight:'400', color: 'white' }}>      Ghi nhận</Text>
//                 </Pressable>
//                 <View style={{flexDirection:'row', marginTop:15, justifyContent:'space-around'}}>
//                     <View>
//                         <Text style={{fontSize:15, fontWeight:'400', color:'white'}}>      Giờ ngủ </Text>
//                         <Pressable style={{width:110, height:40, borderWidth:2, borderRadius:10, borderColor:'white', padding:7}}>
//                             <Text style={{fontSize:15, fontWeight:'500'}}> {new Date().toLocaleTimeString()}</Text>
//                         </Pressable>
//                     </View>
//                     <View>
//                         <Text style={{fontSize:15, fontWeight:'400', color:'white'}}>      Giờ dậy </Text>
//                         <Pressable style={{width:110, height:40, borderWidth:2, borderRadius:10, borderColor:'white', padding:7}}>
//                             <Text style={{fontSize:15, fontWeight:'500'}}> {wakeTime} AM</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//                 <Pressable
//                     style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 8, backgroundColor: 'green', borderColor:'white', marginTop:20 }}
//                     onPress={scheduleWakeNotification}
//                 >
//                     <Text style={{ fontSize: 15, color: 'white' }}>      Báo thức</Text>
//                 </Pressable>
//                 <Text>Thông báo text ở đây: </Text>
               
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={modalVisible}
//                     onRequestClose={() => {
//                         setModalVisible(!modalVisible);
//                     }}
//                 >
//                     <View style={st.modalView}>
//                         <Text style={st.modalText}>Nhập số giờ đặt mục tiêu trong tuần</Text>
//                         <TextInput
//                             style={st.input}
//                             placeholder='Nhập số giờ ngủ trong tuần'
//                             value={weeklyGoal}
//                             onChangeText={setWeeklyGoal}
//                             keyboardType='numeric'
//                         />
//                         <Pressable style={{width:100,height:40,borderWidth:2,borderColor:'gray',borderRadius:10,padding:5,backgroundColor:'green'}} onPress={() => {
//                                 saveData();
//                                 setModalVisible(!modalVisible)}}>
//                             <Text style={{fontSize:15,fontWeight:'500',color:'white'}}>  Lưu số giờ</Text>
//                         </Pressable>

//                         <Pressable style={{width:50,height:40,borderWidth:2,borderColor:'gray',borderRadius:10,padding:5,backgroundColor:'red',margin:10}} 
//                                onPress={() => setModalVisible(false)}>
//                             <Text style={{fontSize:15,fontWeight:'500',color:'white'}}> Hủy</Text>
//                         </Pressable>
                      
                      
//                     </View>
//                 </Modal>
//             </View>
//         </ImageBackground>
//     );
// }

// export default Sleep;

// const st = StyleSheet.create({
//     bg:{
//         flex: 1,
//         resizeMode: 'cover',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: '500',
//         textAlign: 'center',
//         marginTop:10,
//         marginRight:190,
//         color:'white',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     input: {
//         width: 200,
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 20,
//         paddingHorizontal: 10,
//     },
//     weeklyGoalText: {
//         fontSize: 18,
//         color: 'white',
      
     
//     },
// });



// import { Pressable, Image, Text, StyleSheet, TextInput, View, Alert, Platform, ImageBackground, Modal } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from 'react-native-push-notification';
// import Sound from 'react-native-sound';

// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const Sleep = () => {
//     const [sleepGoal, setSleepGoal] = useState('');
//     const [wakeTime, setWakeTime] = useState('');
//     const [alarmSound, setAlarmSound] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [weeklyGoal, setWeeklyGoal] = useState('');
//     const [sleepData, setSleepData] = useState([]);
//     const [notificationText, setNotificationText] = useState('');

//     useEffect(() => {
//         const requestAlarmPermission = async () => {
//             if (Platform.OS === 'android' && Platform.Version >= 31) {
//                 const result = await check(PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM);
//                 if (result !== RESULTS.GRANTED) {
//                     await request(PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM);
//                 }
//             }
//         };
     
//         requestAlarmPermission();

//         PushNotification.configure({
//             onNotification: function (notification) {
//                 console.log("NOTIFICATION:", notification);
//                 playAlarm();
//             },
//             requestPermissions: Platform.OS === 'ios'
//         });

//         const loadSleepData = async () => {
//             try {
//                 const savedSleepGoal = await AsyncStorage.getItem('sleepGoal');
//                 const savedWakeTime = await AsyncStorage.getItem('wakeTime');
//                 const savedWeeklyGoal = await AsyncStorage.getItem('weeklyGoal');
//                 const savedSleepData = await AsyncStorage.getItem('sleepData');
                
//                 if (savedSleepGoal) setSleepGoal(savedSleepGoal);
//                 if (savedWakeTime) setWakeTime(savedWakeTime);
//                 if (savedWeeklyGoal) setWeeklyGoal(savedWeeklyGoal);
//                 if (savedSleepData) setSleepData(JSON.parse(savedSleepData));
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         loadSleepData();
//     }, []);

//     useEffect(() => {
//         const sound = new Sound('https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3', Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 console.log('Failed to load the sound', error);
//                 return;
//             }
//             setAlarmSound(sound);
//         });

//         return () => {
//             if (alarmSound) {
//                 alarmSound.release();
//             }
//         };
//     }, []);

//     const saveData = async () => {
//         try {
//             await AsyncStorage.setItem('sleepGoal', sleepGoal);
//             await AsyncStorage.setItem('wakeTime', wakeTime);
//             await AsyncStorage.setItem('weeklyGoal', weeklyGoal);
//             await AsyncStorage.setItem('sleepData', JSON.stringify(sleepData));
//             Alert.alert("Thông báo", "Đã lưu số giờ ngủ.");
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const calculateWakeTime = () => {
//         const sleepGoalInHours = parseFloat(sleepGoal);
//         if (isNaN(sleepGoalInHours)) {
//             Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ hợp lệ.");
//             return;
//         }

//         const now = new Date();
//         const wakeTimeDate = new Date(now.getTime() + sleepGoalInHours * 60 * 60 * 1000);
//         const wakeHours = wakeTimeDate.getHours();
//         const wakeMinutes = wakeTimeDate.getMinutes();

//         setWakeTime(`${String(wakeHours).padStart(2, '0')}:${String(wakeMinutes).padStart(2, '0')}`);
//     };

//     const scheduleWakeNotification = () => {
//         const sleepGoalInHours = parseFloat(sleepGoal);
//         if (isNaN(sleepGoalInHours)) {
//             Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ hợp lệ.");
//             return;
//         }

//         const now = new Date();
//         const wakeTimeDate = new Date(now.getTime() + sleepGoalInHours * 60 * 60 * 1000);

//         if (wakeTimeDate > now) {
//             PushNotification.localNotificationSchedule({
//                 message: "It's time to wake up!",
//                 date: wakeTimeDate,
//                 allowWhileIdle: true,
//             });
//             Alert.alert("Thông báo", "Đã lên lịch báo thức.");
//         } else {
//             Alert.alert("Thông báo", "Thời gian dậy phải lớn hơn thời gian hiện tại.");
//         }
//     };

//     const playAlarm = () => {
//         if (alarmSound) {
//             alarmSound.play((success) => {
//                 if (success) {
//                     console.log('Successfully finished playing');
//                 } else {
//                     console.log('Playback failed due to audio decoding errors');
//                 }
//             });
//         }
//     };

//     const handleSave = () => {
//         if (!sleepGoal) {
//             Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ.");
//             return;
//         }

//         calculateWakeTime();
//         const newSleepData = [...sleepData, parseFloat(sleepGoal)];
//         setSleepData(newSleepData);
//         saveData();

//         const totalSleep = calculateTotalSleep(newSleepData);
//         if (totalSleep < 8) {
//             setNotificationText('Bạn ngủ chưa đủ giấc');
//         } else {
//             setNotificationText('Bạn ngủ đủ giấc');
//         }
//     };

//     const calculateTotalSleep = (data) => {
//         return data.reduce((total, hours) => total + hours, 0);
//     };

//     const calculateWeeklyGoalProgress = () => {
//         const totalSleep = calculateTotalSleep(sleepData);
//         return `${totalSleep} / ${weeklyGoal}`;
//     };

//     return (
//         <ImageBackground style={st.bg} source={require('./images/nen.jpg')}>
//             <View>
//                 <View style={{width:'100%',height:50,backgroundColor:'#132638',flexDirection:'row',justifyContent:'space-between'}}>
//                     <Image style={{margin:10}} source={require('./images/sleep.png')}/>
//                     <Text style={st.title}>Nghỉ ngơi</Text>
//                     <Image style={{margin:10}} source={require('./images/menu.png')}/>
//                 </View>
//                 <View style={{flexDirection:'row',justifyContent:'space-around'}}>
//                     <View>
//                         <Text style={{fontSize:15,fontWeight:'500',color:'white',margin:6}}>Mục tiêu tuần</Text>
//                         <Pressable style={{width:100,height:40,borderWidth:2,borderRadius:10,borderColor:'white',padding:7,paddingLeft:20,margin:10}}>
//                             <Text style={st.weeklyGoalText}>{calculateWeeklyGoalProgress()}</Text>
//                         </Pressable>
//                     </View>
                 
//                     <Pressable
//                         style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 8, backgroundColor: 'blue', borderColor:'white', margin:10 }}
//                         onPress={() => setModalVisible(true)}
//                     >
//                         <Text style={{ fontSize: 15, fontWeight:'500', color: 'white' }}>Mục tiêu</Text>
//                     </Pressable>
//                 </View>
//                 <Image style={{width:'100%',height:230}} source={require('./images/NenSleep.jpg')} />
//                 <TextInput
//                     style={{ width: '98%', height: 35, margin: 10, alignSelf: 'center', borderWidth: 2, borderRadius: 10, padding:5, borderColor:'white', color:"white", fontSize:15, fontWeight:'400' }}
//                     placeholder='Giờ ngủ'
//                     value={sleepGoal}
//                     onChangeText={setSleepGoal} 
//                     keyboardType='numeric'
//                 />
//                 <Pressable
//                     style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 7, backgroundColor: 'green', borderColor:'white'}}
//                     onPress={handleSave}
//                 >
//                     <Text style={{ fontSize: 16, fontWeight:'400', color: 'white' }}>Ghi nhận</Text>
//                 </Pressable>
//                 <View style={{flexDirection:'row', marginTop:15, justifyContent:'space-around'}}>
//                     <View>
//                         <Text style={{fontSize:15, fontWeight:'400', color:'white'}}>Giờ ngủ:</Text>
//                         <Pressable style={{width:110, height:40, borderWidth:2, borderRadius:10, borderColor:'white', padding:7}}>
//                             <Text style={{fontSize:15, fontWeight:'500'}}>{new Date().toLocaleTimeString()}</Text>
//                         </Pressable>
//                     </View>
//                     <View>
//                         <Text style={{fontSize:15, fontWeight:'400', color:'white'}}>Giờ dậy:</Text>
//                         <Pressable style={{width:110, height:40, borderWidth:2, borderRadius:10, borderColor:'white', padding:7}}>
//                             <Text style={{fontSize:15, fontWeight:'500'}}>{wakeTime} AM</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//                 <Pressable
//                     style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 8, backgroundColor: 'green', borderColor:'white', marginTop:20 }}
//                     onPress={scheduleWakeNotification}
//                 >
//                     <Text style={{ fontSize: 15, color: 'white' }}>Báo thức</Text>
//                 </Pressable>
//                 <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>{notificationText}</Text>
               
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={modalVisible}
//                     onRequestClose={() => {
//                         setModalVisible(!modalVisible);
//                     }}
//                 >
//                     <View style={st.modalView}>
//                         <Text style={st.modalText}>Nhập số giờ đặt mục tiêu trong tuần</Text>
//                         <TextInput
//                             style={st.input}
//                             placeholder='Nhập số giờ ngủ trong tuần'
//                             value={weeklyGoal}
//                             onChangeText={setWeeklyGoal}
//                             keyboardType='numeric'
//                         />
//                         <Pressable style={{width:100,height:40,borderWidth:2,borderColor:'gray',borderRadius:10,padding:5,backgroundColor:'green'}} onPress={() => {
//                                 saveData();
//                                 setModalVisible(!modalVisible)}}>
//                             <Text style={{fontSize:15,fontWeight:'500',color:'white'}}>Lưu số giờ</Text>
//                         </Pressable>

//                         <Pressable style={{width:50,height:40,borderWidth:2,borderColor:'gray',borderRadius:10,padding:5,backgroundColor:'red',margin:10}} 
//                                onPress={() => setModalVisible(false)}>
//                             <Text style={{fontSize:15,fontWeight:'500',color:'white'}}>Hủy</Text>
//                         </Pressable>
//                     </View>
//                 </Modal>
//             </View>
//         </ImageBackground>
//     );
// }

// export default Sleep;

// const st = StyleSheet.create({
//     bg:{
//         flex: 1,
//         resizeMode: 'cover',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: '500',
//         textAlign: 'center',
//         marginTop:10,
//         marginRight:190,
//         color:'white',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     input: {
//         width: 200,
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 20,
//         paddingHorizontal: 10,
//     },
//     weeklyGoalText: {
//         fontSize: 18,
//         color: 'white',
//     },
// });




// import { Pressable, Image, Text, StyleSheet, TextInput, View, Alert, Platform, ImageBackground, Modal } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from 'react-native-push-notification';
// import Sound from 'react-native-sound';

// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const Sleep = () => {
//     const [sleepGoal, setSleepGoal] = useState('');
//     const [wakeTime, setWakeTime] = useState('');
//     const [alarmSound, setAlarmSound] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [weeklyGoal, setWeeklyGoal] = useState('');
//     const [sleepData, setSleepData] = useState([]);
//     const [notificationText, setNotificationText] = useState('');

//     useEffect(() => {
//         const requestAlarmPermission = async () => {
//             if (Platform.OS === 'android' && Platform.Version >= 31) {
//                 const result = await check(PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM);
//                 if (result !== RESULTS.GRANTED) {
//                     await request(PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM);
//                 }
//             }
//         };

//         requestAlarmPermission();

//         PushNotification.configure({
//             onNotification: function (notification) {
//                 console.log("NOTIFICATION:", notification);
//                 playAlarm();
//             },
//             requestPermissions: Platform.OS === 'ios'
//         });

//         const loadSleepData = async () => {
//             try {
//                 const savedSleepGoal = await AsyncStorage.getItem('sleepGoal');
//                 const savedWakeTime = await AsyncStorage.getItem('wakeTime');
//                 const savedWeeklyGoal = await AsyncStorage.getItem('weeklyGoal');
//                 const savedSleepData = await AsyncStorage.getItem('sleepData');
                
//                 if (savedSleepGoal) setSleepGoal(savedSleepGoal);
//                 if (savedWakeTime) setWakeTime(savedWakeTime);
//                 if (savedWeeklyGoal) setWeeklyGoal(savedWeeklyGoal);
//                 if (savedSleepData) setSleepData(JSON.parse(savedSleepData));
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         loadSleepData();
//     }, []);

//     useEffect(() => {
//         const sound = new Sound('https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3', Sound.MAIN_BUNDLE, (error) => {
//             if (error) {
//                 console.log('Failed to load the sound', error);
//                 return;
//             }
//             setAlarmSound(sound);
//         });

//         return () => {
//             if (alarmSound) {
//                 alarmSound.release();
//             }
//         };
//     }, []);

//     const saveData = async () => {
//         try {
//             await AsyncStorage.setItem('sleepGoal', sleepGoal);
//             await AsyncStorage.setItem('wakeTime', wakeTime);
//             await AsyncStorage.setItem('weeklyGoal', weeklyGoal);
//             await AsyncStorage.setItem('sleepData', JSON.stringify(sleepData));
//             Alert.alert("Thông báo", "Đã lưu số giờ ngủ.");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const calculateWakeTime = () => {
//         const sleepGoalInHours = parseFloat(sleepGoal);
//         if (isNaN(sleepGoalInHours)) {
//             Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ hợp lệ.");
//             return;
//         }

//         const now = new Date();
//         const wakeTimeDate = new Date(now.getTime() + sleepGoalInHours * 60 * 60 * 1000);
//         const wakeHours = wakeTimeDate.getHours();
//         const wakeMinutes = wakeTimeDate.getMinutes();

//         setWakeTime(`${String(wakeHours).padStart(2, '0')}:${String(wakeMinutes).padStart(2, '0')}`);
//     };

//     const scheduleWakeNotification = () => {
//         const sleepGoalInHours = parseFloat(sleepGoal);
//         if (isNaN(sleepGoalInHours)) {
//             Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ hợp lệ.");
//             return;
//         }

//         const now = new Date();
//         const wakeTimeDate = new Date(now.getTime() + sleepGoalInHours * 60 * 60 * 1000);

//         if (wakeTimeDate > now) {
//             PushNotification.localNotificationSchedule({
//                 message: "It's time to wake up!",
//                 date: wakeTimeDate,
//                 allowWhileIdle: true,
//             });
//             Alert.alert("Thông báo", "Đã lên lịch báo thức.");
//         } else {
//             Alert.alert("Thông báo", "Thời gian dậy phải lớn hơn thời gian hiện tại.");
//         }
//     };

//     const playAlarm = () => {
//         if (alarmSound) {
//             alarmSound.play((success) => {
//                 if (success) {
//                     console.log('Successfully finished playing');
//                 } else {
//                     console.log('Playback failed due to audio decoding errors');
//                 }
//             });
//         }
//     };

//     const handleSave = () => {
//         if (!sleepGoal) {
//             Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ.");
//             return;
//         }

//         calculateWakeTime();
//         const newSleepData = [...sleepData, parseFloat(sleepGoal)];
//         setSleepData(newSleepData);
//         saveData();

//         const totalSleep = calculateTotalSleep(newSleepData);
//         if (totalSleep < 8) {
//             setNotificationText('Bạn ngủ chưa đủ giấc');
//         } else {
//             setNotificationText('Bạn ngủ đủ giấc');
//         }
//     };

//     const calculateTotalSleep = (data) => {
//         return data.reduce((total, hours) => total + hours, 0);
//     };

//     const calculateWeeklyGoalProgress = () => {
//         const totalSleep = calculateTotalSleep(sleepData);
//         return `${totalSleep} / ${weeklyGoal}`;
//     };

//     return (
//         <ImageBackground style={st.bg} source={require('./images/nen.jpg')}>
//             <View>
//                 <View style={{width:'100%',height:50,backgroundColor:'#132638',flexDirection:'row',justifyContent:'space-between'}}>
//                     <Image style={{margin:10}} source={require('./images/sleep.png')}/>
//                     <Text style={st.title}>Nghỉ ngơi</Text>
//                     <Image style={{margin:10}} source={require('./images/menu.png')}/>
//                 </View>
//                 <View style={{flexDirection:'row',justifyContent:'space-around'}}>
//                     <View>
//                         <Text style={{fontSize:15,fontWeight:'500',color:'white',margin:6}}>Mục tiêu tuần</Text>
//                         <Pressable style={{width:100,height:40,borderWidth:2,borderRadius:10,borderColor:'white',padding:7,paddingLeft:20,margin:10}}>
//                             <Text style={st.weeklyGoalText}>{calculateWeeklyGoalProgress()}</Text>
//                         </Pressable>
//                     </View>
                 
//                     <Pressable
//                         style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 8, backgroundColor: 'blue', borderColor:'white', margin:10 }}
//                         onPress={() => setModalVisible(true)}
//                     >
//                         <Text style={{ fontSize: 15, fontWeight:'500', color: 'white' }}>Mục tiêu</Text>
//                     </Pressable>
//                 </View>
//                 <Image style={{width:'100%',height:230}} source={require('./images/NenSleep.jpg')} />
//                 <TextInput
//                     style={{ width: '98%', height: 35, margin: 10, alignSelf: 'center', borderWidth: 2, borderRadius: 10, padding:5, borderColor:'white', color:"white", fontSize:15, fontWeight:'400' }}
//                     placeholder='Giờ ngủ'
//                     value={sleepGoal}
//                     onChangeText={setSleepGoal} 
//                     keyboardType='numeric'
//                 />
//                 <Pressable
//                     style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 7, backgroundColor: 'green', borderColor:'white'}}
//                     onPress={handleSave}
//                 >
//                     <Text style={{ fontSize: 16, fontWeight:'400', color: 'white' }}>Ghi nhận</Text>
//                 </Pressable>
//                 <View style={{flexDirection:'row', marginTop:15, justifyContent:'space-around'}}>
//                     <View>
//                         <Text style={{fontSize:15, fontWeight:'400', color:'white'}}>Giờ ngủ:</Text>
//                         <Pressable style={{width:110, height:40, borderWidth:2, borderRadius:10, borderColor:'white', padding:7}}>
//                             <Text style={{fontSize:15, fontWeight:'500'}}>{new Date().toLocaleTimeString()}</Text>
//                         </Pressable>
//                     </View>
//                     <View>
//                         <Text style={{fontSize:15, fontWeight:'400', color:'white'}}>Giờ dậy:</Text>
//                         <Pressable style={{width:110, height:40, borderWidth:2, borderRadius:10, borderColor:'white', padding:7}}>
//                             <Text style={{fontSize:15, fontWeight:'500'}}>{wakeTime} AM</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//                 <Pressable
//                     style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 8, backgroundColor: 'green', borderColor:'white', marginTop:20 }}
//                     onPress={scheduleWakeNotification}
//                 >
//                     <Text style={{ fontSize: 15, color: 'white' }}>Báo thức</Text>
//                 </Pressable>
//                 <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>{notificationText}</Text>
               
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={modalVisible}
//                     onRequestClose={() => {
//                         setModalVisible(!modalVisible);
//                     }}
//                 >
//                     <View style={st.modalView}>
//                         <Text style={st.modalText}>Nhập số giờ đặt mục tiêu trong tuần</Text>
//                         <TextInput
//                             style={st.input}
//                             placeholder='Nhập số giờ ngủ trong tuần'
//                             value={weeklyGoal}
//                             onChangeText={setWeeklyGoal}
//                             keyboardType='numeric'
//                         />
//                         <Pressable style={{width:100,height:40,borderWidth:2,borderColor:'gray',borderRadius:10,padding:5,backgroundColor:'green'}} onPress={() => {
//                                 saveData();
//                                 setModalVisible(!modalVisible)}}>
//                             <Text style={{fontSize:15,fontWeight:'500',color:'white'}}>Lưu số giờ</Text>
//                         </Pressable>

//                         <Pressable style={{width:50,height:40,borderWidth:2,borderColor:'gray',borderRadius:10,padding:5,backgroundColor:'red',margin:10}} 
//                                onPress={() => setModalVisible(false)}>
//                             <Text style={{fontSize:15,fontWeight:'500',color:'white'}}>Hủy</Text>
//                         </Pressable>
//                     </View>
//                 </Modal>
//             </View>
//         </ImageBackground>
//     );
// }

// export default Sleep;

// const st = StyleSheet.create({
//     bg:{
//         flex: 1,
//         resizeMode: 'cover',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: '500',
//         textAlign: 'center',
//         marginTop:10,
//         marginRight:190,
//         color:'white',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     input: {
//         width: 200,
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 20,
//         paddingHorizontal: 10,
//     },
//     weeklyGoalText: {
//         fontSize: 18,
//         color: 'white',
//     },
// });


import { Pressable, Image, Text, StyleSheet, TextInput, View, Alert, Platform, ImageBackground, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Sleep = () => {
    const [sleepGoal, setSleepGoal] = useState('');
    const [wakeTime, setWakeTime] = useState('');
    const [alarmSound, setAlarmSound] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [weeklyGoal, setWeeklyGoal] = useState('');
    const [sleepData, setSleepData] = useState([]);
    const [notificationText, setNotificationText] = useState('');

    useEffect(() => {
        const requestAlarmPermission = async () => {
            if (Platform.OS === 'android' && Platform.Version >= 31) {
                const result = await check(PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM);
                if (result !== RESULTS.GRANTED) {
                    await request(PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM);
                }
            }
        };

        requestAlarmPermission();

        PushNotification.configure({
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                playAlarm();
            },
            requestPermissions: Platform.OS === 'ios'
        });

        const loadSleepData = async () => {
            try {
                const savedSleepGoal = await AsyncStorage.getItem('sleepGoal');
                const savedWakeTime = await AsyncStorage.getItem('wakeTime');
                const savedWeeklyGoal = await AsyncStorage.getItem('weeklyGoal');
                const savedSleepData = await AsyncStorage.getItem('sleepData');
                
                if (savedSleepGoal) setSleepGoal(savedSleepGoal);
                if (savedWakeTime) setWakeTime(savedWakeTime);
                if (savedWeeklyGoal) setWeeklyGoal(savedWeeklyGoal);
                if (savedSleepData) setSleepData(JSON.parse(savedSleepData));
            } catch (error) {
                console.log(error);
            }
        };

        loadSleepData();
    }, []);

    useEffect(() => {
        const sound = new Sound('https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            setAlarmSound(sound);
        });

        return () => {
            if (alarmSound) {
                alarmSound.release();
            }
        };
    }, []);

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('sleepGoal', sleepGoal);
            await AsyncStorage.setItem('wakeTime', wakeTime);
            await AsyncStorage.setItem('weeklyGoal', weeklyGoal);
            await AsyncStorage.setItem('sleepData', JSON.stringify(sleepData));
            Alert.alert("Thông báo", "Đã lưu số giờ ngủ.");
        } catch (error) {
            console.log(error);
        }
    };

    const calculateWakeTime = () => {
        const sleepGoalInHours = parseFloat(sleepGoal);
        if (isNaN(sleepGoalInHours)) {
            Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ hợp lệ.");
            return;
        }

        const now = new Date();
        const wakeTimeDate = new Date(now.getTime() + sleepGoalInHours * 60 * 60 * 1000);
        const wakeHours = wakeTimeDate.getHours();
        const wakeMinutes = wakeTimeDate.getMinutes();

        setWakeTime(`${String(wakeHours).padStart(2, '0')}:${String(wakeMinutes).padStart(2, '0')}`);
    };

    const scheduleWakeNotification = () => {
        const sleepGoalInHours = parseFloat(sleepGoal);
        if (isNaN(sleepGoalInHours)) {
            Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ hợp lệ.");
            return;
        }

        const now = new Date();
        const wakeTimeDate = new Date(now.getTime() + sleepGoalInHours * 60 * 60 * 1000);

        if (wakeTimeDate > now) {
            PushNotification.localNotificationSchedule({
                message: "It's time to wake up!",
                date: wakeTimeDate,
                allowWhileIdle: true,
            });
            Alert.alert("Thông báo", "Đã lên lịch báo thức.");
        } else {
            Alert.alert("Thông báo", "Thời gian dậy phải lớn hơn thời gian hiện tại.");
        }
    };

    const playAlarm = () => {
        if (alarmSound) {
            alarmSound.play((success) => {
                if (success) {
                    console.log('Successfully finished playing');
                } else {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
        }
    };

    const handleSave = () => {
        if (!sleepGoal) {
            Alert.alert("Thông báo", "Vui lòng nhập số giờ ngủ.");
            return;
        }

        calculateWakeTime();
        const newSleepData = [...sleepData, parseFloat(sleepGoal)];
        setSleepData(newSleepData);
        saveData();

        const totalSleep = calculateTotalSleep(newSleepData);
        if (totalSleep < 8) {
            setNotificationText('Bạn ngủ chưa đủ giấc');
        } else {
            setNotificationText('Bạn ngủ đủ giấc');
        }
    };

    const calculateTotalSleep = (data) => {
        return data.reduce((total, hours) => total + hours, 0);
    };

    const calculateWeeklyGoalProgress = () => {
        const totalSleep = calculateTotalSleep(sleepData);
        return `${totalSleep} / ${weeklyGoal}`;
    };

    return (
        <ImageBackground style={st.bg} source={require('./images/nen.jpg')}>
            <View>
                <View style={{width:'100%',height:50,backgroundColor:'#132638',flexDirection:'row',justifyContent:'space-between'}}>
                    <Image style={{margin:10}} source={require('./images/sleep.png')}/>
                    <Text style={st.title}>Nghỉ ngơi</Text>
                    <Image style={{margin:10}} source={require('./images/menu.png')}/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View>
                        <Text style={{fontSize:15,fontWeight:'500',color:'white',margin:6}}>Mục tiêu tuần</Text>
                        <Pressable style={{width:200,height:40,borderWidth:2,borderRadius:10,borderColor:'white',padding:7,paddingLeft:20,margin:10}}>
                            <Text style={st.weeklyGoalText}>{calculateWeeklyGoalProgress()}</Text>
                        </Pressable>
                    </View>
                 
                    <Pressable
                        style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 8, backgroundColor: 'blue', borderColor:'white', margin:10 }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ fontSize: 15, fontWeight:'500', color: 'white' }}>Mục tiêu</Text>
                    </Pressable>
                </View>
                <Image style={{width:'100%',height:230}} source={require('./images/NenSleep.jpg')} />
                <TextInput
                    style={{ width: '98%', height: 35, margin: 10, alignSelf: 'center', borderWidth: 2, borderRadius: 10, padding:5, borderColor:'white', color:"white", fontSize:15, fontWeight:'400' }}
                    placeholder='Giờ ngủ'
                    value={sleepGoal}
                    onChangeText={setSleepGoal} 
                    keyboardType='numeric'
                />
                <Pressable
                    style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 7, backgroundColor: 'green', borderColor:'white'}}
                    onPress={handleSave}
                >
                    <Text style={{ fontSize: 16, fontWeight:'400', color: 'white' }}>Ghi nhận</Text>
                </Pressable>
                <View style={{flexDirection:'row', marginTop:15, justifyContent:'space-around'}}>
                    <View>
                        <Text style={{fontSize:15, fontWeight:'400', color:'white'}}>Giờ ngủ:</Text>
                        <Pressable style={{width:110, height:40, borderWidth:2, borderRadius:10, borderColor:'white', padding:7}}>
                            <Text style={{fontSize:15, fontWeight:'500'}}>{new Date().toLocaleTimeString()}</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Text style={{fontSize:15, fontWeight:'400', color:'white'}}>Giờ dậy:</Text>
                        <Pressable style={{width:110, height:40, borderWidth:2, borderRadius:10, borderColor:'white', padding:7}}>
                            <Text style={{fontSize:15, fontWeight:'500'}}>{wakeTime} AM</Text>
                        </Pressable>
                    </View>
                </View>
                <Pressable
                    style={{ width: "30%", height: 40, borderWidth: 2, alignSelf: 'center', borderRadius: 10, padding: 8, backgroundColor: 'green', borderColor:'white', marginTop:20 }}
                    onPress={scheduleWakeNotification}
                >
                    <Text style={{ fontSize: 15, color: 'white' }}>Báo thức</Text>
                </Pressable>
                <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>{notificationText}</Text>
               
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={st.modalView}>
                        <Text style={st.modalText}>Nhập số giờ đặt mục tiêu trong tuần</Text>
                        <TextInput
                            style={st.input}
                            placeholder='Nhập số giờ ngủ trong tuần'
                            value={weeklyGoal}
                            onChangeText={setWeeklyGoal}
                            keyboardType='numeric'
                        />
                        <Pressable style={{width:100,height:40,borderWidth:2,borderColor:'gray',borderRadius:10,padding:5,backgroundColor:'green'}} onPress={() => {
                                saveData();
                                setModalVisible(!modalVisible)}}>
                            <Text style={{fontSize:15,fontWeight:'500',color:'white'}}>Lưu số giờ</Text>
                        </Pressable>

                        <Pressable style={{width:50,height:40,borderWidth:2,borderColor:'gray',borderRadius:10,padding:5,backgroundColor:'red',margin:10}} 
                               onPress={() => setModalVisible(false)}>
                            <Text style={{fontSize:15,fontWeight:'500',color:'white'}}>Hủy</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
}

export default Sleep;

const st = StyleSheet.create({
    bg:{
        flex: 1,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginTop:10,
        marginRight:190,
        color:'white',
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
    weeklyGoalText: {
        fontSize: 18,
        color: 'white',
    },
});