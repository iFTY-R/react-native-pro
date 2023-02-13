/**
 * 这个代码示例使用了 `PanResponder` 组件来处理上下滑动手势，切换视频。
 * 同时使用了 `Video` 组件来播放视频，并设置了音量和进度等。
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import Video from 'react-native-video';
import { videoList } from './data';

const VideoPlayer = () => {
  const videoRef = useRef<Video>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playableDuration, setPlayableDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [brightness, setBrightness] = useState(1.0);
  const [pan, setPan] = useState(new Animated.ValueXY());

  console.log('*************', videoIndex, new Date().getTime());

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, { dy }) => {
      if (dy > 100) {
        // 向下翻
        Animated.timing(pan, {
          toValue: { x: 0, y: 500 },
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          let temp = videoIndex - 1;
          console.log(temp);
          temp = temp < 0 ? videoList.length - 1 : temp;
          console.log(`dy: ${dy} ，videoIndex: ${videoIndex}`, temp);
          setVideoIndex(temp);
          console.log(temp, videoIndex);
          pan.setValue({ x: 0, y: 0 });
        });
      } else if (dy < -100) {
        // 向上翻
        Animated.timing(pan, {
          toValue: { x: 0, y: -500 },
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          const temp = videoIndex < videoList.length - 1 ? videoIndex + 1 : 0;
          console.log(`dy: ${dy} ，videoIndex: ${videoIndex}`, temp);
          setVideoIndex(temp);
          console.log('-------', videoIndex);
          pan.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      }
    },
  });
  const currentVideo = videoList[videoIndex];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.videoContainer, { transform: [{ translateY: pan.y }] }]}
        {...panResponder.panHandlers}>
        <Video
          ref={videoRef}
          source={{ uri: currentVideo }}
          style={styles.video}
          volume={volume}
          rate={1.0}
          paused={false}
          controls={true}
          repeat={true}
          resizeMode="contain"
          onProgress={({ currentTime, playableDuration }) => {
            setCurrentTime(currentTime);
            setPlayableDuration(playableDuration);
          }}
          onEnd={() => {
            videoRef.current!.seek(0);
          }}
        />
      </Animated.View>
      <View style={styles.controlsContainer}>
        <Text style={styles.text}>
          视频进度: {currentTime}s - {playableDuration}s
        </Text>
        {/*<Text style={styles.text}>音量: {volume}</Text>*/}
        <Text style={styles.text}>index: {videoIndex}</Text>
        <Text style={styles.text}>屏幕亮度: {brightness}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    // width,
    // height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    // width,
    // height,
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});

export default VideoPlayer;
