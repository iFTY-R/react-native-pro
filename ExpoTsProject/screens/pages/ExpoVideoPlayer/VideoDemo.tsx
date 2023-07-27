import { AVPlaybackStatus, ResizeMode, Video, VideoReadyForDisplayEvent } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { setStatusBarHidden } from 'expo-status-bar';
import ScreenRootInit from '../../../components/ScreenRootInit';

import * as ScreenOrientation from 'expo-screen-orientation';
import { BackHandler, Dimensions, NativeEventSubscription } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function VideoDemo() {

  const [inFullscreen, setInFullscreen] = useState(false);
  const refVideo = useRef<Video>(null) as MutableRefObject<Video>;
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);

  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('screen'));

  const setNavigationBar = async () => {
    await NavigationBar.setBehaviorAsync('overlay-swipe');
    await NavigationBar.setBackgroundColorAsync('#000000');
  };

  const resetNavigationBar = async () => {
    await NavigationBar.setBackgroundColorAsync('#ffffff');
  };


  /**
   * 只执行一次，
   */
  useEffect(() => {
    setWindowDimensions(Dimensions.get('window'));
    setScreenDimensions(Dimensions.get('screen'));
    // console.log('start------------', Dimensions.get('window'), Dimensions.get('screen'));
    setVideoWidth(windowDimensions.width);
    setVideoHeight(windowDimensions.height);

    setNavigationBar().catch(e => {
      console.log('1---x', e);
    });

    return () => {
      console.log('exit---');
      resetNavigationBar().then();
      ScreenOrientation.unlockAsync().then();
      setStatusBarHidden(false, 'fade');
    };
  }, []);


  const handleEnterFullscreen = () => {
    setStatusBarHidden(true, 'fade');
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).then();
    NavigationBar.setVisibilityAsync('hidden').then();
    refVideo.current?.setStatusAsync({
      shouldPlay: true,
    }).then();
  };

  const handleExitFullscreen = () => {
    setStatusBarHidden(false, 'fade');
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT).then();
    ScreenOrientation.unlockAsync().then();
    NavigationBar.setVisibilityAsync('visible').then();
    refVideo.current?.setStatusAsync({
      shouldPlay: false,
    }).then();

  };

  const enterFullscreen = () => {
    // console.log('1---------------', screenDimensions);
    setVideoWidth(screenDimensions.height);
    setVideoHeight(screenDimensions.width);
    setInFullscreen(true);
    handleEnterFullscreen();
  };
  const exitFullscreen = () => {
    // console.log('0---------------', windowDimensions);
    setVideoWidth(windowDimensions.width);
    setVideoHeight(windowDimensions.height);
    setInFullscreen(false);
    handleExitFullscreen();
  };

  let backHandler: NativeEventSubscription | null = null;
  useEffect(() => {
    // 监听退出，如果全屏，则退出全屏，而不是退出页面。
    const backAction = () => {
      // 在这里编写你的逻辑，例如提示用户是否要退出应用
      // 如果要阻止页面退出，返回 true
      if (inFullscreen) {
        exitFullscreen();
      }
      return inFullscreen;
    };
    if (backHandler) {
      backHandler.remove();
    }
    backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
    );
    return () => {
      backHandler?.remove();
    };
  }, [inFullscreen]);

  /**
   * 获取视频的详细信息
   * @param e
   */
  const handleReadyForDisplay = (e: VideoReadyForDisplayEvent) => {
    // const isLandscape = e.naturalSize.orientation === 'landscape';
    // 获取视频 宽高等信息
    // console.log(e);
  };
  /**
   * 获取播放状态信息
   * @param status
   */
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    // console.log(status);
  };

  const videoProps = {
    shouldPlay: false,
    resizeMode: ResizeMode.CONTAIN,
    useNativeControls: false,
    source: {
      // uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      uri: 'http://42.192.52.79/video/mp4/3.mp4',
    },
    ref: refVideo,
    onReadyForDisplay: handleReadyForDisplay,
    onPlaybackCallback: handlePlaybackStatusUpdate,
  };
  const fullscreenOptions = {
    inFullscreen,
    enterFullscreen: async () => {
      enterFullscreen();
    },
    exitFullscreen: async () => {
      exitFullscreen();
    },
  };
  const videoStyle: any = {
    // videoBackgroundColor: 'transparent',
  };
  if (videoWidth) {
    videoStyle.width = videoWidth;
  }

  if (videoHeight) {
    videoStyle.height = videoHeight;
  }
  return <ScreenRootInit style={{ flex: 1 }}>
    <FocusAwareStatusBar barStyle="light-content" backgroundColor={'#000'} />
    <VideoPlayer
        videoProps={videoProps}
        fullscreen={fullscreenOptions}
        style={videoStyle}
    />
  </ScreenRootInit>;
}
