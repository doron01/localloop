import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileDashboardScreen from '../screens/profile/ProfileDashboardScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import PersonalInfoEditScreen from '../screens/profile/PersonalInfoEditScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import MessagesScreen from '../screens/messages/MessagesScreen';
import LocalLoopChatScreen from '../screens/messages/LocalLoopChatScreen';
import DirectChatScreen from '../screens/messages/DirectChatScreen';
import OnboardingNavigator from './OnboardingNavigator';
// Import other screens...


const Stack = createStackNavigator();

const AppNavigator = () => {
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  // Function to complete onboarding
  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  // Main app stack screens
  const MainStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0], // Slide in from the right
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileDashboard" component={ProfileDashboardScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="PersonalInfoEditScreen" component={PersonalInfoEditScreen} />
      <Stack.Screen 
        name="UserProfile" 
        component={UserProfileScreen}
        options={{
          title: 'Profile',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen 
        name="DirectChat" 
        component={DirectChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="LocalLoopChat" 
        component={LocalLoopChatScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );

  return showOnboarding ? (
    <OnboardingNavigator route={{ params: { completeOnboarding } }} />
  ) : (
    <MainStack />
  );
};

export default AppNavigator;