import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';

interface Props {
  videoList: any[];
}

const VideoPlayer: React.FC<Props> = ({ videoList }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const videoRef = useRef<Video>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const handlePlayback = () => {
    setVideoPaused(!videoPaused);
  };

  const handleProgress = (data: any) => {
    setVideoProgress(data.currentTime / data.seekableDuration);
  };

  const handleEnd = () => {
    setCurrentVideo(currentVideo + 1);
    fadeIn();
  };

  const changeVideo = (index: number) => {
    fadeOut();
    setTimeout(() => {
      setCurrentVideo(index);
    }, 300);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentVideo]);

  return (
    <View style={[fullscreen ? styles.fullscreen : styles.container]}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Video
          source={{ uri: videoList[currentVideo].url }}
          ref={videoRef}
          style={styles.video}
          paused={videoPaused}
          onEnd={handleEnd}
          onProgress={handleProgress}
        />
        <View style={styles.controls}>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayback}>
            <Text style={styles.playButtonText}>
              {videoPaused ? 'Play' : 'Pause'}
            </Text>
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${videoProgress * 100}%` }]}
            />
          </View>
          <TouchableOpacity
            style={styles.fullscreenButton}
            onPress={toggleFullscreen}>
            <Text style={styles.fullscreenButtonText}>
              {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <FlatList
        data={videoList}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() => changeVideo(index)}>
            <Text style={styles.videoItemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  video: {
    width: '100%',
    height: 200,
  },
  controls: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  playButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  playButtonText: {
    fontWeight: 'bold',
  },
  progressBarContainer: {
    flex: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
  },
  fullscreenButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  fullscreenButtonText: {
    fontWeight: 'bold',
  },
  videoItem: {
    padding: 10,
  },
  videoItemText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default VideoPlayer;
