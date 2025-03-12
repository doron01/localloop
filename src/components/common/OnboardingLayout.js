import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import BackArrowIcon from '../../assets/icons/back-arrow.svg';
import NextArrowIcon from '../../assets/icons/next-arrow.svg';

/**
 * Shared layout component for all onboarding screens
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the layout
 * @param {string} props.title - Screen title
 * @param {string} props.subtitle - Optional subtitle or description
 * @param {Function} props.onNext - Function to call when next button is pressed
 * @param {Function} props.onBack - Function to call when back button is pressed
 * @param {boolean} props.showBackButton - Whether to show the back button
 * @param {number} props.currentStep - Current step in the onboarding process (1-based)
 * @param {number} props.totalSteps - Total number of steps in the onboarding process
 * @param {boolean} props.isNextDisabled - Whether the next button should be disabled
 */
const OnboardingLayout = ({
  children,
  title,
  subtitle,
  onNext,
  onBack,
  showBackButton = true,
  currentStep,
  totalSteps,
  isNextDisabled = false,
}) => {
  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header section with back button, counter and progress bar */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            {showBackButton ? (
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <BackArrowIcon width={24} height={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            ) : (
              <View style={styles.backButtonPlaceholder} />
            )}
            
            <Text style={styles.progressText}>{currentStep}/{totalSteps}</Text>
          </View>

          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            {Array.from({ length: totalSteps }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressStep,
                  index < currentStep ? styles.progressStepActive : styles.progressStepInactive
                ]}
              />
            ))}
          </View>
        </View>
        
        {/* Main content area */}
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          
          {children}
        </View>
        
        {/* Footer with next button */}
        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={[
              styles.nextButton, 
              isNextDisabled && styles.nextButtonDisabled
            ]} 
            onPress={onNext}
            disabled={isNextDisabled}
            activeOpacity={0.7}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <NextArrowIcon width={16} height={16} color={COLORS.buttonText} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.background,
    paddingTop: SPACING.small,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    backgroundColor: COLORS.background,
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
  },
  backButtonPlaceholder: {
    width: 44,
    opacity: 0,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.medium,
    gap: SPACING.xsmall,
    marginBottom: SPACING.medium,
    height: 4,
    backgroundColor: COLORS.background,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: COLORS.progressActive,
  },
  progressStepInactive: {
    backgroundColor: COLORS.progressInactive,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  titleContainer: {
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  title: {
    fontSize: TYPOGRAPHY.sizeXLarge,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizeSmall,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  footerContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.medium,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.buttonDefault,
    height: 56,
    borderRadius: SPACING.borderRadiusXLarge,
    paddingHorizontal: SPACING.xlarge,
    gap: 11,
    width: '100%',
    ...COLORS.buttonShadow,
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
  },
  nextButtonText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    lineHeight: 24,
  },
});

export default OnboardingLayout; 