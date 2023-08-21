import { render, screen } from '@testing-library/react-native';
import React from 'react';

import App from '../App';

jest.mock('@/contexts/AuthContext', () => ({
  ...jest.requireActual('@/contexts/AuthContext'),
  AuthContext: {
    ...jest.requireActual('@/contexts/AuthContext').AuthContext,
    Consumer: ({ children }) =>
      children({
        isAuthenticated: true,
      }),
  },
}));

describe('App HomeScreen', () => {
  test('renders HomeScreen when authenticated renders', () => {
    render(<App />);
    const homeScreen = screen.getByTestId('home-screen');
    expect(homeScreen).toBeTruthy();
  });
});
