import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import PageItem, { basePageStyle } from './components/PageItem';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const DrawerRouter = () => {
  const ScreenA = () => {
    return (
      <View style={styles.container}>
        <Text>Screen A</Text>
      </View>
    );
  };
  const ScreenB = () => {
    return (
      <View style={styles.container}>
        <Text>Screen B</Text>
      </View>
    );
  };
  const ScreenC = () => {
    return (
      <View style={styles.container}>
        <Text>Screen C</Text>
      </View>
    );
  };

  return (
    <Drawer.Navigator initialRouteName="Screen A">
      <Drawer.Screen name="Screen A" component={ScreenA} />
      <Drawer.Screen name="Screen B" component={ScreenB} />
      <Drawer.Screen name="Screen C" component={ScreenC} />
    </Drawer.Navigator>
  );
};

export default function PageDrawerScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={basePageStyle.page}>
      <Text style={basePageStyle.pageTitle}>Text</Text>
      <PageItem header="" content={<DrawerRouter />} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
