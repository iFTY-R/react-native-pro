import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageDemo from '../view/PageDemo';
import { HeaderBackBtn } from '../view/ReactNativeUI/navigation/PageNativeStack';
import PageNavigationDemo from '../view/ReactNativeUI/navigation/PageNavigationDemo';
import { Button, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RouterTabs from './router-tabs';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

/**
 * StackHome 中 嵌套 RouterTabs，只有 StackHome 中才有 tab 页
 *
 * 如果 RouterTabs 嵌套 StackHome，那么所有路由都有 tab
 * @constructor
 */
export default function RouterStack() {
  return (
    <Stack.Navigator
      initialRouteName="StackHome"
      screenOptions={({ route, navigation }: any) => ({})}>
      {/* 给一个页面传入额外的参数
        <Stack.Screen
        name="Home"
        options={() => ({
          title: '首页',
        })}>
        {(props) => <PageNativeStack {...props} extraData={someData} />}
      </Stack.Screen>*/}
      {/*component={RouterTabs}*/}
      <Stack.Screen
        name="StackHome"
        options={({ route, navigation }: any) => ({
          headerShown: false,
        })}>
        {(props) => <RouterTabs {...props} extraData={{ a: 1 }} />}
      </Stack.Screen>
      <Stack.Screen
        name="PageNavigationDemo"
        component={PageNavigationDemo}
        options={({ route, navigation }: any) => ({
          title: '路由详情',
          // title: `首页${
          //   route.params?.count !== undefined ? ':' + route.params?.count : ''
          // }`,
          // headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#ffffff',
            fontWeight: 'bold',
          },
          // headerStyle 与 headerBackground 二选一
          // headerStyle: {
          //   backgroundColor: '#2196F3',
          // },
          headerBackground: () => (
            <LinearGradient
              colors={['#27ffa5', '#00d6ea', '#2196F3']}
              locations={[0.3, 0.5, 1]}
              start={{ x: 0.0, y: 1.0 }}
              end={{ x: 0.0, y: 0.0 }}
              style={[{ height: 150 }]}
            />
          ),
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>
                标题：{route.params?.title}
              </Text>
            </View>
          ),
          // 覆盖掉 title 属性
          headerRight: () => (
            <Button
              title="Setting"
              onPress={() => navigation.navigate('PageDemo')}
            />
          ),
          // headerLeft: (props) => (
          //   <HeaderBackBtn navigation={navigation} {...props} />
          // ),
        })}
      />
      {/*导航栏配置*/}
      <Stack.Screen
        name="PageDemo"
        component={PageDemo}
        options={({ route, navigation }) => ({
          title: 'DemoPage',
          // headerStyle: {
          //   backgroundColor: '#2196F3',
          // },
          headerLeft: (props) => (
            <HeaderBackBtn navigation={navigation} {...props} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

/*interface navigation{
  addListener():void
  canGoBack():boolean
  dispatch():void
  getId():string | undefined
  getParent():void
  getState():void
  goBack():void
  isFocused():boolean
  navigate():void
  pop():void
  popToTop():void
  push():void
  removeListener():void
  replace():void
  reset():void
  setOptions():void
  setParams():void
}
*/
