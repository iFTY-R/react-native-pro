import React from 'react';
import { View, Text, Button } from 'react-native';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

export default function ChangeNavigationBar() {
  const setNavigationColor = (color: string) => {
    changeNavigationBarColor(color);
  };
  const hideNavigation = () => {
    hideNavigationBar();
  };

  const showNavigation = () => {
    showNavigationBar();
  };

  const testSetTranslucent = () => {
    changeNavigationBarColor('translucent', false);
  };

  const testSetTransparent = () => {
    changeNavigationBarColor('transparent', true);
  };

  return (
      <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: 'cyan',
          }}>
        <Button title="Set transparent" onPress={testSetTransparent} />
        <Button title="Set translucent" onPress={testSetTranslucent} />
        <Button
            title="Set color red"
            onPress={() => {
              setNavigationColor('red');
            }}
        />
        <Button
            title="Set color blue"
            onPress={() => {
              setNavigationColor('blue');
            }}
        />
        <Button
            title="Set color ligth"
            onPress={() => {
              changeNavigationBarColor('#ffffff', true);
            }}
        />
        <Button title="Hide bar" onPress={hideNavigation} />
        <Button title="Show bar" onPress={showNavigation} />
        <Text>Hello Word!</Text>
      </View>
  );
}
