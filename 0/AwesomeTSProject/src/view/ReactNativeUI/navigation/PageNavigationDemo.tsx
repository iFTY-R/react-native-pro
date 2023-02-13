import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

function ProfileUser({ userId }: any) {
  const [user, setUser] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      // const unsubscribe = API.subscribe(userId, (user) => setUser(user));
      setUser({ userId: userId, username: 'admin' } as any);
      const unsubscribe = () => {
        setUser(null);
      };

      return () => unsubscribe();
    }, [userId]),
  );

  const isFocused = useIsFocused();

  return (
    <View>
      <Text>
        用户名:{userId}
        {user?.username} {isFocused ? 'focused' : 'unfocused-'}
      </Text>
    </View>
  );
}
function GoToButton({ screenName }: any) {
  const navigation = useNavigation();
  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

export default function PageNavigationDemo({ route, navigation }: any) {
  // 手动添加监听器
  useEffect(() => {
    console.log('componentDidMount');
    const _focus = navigation.addListener('focus', () => {
      console.log('Page focus');
    });
    const _blur = navigation.addListener('blur', () => {
      console.log('Page blur');
    });
    const _beforeRemove = navigation.addListener('beforeRemove', (e: any) => {
      console.log('beforeRemove', route.params?.count * 1);
      if (route.params?.count * 1 >= 90) {
        return;
      }
      // console.log(e.data.action);
      // 阻止离开
      e.preventDefault();
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });
    const _state = navigation.addListener('state', (e: any) => {
      console.log('state', e.data);
    });
    // tab页面切换
    const _tabPress = navigation.addListener('tabPress', () => {
      console.log('tabPress');
      // e.preventDefault();
    });
    return () => {
      // 该函数将在组件被卸载时执行
      console.log('组件被卸载 componentWillUnmount');
      _focus();
      _blur();
      _beforeRemove();
      _state();
      _tabPress();
    };
  }, [navigation, route]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/*<StatusBar barStyle="light-content" backgroundColor="#2196F3" />*/}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            // 非嵌套时使用，如果嵌套时还是用这种写法那么绑定的事件不会触发
            // navigation.navigate('RouterStack', route.params || {});
            // 对象写法，非嵌套时使用，如果嵌套时还是用这种写法那么绑定的事件不会触发
            // navigation.navigate({
            //   name: 'RouterStack',
            //   params: route.params,
            //   merge: true,
            // });
            // 当有嵌套时，绑定的事件可以触发
            navigation.navigate('StackHome', {
              screen: 'RouterStack', // 页面组件的路由名称
              params: route.params || {},
            });
            // 对象写法，当有嵌套时，绑定的事件可以触发
            // navigation.navigate({
            //   name: 'StackHome',
            //   params: {
            //     screen: 'RouterStack',
            //     params: route.params,
            //   },
            //   merge: true,
            // });
          }}>
          <Text style={styles.btnText}>返回到首页{route.params?.count}</Text>
        </TouchableOpacity>
        <ProfileUser userId={123} />
      </View>
      <View>
        <GoToButton />
      </View>
      <View>
        {route.params ? (
          <View>
            <Text
              onPress={() => {
                navigation.setParams({
                  count: (+route.params?.count || 0) - 1,
                });
              }}>
              form: {route.params?.form}
            </Text>
            <Text
              onPress={() => {
                // 页面也能更新自己的参数，就像更新state状态一样；通过navigation.setParams进行更新：
                navigation.setParams({
                  count: (+route.params?.count || 0) + 1,
                  otherParam: '哈哈哈哈哈哈',
                });
              }}>
              count: {route.params?.count}
            </Text>
            <Text>otherParam: {route.params?.otherParam}</Text>
            {/*<Text>{'\n'}</Text>*/}
            <Text />
            <Text>navigation：{Object.keys(navigation).join(',')}</Text>
            <Text>state：{Object.keys(navigation.getState()).join(',')}</Text>
            <Text>route：{Object.keys(route).join(',')}</Text>
            <Text>params：{Object.keys(route.params).join(',')}</Text>
            <Text>params：{JSON.stringify(route.params)}</Text>
            <Text />
            <Text>state：{JSON.stringify(navigation.getState())}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#06dd11',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
});
