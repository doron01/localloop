import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial empty user state
const initialUserState = {
  name: '',
  age: '',
  gender: '',
  workAs: '',
  industry: [],
  connectionType: [],
  values: [],
  interests: [],
  hobbies: [],
  music: [],
  languages: [],
  attributes: [],
  locationPermission: false,
};

// Create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from AsyncStorage on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load user data', error);
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Save user data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUserData = async () => {
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(user));
      } catch (error) {
        console.error('Failed to save user data', error);
      }
    };

    if (!isLoading) {
      saveUserData();
    }
  }, [user, isLoading]);

  // Update a specific field in user data
  const updateUserField = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // Update multiple fields at once
  const updateUserData = (newData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newData,
    }));
  };

  // Clear all user data (for logout, etc.)
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUser(initialUserState);
    } catch (error) {
      console.error('Failed to clear user data', error);
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        updateUserField, 
        updateUserData,
        clearUserData,
        isLoading 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 