import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

export default class MyComponent extends Component {
  render() {
    return (
      <View style={[{ height: '100%' }]}>
        <Text style={[styles.h2]}>主轴方向</Text>
        <ScrollView>
          <Text style={[styles.h3]}> flexDirection: 'column'(默认)</Text>
          <View style={[styles.container]}>
            <Text style={[styles.itemBase]}>刘备</Text>
            <Text style={[styles.itemBase]}>关羽</Text>
            <Text style={[styles.itemBase]}>张飞</Text>
          </View>
          <Text style={[styles.h3]}>flexDirection: 'column-reverse'</Text>
          <View style={[styles.container, styles.flexColumnReverse]}>
            <Text style={[styles.itemBase]}>刘备</Text>
            <Text style={[styles.itemBase]}>关羽</Text>
            <Text style={[styles.itemBase]}>张飞</Text>
          </View>
          <Text style={[styles.h3]}>flexDirection: 'row'</Text>
          <View style={[styles.container, styles.flexRow]}>
            <Text style={[styles.itemBase]}>刘备</Text>
            <Text style={[styles.itemBase]}>关羽</Text>
            <Text style={[styles.itemBase]}>张飞</Text>
          </View>
          <Text style={[styles.h3]}>flexDirection: 'row-reverse'</Text>
          <View style={[styles.container, styles.flexRowReverse]}>
            <Text style={[styles.itemBase]}>刘备</Text>
            <Text style={[styles.itemBase]}>关羽</Text>
            <Text style={[styles.itemBase]}>张飞1</Text>
          </View>
          <View style={[styles.container, styles.flexRowReverse]}>
            <Text style={[styles.itemBase]}>刘备</Text>
            <Text style={[styles.itemBase]}>关羽</Text>
            <Text style={[styles.itemBase]}>张飞1</Text>
          </View>
          <View style={[styles.container, styles.flexRowReverse]}>
            <Text style={[styles.itemBase]}>刘备</Text>
            <Text style={[styles.itemBase]}>关羽</Text>
            <Text style={[styles.itemBase]}>张飞1</Text>
          </View>
          <View style={[styles.container, styles.flexRowReverse]}>
            <Text style={[styles.itemBase]}>刘备</Text>
            <Text style={[styles.itemBase]}>关羽</Text>
            <Text style={[styles.itemBase]}>张飞1</Text>
          </View>
          <View style={[styles.container, styles.flexRowReverse]}>
            <Text style={[styles.itemBase]}>刘备</Text>
            <Text style={[styles.itemBase]}>关羽</Text>
            <Text style={[styles.itemBase]}>张飞1</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    margin: 10,
    // borderWidth: 1,
    // borderColor: '#fb7b7b',
  },
  h2: {
    fontSize: 30,
    marginHorizontal: 10,
  },
  h3: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  itemBase: {
    height: 30,
    borderWidth: 1,
    borderColor: '#ff0000',
    backgroundColor: '#f8de9d',
    padding: 4,
    textAlign: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexColumnReverse: {
    flexDirection: 'column-reverse',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowReverse: {
    flexDirection: 'row-reverse',
  },
});