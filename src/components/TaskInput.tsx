import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';

import Button from '@/components/Button';
import { Task } from '@/types/Common';
import { colors } from '@/utils/constants';

interface TaskInputProps {
  onAdd: (newTask: Task) => void;
  onUpdate: (updatedTask: Task) => void;
  selectedTask: Task | null;
}

// TODO Add clickoutside handler, to unselect tasks
function TaskInput({ selectedTask, onAdd, onUpdate }: TaskInputProps) {
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    if (selectedTask?.name) {
      setTaskText(selectedTask.name);
    }
  }, [selectedTask?.name]);

  function taskHandler() {
    const trimmedText = taskText.trim();

    if (trimmedText === '') {
      return; // No need to proceed if the input is empty
    }

    const newTask: Task = {
      id: selectedTask?.id || new Date().getTime().toString(),
      name: trimmedText,
    };

    if (selectedTask?.name) {
      onUpdate(newTask);
    } else {
      onAdd(newTask);
    }

    setTaskText('');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={40}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            value={taskText}
            onChangeText={setTaskText}
            placeholder="Enter here"
            style={styles.textInput}
            placeholderTextColor={colors.placeholder}
          />
          <Button textStyles={styles.buttonText} onPress={taskHandler}>
            {selectedTask?.name ? 'Update' : 'Add'}
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 14,
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontSize: 15,
  },
});

export default TaskInput;
