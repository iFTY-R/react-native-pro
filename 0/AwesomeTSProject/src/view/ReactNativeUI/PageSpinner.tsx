import React from 'react';
import {
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import PageItem, { basePageStyle } from './components/PageItem';
import { loadingSpinnerList } from './components/loading-spinner';

/**
 * ReactNative 不支持 SVG，麻烦
 * @constructor
 */
export default function PageSpinner() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={basePageStyle.page}>
      <Text style={basePageStyle.pageTitle}>Text</Text>
      <PageItem
        header="React Native Activity Indicator"
        content={
          <>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ActivityIndicator size="small" />
              <ActivityIndicator size="large" />
              <ActivityIndicator color="#2ed573" size="large" />
            </View>
          </>
        }
      />
      <PageItem
        header="Spinner from loading.io"
        content={
          <>
            <View>
              <Text>{loadingSpinnerList.length}</Text>
              {loadingSpinnerList.map((v) => (
                <Image
                  key={v}
                  resizeMode="stretch"
                  style={styles.image}
                  source={{ uri: v }}
                />
              ))}
            </View>
          </>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
});
