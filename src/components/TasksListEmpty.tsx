import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '@/utils/constants';

function TasksListEmpty() {
  return (
    <View testID="empty-task-list" style={styles.container}>
      <Text style={styles.text}>TODO List is empty. Try to add a new TODO.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.placeholder,
    fontSize: 16,
  },
});

export default TasksListEmpty;
