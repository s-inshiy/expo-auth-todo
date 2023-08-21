import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { AuthProvider, AuthContext } from '@/contexts/AuthContext';
import { TasksProvider } from '@/contexts/TasksContext';
import AuthScreen from '@/screens/AuthScreen';
import HomeScreen from '@/screens/HomeScreen';
import { colors } from '@/utils/constants';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) =>
            // Checking if the user is authenticated
            context?.isAuthenticated ? (
              // If authenticated, provide tasks context and display HomeScreen
              <TasksProvider>
                <HomeScreen />
              </TasksProvider>
            ) : (
              // If not authenticated, display the authentication screen
              <AuthScreen />
            )
          }
        </AuthContext.Consumer>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
