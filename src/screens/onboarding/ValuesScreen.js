import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

const ValueCard = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.valueCard, selected && styles.selectedValueCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.valueTitle, selected && styles.selectedValueTitle]}>
        {title}
      </Text>
      <View style={[styles.circle, selected && styles.selectedCircle]}>
        {selected && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

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
    navigation.navigate('Music');
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
          <ValueCard
            key={value.id}
            title={value.title}
            selected={selectedValues.includes(value.id)}
            onPress={() => toggleValue(value.id)}
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
  valueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(30, 44, 86, 0.04)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedValueCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  valueTitle: {
    fontSize: 15,
    color: '#666B7A',
    fontWeight: '400',
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  selectedValueTitle: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedCircle: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ValuesScreen; 