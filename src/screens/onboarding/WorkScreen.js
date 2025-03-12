import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import BriefcaseIcon from '../../assets/icons/briefcase.svg';

const WorkScreen = () => {
  const navigation = useNavigation();
  const [workTitle, setWorkTitle] = useState('');

  const handleNext = () => {
    if (workTitle) {
      navigation.navigate('LocationPermission');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const content = (
    <View style={styles.container}>
      <Text style={styles.label}>Job Title</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <BriefcaseIcon width={20} height={20} color={COLORS.textSecondary} />
        </View>
        <TextInput
          style={styles.input}
          value={workTitle}
          onChangeText={setWorkTitle}
          placeholder="Enter your Job Title"
          placeholderTextColor={COLORS.textSecondary}
          autoCapitalize="words"
          autoFocus
          textAlignVertical="center"
        />
      </View>
    </View>
  );

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView 
      style={styles.keyboardAvoidingView} 
      behavior="padding"
      keyboardVerticalOffset={88}
    >
      <OnboardingLayout
        title="What do you do for work?"
        onNext={handleNext}
        onBack={handleBack}
        isNextDisabled={!workTitle}
        currentStep={5}
        totalSteps={5}
      >
        {content}
      </OnboardingLayout>
    </KeyboardAvoidingView>
  ) : (
    <OnboardingLayout
      title="What do you do for work?"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={!workTitle}
      currentStep={5}
      totalSteps={5}
    >
      {content}
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    paddingHorizontal: SPACING.medium,
    marginTop: SPACING.medium,
  },
  label: {
    fontSize: TYPOGRAPHY.sizeMedium,
    lineHeight: 24,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightMedium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SPACING.borderRadiusMedium,
    borderWidth: 1,
    borderColor: 'rgba(30, 44, 86, 0.08)',
    height: 48,
  },
  iconContainer: {
    width: 48,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: TYPOGRAPHY.sizeMedium,
    lineHeight: Platform.OS === 'ios' ? 0 : 24,
    color: COLORS.textPrimary,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    paddingVertical: Platform.OS === 'ios' ? 14 : 0,
    paddingRight: SPACING.medium,
  },
});

export default WorkScreen; 