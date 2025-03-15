import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import BackArrowIcon from '../../assets/icons/back-arrow.svg';

const { width: screenWidth } = Dimensions.get('window');

const LocationPermissionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { completeOnboarding } = route.params || {};
  const [loading, setLoading] = useState(false);

  const handleAllowLocation = async () => {
    setLoading(true);
    // In a real app, you would request location permissions here
    setTimeout(() => {
      setLoading(false);
      if (completeOnboarding) {
        completeOnboarding();
      }
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
          <BackArrowIcon width={24} height={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/images/location-illustration.png')}
            style={styles.illustration}
            resizeMode="cover"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Enable Location</Text>
          <Text style={styles.subtitle}>
            Localoop needs your location to help you discover and connect with people nearby
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.enableButton,
              loading && styles.enableButtonLoading,
            ]}
            onPress={handleAllowLocation}
            disabled={loading}
          >
            <Text style={styles.enableButtonText}>
              Enable Location
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => completeOnboarding && completeOnboarding()}>
            <Text style={styles.notNowText}>Not now</Text>
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
  header: {
    backgroundColor: COLORS.background,
    paddingTop: SPACING.small,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.border,
    marginLeft: SPACING.medium,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  illustrationContainer: {
    width: screenWidth,
    height: 280,
    marginBottom: 40,
    overflow: 'hidden',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 80,
    paddingHorizontal: SPACING.medium,
  },
  title: {
    fontSize: TYPOGRAPHY.sizeXXLarge,
    lineHeight: 40,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizeMedium,
    lineHeight: 24,
    fontWeight: TYPOGRAPHY.weightRegular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: SPACING.medium,
  },
  enableButton: {
    backgroundColor: COLORS.buttonDefault,
    width: '100%',
    height: 56,
    borderRadius: SPACING.borderRadiusXLarge,
    alignItems: 'center',
    justifyContent: 'center',
    ...COLORS.buttonShadow,
  },
  enableButtonLoading: {
    backgroundColor: COLORS.buttonDisabled,
  },
  enableButtonText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    lineHeight: 24,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  notNowText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightRegular,
    lineHeight: 24,
    textDecorationLine: 'underline',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});

export default LocationPermissionScreen; 