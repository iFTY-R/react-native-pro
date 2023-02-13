/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DemoPage from './src/view/PageDemo';
import Day01 from './src/view/day01';
import FsDemoPage from './src/view/FsDemoPage';
import PageText from './src/view/ReactNativeUI/PageText';
import PageInput from './src/view/ReactNativeUI/PageInput';
import {NativeBaseProvider} from 'native-base';
import PageButton from './src/view/ReactNativeUI/PageButton';
import PageForm from './src/view/ReactNativeUI/PageForm';
import PageModals from './src/view/ReactNativeUI/PageModals';
import PageDrawerScreen from './src/view/ReactNativeUI/PageDrawerScreen';
import {NavigationContainer} from '@react-navigation/native';
import RouterStack from './src/router/router-stack';
import RouterTabs from './src/router/router-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RouterDrawer from './src/router/router-drawer';
import {navigationRef} from './src/router/RootNavigation';

// import PageSpinner from './view/ReactNativeUI/PageSpinner';

export function PageStatusBar() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const barStyle = isDarkMode ? 'light-content' : 'dark-content';
  return <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />;
}

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={null}>
      <NavigationContainer ref={navigationRef}>
        {/*<PageStatusBar />*/}
        <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
        {/*
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <DemoPage backgroundStyle={backgroundStyle} isDarkMode={isDarkMode} />
        <FsDemoPage />
        <Day01 />
        <PageText />
        <PageInput />
        <PageButton />
        <PageSpinner />
        <PageForm />
        <PageModals />
        <PageDrawerScreen />
        */}
        {/*<RouterTabs />*/}
        {/*<RouterDrawer />*/}
        <RouterStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// const styles = StyleSheet.create({});

export default App;
