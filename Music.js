// 1. import các thư viện
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,Text,
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { setupPlayer, addTracks } from './trackPlayerServices';


function Music() {
// khai báo trạng thái để kiểm soát nếu chưa sẵn sàng load nhạc thì hiện thị activityIndicator quay quay
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  // khi render thì bắt đầu khởi tạo đối tượng chơi nhạc
  
  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      if(isSetup && queue.length <= 0) {
        await addTracks();
      }
      setIsPlayerReady(isSetup);
    }
    setup();
  }, []);
  
  
  
  if(!isPlayerReady) {
    return (
      <SafeAreaView >
     
        <ActivityIndicator size="large" color="#bbb"/>
      </SafeAreaView>
    );
  }
  
  
  return (
    <ImageBackground style={st.bg} source={require('./images/nen.jpg')}>
<ScrollView>


  
    <SafeAreaView style={st.container}>
         <View style={{width:'100%',height:50,backgroundColor:'green',flexDirection:'row',justifyContent:'space-between'}}>
                    <Image style={{margin:10}} source={require('./images/music1.png')}/>
                    <Text style={st.title}>Âm nhạc</Text>
                    <Image style={{margin:10}} source={require('./images/menu.png')}/>
                </View>
         <Image style={{width:'100%',height:180,alignSelf:'center'}} source={require('./images/thien.jpg')} />
<Pressable style={{width:90,height:40,backgroundColor:'green',borderRadius:10,padding:9,alignSelf:'center',margin:10}} onPress={() => TrackPlayer.play()}>
  <Text style={{fontSize:15,color:'white',fontWeight:'400'}}>Phát nhạc</Text>
</Pressable>
     
      <Text style={{fontSize:20,color:'white',fontWeight:'500',marginLeft:10}}>Danh sách nhạc </Text>
      <View style={{flexDirection:'row', justifyContent:'space-evenly',margin:10,width:370,padding:15,borderRadius:10,height:100,backgroundColor:'gray'}}>
        <Image style={{width:80,height:60,borderRadius:10,marginEnd:30}} source={require('./images/tam.jpg')}/>
        <View>
        <Text style={{fontSize:20,color:'black',fontWeight:'600'}}>Thiền tâm định</Text>
        <Text style={{fontSize:16,color:'white'}}>Phật pháp nhiệm màu</Text>
        </View>
      

      </View>
      <View style={{flexDirection:'row', justifyContent:'space-evenly',margin:10,width:370,padding:15,borderRadius:10,height:100,backgroundColor:'gray'}}>
        <Image style={{width:80,height:60,borderRadius:10,marginEnd:30}} source={require('./images/duc.png')}/>
        <View>
        <Text style={{fontSize:20,color:'black',fontWeight:'600'}}>Phật tại gia</Text>
        <Text style={{fontSize:16,color:'white'}}>Phật pháp nhiệm màu</Text>
        </View>
      

      </View>
      <View style={{flexDirection:'row', justifyContent:'space-evenly',margin:10,width:370,padding:15,borderRadius:10,height:100,backgroundColor:'gray'}}>
        <Image style={{width:80,height:60,borderRadius:10,marginEnd:30}} source={require('./images/tai.png')}/>
        <View>
        <Text style={{fontSize:20,color:'black',fontWeight:'600'}}>Pháp hải</Text>
        <Text style={{fontSize:16,color:'white'}}>Phật pháp nhiệm màu</Text>
        </View>
      

      </View>
    </SafeAreaView>
    </ScrollView>
    </ImageBackground>
  );
}
const st = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop:10,
    marginRight:190,
    color:'white',
},
bg:{
  flex: 1,
  resizeMode: 'cover',
},
});
export default Music;