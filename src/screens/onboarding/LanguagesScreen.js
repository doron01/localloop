import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import { COLORS, SPACING } from '../../constants/theme';

const LanguagesScreen = () => {
  const navigation = useNavigation();
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const languages = [
    {
      id: 'arabic',
      title: 'Arabic',
      description: 'العربية',
      emoji: '🇸🇦 🇪🇬 🇦🇪 🇰🇼 🇯🇴'
    },
    {
      id: 'bengali',
      title: 'Bengali',
      description: 'বাংলা',
      emoji: '🇧🇩 🇮🇳'
    },
    {
      id: 'cantonese',
      title: 'Cantonese',
      description: '粵語',
      emoji: '🇭🇰 🇲🇴'
    },
    {
      id: 'czech',
      title: 'Czech',
      description: 'Čeština',
      emoji: '🇨🇿'
    },
    {
      id: 'danish',
      title: 'Danish',
      description: 'Dansk',
      emoji: '🇩🇰'
    },
    {
      id: 'dutch',
      title: 'Dutch',
      description: 'Nederlands',
      emoji: '🇳🇱 🇧🇪'
    },
    {
      id: 'english',
      title: 'English',
      description: 'English',
      emoji: '🇬🇧 🇺🇸 🇦🇺 🇨🇦 🇳🇿'
    },
    {
      id: 'french',
      title: 'French',
      description: 'Français',
      emoji: '🇫🇷 🇨🇦 🇧🇪 🇨🇭'
    },
    {
      id: 'german',
      title: 'German',
      description: 'Deutsch',
      emoji: '🇩🇪 🇦🇹 🇨🇭'
    },
    {
      id: 'greek',
      title: 'Greek',
      description: 'Ελληνικά',
      emoji: '🇬🇷 🇨🇾'
    },
    {
      id: 'hindi',
      title: 'Hindi',
      description: 'हिन्दी',
      emoji: '🇮🇳'
    },
    {
      id: 'hungarian',
      title: 'Hungarian',
      description: 'Magyar',
      emoji: '🇭🇺'
    },
    {
      id: 'indonesian',
      title: 'Indonesian',
      description: 'Bahasa Indonesia',
      emoji: '🇮🇩'
    },
    {
      id: 'italian',
      title: 'Italian',
      description: 'Italiano',
      emoji: '🇮🇹 🇨🇭'
    },
    {
      id: 'japanese',
      title: 'Japanese',
      description: '日本語',
      emoji: '🇯🇵'
    },
    {
      id: 'mandarin',
      title: 'Mandarin Chinese',
      description: '普通话',
      emoji: '🇨🇳 🇹🇼 🇸🇬'
    },
    {
      id: 'polish',
      title: 'Polish',
      description: 'Polski',
      emoji: '🇵🇱'
    },
    {
      id: 'portuguese',
      title: 'Portuguese',
      description: 'Português',
      emoji: '🇵🇹 🇧🇷 🇦🇴 🇲🇿'
    },
    {
      id: 'romanian',
      title: 'Romanian',
      description: 'Română',
      emoji: '🇷🇴 🇲🇩'
    },
    {
      id: 'russian',
      title: 'Russian',
      description: 'Русский',
      emoji: '🇷🇺 🇰🇿 🇧🇾'
    },
    {
      id: 'spanish',
      title: 'Spanish',
      description: 'Español',
      emoji: '🇪🇸 🇲🇽 🇦🇷 🇨🇴 🇵🇪'
    },
    {
      id: 'swedish',
      title: 'Swedish',
      description: 'Svenska',
      emoji: '🇸🇪 🇫🇮'
    },
    {
      id: 'turkish',
      title: 'Turkish',
      description: 'Türkçe',
      emoji: '🇹🇷'
    },
    {
      id: 'ukrainian',
      title: 'Ukrainian',
      description: 'Українська',
      emoji: '🇺🇦'
    },
    {
      id: 'urdu',
      title: 'Urdu',
      description: 'اردو',
      emoji: '🇵🇰 🇮🇳'
    },
    {
      id: 'vietnamese',
      title: 'Vietnamese',
      description: 'Tiếng Việt',
      emoji: '🇻🇳'
    }
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
    navigation.navigate('IndustryScreen');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="Languages you speak"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={selectedLanguages.length === 0}
      currentStep={3}
      totalSteps={5}
      showBackButton={true}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.optionsContainer}>
          {languages.map((language) => (
            <SelectionCard
              key={language.id}
              title={`${language.title} ${language.emoji}`}
              selected={selectedLanguages.includes(language.id)}
              onPress={() => toggleLanguage(language.id)}
              variant="pill"
            />
          ))}
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: SPACING.small,
    paddingBottom: SPACING.large,
  },
  optionsContainer: {
    gap: SPACING.small,
    paddingTop: SPACING.small,
  }
});

export default LanguagesScreen; 