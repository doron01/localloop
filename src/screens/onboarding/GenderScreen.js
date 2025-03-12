import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import { COLORS, SPACING } from '../../constants/theme';

// Import gender icons
import MaleIcon from '../../assets/icons/male.svg';
import FemaleIcon from '../../assets/icons/female.svg';
import NonBinaryIcon from '../../assets/icons/nonbinary.svg';

const GenderScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const renderIcon = (Icon, isSelected, usesFill = false) => (props) => (
    <Icon
      width={28}
      height={28}
      {...(usesFill ? {
        fill: isSelected ? COLORS.primary : COLORS.textPrimary
      } : {
        stroke: isSelected ? COLORS.primary : COLORS.textPrimary,
        strokeWidth: 1.5
      })}
      {...props}
    />
  );

  const genderOptions = [
    {
      id: 'male',
      title: 'Male',
      icon: (props) => renderIcon(MaleIcon, selected === 'male')(props),
    },
    {
      id: 'female',
      title: 'Female',
      icon: (props) => renderIcon(FemaleIcon, selected === 'female')(props),
    },
    {
      id: 'non-binary',
      title: 'Non-binary',
      icon: (props) => renderIcon(NonBinaryIcon, selected === 'non-binary', true)(props),
    },
  ];

  const handleNext = () => {
    if (selected) {
      navigation.navigate('Relationship');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="What's your gender?"
      subtitle="Select your gender identity"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={!selected}
      currentStep={1}
      totalSteps={5}
      showBackButton={true}
    >
      <View style={styles.content}>
        <View style={styles.genderOptions}>
          {genderOptions.map((option) => (
            <SelectionCard
              key={option.id}
              title={option.title}
              icon={option.icon}
              selected={selected === option.id}
              onPress={() => setSelected(option.id)}
              variant="pill"
              style={styles.genderCard}
            />
          ))}
        </View>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.xlarge,
  },
  genderOptions: {
    gap: SPACING.medium,
  },
  genderCard: {
    height: 72,
  },
});

export default GenderScreen; 