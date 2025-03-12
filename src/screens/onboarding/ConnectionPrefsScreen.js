import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

// Import SVG icons
import NetworkingIcon from '../../assets/icons/networking.svg';
import FriendshipIcon from '../../assets/icons/friendship.svg';
import RomanticIcon from '../../assets/icons/romantic.svg';
import ActivityIcon from '../../assets/icons/activity.svg';

const ConnectionPrefsScreen = () => {
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  const options = [
    {
      id: 'networking',
      title: 'Networking',
      icon: NetworkingIcon,
    },
    {
      id: 'friendship',
      title: 'Friendship',
      icon: FriendshipIcon,
    },
    {
      id: 'romantic',
      title: 'Romantic',
      icon: RomanticIcon,
    },
    {
      id: 'activity',
      title: 'Activity partners',
      icon: ActivityIcon,
    },
  ];

  const toggleOption = (id) => {
    const newSelectedOptions = new Set(selectedOptions);
    if (newSelectedOptions.has(id)) {
      newSelectedOptions.delete(id);
    } else {
      newSelectedOptions.add(id);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    // Save selected options if needed
    const selectedPreferences = Array.from(selectedOptions);
    
    // Navigate to the next screen
    navigation.navigate('Attribute');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="What brings you here?"
      subtitle="Select all that apply"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={selectedOptions.size === 0}
      currentStep={1}
      totalSteps={6}
      showBackButton={true}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <SelectionCard
              key={option.id}
              title={option.title}
              icon={option.icon}
              selected={selectedOptions.has(option.id)}
              onPress={() => toggleOption(option.id)}
            />
          ))}
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.medium,
    backgroundColor: COLORS.background,
  },
  optionsContainer: {
    gap: SPACING.small,
    backgroundColor: COLORS.background,
  },
});

export default ConnectionPrefsScreen; 