// import React from 'react';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import YouTubeIframe from 'react-native-youtube-iframe';

// const Yoga = () => {
//   const videoId = 'iwGuiSnr2Qc'; // Thay thế bằng ID video YouTube về chủ đề thiền của bạn

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Yoga Meditation</Text>
//       <YouTubeIframe
//         height={Dimensions.get('window').width * 0.5625} // Chiều cao video 16:9
//         videoId={videoId}
//       />
//     </View>
//   );
// };

// export default Yoga;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const Yoga = () => {
  const [videoId, setVideoId] = useState('71PmTZOgmXA'); // ID của video YouTube mặc định

  const yogaVideos = [
    { id: 'iwGuiSnr2Qc', title: 'Yoga Cho người mới bắt đầu' },
    { id: 'WnSr8w4QEWo', title: 'Yoga cho người tập chuyên nghiệp' },
  ];

  const meditationVideos = [
    { id: 'fthnDEm29nc', title: 'Thiền cho người mới bắt đầu' },
    { id: '3d3zl6O1WnI', title: 'Thiền tập trung' },
    { id: 'GjZAgs1cw18', title: 'Thiền sâu' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setVideoId(item.id)} style={styles.videoItem}>
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }} // Sử dụng URL nhúng
          style={styles.video}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={true}
        />
      </View>
      <Text style={styles.title}>Yoga</Text>
      <FlatList
        data={yogaVideos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.title}>Thiền</Text>
      <FlatList
        data={meditationVideos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Yoga;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color : '#fff'
  },
  videoContainer: {
    width: '100%',
    height: '40%', // Chiếm nửa màn hình
    backgroundColor: 'black', // Đặt màu nền để dễ thấy
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoItem: {
    backgroundColor: '#e0e0e0', // Màu nền của item
    borderRadius: 10, // Bo viền tròn
    marginHorizontal: 20, // Khoảng cách hai bên
    marginVertical: 5, // Khoảng cách trên dưới giữa các item
    padding: 10, // Khoảng cách bên trong
    borderWidth: 1, // Độ rộng viền
    borderColor: '#ccc', // Màu viền
  },
  videoTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});