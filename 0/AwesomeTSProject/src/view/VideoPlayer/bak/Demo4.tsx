import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, PanResponder } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = () => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
      // videoRef.current.seek(currentTime);
    }
  }, [currentTime]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 10;
    },
    onPanResponderMove: (evt, gestureState) => {
      setPaused(true);
      setCurrentTime(currentTime + gestureState.dx / 100);
    },
    onPanResponderRelease: (evt, gestureState) => {
      setPaused(false);
    },
  });

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <Video
        ref={videoRef}
        source={{
          uri: 'https://v26-web.douyinvod.com/b26653d5e09d1cc809a128c58194ddcf/63e61d19/video/tos/cn/tos-cn-ve-15/oIFlGenP7BBAAoX5LODQKfCAMgAAdDLhnHbMzf/',
        }}
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        paused={paused}
        onLoad={() => {}}
        onBuffer={() => {}}
        onError={() => {}}
      />
      <TouchableOpacity
        onPress={() => setPaused(!paused)}
        style={{ position: 'absolute', top: 20, right: 20 }}>
        <Text>{paused ? 'Play' : 'Pause'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;
