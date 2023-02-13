import * as React from 'react';
import {Button, Linking, Text, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';
import {videoList} from '../view/VideoPlayer/data';
import {VideoPlayer} from '../view/VideoPlayer/Demo';

const LeftDrawer = createDrawerNavigator();

function HomeScreen({navigation}: any) {
  const drawerStatus = useDrawerStatus();

  useEffect(() => {
    const _drawerItemPress = navigation.addListener(
      'drawerItemPress',
      (e: any) => {
        // e.preventDefault();
      },
    );
    return function () {
      _drawerItemPress();
    };
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      <Button
        onPress={() => navigation.getParent().toggleDrawer()}
        title="Open left drawer"
      />
      <Button
        onPress={() => navigation.toggleDrawer()}
        title="Open right drawer"
      />
      <Text>{drawerStatus}</Text>
    </View>
  );
}

function NotificationsScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

/**
 * 自定义 DrawerContent
 * @param props
 * @constructor
 */
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="百度"
        onPress={() => Linking.openURL('https://www.baidu.com')}
      />
    </DrawerContentScrollView>
  );
}

/*
function CustomDrawerContent2({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="DrawerHome"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate('DrawerHome');
        }}
      />
      <Button
        title="Notifications"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate('Notifications');
        }}
      />
    </View>
  );
}
*/

const RightDrawer = createDrawerNavigator();

const RightDrawerScreen = () => {
  return (
    <RightDrawer.Navigator
      screenOptions={{drawerPosition: 'right', headerShown: false}}>
      <RightDrawer.Screen
        name="RightDrawerHome"
        component={HomeScreen}
        options={{
          title: 'RightDrawerHome',
          drawerIcon: ({focused, color, size}) => (
            <Ionicons name={'home'} size={size} color={color} />
          ),
        }}
      />
      <RightDrawer.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <RightDrawer.Screen name="视频-1" component={VideoPlayer} />
      {/*<RightDrawer.Screen name="视频-2" component={VideoPlayer2} />*/}
      {/*<RightDrawer.Screen name="视频-3" component={VideoPlayer3} />*/}
      {/*<RightDrawer.Screen name="视频-4" component={VideoPlayer4} />*/}
    </RightDrawer.Navigator>
  );
};

export default function RouterDrawer() {
  return (
    /*
          defaultStatus="closed"    open or closeds
          */
    <LeftDrawer.Navigator
      initialRouteName="DrawerHome"
      drawerContent={CustomDrawerContent}
      defaultStatus="closed"
      screenOptions={
        {
          // drawerPosition: 'right',
          // headerShown: false,
        }
      }>
      <LeftDrawer.Screen name="LeftDrawer" component={RightDrawerScreen} />
      {/*<LeftDrawer.Screen
        name="DrawerHome"
        component={HomeScreen}
        options={{
          title: 'DrawerHome',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={'home'} size={size} color={color} />
          ),
        }}
      />
      <LeftDrawer.Screen name="Notifications" component={NotificationsScreen} />
      <CustomDrawerContent />*/}
    </LeftDrawer.Navigator>
  );
}
