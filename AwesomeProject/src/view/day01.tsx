import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

interface GreetingPropTypes {
  name?: string;
}

function Greeting({ name = 'none' }: GreetingPropTypes) {
  const [isShowingText, setIsShowingText] = useState(true);
  return (
    <Text onPress={() => setIsShowingText(!isShowingText)}>
      {isShowingText ? ' Hello,' + name : '已经隐藏'}
    </Text>
  );
}

Greeting.propTypes = {
  name: PropTypes.string,
};

export default function Day01() {
  return (
    <View style={styles.container}>
      <Greeting name="张三" />
      <Greeting name="李四" />
      <Greeting name="王五" />
      <Greeting />
      <Image
        style={{ width: 200, height: 200 }}
        resizeMode="stretch"
        source={{
          uri: 'https://img0.baidu.com/it/u=1416243148,2653778523&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=719',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
  one: {
    backgroundColor: '#269EE6',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderLeftColor: 'black',
    borderRightColor: 'red',
    borderTopColor: 'yellow',
    borderBottomColor: 'yellow',
    borderColor: 'green',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    margin: 50,
  },
  fixToText: {
    color: 'red',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginVertical: 8,
  },
});
