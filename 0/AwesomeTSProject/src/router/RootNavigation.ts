import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(...args: any[]) {
  // navigationRef.current.getRootState()
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(...args);
  }
}
export function push(...args: any[]) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.dispatch(StackActions.push(...args));
  }
}
