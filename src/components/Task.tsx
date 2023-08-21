import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { Task as TaskType } from '@/types/Common';
import { colors } from '@/utils/constants';

interface TaskProps {
  task: TaskType;
  onRemove: (task: TaskType) => void;
  onSelect: (task: TaskType) => void;
}

function TaskItem({ task, onRemove, onSelect }: TaskProps) {
  return (
    <Pressable onPress={() => onSelect(task)} style={styles.container}>
      <View style={styles.circle} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{task.name}</Text>
      </View>
      <Pressable onPress={() => onRemove(task)}>
        <Text style={styles.removeText}>Remove</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 24,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    color: colors.text,
    fontSize: 15,
  },
  removeText: {
    textTransform: 'uppercase',
    color: colors.text,
    fontSize: 13,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.buttonBackground,
  },
});

export default TaskItem;
