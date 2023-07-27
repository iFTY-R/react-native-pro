/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  /*
  // prefixes: [Linking.createURL('/')],
  这个配置是用来定义 app 内部链接的前缀。如果你的 app 没有自定义的 scheme，你可以删除掉这一行，因为它会导致错误。
  例如，如果你的应用有自定义的 scheme 名称为 myapp，你可以修改代码如下：
  prefixes: [Linking.createURL('myapp://')],
   */
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabChatGPT: {
            screens: {
              TabChatGPTScreen: 'chatGPT',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      Modal: 'modal',
      // VideoDemo: 'card',
      // ExpoVideoPlayerDemo: 'card',
      NotFound: '*',
    },
  }
};

export default linking;
