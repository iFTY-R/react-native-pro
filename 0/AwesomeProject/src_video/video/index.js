import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';

const baseURL = 'http://42.192.52.79:7001';
const getVideos = async () => {
  return await axios({
    baseURL,
    url: '/v1/api/video/chuniao/recommend',
    method: 'POST',
    data: {
      page: 1,
      page_size: 10,
    },
  }).then(res => res.data);
};
export default class MyComponent extends Component {
  player: null;

  onBuffer(...args) {
    console.log(args);
  }

  videoError(...args) {
    console.log(args);
  }

  render() {
    // console.log(getVideos());
    // 'https://video.699pic.com/videos/73/92/43/b_mPEcRsUxTkE91597739243.mp4',
    return (
      <View>
        <Text>11</Text>
        <Video
          ref={ref => {
            this.player = ref;
          }} // Store reference
          source={{
            uri: 'http://app.cdn.chuniaocloud.site/ig/admin_video/061209/5W7i/76c4/dd9fdb0ebbcafa1f7fed7867cba2da34.m3u8',
          }}
          resizeMode="contain" //视频适应方式
          controls={true} //显示控制按钮
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 300,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
