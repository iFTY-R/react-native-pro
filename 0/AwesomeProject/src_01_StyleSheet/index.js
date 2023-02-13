import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class MyComponent extends Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 30 }}> textInComponent</Text>

        <Text style={[{ color: '#1978e5' }, { color: '#ec0f0f' }]}>
          textInComponent
        </Text>

        <Text style={styles.h1}>textInComponent</Text>
        <Text style={styles.h2}>textInComponent</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  h2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default MyComponent;
