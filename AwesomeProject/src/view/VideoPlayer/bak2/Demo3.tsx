import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = () => {
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoList] = useState([
    {
      uri: 'https://video.699pic.com/videos/73/92/43/b_mPEcRsUxTkE91597739243.mp4',
      title: 'Big Buck Bunny',
    },
    {
      uri: 'https://video.699pic.com/videos/73/92/43/b_mPEcRsUxTkE91597739243.mp4',
      title: 'Elephants Dream',
    },
  ]);
  const videoRef = useRef(null);
  const progressWidth = Dimensions.get('window').width;
  const [progressAnim] = useState(new Animated.Value(0));
  const [panResponder] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (evt, gestureState) => {
        setCurrentTime(currentTime + gestureState.dx / 100);
      },
      onPanResponderRelease: (evt, gestureState) => {
        setCurrentTime(currentTime + gestureState.dx / 100);
      },
    }),
  );

  const handleEnd = () => {
    const nextIndex = videoIndex + 1 >= videoList.length ? 0 : videoIndex + 1;
    setVideoIndex(nextIndex);
    setCurrentTime(0);
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleProgress = ({ currentTime, playableDuration }) => {
    const progress = currentTime / playableDuration;
    Animated.timing(progressAnim, {
      toValue: progressWidth * progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Video
        ref={videoRef}
        source={{ uri: videoList[videoIndex].uri }}
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        paused={paused}
        onLoad={() => {}}
        onBuffer={() => {}}
        onError={() => {}}
        onEnd={handleEnd}
        onProgress={handleProgress}
      />
      <TouchableOpacity
        onPress={() => setPaused(!paused)}
        style={{ position: 'absolute', top: 20, right: 20 }}>
        <Text>{paused ? 'Play' : 'Pause'}</Text>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          backgroundColor: '#fff',
        }}>
        <Animated.View
          style={{
            backgroundColor: '#000',
            height: 2,
            width: progressAnim,
            transform: [{ translateY: -1 }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            transform: [{ translateY: -40 }],
          }}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

export default VideoPlayer;
