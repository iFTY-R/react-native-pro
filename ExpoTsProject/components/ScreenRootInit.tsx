import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScreenRootInit({ children }: any) {
  const insets = useSafeAreaInsets();

  return <View style={{
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  }}>
    {children}
  </View>;
}
