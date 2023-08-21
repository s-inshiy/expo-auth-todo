import * as LocalAuthentication from 'expo-local-authentication';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Linking, Platform } from 'react-native';

type AuthContextType = {
  authentication: () => Promise<void>;
  isAuthenticated: boolean | undefined;
};

// Determine the appropriate authentication method based on security level
async function setAuthentication(): Promise<boolean> {
  // Get the security level of enrolled authentication methods
  const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();

  // Check the security level and choose authentication method
  switch (securityLevel) {
    case LocalAuthentication.SecurityLevel.NONE:
      gotoSettings(); // No enrolled authentication methods, navigate to settings
      return false;

    case LocalAuthentication.SecurityLevel.SECRET:
      return authenticateWithPassword(); // Enrolled password, authenticate with it

    case LocalAuthentication.SecurityLevel.BIOMETRIC:
      return authenticateWithBiometrics(); // Enrolled biometrics, authenticate with them

    default:
      return false; // Handle unexpected security level
  }
}

// Navigate to device settings for authentication setup
function gotoSettings(): void {
  if (Platform.OS === 'ios') {
    Linking.openURL('App-Prefs:root=PASSCODE'); // Open iOS settings for passcode
  } else if (Platform.OS === 'android') {
    Linking.sendIntent('android.settings.SECURITY_SETTINGS'); // Open Android security settings
  } else {
    console.log('Settings not supported on this platform.'); // Unsupported platform
  }
}

// Authenticate using device PIN or password
async function authenticateWithPassword(): Promise<boolean> {
  const response = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Please enter your device PIN or password to continue',
  });
  return response.success; // Return authentication success status
}

// Authenticate using biometric methods (fingerprint, face, etc.)
async function authenticateWithBiometrics(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync();
  return result.success; // Return biometric authentication success status
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [isAuthenticated, setAuthenticated] = useState<boolean | undefined>(false);

  // Function to initiate authentication
  async function authentication(): Promise<void> {
    const authStatus = await setAuthentication();
    setAuthenticated(authStatus); // Update authentication status
  }

  // Provide authentication context to children
  return (
    <AuthContext.Provider
      value={{
        authentication,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the authentication context
function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === null) throw new Error('AuthContext was used outside AuthProvider');

  return context;
}

export { AuthProvider, useAuth, AuthContext };
