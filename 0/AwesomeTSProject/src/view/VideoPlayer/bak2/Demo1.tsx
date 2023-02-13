import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import Video, { OnProgressData } from 'react-native-video';

const VideoPlayer = ({
  videos,
  activeIndex,
}: {
  videos: any[];
  activeIndex: number;
}) => {
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoOpacity] = useState(new Animated.Value(1));
  const [videoScale] = useState(new Animated.Value(1));
  const [videoTop] = useState(new Animated.Value(0));
  const [videoLeft] = useState(new Animated.Value(0));
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<Video>(null);
  const progressRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current!.seek(currentTime);
    }
  }, [currentTime]);

  useEffect(() => {
    if (progressRef.current) {
      // progressRef.current.setValue(progress);
    }
  }, [progress]);

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

  const handleVideoEnd = () => {
    Animated.sequence([
      Animated.timing(videoOpacity, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }),
      Animated.parallel([
        Animated.timing(videoTop, {
          useNativeDriver: false,
          toValue: -200,
          duration: 500,
        }),
        Animated.timing(videoLeft, {
          useNativeDriver: false,
          toValue: -200,
          duration: 500,
        }),
        Animated.timing(videoScale, {
          useNativeDriver: false,
          toValue: 0.5,
          duration: 500,
        }),
      ]),
    ]).start(() => {
      setProgress(0);
      videoOpacity.setValue(1);
      videoScale.setValue(1);
      videoTop.setValue(0);
      videoLeft.setValue(0);
      setCurrentTime(0);
    });
  };

  const handleProgress = (data: OnProgressData) => {
    setProgress(data.currentTime / data.seekableDuration);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: videoTop,
          left: videoLeft,
          opacity: videoOpacity,
          transform: [{ scale: videoScale }],
        }}>
        <Video
          ref={videoRef}
          source={{ uri: videos[activeIndex].url }}
          paused={paused}
          onEnd={handleVideoEnd}
          onProgress={handleProgress}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: 'gray',
          }}>
          <Animated.View
            style={{
              width: progress * 100 + '%',
              height: 2,
              backgroundColor: 'blue',
            }}
            {...panResponder.panHandlers}
            ref={progressRef}
          />
        </View>
        {/*{videos.map((video, index) => (
          <TouchableOpacity
            key={index}
            style={{
              position: 'absolute',
              right: index * 50,
              bottom: 20,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: index === activeIndex ? 'blue' : 'gray',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setPaused(false);
              setCurrentTime(0);
              Animated.parallel([
                Animated.timing(videoTop, {
                  useNativeDriver: false,
                  toValue: index * 50,
                  duration: 500,
                }),
                Animated.timing(videoLeft, {
                  useNativeDriver: false,
                  toValue: index * 50,
                  duration: 500,
                }),
                Animated.timing(videoScale, {
                  useNativeDriver: false,
                  toValue: 1,
                  duration: 500,
                }),
                Animated.timing(videoOpacity, {
                  useNativeDriver: false,
                  toValue: 1,
                  duration: 500,
                }),
              ]).start();
            }}>
            <Text style={{ color: 'white' }}>{index + 1}</Text>
          </TouchableOpacity>
        ))}*/}
      </View>
    </View>
  );
};

export default VideoPlayer;
