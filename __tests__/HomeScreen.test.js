import { render } from '@testing-library/react-native';
import React from 'react';

import { useTasks } from '@/contexts/TasksContext';
import HomeScreen from '@/screens/HomeScreen';

jest.mock('@/contexts/TasksContext');

describe('HomeScreen', () => {
  it('renders the task list', () => {
    useTasks.mockReturnValueOnce({
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ],
      selectedTask: null,
      addTask: jest.fn(),
      deleteTask: jest.fn(),
      selectTask: jest.fn(),
      updateTask: jest.fn(),
    });

    const { getByTestId } = render(<HomeScreen />);
    const taskList = getByTestId('tasks-list');
    expect(taskList).toBeTruthy();
  });

  it('renders empty task list', () => {
    useTasks.mockReturnValueOnce({
      tasks: [],
      selectedTask: null,
      addTask: jest.fn(),
      deleteTask: jest.fn(),
      selectTask: jest.fn(),
      updateTask: jest.fn(),
    });

    const { getByTestId } = render(<HomeScreen />);
    const emptyTaskList = getByTestId('empty-task-list');
    expect(emptyTaskList).toBeTruthy();
  });
});
