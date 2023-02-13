import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as React from 'react';
import { Icon } from 'react-native-elements';
import { useEffect } from 'react';

export function PageNativeStack({ route, navigation }: any) {
  useEffect(() => {
    const _focus = navigation.addListener('focus', () => {
      console.log('Home:Page focus', route);
    });
    return function () {
      _focus();
    };
  }, [navigation, route]);
  const navigateMethod = {
    navigate: () => {
      // 路由参数，在路由组件中 props.route.params 中可取
      navigation.navigate('PageNavigationDemo', {
        title: '去导航详情',
        form: 'StackHome',
        count: 80,
        otherParam: 'anything you want here',
        ...route.params,
      });
    },
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigateMethod.navigate()}>
          <Text style={styles.btnText}>去导航详情{route.params?.count}</Text>
        </TouchableOpacity>
      </View>
      <Text />
      <Text>params：{JSON.stringify(route)}</Text>
      {/*      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('PageDemo')}>
          <Text style={styles.btnText}>DemoPage(navigate)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.push('PageDemo')}>
          <Text style={styles.btnText}>DemoPage(push)</Text>
        </TouchableOpacity>
      </View>*/}
    </ScrollView>
  );
}

export function HeaderBackBtn({ navigation }: any) {
  return (
    <TouchableOpacity
      onPress={() => navigation?.canGoBack() && navigation?.goBack()}>
      <Icon
        name="arrowleft"
        type="antdesign"
        size={20}
        tvParallaxProperties={undefined}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#0652dd',
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
