import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import WelcomeBackground from '../../assets/images/welcomescreen.svg';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('ConnectionPrefs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <WelcomeBackground 
          style={styles.backgroundImage}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          opacity={1}
        />
        
        <View style={styles.mainContent}>
          <View style={styles.card}>
            <Text style={styles.welcomeText}>
              Welcome{'\n'}to Localoop
            </Text>
            
            <Text style={styles.subtitleText}>
              Connect with people who share your{'\n'}interests in the places you love
            </Text>

            {/* Progress dots */}
            <View style={styles.progressDots}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        {/* Footer with get started button */}
        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.7}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
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
    position: 'relative',
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  mainContent: {
    flex: 1,
    padding: SPACING.medium,
    justifyContent: 'flex-end',
    paddingBottom: SPACING.medium,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: SPACING.borderRadiusLarge,
    padding: SPACING.xlarge,
    paddingTop: SPACING.xxlarge,
    paddingBottom: SPACING.xxlarge,
    marginHorizontal: SPACING.medium,
    ...COLORS.cardShadow,
  },
  welcomeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 40,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: SPACING.large,
  },
  subtitleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizeMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xxlarge,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xxlarge,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.progressInactive,
    marginHorizontal: SPACING.xsmall,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.progressActive,
  },
  footerContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.medium,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.buttonDefault,
    height: 56,
    borderRadius: SPACING.borderRadiusXLarge,
    paddingHorizontal: SPACING.xlarge,
    width: '100%',
    ...COLORS.buttonShadow,
  },
  getStartedText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    lineHeight: 24,
  },
});

export default WelcomeScreen; 
