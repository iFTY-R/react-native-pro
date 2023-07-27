import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface TikTokPlayerProps {
  uri: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const VIDEO_WIDTH = SCREEN_WIDTH;
const VIDEO_HEIGHT = (VIDEO_WIDTH / 9) * 16;
const MAX_TRANSLATE_Y = SCREEN_HEIGHT - VIDEO_HEIGHT;

const TikTokPlayer: React.FC<TikTokPlayerProps> = ({ uri }) => {
  const video = useRef<Video>(null);

  // 用于控制视频播放状态的 hook
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  // 用于控制视频容器位置的 shared value
  const translateY = useSharedValue(0);

  // 定义手势事件处理函数
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      // 记录手指初始位置
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      // 根据手指移动距离计算视频容器新的位置
      const newTranslateY = ctx.startY + event.translationY;

      // 判断新的位置是否超出边界，如果超出则限制位置
      translateY.value = Math.max(Math.min(newTranslateY, MAX_TRANSLATE_Y), 0);
    },
    onEnd: (event) => {
      // 根据手指离开时的速度自动调整视频容器位置
      const velocity = event.velocityY;

      // 如果速度超过阈值，则根据方向计算出目标位置并执行动画
      if (Math.abs(velocity) > 800) {
        const destination =
            translateY.value +
            (velocity > 0 ? MAX_TRANSLATE_Y - translateY.value : -translateY.value);

        translateY.value = withTiming(Math.max(Math.min(destination, MAX_TRANSLATE_Y), 0), {
          duration: 300,
        });
      }
    },
  });

  // 定义视频容器的样式
  const videoContainerStyle = useAnimatedStyle(() => {
    return {
      width: VIDEO_WIDTH,
      height: VIDEO_HEIGHT,
      transform: [{ translateY: translateY.value }],
    };
  });

  // 监听视频播放状态
  useEffect(() => {
    if (status && (!(status.isLoaded) || status.didJustFinish)) {
      // 如果视频播放完毕，重置播放位置并重新播放
      translateY.value = withTiming(0, { duration: 300 });
      video.current?.replayAsync();
    }
  }, [status]);

  return (
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.videoContainer, videoContainerStyle]}>
            <Video
                ref={video}
                source={{ uri }}
                resizeMode={ResizeMode.CONTAIN}
                isLooping={false}
                shouldPlay
                style={styles.video}
                onPlaybackStatusUpdate={setStatus}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
  );
};

export default TikTokPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  video: {
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
  },
});
