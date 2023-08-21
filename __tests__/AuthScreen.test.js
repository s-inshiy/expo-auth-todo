import { render, fireEvent, screen } from '@testing-library/react-native';
import React from 'react';

import App from '../App';

import { AuthProvider } from '@/contexts/AuthContext';
import AuthScreen from '@/screens/AuthScreen';

const mockAuthentication = jest.fn();
jest.mock('@/contexts/AuthContext', () => ({
  ...jest.requireActual('@/contexts/AuthContext'),
  useAuth: () => ({ authentication: mockAuthentication }),
}));

describe('App AuthScreen', () => {
  test('renders AuthScreen when not authenticated', () => {
    render(<App />);
    const authScreen = screen.getByTestId('auth-screen');
    expect(authScreen).toBeTruthy();
  });
});

describe('AuthScreen', () => {
  it('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <AuthScreen />
      </AuthProvider>
    );

    const authScreen = getByTestId('auth-screen');
    const textElement = getByText('Set Authentication to Proceed');
    const buttonElement = getByText('Go to Settings');

    expect(authScreen).toBeDefined();
    expect(textElement).toBeDefined();
    expect(buttonElement).toBeDefined();
  });

  it('button click triggers authentication', () => {
    const { getByText } = render(
      <AuthProvider>
        <AuthScreen />
      </AuthProvider>
    );
    const buttonElement = getByText('Go to Settings');

    fireEvent.press(buttonElement);

    expect(mockAuthentication).toHaveBeenCalledTimes(1);
  });
});
