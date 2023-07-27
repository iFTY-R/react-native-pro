import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import Animated, { Easing, Extrapolate } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedVideo = Animated.createAnimatedComponent(Video);

export default function TikTokPlayer1(props: {
  videos: { uri: string }[];
  onEnd?: () => void;
}) {
  // 状态管理
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState(props.videos);
  const [playing, setPlaying] = useState(true);

  // 动画管理
  const [activeAnimation, setActiveAnimation] = useState(new Animated.Value(0));
  const [nextAnimation, setNextAnimation] = useState(new Animated.Value(1));
  const [outAnimation, setOutAnimation] = useState(new Animated.Value(0));

  // 视频控制管理
  const [videoStatus, setVideoStatus] = useState({ isLoaded: false, isPlaying: false });
  const videoRef = useRef<Video>(null);

  // 生命周期管理
  useEffect(() => {
    const initializeVideo = async () => {
      try {
        const status = await videoRef.current!.loadAsync(
            { uri: videos[currentVideoIndex].uri },
            { shouldPlay: playing },
        );
        if (status.isLoaded) {
          setVideoStatus({ isLoaded: true, isPlaying: status.isPlaying });
        }
      } catch (error) {
        console.error(error);
      }
    };
    initializeVideo().then();
  }, [currentVideoIndex]);

  useEffect(() => {
    if (videoRef.current && videoStatus.isLoaded && playing) {
      videoRef.current.playAsync().then();
      setVideoStatus({ ...videoStatus, isPlaying: true });
    } else if (videoRef.current && videoStatus.isLoaded && !playing) {
      videoRef.current.pauseAsync().then();
      setVideoStatus({ ...videoStatus, isPlaying: false });
    }
  }, [playing]);

  // 其他辅助方法
  const handleVideoEnd = () => {
    if (props.onEnd) {
      props.onEnd();
    }
    if (currentVideoIndex === videos.length - 1) {
      setCurrentVideoIndex(0);
    } else {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };
  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / width);
    setCurrentVideoIndex(index);
  };

  // 渲染方法
  const renderVideoItem = ({ item, index }: { item: { uri: string }; index: number }) => {
    const isActive = currentVideoIndex === index;
    const isIncoming = currentVideoIndex === index - 1;
    const isOutgoing = currentVideoIndex === index + 1;
    const isPrev = currentVideoIndex === index - 2;
    const isNext = currentVideoIndex === index + 2;

    const activeScale = activeAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
      // easing: Easing.out(Easing.ease),
    });

    const nextScale = nextAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.8],
      // easing: Easing.out(Easing.ease),
    });

    const outScale = outAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2],
      // easing: Easing.out(Easing.ease),
    });

    return (
        <Animated.View
            style={[
              styles.videoContainer,
              isActive && styles.activeVideoContainer,
              isIncoming && styles.incomingVideoContainer,
              isOutgoing && styles.outgoingVideoContainer,
              isPrev && styles.prevVideoContainer,
              isNext && styles.nextVideoContainer,
              {
                transform: [
                  { scale: isActive ? activeScale : isIncoming ? nextScale : isOutgoing ? outScale : 1 },
                ],
              },
            ]}
        >
          <AnimatedVideo
              ref={videoRef}
              style={styles.video}
              source={{ uri: item.uri }}
              shouldPlay={playing}
              resizeMode={ResizeMode.COVER}
              isLooping={false}
              onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                if (!(status.isLoaded) || status.didJustFinish) {
                  handleVideoEnd();
                }
              }}
          />
        </Animated.View>
    );
  };

  return (
      <View style={styles.container}>
        <FlatList
            data={videos}
            renderItem={renderVideoItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={handleScroll}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={3}
            removeClippedSubviews={true}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeVideoContainer: {
    zIndex: 3,
  },
  incomingVideoContainer: {
    zIndex: 2,
  },
  outgoingVideoContainer: {
    zIndex: 1,
  },
  prevVideoContainer: {
    zIndex: 0,
  },
  nextVideoContainer: {
    zIndex: 0,
  },
  video: {
    width,
    height,
  },
});

