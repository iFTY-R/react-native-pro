module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ...
    'react-native-reanimated/plugin', // 必须在最后
  ],
};
