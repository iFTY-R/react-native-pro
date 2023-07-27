import { WebView } from 'react-native-webview';
import { Keyboard, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { useState } from 'react';
import ScreenRootInit from '../../components/ScreenRootInit';


export default function TabChatGPTScreen() {
  const handleShouldStartLoadWithRequest = () => {
    return true;
  };

  const [webviewHeight, setWebviewHeight] = useState<string>('103.5%');

  // 监听键盘事件
  Keyboard.addListener('keyboardDidShow', () => {
    setWebviewHeight('105.5%');
  });
  Keyboard.addListener('keyboardDidHide', () => {
    setWebviewHeight('103.5%');
  });
  return (
      <ScreenRootInit>
        <FocusAwareStatusBar barStyle="light-content" backgroundColor="#343541" />
        <View
            style={{ width: '100%', height: webviewHeight }}
        >
          <WebView
              source={{
                uri: 'https://chat.openai.com/chat',
              }}
              originWhitelist={['*']}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              thirdPartyCookiesEnabled={true}
              pullToRefreshEnabled={true}
              scalesPageToFit={false}
              onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          />
        </View>
      </ScreenRootInit>
  );
};
