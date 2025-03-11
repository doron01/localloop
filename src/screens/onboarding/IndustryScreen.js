import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';

const IndustryScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const industries = [
    {
      id: 'tech',
      title: 'Technology',
      description: 'Software, IT, Data Science, etc.',
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      description: 'Medical, Nursing, Pharma, etc.',
    },
    {
      id: 'finance',
      title: 'Finance',
      description: 'Banking, Investment, Insurance, etc.',
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Teaching, Research, Administration, etc.',
    },
    {
      id: 'arts',
      title: 'Arts & Entertainment',
      description: 'Design, Media, Music, Film, etc.',
    },
    {
      id: 'science',
      title: 'Science & Research',
      description: 'Physics, Biology, Chemistry, etc.',
    },
    {
      id: 'engineering',
      title: 'Engineering',
      description: 'Civil, Mechanical, Electrical, etc.',
    },
    {
      id: 'retail',
      title: 'Retail & Hospitality',
      description: 'Sales, Food Service, Tourism, etc.',
    },
    {
      id: 'government',
      title: 'Government & Public Service',
      description: 'Public Administration, Non-profit, etc.',
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Any other industry not listed',
    },
  ];

  const handleNext = () => {
    // Save selected industry if needed
    const selectedIndustryValue = selected;
    
    // Navigate to the next screen
    navigation.navigate('Work');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="Select your industry"
      subtitle="Choose the industry that best describes your work"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={!selected}
      currentStep={11}
      totalSteps={13}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.optionsContainer}>
          {industries.map((industry) => (
            <SelectionCard
              key={industry.id}
              title={industry.title}
              description={industry.description}
              selected={selected === industry.id}
              onPress={() => setSelected(industry.id)}
            />
          ))}
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    paddingBottom: 20,
  },
});

export default IndustryScreen;
