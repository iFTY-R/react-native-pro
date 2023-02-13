import VideoPlayer1 from './Demo1';
import { videoList } from './data';
import * as React from 'react';

export function VideoPlayer() {
  return <VideoPlayer1 videoList={videoList} />;
  // return <VideoPlayer1 />;
  // return (
  //   <VideoPlayer1
  //     source={
  //       'https://video.699pic.com/videos/73/92/43/b_mPEcRsUxTkE91597739243.mp4'
  //     }
  //   />
  // );
}
