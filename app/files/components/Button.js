import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../../files/styles';


const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
      <Text onPress={onPress} style={styles.btnTextStyle}>
        {children}
      </Text>
  );
};

export { Button };
