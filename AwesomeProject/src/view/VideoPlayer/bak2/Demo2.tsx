import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, PanResponder } from 'react-native';
import Video from 'react-native-video';

interface VideoProps {
  source: string;
}

const VideoPlayer = ({ source }: VideoProps) => {
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderLeft, setSliderLeft] = useState(new Animated.Value(0));
  const videoRef = useRef<Video>(null);
  const sliderRef = useRef<View>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(currentTime);
    }
  }, [currentTime]);

  const handleLoad = (data: { duration: number }) => {
    setDuration(data.duration);
  };

  const handleProgress = (data: { currentTime: number }) => {
    setCurrentTime(data.currentTime);
    Animated.timing(sliderLeft, {
      useNativeDriver: false,
      toValue: (data.currentTime / duration) * sliderWidth,
      duration: 0,
    }).start();
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 10;
    },
    onPanResponderGrant: () => {
      setPaused(true);
    },
    onPanResponderMove: (evt, gestureState) => {
      const nextTime = currentTime + (gestureState.dx / sliderWidth) * duration;
      setCurrentTime(Math.max(0, Math.min(duration, nextTime)));
    },
    onPanResponderRelease: () => {
      setPaused(false);
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Video
        ref={videoRef}
        source={{ uri: source }}
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        paused={paused}
        onLoad={handleLoad}
        onProgress={handleProgress}
        onBuffer={() => {}}
        onError={() => {}}
      />
      <TouchableOpacity
        onPress={() => setPaused(!paused)}
        style={{ flex: 1 }}
      />
      <View
        style={{
          height: 50,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          paddingHorizontal: 20,
          justifyContent: 'center',
        }}
        onLayout={(event) => {
          setSliderWidth(event.nativeEvent.layout.width - 40);
        }}>
        <View
          style={{
            height: 2,
            backgroundColor: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}>
          <Animated.View
            ref={sliderRef}
            style={{
              position: 'absolute',
              left: sliderLeft,
              top: 0,
              bottom: 0,
              width: 2,
              backgroundColor: 'red',
            }}
            {...panResponder.panHandlers}
          />
        </View>
      </View>
    </View>
  );
};

export default VideoPlayer;
