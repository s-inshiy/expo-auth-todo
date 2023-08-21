import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

import Task from '@/components/Task';
import TaskInput from '@/components/TaskInput';
import TasksListEmpty from '@/components/TasksListEmpty';
import { useTasks } from '@/contexts/TasksContext';
import { colors } from '@/utils/constants';

function HomeScreen() {
  const { tasks, selectedTask, addTask, deleteTask, selectTask, updateTask } = useTasks();

  return (
    <View testID="home-screen" style={styles.rootContainer}>
      <View style={styles.tasksContainer}>
        <Text style={styles.textTitle}>TODO:</Text>
        {tasks?.length ? (
          <ScrollView testID="tasks-list" contentContainerStyle={styles.tasksListContainer}>
            {tasks.map((task) => (
              <Task key={task.id} task={task} onSelect={selectTask} onRemove={deleteTask} />
            ))}
          </ScrollView>
        ) : (
          <TasksListEmpty />
        )}
      </View>
      <TaskInput selectedTask={selectedTask} onAdd={addTask} onUpdate={updateTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 24,
    gap: 1,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.buttonBackground,
  },
  tasksContainer: {
    flex: 1,
    marginHorizontal: 14,
  },
  tasksListContainer: {
    flexGrow: 1,
    gap: 10,
    marginVertical: 20,
    paddingBottom: 30,
  },
});

export default HomeScreen;
