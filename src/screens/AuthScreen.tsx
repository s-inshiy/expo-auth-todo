import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';

function AuthScreen(): JSX.Element {
  const { authentication } = useAuth();

  return (
    <View testID="auth-screen" style={styles.container}>
      <Text style={styles.text}>Set Authentication to Proceed</Text>
      <Button onPress={authentication}>Go to Settings</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 30,
    marginBottom: 60,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
});

export default AuthScreen;
