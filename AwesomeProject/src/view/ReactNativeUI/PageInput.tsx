import React, { useState } from 'react';
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PageItem, { basePageStyle } from './components/PageItem';
import { Icon, Input } from 'react-native-elements';
import {
  FavouriteIcon,
  Input as NbInput,
  NativeBaseProvider,
  QuestionOutlineIcon,
} from 'native-base';

/*
Icon
https://reactnativeelements.com/docs/3.4.2/overview
version: 3.4.2
yarn add react-native-elements react-native-vector-icons react-native-safe-area-context
编辑 android/app/build.gradle (NOT android/build.gradle)并添加以下内容:
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"


## input属性
autoCorrect={false} 自动修正
autoCompleteType={undefined}
autoCapitalize="none" 当autoCapitalize="words"时,每个单词的开头字母会自动大写。
keyboardType="numeric"
secureTextEntry={passwordSecured}

1*/
const TextInputWithLabelAndPlaceholder = () => {
  return (
    <PageItem
      header="Input"
      content={
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '400' }}>Name</Text>
            <TextInput
              style={{
                flex: 1,
                height: 44,
                backgroundColor: '#f1f3f6',
                marginLeft: 10,
                borderRadius: 8,
                paddingHorizontal: 20,
              }}
              placeholder={'name'}
            />
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '400' }}>Email</Text>
            <TextInput
              style={{
                width: '100%',
                height: 44,
                marginTop: 6,
                borderRadius: 6,
                paddingHorizontal: 10,
                backgroundColor: '#444',
                color: '#fff',
              }}
              placeholder={'email'}
              placeholderTextColor={'#fff'}
              autoCorrect={true}
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
          </View>
        </>
      }
    />
  );
};
const TextInputWithIconAndButton = ({
  passwordSecured,
  setPasswordSecured,
}: any) => {
  return (
    <PageItem
      header="Icon & Button"
      content={
        <>
          <View
            style={{
              width: '100%',
              height: 44,
              backgroundColor: '#f1f3f6',
              borderRadius: 8,
              paddingHorizontal: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              color="#333"
              name="user"
              type="font-awesome"
              size={20}
              tvParallaxProperties={undefined}
            />
            <TextInput
              style={{ flex: 1, paddingHorizontal: 12 }}
              placeholder={'Full Name'}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: 44,
              backgroundColor: '#f1f3f6',
              borderRadius: 8,
              paddingHorizontal: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Icon
              color="#333"
              name="lock"
              type="font-awesome"
              size={20}
              tvParallaxProperties={undefined}
            />
            <TextInput
              style={{ flex: 1, paddingHorizontal: 12 }}
              secureTextEntry={passwordSecured}
              placeholder={'Password'}
              textContentType="password"
            />
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() => {
                setPasswordSecured(!passwordSecured);
              }}>
              <Icon
                name="eye"
                type="font-awesome-5"
                size={20}
                tvParallaxProperties={undefined}
              />
            </TouchableOpacity>
          </View>
        </>
      }
    />
  );
};
const TextInputWithReactNativeElements = ({
  passwordSecured,
  setPasswordSecured,
}: any) => {
  return (
    <PageItem
      header="TextInput(react-native-elements)"
      content={
        <>
          <View>
            <Input
              placeholder="Name"
              autoCapitalize="words"
              autoCompleteType={undefined}
            />
            <Input
              placeholder="Email"
              leftIcon={
                <Icon
                  name="envelope"
                  type="font-awesome"
                  size={24}
                  color="#444"
                  tvParallaxProperties={undefined}
                />
              }
              rightIcon={
                <Icon
                  name="phone"
                  type="font-awesome"
                  size={24}
                  color="#444"
                  tvParallaxProperties={undefined}
                />
              }
              autoCompleteType={undefined}
              autoCorrect={false}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
            <Input
              placeholder="Numeric Password"
              leftIcon={
                <Icon
                  name="lock"
                  type="font-awesome"
                  size={24}
                  color="#444"
                  tvParallaxProperties={undefined}
                />
              }
              rightIcon={
                <TouchableOpacity
                  style={{ padding: 4 }}
                  onPress={() => {
                    setPasswordSecured(!passwordSecured);
                  }}>
                  <Icon
                    name="eye"
                    type="font-awesome-5"
                    size={20}
                    tvParallaxProperties={undefined}
                  />
                </TouchableOpacity>
              }
              autoCompleteType={undefined}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="numeric"
              secureTextEntry={passwordSecured}
            />
          </View>
        </>
      }
    />
  );
};
const TextInputWithNativeBase = ({
  passwordSecured,
  setPasswordSecured,
}: any) => {
  return (
    <PageItem
      header="TextInput(native-base)"
      content={
        <>
          <NativeBaseProvider>
            <NbInput
              placeholder="Password"
              onChangeText={(text) => {
                console.log(text);
              }}
              type={!passwordSecured ? 'text' : 'password'}
              InputLeftElement={<FavouriteIcon style={{ marginLeft: 10 }} />}
              InputRightElement={
                <TouchableOpacity
                  style={{ paddingRight: 10 }}
                  onPress={() => {
                    setPasswordSecured(!passwordSecured);
                  }}>
                  <QuestionOutlineIcon />
                </TouchableOpacity>
              }
            />
          </NativeBaseProvider>
        </>
      }
    />
  );
};
const TextInputWithMultiline = () => {
  // 电脑模拟器回车键异常，真机进行回车正常
  return (
    <PageItem
      header="TextInput Multiline"
      content={
        <>
          <View>
            <TextInput
              style={[
                styles.input,
                {
                  height: 100,
                  paddingVertical: 10,
                  textAlignVertical: 'top',
                },
              ]}
              multiline={true}
              placeholder={'Your feedback here'}
            />
          </View>
        </>
      }
    />
  );
};
const TextInputWithMaxLength = () => {
  return (
    <PageItem
      header="TextInput Max. Length(16)"
      content={
        <>
          <TextInput
            style={styles.input}
            placeholder="Credit Card Number"
            textContentType="creditCardNumber"
            keyboardType="number-pad"
            maxLength={16}
          />
        </>
      }
    />
  );
};
const TextInputWithLengthCounter = () => {
  const [passLength, setPassLength] = useState(0);
  return (
    <PageItem
      header="TextInput with Length Counter"
      content={
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => {
              setPassLength(text.length);
            }}
            secureTextEntry={true}
            textContentType="password"
          />
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ marginTop: 10 }}>Length:{passLength}</Text>
          </View>
        </View>
      }
    />
  );
};

export default function PageInput() {
  const [passwordSecured, setPasswordSecured] = useState(true);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={basePageStyle.page}>
      <Text style={basePageStyle.pageTitle}>Input</Text>
      <TextInputWithLabelAndPlaceholder />
      <TextInputWithIconAndButton
        passwordSecured={passwordSecured}
        setPasswordSecured={setPasswordSecured}
      />
      <TextInputWithReactNativeElements
        passwordSecured={passwordSecured}
        setPasswordSecured={setPasswordSecured}
      />
      <TextInputWithNativeBase
        passwordSecured={passwordSecured}
        setPasswordSecured={setPasswordSecured}
      />
      <TextInputWithMultiline />
      <TextInputWithMaxLength />
      <TextInputWithLengthCounter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#f1f3f6',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
});
