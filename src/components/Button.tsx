import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle } from 'react-native';

import { colors } from '@/utils/constants';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  textStyles?: TextStyle;
}

function Button({ children, onPress, textStyles = {} }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, styles.container]}>
      <Text style={[styles.text, textStyles]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'center',
    backgroundColor: colors.buttonBackground,
    borderRadius: 20,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default Button;
