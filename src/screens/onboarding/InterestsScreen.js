import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import { COLORS, SPACING } from '../../constants/theme';

// Import SVG icons
import ScienceIcon from '../../assets/icons/science.svg';
import PoliticsIcon from '../../assets/icons/politics.svg';
import PhilosophyIcon from '../../assets/icons/philosophy.svg';
import PsychologyIcon from '../../assets/icons/psychology.svg';
import HistoryIcon from '../../assets/icons/history.svg';
import LiteratureIcon from '../../assets/icons/literature.svg';

const InterestsScreen = () => {
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState(new Set());

  const interests = [
    {
      id: 'science',
      title: 'Science & technology',
      description: 'Astronomy, Robotics, AI, space exploration',
      icon: ScienceIcon,
    },
    {
      id: 'politics',
      title: 'Politics & Current Events',
      description: 'Social issues, International relations, environmental policy',
      icon: PoliticsIcon,
    },
    {
      id: 'philosophy',
      title: 'Philosophy & deep thinking',
      description: 'Ethics, Metaphysics, Logic, Existentialism',
      icon: PhilosophyIcon,
    },
    {
      id: 'psychology',
      title: 'Psychology & human behavior',
      description: 'Mental health, personality theories, developmental psychology',
      icon: PsychologyIcon,
    },
    {
      id: 'history',
      title: 'History & Culture',
      description: 'Ancient civilizations, art history, anthropology',
      icon: HistoryIcon,
    },
    {
      id: 'literature',
      title: 'Literature & Poetry',
      description: 'Classic literature, Genre fiction, creative writing',
    },
    {
      id: 'art',
      title: 'Art and Design',
      description: 'Fine Art, Fashion Design, Architecture',
    },
    {
      id: 'health',
      title: 'Health and Wellness',
      description: 'Nutrition, Fitness, Mindfulness',
    },
    {
      id: 'environment',
      title: 'Environmental Issues',
      description: 'Conservation, Renewable Energy, Sustainable Living',
    },
    {
      id: 'business',
      title: 'Business and Entrepreneurship',
      description: 'Startups, Marketing, Leadership',
    },
    {
      id: 'entertainment',
      title: 'Pop Culture and Entertainment',
      description: 'Movies, Music, Viral Trends',
    },
    {
      id: 'sports',
      title: 'Sports and Athletics',
      description: 'Fitness Trends, Olympic Events, Sports Journalism',
    }
  ];

  const toggleInterest = (id) => {
    const newSelectedInterests = new Set(selectedInterests);
    if (newSelectedInterests.has(id)) {
      newSelectedInterests.delete(id);
    } else {
      newSelectedInterests.add(id);
    }
    setSelectedInterests(newSelectedInterests);
  };

  const handleNext = () => {
    // Save selected interests if needed
    const selectedInterestsList = Array.from(selectedInterests);
    
    // Navigate to the next screen
    navigation.navigate('HobbiesScreen');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="Select your interests"
      subtitle="Choose at least 3 interests to help us find your community"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={selectedInterests.size < 3}
      currentStep={3}
      totalSteps={6}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {interests.map((interest) => (
          <SelectionCard
            key={interest.id}
            title={interest.title}
            description={interest.description}
            icon={interest.icon}
            selected={selectedInterests.has(interest.id)}
            onPress={() => toggleInterest(interest.id)}
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

export default InterestsScreen; 