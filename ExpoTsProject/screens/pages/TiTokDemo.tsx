import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TikTokPlayer from './TikTokPlayer';
import TikTokPlayer1 from './TikTokPlayer1';

export default function TiTokDemo() {
  return (
      <View style={{ flex: 1 }}>
        {/*<TikTokPlayer uri={"http://42.192.52.79/video/mp4/2.mp4"} />*/}
        <TikTokPlayer1
            videos={[
              { uri: 'http://42.192.52.79/video/mp4/2.mp4' },
              { uri: 'http://42.192.52.79/video/mp4/4.mp4' },
            ]} />
      </View>
  );
}

const styles = StyleSheet.create({});
