import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import onboarding screens in flow order
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import ConnectionPrefsScreen from '../screens/onboarding/ConnectionPrefsScreen';
import AttributeScreen from '../screens/onboarding/AttributeScreen';
import InterestsScreen from '../screens/onboarding/InterestsScreen';
import HobbiesScreen from '../screens/onboarding/HobbiesScreen';
import ValuesScreen from '../screens/onboarding/ValuesScreen';
import MusicScreen from '../screens/onboarding/MusicScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import GenderScreen from '../screens/onboarding/GenderScreen';
import RelationshipScreen from '../screens/onboarding/RelationshipScreen';
import LanguagesScreen from '../screens/onboarding/LanguagesScreen';
import IndustryScreen from '../screens/onboarding/IndustryScreen';
import WorkScreen from '../screens/onboarding/WorkScreen';
import LocationPermissionScreen from '../screens/onboarding/LocationPermissionScreen';

const Stack = createStackNavigator();

const OnboardingNavigator = ({ route }) => {
  const { completeOnboarding, showOnboardingFlow, isEditing } = route.params || {};

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false, // Disable swipe back during onboarding flow
      }}
      initialRouteName={isEditing ? "ConnectionPrefsScreen" : "Welcome"}
    >
      {/* Onboarding flow in specified order */}
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        initialParams={{ completeOnboarding }}
      />
      <Stack.Screen 
        name="ConnectionPrefsScreen" 
        component={ConnectionPrefsScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="AttributeScreen" 
        component={AttributeScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="InterestsScreen" 
        component={InterestsScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="HobbiesScreen" 
        component={HobbiesScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="ValuesScreen" 
        component={ValuesScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="MusicScreen" 
        component={MusicScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="GenderScreen" 
        component={GenderScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="RelationshipScreen" 
        component={RelationshipScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="LanguagesScreen" 
        component={LanguagesScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="IndustryScreen" 
        component={IndustryScreen}
        initialParams={{ isEditing }}
      />
      <Stack.Screen 
        name="WorkScreen" 
        component={WorkScreen}
        initialParams={{ isEditing, completeOnboarding }}
      />
      <Stack.Screen 
        name="LocationPermissionScreen" 
        component={LocationPermissionScreen}
        initialParams={{ isEditing, completeOnboarding }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator; 