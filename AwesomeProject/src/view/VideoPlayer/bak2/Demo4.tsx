import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = () => {
  const [videoSources, setVideoSources] = useState<string[]>([
    'https://video.699pic.com/videos/73/92/43/b_mPEcRsUxTkE91597739243.mp4',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(new Animated.Value(1));
  const [thumbLeft, setThumbLeft] = useState(new Animated.Value(0));
  const videoRef = useRef<any>(null);
  const progressRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(currentTime);
    }
  }, [currentTime]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 10;
    },
    onPanResponderMove: (evt, gestureState) => {
      setPaused(true);
      Animated.timing(thumbLeft, {
        toValue: gestureState.dx,
        useNativeDriver: false,
        duration: 0,
      }).start();
    },
    onPanResponderRelease: (evt, gestureState) => {
      setPaused(false);
      if (progressRef.current) {
        const progressWidth = progressRef.current.nativeEvent.layout.width;
        const newCurrentTime =
          (currentTime +
            (gestureState.dx / progressWidth) *
              videoRef.current.getDuration()) /
          videoRef.current.getDuration();
        setCurrentTime(newCurrentTime);
        Animated.timing(thumbLeft, {
          useNativeDriver: false,
          toValue: 0,
          duration: 0,
        }).start();
      }
    },
  });

  const handleVideoEnd = () => {
    Animated.timing(videoOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex((currentIndex + 1) % videoSources.length);
      Animated.timing(videoOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ ...styles.videoContainer, opacity: videoOpacity }}>
        <Video
          ref={videoRef}
          source={{ uri: videoSources[currentIndex] }}
          style={styles.video}
          paused={paused}
          resizeMode="cover"
          onEnd={handleVideoEnd}
        />
      </Animated.View>
      <View style={styles.bottomContainer}>
        <View
          style={styles.progressContainer}
          onLayout={(e) => {
            progressRef.current = e;
          }}>
          <View style={styles.progressBar} />
          <Animated.View
            style={{ ...styles.thumb, left: thumbLeft }}
            {...panResponder.panHandlers}
          />
        </View>
        <TouchableOpacity onPress={() => setPaused(!paused)}>
          <Text style={styles.pauseButton}>{paused ? 'Play' : 'Pause'}</Text>
        </TouchableOpacity>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    // width: '100%',
    // height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottomContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'gray',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'red',
  },
  thumb: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    top: -8,
  },
  pauseButton: {
    color: 'white',
    fontSize: 16,
  },
});

export default VideoPlayer;
