import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import { COLORS, SPACING } from '../../constants/theme';

// Import SVG icons
import IntellectualIcon from '../../assets/icons/intellectual.svg';
import CompassionateIcon from '../../assets/icons/compassionate.svg';
import CreativeIcon from '../../assets/icons/creative.svg';
import ReliableIcon from '../../assets/icons/reliable.svg';
import WittyIcon from '../../assets/icons/witty.svg';
import OptimisticIcon from '../../assets/icons/optimistic.svg';
import AmbitiousIcon from '../../assets/icons/ambitious.svg';

const AttributeScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const attributes = [
    {
      id: 'intellectual',
      title: 'Intellectually curious',
      icon: IntellectualIcon,
    },
    {
      id: 'compassionate',
      title: 'Compassionate & empathetic',
      icon: CompassionateIcon,
    },
    {
      id: 'creative',
      title: 'Creative & artistic',
      icon: CreativeIcon,
    },
    {
      id: 'reliable',
      title: 'Reliable & trustworthy',
      icon: ReliableIcon,
    },
    {
      id: 'witty',
      title: 'Witty & humorous',
      icon: WittyIcon,
    },
    {
      id: 'optimistic',
      title: 'Optimistic & positive',
      icon: OptimisticIcon,
    },
    {
      id: 'ambitious',
      title: 'Ambitious & driven',
      icon: AmbitiousIcon,
    },
  ];

  const handleNext = () => {
    // Save selected attribute if needed
    const selectedAttribute = selected;
    
    // Navigate to the next screen
    navigation.navigate('Interests');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="Which positive attribute best describes you?"
      subtitle="You can only select one"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={!selected}
      currentStep={2}
      totalSteps={6}
      showBackButton={true}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {attributes.map((attribute) => (
          <SelectionCard
            key={attribute.id}
            title={attribute.title}
            icon={attribute.icon}
            selected={selected === attribute.id}
            onPress={() => setSelected(attribute.id)}
          />
        ))}
      </ScrollView>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.xlarge,
    gap: SPACING.small,
  },
});

export default AttributeScreen; 