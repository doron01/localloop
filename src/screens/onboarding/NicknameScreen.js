import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import { useUser } from '../../context/UserContext';

const NicknameScreen = ({ navigation, route }) => {
  const { user, updateUserField } = useUser();
  const isEditing = route.params?.isEditing || false;
  
  // Initialize with user's existing name if in editing mode
  const [nickname, setNickname] = useState(isEditing ? user.name : '');

  // Handle back button for editing mode
  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (nickname.trim()) {
      // Update user context with the new nickname
      updateUserField('name', nickname.trim());
      
      if (isEditing) {
        // If editing, go back to the profile screen
        navigation.goBack();
      } else {
        // If in onboarding flow, navigate to the next screen
        navigation.navigate('PersonalInfo');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isEditing ? 'Update your nickname' : 'Choose your nickname'}
        </Text>
        <Text style={styles.subtitle}>
          This is how you'll appear to others in the app
        </Text>
        
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Enter your nickname"
          placeholderTextColor={COLORS.textSecondary}
          autoCapitalize="words"
          autoFocus
        />
        
        {isEditing && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleBack}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            styles.button,
            !nickname.trim() && styles.buttonDisabled
          ]}
          onPress={handleNext}
          disabled={!nickname.trim()}
        >
          <Text style={styles.buttonText}>
            {isEditing ? 'Save' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.xlarge,
    justifyContent: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.sizeXXLarge,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xlarge,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.background,
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusMedium,
    fontSize: TYPOGRAPHY.sizeMedium,
    marginBottom: SPACING.xlarge,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    color: COLORS.textPrimary,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  button: {
    backgroundColor: COLORS.buttonDefault,
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusXLarge,
    ...COLORS.buttonShadow,
  },
  buttonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  cancelButton: {
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusXLarge,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
}); 

export default NicknameScreen; 