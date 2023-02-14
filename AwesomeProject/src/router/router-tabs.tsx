import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PageNativeStack } from '../view/ReactNativeUI/navigation/PageNativeStack';
import PageDemo from '../view/PageDemo';
import RouterDrawer from './router-drawer';

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

/*function SettingsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}*/

const Tab = createBottomTabNavigator();

export default function RouterTabs(props: any) {
  // 获取额外数据
  // console.log(props.extraData);
  return (
    <>
      <Tab.Navigator
        initialRouteName="RouterStack"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'RouterStack') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          // 是否隐藏导航栏
          // headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{}} />
        <Tab.Screen
          name="RouterStack"
          component={PageNativeStack}
          options={({ route }: any) => ({
            tabBarBadge: route.params?.count || 3,
          })}
        />
        <Tab.Screen
          name="Settings"
          component={RouterDrawer}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
