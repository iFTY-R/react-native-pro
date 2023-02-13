/*
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], //我模拟的数据 这个就自行找一些视频url就好
      isPause: true, //控制播放器是否播放，下面的代码有解释一个列表只需要一个state控制，而不用数组
      current: 0, //表示当前item的索引，通过这个实现一个state控制全部的播放器
    };
    this.renderItem = this.renderItem.bind(this);
    this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
  }

  /!**  item布局 播放器 等*!/
  renderItem({ item, index }) {
    return (
      <View style={{ width: width, height: height - STATUSBAR_HEIGHT }}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => {
            this.setState({
              isPause: !this.state.isPause,
            });
          }}>
          <Video
            source={{ uri: item }}
            style={{ flex: 1, backgroundColor: '#000' }}
            repeat={true}
            paused={index === this.state.current ? this.state.isPause : true}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
        {/!*信息（头像，标题等）、写评论*!/}
        <View
          column
          style={{
            position: 'absolute',
            width: width,
            height: height - STATUSBAR_HEIGHT,
            justifyContent: 'flex-end',
            padding: 20,
            marginBottom: 30,
          }}>
          <View row style={{ alignItems: 'center' }}>
            <Image
              source={require('../../res/img/shootVideo/user_icon.png')}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <Text style={{ fontSize: 15, color: '#fff', marginLeft: 10 }}>
              懒散少女和猫
            </Text>
            <TouchableOpacity
              center
              style={{
                width: 60,
                height: 30,
                backgroundColor: '#f98589',
                borderRadius: 5,
                marginLeft: 10,
              }}>
              <Text style={{ fontSize: 14, color: '#fff' }}>关注</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>
            美丽的傍晚
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 5,
              padding: 3,
              width: 155,
              marginTop: 10,
            }}>
            <Image
              source={require('../../res/img/shootVideo/bgmusic.png')}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ fontSize: 13, color: '#fff', marginLeft: 10 }}>
              @懒散的少女和猫
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              row
              style={{
                backgroundColor: '#4d4d4d',
                borderRadius: 17,
                padding: 10,
                alignItems: 'center',
                width: 270,
              }}>
              <Image
                source={require('../../res/img/shootVideo/write_review.png')}
                style={{ width: 15, height: 15 }}
              />
              <Text style={{ fontSize: 14, color: '#fff', marginLeft: 10 }}>
                写评论...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/!*底部 右侧 功能键 （我拍，点赞，评论，转发）*!/}
        <View
          column
          style={{
            position: 'absolute',
            width: width,
            height: height - STATUSBAR_HEIGHT,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 20,
          }}>
          <TouchableOpacity column center style={styles.bottomRightBn}>
            <Image
              source={require('../../res/img/shootVideo/shoot.png')}
              resizeMode={'contain'}
              style={styles.bottomRightImage}
            />
            <Text style={styles.bottomRightText}>我拍</Text>
          </TouchableOpacity>
          <TouchableOpacity column center style={styles.bottomRightBn}>
            <Image
              source={require('../../res/img/shootVideo/like.png')}
              resizeMode={'contain'}
              style={styles.bottomRightImage}
            />
            <Text style={styles.bottomRightText}>2.1万</Text>
          </TouchableOpacity>
          <TouchableOpacity column center style={styles.bottomRightBn}>
            <Image
              source={require('../../res/img/shootVideo/review.png')}
              resizeMode={'contain'}
              style={styles.bottomRightImage}
            />
            <Text style={styles.bottomRightText}>300</Text>
          </TouchableOpacity>
          <TouchableOpacity
            column
            center
            style={[styles.bottomRightBn, { marginBottom: 50 }]}>
            <Image
              source={require('../../res/img/shootVideo/share.png')}
              resizeMode={'contain'}
              style={styles.bottomRightImage}
            />
            <Text style={styles.bottomRightText}>分享</Text>
          </TouchableOpacity>
        </View>
        {/!* 屏幕中央 播放按钮 *!/}
        {this.state.isPause ? (
          <View
            column
            center
            flex
            style={{
              position: 'absolute',
              width: width,
              height: height - STATUSBAR_HEIGHT,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isPause: !this.state.isPause,
                });
              }}>
              <Image
                source={require('../../res/img/shootVideo/play.png')}
                resizeMode={'contain'}
                style={{ width: 60, height: 60 }}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  render() {
    const VIEWABILITY_CONFIG = {
      viewAreaCoveragePercentThreshold: 80, //item滑动80%部分才会到下一个
    };
    return (
      <View>
        <FlatList
          data={videoUrl}
          renderItem={this.renderItem}
          horizontal={false}
          pagingEnabled={true}
          getItemLayout={(data, index) => {
            return { length: height, offset: height * index, index };
          }}
          keyExtractor={(item, index) => index.toString()}
          viewabilityConfig={VIEWABILITY_CONFIG}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={this._onViewableItemsChanged}
        />
        {/!*顶部 关闭、搜索 按钮*!/}
        <View style={{ position: 'absolute', width: width }}>
          <View
            row
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              width: width,
              padding: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../../res/img/shootVideo/close.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../res/img/shootVideo/search.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  _onViewableItemsChanged({ viewableItems, changed }) {
    //这个方法为了让state对应当前呈现在页面上的item的播放器的state
    //也就是只会有一个播放器播放，而不会每个item都播放
    //可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
    //只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
    if (viewableItems.length === 1) {
      this.setState({
        current: viewableItems[0].index,
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRightBn: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
  bottomRightImage: {
    width: 30,
    height: 30,
  },
  bottomRightText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
});
*/
