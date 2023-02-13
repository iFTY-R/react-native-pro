import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import PageItem, { basePageStyle } from './components/PageItem';

export default function PageText() {
  const [text] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolor. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupiditat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum',
  );
  const [lessText] = useState(text.split(',')[0] + '.');
  const [showFull, setShowFull] = useState<boolean>(false);
  const [isSelectable] = useState(true);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={basePageStyle.page}>
      <Text style={basePageStyle.pageTitle}>Text</Text>
      <PageItem
        header="More/Less Text & Selectable Text"
        content={
          showFull ? (
            <Text>
              {text}
              <Text
                style={styles.toggleText}
                onPress={() => setShowFull(false)}>
                {'Less'}
              </Text>
            </Text>
          ) : (
            <Text>
              {lessText}
              <Text
                style={styles.toggleText}
                onPress={() => setShowFull(true)}
                selectable={isSelectable}
                key={Math.random()}>
                {'More'}
              </Text>
            </Text>
          )
        }
      />
      <PageItem
        header="Text Style"
        content={
          <>
            <Text
              style={{
                fontStyle: 'italic',
                alignSelf: 'flex-start',
                fontSize: 15,
              }}>
              斜体：fontStyle: 'italic'
            </Text>
            <Text
              style={{
                fontWeight: '500',
                alignSelf: 'flex-start',
                fontSize: 16,
                marginTop: 10,
              }}>
              半粗： fontWeight: '500',
            </Text>
            <Text
              style={{
                fontWeight: '700',
                alignSelf: 'flex-start',
                fontSize: 16,
                marginTop: 4,
              }}>
              粗体：fontWeight: '700',
            </Text>
            <Text
              style={{
                fontWeight: '900',
                alignSelf: 'flex-start',
                fontSize: 16,
                marginTop: 4,
              }}>
              特粗： fontWeight: '900',
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                fontSize: 16,
                marginTop: 10,
                textDecorationLine: 'underline',
              }}>
              下划线：textDecorationLine: 'underline',
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                fontSize: 16,
                marginTop: 10,
                textDecorationLine: 'line-through',
              }}>
              删除线：textDecorationLine: 'line-through',
            </Text>
          </>
        }
      />
      <PageItem
        header="自定义字体（没弄懂怎么配）"
        content={
          <>
            <Text
              style={{
                backgroundColor: 'transparent',
                fontSize: 17,
                fontFamily: 'DFWaWaSC-W5',
                textAlign: 'center',
                margin: 8,
              }}>
              Hello 娃娃！
            </Text>
          </>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  toggleText: {
    color: '#3742fa',
    fontWeight: '500',
  },
});
