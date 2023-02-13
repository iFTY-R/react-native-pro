import React, { useState } from 'react';
import { Text, View } from 'react-native';

function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
}
function SettingsScreen() {
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
}
function SignInScreen() {
  return (
    <View>
      <Text>SignInScreen</Text>
    </View>
  );
}
function SignUpScreen() {
  return (
    <View>
      <Text>SignUpScreen</Text>
    </View>
  );
}

export default function PageAuth(Stack: any) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return isSignedIn ? (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </>
  ) : (
    <>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </>
  );
}
