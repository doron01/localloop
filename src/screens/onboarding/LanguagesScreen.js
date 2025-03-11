import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';

const LanguagesScreen = () => {
  const navigation = useNavigation();
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const languages = [
    {
      id: 'english',
      title: 'English',
      description: 'English language',
    },
    {
      id: 'spanish',
      title: 'Spanish',
      description: 'Español',
    },
    {
      id: 'french',
      title: 'French',
      description: 'Français',
    },
    {
      id: 'german',
      title: 'German',
      description: 'Deutsch',
    },
    {
      id: 'italian',
      title: 'Italian',
      description: 'Italiano',
    },
    {
      id: 'portuguese',
      title: 'Portuguese',
      description: 'Português',
    },
    {
      id: 'chinese',
      title: 'Chinese',
      description: '中文',
    },
    {
      id: 'japanese',
      title: 'Japanese',
      description: '日本語',
    },
    {
      id: 'korean',
      title: 'Korean',
      description: '한국어',
    },
    {
      id: 'arabic',
      title: 'Arabic',
      description: 'العربية',
    },
    {
      id: 'russian',
      title: 'Russian',
      description: 'Русский',
    },
    {
      id: 'hindi',
      title: 'Hindi',
      description: 'हिन्दी',
    },
  ];

  const toggleLanguage = (id) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(selectedLanguages.filter(langId => langId !== id));
    } else {
      setSelectedLanguages([...selectedLanguages, id]);
    }
  };

  const handleNext = () => {
    // Save selected languages if needed
    const selectedLanguagesList = Array.from(selectedLanguages);
    
    // Navigate to the next screen
    navigation.navigate('Industry');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="Languages you speak"
      subtitle="Select all the languages you're comfortable with"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={selectedLanguages.length === 0}
      currentStep={10}
      totalSteps={13}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.optionsContainer}>
          {languages.map((language) => (
            <SelectionCard
              key={language.id}
              title={language.title}
              description={language.description}
              selected={selectedLanguages.includes(language.id)}
              onPress={() => toggleLanguage(language.id)}
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

export default LanguagesScreen; 