import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

const ShadowCard = (props: any) => {
  const { children, elevation, opacity, cornerRadius } = props;
  const cardStyle = Platform.select({
    ios: () =>
      StyleSheet.create({
        container: {
          shadowRadius: elevation,
          shadowOpacity: opacity,
          shadowOffset: { width: 0, height: elevation },
          borderRadius: cornerRadius,
          backgroundColor: props.backgroundColor,
        },
      }),
    // @ts-ignore
    android: () =>
      StyleSheet.create({
        container: {
          elevation: elevation,
          borderRadius: cornerRadius,
          backgroundColor: props.backgroundColor,
        },
      }),
  })();

  return <View style={[cardStyle.container, props.style]}>{children}</View>;
};

ShadowCard.prototype = {
  backgroundColor: PropTypes.string,
  elevation: PropTypes.number,
  cornerRadius: PropTypes.number,
  opacity: PropTypes.number,
};

ShadowCard.defaultProps = {
  backgroundColor: '#ffffff',
  // 安卓的投影API
  elevation: 3,
  cornerRadius: 5,
  opacity: 0.5,
};

export default ShadowCard;
