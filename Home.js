import { useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'




const Home = (props) => {
  const {navigation}=props;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const click=()=>{
    navigation.navigate('BMI')
  }
  const click1=()=>{
    navigation.navigate('Sleep')
  }
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <ImageBackground style={[styles.bg, isDarkMode ? styles.bgDark : styles.bgLight]} source={require('./images/nen.jpg')}>
 <ScrollView >
  <View  >
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
    <Image style={{width:40,height:40,borderRadius:20,margin:10}} source={require('./images/people.jpg')}/>
    <View>
    <Text style={{fontSize:13,color:'white',marginTop:10,fontWeight:'400',letterSpacing: 1,}}>Xin chào</Text>
    <Text style={{fontSize:15,color:'white',fontWeight:'600',letterSpacing: 2,}}>Lê Thế Duy</Text>
    </View>
  
    </View>
   
    
    <Image style={{margin:13}} source={require('./images/alarm.png')} />
      
  
    </View>
   
    <View style={[styles.container,isDarkMode ? styles.containerDark : styles.containerLight]}>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <View style={styles.iconContainer}>
  <Image source={require('./images/training2.png')}/>
</View>
<View style={styles.iconContainer}>
  <TouchableOpacity onPress={click1}>
  
  <Image source={require('./images/sleep2.png')}/>
    
  </TouchableOpacity>
</View>
<View style={styles.iconContainer}>
  <Image source={require('./images/watermelon2.png')}/>
</View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      <Text style={{fontSize:14,color:'black',fontWeight:'400'}}>Vận động</Text>
      <Text style={{fontSize:14,color:'black',fontWeight:'400'}}>Nghỉ ngơi</Text>
      <Text style={{fontSize:14,color:'black',fontWeight:'400',marginEnd:17}}>Ăn uống</Text>
        </View>

        
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <View style={styles.iconContainer}>
  <Image source={require('./images/letter.png')}/>
</View>
<View style={{width:80,height:80,borderRadius:10,backgroundColor:'white',margin:10,alignItems:'center',justifyContent:'center'}}>
  <Image source={require('./images/meditation.png')}/>
</View>
<View style={{width:80,height:80,borderRadius:10,backgroundColor:'white',margin:10,alignItems:'center',justifyContent:'center'}}>
  <Image source={require('./images/doctor.png')}/>
</View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      <Text style={{fontSize:14,color:'black',fontWeight:'400',marginLeft:27}}>Bài viết</Text>
      <Text style={{fontSize:14,color:'black',fontWeight:'400',marginLeft:15}}>Thiền-Yoga</Text>
      <Text style={{fontSize:14,color:'black',fontWeight:'400',marginEnd:10}}>Tư vấn tâm lý</Text>
        </View>

          
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <View style={styles.iconContainer}>
  <Image source={require('./images/trend.png')}/>
</View>
<View style={{width:80,height:80,borderRadius:10,backgroundColor:'white',margin:10,alignItems:'center',justifyContent:'center'}}>
  <Image source={require('./images/conversation.png')}/>
</View>
<View style={{width:80,height:80,borderRadius:10,backgroundColor:'white',margin:10,alignItems:'center',justifyContent:'center'}}>
  <TouchableOpacity onPress={click}>
  <Image source={require('./images/bmi.png')}/>
  </TouchableOpacity>

</View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      <Text style={{fontSize:14,color:'black',fontWeight:'400',marginLeft:10}}>Thống kê</Text>
      <Text style={{fontSize:14,color:'black',fontWeight:'400',marginRight:13}}>Kết bạn</Text>
      <Text style={{fontSize:14,color:'black',fontWeight:'400',marginEnd:25}} >BMI</Text>
        </View>

    {/* ///// */}

   <View style={styles.statContainer}>
<Image style={styles.statIcon} source={require('./images/to-do-list.png')}/>
<Text style={styles.statText}>Thống kê hôm qua</Text>
<Image style={styles.statIcon} source={require('./images/back.png')}/>

   </View>
   <View style={styles.statContainer}>
<Image style={styles.statIcon} source={require('./images/target.png')}/>
<Text style={styles.statText}>Nhiệm vụ hôm nay</Text>
<Image style={styles.statIcon}/>

   </View>
   <View style={{width:'90%',height:45,borderRadius:10,backgroundColor:'white',alignSelf:'center',alignItems:'center',marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
<Image style={{marginLeft:10}} source={require('./images/checked.png')}/>
<Text style={{fontSize:16,color:'black',fontWeight:'600',marginRight:60}}>Hoàn thành</Text>
<Image style={{margin:10}} source={require('./images/back.png')}/>

   </View>
  
  

    </View>
   
    



     
      
     
      
    
      
     
  </View>
  <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Text style={styles.themeButtonText}>{isDarkMode ? 'Chế độ sáng' : 'Chế độ tối'}</Text>
        </TouchableOpacity>
    
    </ScrollView>
    </ImageBackground>
   
  )
}

export default Home

const styles = StyleSheet.create({
 
  
  bg:{
    flex: 1,
    resizeMode: 'cover', // Đảm bảo hình ảnh phủ đầy màn hình
    justifyContent: 'center'
  },
  bgLight: {
    backgroundColor: '#F0F0F0',
  },
  bgDark: {
    backgroundColor: '#333',
  },
  container: {
    width: '100%',
    height: 600,
    borderTopLeftRadius: 30,
    marginTop: 10,
    padding: 10,
  },
  containerLight: {
    backgroundColor: '#F0F0F0',
  },
  containerDark: {
    backgroundColor: '#444',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLabel: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  statContainer: {
    width: '90%',
    height: 45,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statIcon: {
    marginLeft: 10,
  },
  statText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginEnd: 15,
    marginRight: 80,
  },
  themeButton: {
    width: '40%',
    height: 45,
    borderRadius: 10,
    backgroundColor: 'blue',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  themeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
 





 
  
})