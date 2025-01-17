import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import all onboarding screens
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
import HomeScreen from '../screens/home/HomeScreen';
import HobbiesScreen from '../screens/onboarding/HobbiesScreen';
import ValuesScreen from '../screens/onboarding/ValuesScreen';
import MusicScreen from '../screens/onboarding/MusicScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  console.log('AppNavigator is rendering'); // Debug log
  
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{
          animationEnabled: true,
        }}
      />
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
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Music" component={MusicScreen} />
    </Stack.Navigator>
  );
}
