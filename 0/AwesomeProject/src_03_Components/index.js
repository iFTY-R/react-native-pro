import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Switch,
  ActivityIndicator,
  Platform,
  Image,
  TextInput,
  Dimensions,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

export default class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      hideStatusBar: false,
      username: '',
      password: '',
    };
  }

  toggleStatusBar = () => {
    this.setState({
      hideStatusBar: !this.state.hideStatusBar,
    });
  };
  doLogin = () => {
    alert(this.state.username);
  };
  render() {
    if (Platform.OS === 'android') {
      alert('android');
    } else if (Platform.OS === 'ios') {
      alert('ios');
    }
    return (
      <ScrollView style={[styles.container]}>
        <StatusBar
          hidden={this.state.hideStatusBar}
          backgroundColor="red" // 只在 Android 下有效
          barStyle={'dark-content'} // 状态栏图标颜色
        />
        <Switch
          trackColor={{ false: '#999', true: '#666' }}
          thumbColor={this.state.hideStatusBar ? 'red' : 'white'}
          value={this.state.hideStatusBar}
          onValueChange={this.toggleStatusBar}
        />
        <Text style={[styles.h3]}> ActivityIndicator 加载指示器组件</Text>
        {/*安卓是空心圆圈，ios 是花朵状*/}
        <ActivityIndicator color="blue" size={'large'} />
        {/* 数字只在 安卓下有效 */}
        <ActivityIndicator color="blue" size={100} />
        <Text style={[styles.h3]}>Image</Text>
        {/*<Image
          style={styles.tinyLogo}
          source={require('@expo/snack-static/react-native-logo.png')}
        />*/}
        <Image
          style={styles.tinyLogo}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <Image
          style={styles.logo}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
          }}
        />
        <Text style={[styles.h3]}>TextInput</Text>
        <View>
          <TextInput
            style={[styles.input]}
            value={this.state.username}
            placeholder="请输入用户名"
            onChangeText={val => {
              this.setState({
                username: val,
              });
            }}
          />
          <TextInput
            style={[styles.input]}
            value={this.state.password}
            placeholder="请输入密码"
            secureTextEntry={true} // 密码框
            onChangeText={val => {
              this.setState({
                username: val,
              });
            }}
          />
          <TextInput
            style={[styles.input]}
            placeholder="手机号"
            keyboardType="number-pad" // 弹出键盘的类型
          />
          {/*文本域*/}
          <TextInput
            style={[styles.input]}
            placeholder="手机号"
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
          />
          <View>
            <Button style={[styles.btn]} title="登录" onPress={this.doLogin} />
          </View>
        </View>
        <Text style={[styles.h3]}>Touchable组件</Text>
        <View>
          <TouchableHighlight
            onPress={() => {
              console.log('高亮显示');
            }}>
            <View style={[styles.item]}>
              <Text>触碰高亮</Text>
            </View>
          </TouchableHighlight>

          <TouchableOpacity
            onPress={() => {
              console.log('触碰透明度变化');
            }}>
            <View style={[styles.item]}>
              <Text>触碰透明度变化</Text>
            </View>
          </TouchableOpacity>

          <TouchableWithoutFeedback
            onPress={() => {
              console.log('触碰无响应');
            }}>
            <View style={[styles.item]}>
              <Text>触碰无响应</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h3: {
    fontSize: 24,
  },
  image: {},
  logo: {
    width: 66,
    height: 58,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  input: {
    width: Dimensions.get('window').width - 20,
    borderColor: 'red',
    borderWidth: 1,
  },
  btn: {
    merge: 10,
  },
  item: {},
});
