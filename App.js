import 'react-native-gesture-handler'; // Ensure this is the first import
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext'; // Import the UserProvider
import { LogBox } from 'react-native';

// Ignore specific warnings if they're not critical
LogBox.ignoreLogs([
  'Unsupported top level event type "topInsetsChange" dispatched',
  'React Native\'s New Architecture',
]);

export default function App() {
  console.log('App component rendering');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Wrap the app in the UserProvider */}
        <UserProvider>
          <NavigationContainer
            onStateChange={(state) => console.log('New navigation state:', state)}
            onError={(error) => console.error('Navigation error:', error)}
          >
            <AppNavigator />
          </NavigationContainer>
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
