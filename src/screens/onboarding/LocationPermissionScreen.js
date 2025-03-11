import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

const LocationPermissionScreen = ({ onSignupComplete }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleAllowLocation = async () => {
    setLoading(true);
    
    // In a real app, you would request location permissions here
    // For this demo, we'll just simulate a delay
    setTimeout(() => {
      setLoading(false);
      // Complete the onboarding process and transition to the main app
      onSignupComplete && onSignupComplete();
    }, 1500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'←'}</Text>
        </TouchableOpacity>
        
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View 
              style={[
                styles.progressFill, 
                { width: '100%' }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>13/13</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Enable Location Services</Text>
        <Text style={styles.subtitle}>
          LocalLoop needs your location to connect you with people and events nearby
        </Text>
        
        <View style={styles.imageContainer}>
          {/* Image placeholder */}
          <View style={styles.imagePlaceholder} />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.allowButton}
            onPress={handleAllowLocation}
            disabled={loading}
          >
            <Text style={styles.allowButtonText}>
              {loading ? 'Processing...' : 'Allow Location Access'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Not now</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.privacyText}>
          You can change this later in your device settings. See our Privacy Policy for more details.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.medium,
    paddingBottom: SPACING.small,
  },
  backButton: {
    padding: SPACING.small,
    marginRight: SPACING.medium,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.sizeLarge,
    color: COLORS.textPrimary,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
    marginRight: SPACING.small,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textSecondary,
  },
  content: {
    flex: 1,
    padding: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.sizeXLarge,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizeMedium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.large,
    textAlign: 'center',
    paddingHorizontal: SPACING.medium,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: SPACING.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '80%',
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: SPACING.borderRadiusLarge,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  allowButton: {
    backgroundColor: COLORS.buttonPrimary,
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusMedium,
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  allowButtonText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightMedium,
  },
  skipButton: {
    padding: SPACING.small,
  },
  skipButtonText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.sizeMedium,
  },
  privacyText: {
    fontSize: TYPOGRAPHY.sizeXSmall,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: SPACING.large,
  },
});

export default LocationPermissionScreen; 