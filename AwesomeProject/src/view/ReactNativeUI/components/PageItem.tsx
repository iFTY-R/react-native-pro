import React, { PropsWithChildren } from 'react';
import ShadowCard from './ShadowCard';
import { StyleSheet, Text, View } from 'react-native';

interface PageItemPropTypes {
  header: string;
  content: React.ReactNode;
}

const PageItem: React.FC<PageItemPropTypes> = ({
  header,
  content,
}: PropsWithChildren<PageItemPropTypes>) => {
  return (
    <ShadowCard
      style={[
        {
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowRadius: 50,
          shadowColor: '#000', //"rgba(138, 160, 181, 0.24)"
          overflow: 'hidden',
        },
        styles.item,
      ]}>
      <Text style={styles.itemHeader}>{header}</Text>
      <View style={styles.itemContent}>{content}</View>
    </ShadowCard>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 15,
  },
  itemHeader: {
    backgroundColor: '#00bbff',
    padding: 10,
    fontSize: 18,
    color: '#fff',
  },
  itemContent: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
  },
});

export const basePageStyle = StyleSheet.create({
  page: {
    padding: 10,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#000',
    paddingBottom: 15,
  },
});

export default PageItem;
/*
import React from 'react';
import { Text, ScrollView } from 'react-native';
import PageItem, { basePageStyle } from './components/PageItem';

export default function PageInput() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={basePageStyle.page}>
      <Text style={basePageStyle.pageTitle}>Text</Text>
      <PageItem header="" content={} />
    </ScrollView>
  );
}


* */
