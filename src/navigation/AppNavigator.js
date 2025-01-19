import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import MessagesScreen from '../screens/messages/MessagesScreen';
// Import other screens...

// Onboarding screen imports
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import ConnectionPrefsScreen from '../screens/onboarding/ConnectionPrefsScreen';
import NicknameScreen from '../screens/onboarding/NicknameScreen';
import AgeScreen from '../screens/onboarding/AgeScreen';
import GenderScreen from '../screens/onboarding/GenderScreen';
import RelationshipScreen from '../screens/onboarding/RelationshipScreen';
import LanguagesScreen from '../screens/onboarding/LanguagesScreen';
import InterestsScreen from '../screens/onboarding/InterestsScreen';
import LocationPermissionScreen from '../screens/onboarding/LocationPermissionScreen';
import IndustryScreen from '../screens/onboarding/IndustryScreen';
import WorkScreen from '../screens/onboarding/WorkScreen';
import AttributeScreen from '../screens/onboarding/AttributeScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HobbiesScreen from '../screens/onboarding/HobbiesScreen';
import ValuesScreen from '../screens/onboarding/ValuesScreen';
import MusicScreen from '../screens/onboarding/MusicScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  // Change initial state to skip onboarding
  const [showOnboarding, setShowOnboarding] = React.useState(false); // Set to false to skip onboarding

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
      <Stack.Screen 
        name="UserProfile" 
        component={UserProfileScreen}
        options={{
          title: 'Profile',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );

  // Onboarding stack screens
  const OnboardingStack = () => (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ConnectionPrefs" component={ConnectionPrefsScreen} />
      <Stack.Screen name="Nickname" component={NicknameScreen} />
      <Stack.Screen name="Age" component={AgeScreen} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="Relationship" component={RelationshipScreen} />
      <Stack.Screen name="Languages" component={LanguagesScreen} />
      <Stack.Screen name="Interests" component={InterestsScreen} />
      <Stack.Screen name="Hobbies" component={HobbiesScreen} />
      <Stack.Screen name="Values" component={ValuesScreen} />
      <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
      <Stack.Screen name="Industry" component={IndustryScreen} />
      <Stack.Screen name="Work" component={WorkScreen} />
      <Stack.Screen name="Attribute" component={AttributeScreen} />
      <Stack.Screen 
        name="Signup" 
        component={(props) => (
          <SignupScreen {...props} onSignupComplete={completeOnboarding} />
        )} 
      />
      <Stack.Screen name="Music" component={MusicScreen} />
    </Stack.Navigator>
  );

  return showOnboarding ? <OnboardingStack /> : <MainStack />;
};

export default AppNavigator;
