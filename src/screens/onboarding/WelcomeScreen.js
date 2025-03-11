import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('ConnectionPrefs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo and header section */}
        <View style={styles.headerSection}>
          {/* Logo placeholder */}
          <View style={styles.logoPlaceholder} />
          <Text style={styles.welcomeText}>Welcome{'\n'}to LocalLoop</Text>
        </View>

        {/* Character illustrations placeholder */}
        <View style={styles.characterContainer}>
          <View style={styles.charactersPlaceholder} />
        </View>

        {/* Button section */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
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
    padding: SPACING.medium,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: SPACING.xxLarge,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    marginBottom: SPACING.medium,
  },
  welcomeText: {
    fontSize: TYPOGRAPHY.sizeXXLarge,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeightLarge,
  },
  characterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  charactersPlaceholder: {
    width: '80%',
    height: 200,
    backgroundColor: COLORS.secondary,
    borderRadius: SPACING.borderRadiusLarge,
  },
  buttonSection: {
    marginBottom: SPACING.large,
  },
  getStartedButton: {
    backgroundColor: COLORS.buttonPrimary,
    borderRadius: SPACING.borderRadiusMedium,
    padding: SPACING.medium,
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  getStartedText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightMedium,
  },
  loginButton: {
    padding: SPACING.small,
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizeMedium,
  },
});

export default WelcomeScreen; 
