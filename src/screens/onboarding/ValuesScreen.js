import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import { COLORS, SPACING } from '../../constants/theme';

const ValuesScreen = () => {
  const navigation = useNavigation();
  const [selectedValues, setSelectedValues] = useState([]);

  const values = [
    {
      id: 'authenticity',
      title: 'Authenticity & being true to oneself',
    },
    {
      id: 'growth',
      title: 'Continuous personal growth & lifelong learning',
    },
    {
      id: 'empathy',
      title: 'Empathy & understanding other\'s perspectives',
    },
    {
      id: 'equality',
      title: 'Equality & fairness for all',
    },
    {
      id: 'family',
      title: 'Family & close relationships',
    },
    {
      id: 'financial',
      title: 'Financial stability & security',
    },
    {
      id: 'forgiveness',
      title: 'Forgiveness & letting go of grudges',
    },
    {
      id: 'gratitude',
      title: 'Gratitude & appreciation for life',
    },
    {
      id: 'humility',
      title: 'Humility & being grounded',
    },
    {
      id: 'independence',
      title: 'Independence & self-reliance',
    },
    {
      id: 'optimism',
      title: 'Optimism & positive thinking',
    },
    {
      id: 'patience',
      title: 'Patience & perseverance',
    },
    {
      id: 'respect_nature',
      title: 'Respect for nature & the environment',
    },
    {
      id: 'self_discipline',
      title: 'Self-discipline & self-control',
    },
    {
      id: 'service',
      title: 'Service to others & making a difference',
    },
    {
      id: 'simplicity',
      title: 'Simplicity & living minimally',
    },
    {
      id: 'spirituality',
      title: 'Spirituality & connection to something greater',
    },
    {
      id: 'tolerance',
      title: 'Tolerance & acceptance of differences',
    },
    {
      id: 'work_life_balance',
      title: 'Work-life balance & enjoying the journey',
    },
  ];

  const toggleValue = (id) => {
    if (selectedValues.includes(id)) {
      setSelectedValues(selectedValues.filter(valueId => valueId !== id));
    } else if (selectedValues.length < 5) {
      setSelectedValues([...selectedValues, id]);
    }
  };

  const handleNext = () => {
    // Save selected values if needed
    const selectedValuesList = Array.from(selectedValues);
    
    // Navigate to the next screen
    navigation.navigate('MusicScreen');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="Values most important to you"
      subtitle="you can select up to 5 values"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={selectedValues.length === 0}
      currentStep={5}
      totalSteps={6}
      showBackButton={true}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {values.map((value) => (
          <SelectionCard
            key={value.id}
            title={value.title}
            selected={selectedValues.includes(value.id)}
            onPress={() => toggleValue(value.id)}
            variant="pill"
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
    paddingTop: 8,
  },
});

export default ValuesScreen; 