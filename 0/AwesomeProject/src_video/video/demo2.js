import React, { Component } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  PanResponder,
} from 'react-native';

const px2dp = val => val;

const { width, height } = Dimensions.get('window');

export default class HousePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    //console.warn(navigation);
    return {
      header: null,
    };
  };
  _flatList;

  constructor(props) {
    super(props);
    this.state = {
      sports: new Animated.Value(-height), // 设置初始值
      listlen: 4,
    };
    this.startTimestamp = 0; // 拖拽开始时间戳（用于计算滑动速度）
    this.endTimestamp = 0; // 拖拽结束时间戳用于计算滑动速度）
    this.page = 0; // 首次展示第一条数据（page 最小值为0，即从0开始，1为第二个条目）
  }

  componentWillMount() {
    this.panResponder();
  }

  panResponder() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // 滑动开始，记录时间戳
        this.startTimestamp = evt.nativeEvent.timestamp;
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        // 滑动纵向距离
        let y = gestureState.dy;
        //console.warn(y)
        // 实时改变滑动位置
        if (y > 0) {
          this._flatList.scrollToOffset({
            animated: true,
            offset: this.page * height - y,
          });
        } else if (y < 0) {
          y = Math.abs(y);
          this._flatList.scrollToOffset({
            animated: true,
            offset: this.page * height + y,
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        // 滑动结束时间戳
        this.endTimestamp = evt.nativeEvent.timestamp;
        // 滑动距离，根据滑动距离与时间戳计算是否切换到下一个条目
        let y = gestureState.dy;
        console.warn(gestureState);
        if (y > 0) {
          // 滑动距离大于屏幕1半，开启动画，滑动到下一个界面，或者滑动速度很快，并且滑动距离大于20，也滑动到下一个条目
          if (
            y > height / 2 ||
            (this.endTimestamp - this.startTimestamp < 300 && y > 20)
          ) {
            if (this.page != 0) {
              this.page -= 1;
            }
          }
          this._flatList.scrollToIndex({ animated: true, index: this.page });
        } else if (y < 0) {
          y = Math.abs(y);
          // 滑动距离大于屏幕1半，开启动画，滑动到下一个界面，或者滑动速度很快，并且滑动距离大于20，也滑动到下一个条目
          if (y > height / 2 || this.endTimestamp - this.startTimestamp < 300) {
            if (this.state.listlen !== this.page + 1) {
              this.page += 1;
            }
          }
          this._flatList.scrollToIndex({ animated: true, index: this.page });
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return false;
      },
    });
  }

  _renderItem(item, index) {
    return (
      <View
        key={index}
        style={{ width: width, height: height }}
        {...this._panResponder.panHandlers}>
        <Image style={styles.backgroundImage} source={{ uri: item.uri }} />
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: '#959595',
        }}>
        <FlatList
          ref={flatList => (this._flatList = flatList)}
          data={[
            {
              key: 'a',
              uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3253084641,1582561932&fm=26&gp=0.jpg',
            },
            {
              key: 'b',
              uri: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=293994202,1923937239&fm=26&gp=0.jpg',
            },
            {
              key: 'c',
              uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3253084641,1582561932&fm=26&gp=0.jpg',
            },
            {
              key: 'd',
              uri: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=293994202,1923937239&fm=26&gp=0.jpg',
            },
          ]}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          getItemLayout={(data, index) => ({
            length: height,
            offset: height * index,
            index,
          })}
          scrollEnabled={false}
        />
        <View
          style={{
            position: 'absolute',
            zIndex: 10000,
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: 98,
            borderTopColor: '#e6e6e6',
            borderTopWidth: 1,
            backgroundColor: 'rgba(0,0,0,0,0.5)',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source="https://lupic.cdn.bcebos.com/20210629/28754448_14.jpg"
                style={{
                  width: 48,
                  height: 42,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 8,
                  color: '#dbdbdb',
                }}>
                首页
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source="https://lupic.cdn.bcebos.com/20210629/28754448_14.jpg"
              style={{
                width: 48,
                height: 42,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontSize: 20,
                marginTop: 8,
                color: 'white',
              }}>
              房源
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Take')}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source="https://lupic.cdn.bcebos.com/20210629/28754448_14.jpg"
                style={{
                  width: 48,
                  height: 42,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 8,
                  color: '#dbdbdb',
                }}>
                拍摄
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Follow')}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source="https://lupic.cdn.bcebos.com/20210629/28754448_14.jpg"
                style={{
                  width: 48,
                  height: 42,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 8,
                  color: '#dbdbdb',
                }}>
                关注
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('User')}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source="https://lupic.cdn.bcebos.com/20210629/28754448_14.jpg"
                style={{
                  width: 48,
                  height: 42,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 8,
                  color: '#dbdbdb',
                }}>
                我的
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width,
    height,
  },
});
