import React, { useState, useRef, useEffect } from 'react';
import { View, PanResponder, Animated, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { videoList } from './data';

const VideoPlayer = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, { dy }) => {
        if (dy > 100) {
          Animated.timing(pan, {
            toValue: { x: 0, y: 500 },
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            setVideoIndex(videoIndex + 1);
            pan.setValue({ x: 0, y: 0 });
          });
        } else if (dy < -100) {
          Animated.timing(pan, {
            toValue: { x: 0, y: -500 },
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            setVideoIndex(videoIndex - 1);
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
    }),
  ).current;

  useEffect(() => {
    if (videoIndex < 0) {
      setVideoIndex(0);
    } else if (videoIndex >= videoList.length) {
      setVideoIndex(videoList.length - 1);
    }
  }, [videoIndex]);

  const currentVideo = videoList[videoIndex];

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: pan.y }] }]}
      {...panResponder.panHandlers}>
      <Video source={{ uri: currentVideo }} style={styles.video} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPlayer;
