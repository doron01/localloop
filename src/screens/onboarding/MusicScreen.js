import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

const GenreCard = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.genreCard, selected && styles.selectedGenreCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.genreTitle, selected && styles.selectedGenreTitle]}>
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

const MusicScreen = () => {
  const navigation = useNavigation();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const musicGenres = [
    {
      id: 'rnb_soul',
      title: 'R & B And Soul',
    },
    {
      id: 'classical_instrumental',
      title: 'Classical & Instrumental',
    },
    {
      id: 'rock_alternative',
      title: 'Rock & alternative',
    },
    {
      id: 'pop_top40',
      title: 'Pop And Top 40 Hits',
    },
    {
      id: 'country_folk',
      title: 'Country & Falk',
    },
    {
      id: 'hiphop_rap',
      title: 'Hip Hop & Rap',
    },
    {
      id: 'house',
      title: 'House',
    },
    {
      id: 'jazz_blues',
      title: 'Jazz & Blues',
    },
    {
      id: 'electronic_edm',
      title: 'Electronic / EDM',
    },
    {
      id: 'reggae',
      title: 'Reggae',
    },
    {
      id: 'metal',
      title: 'Metal',
    },
    {
      id: 'latin',
      title: 'Latin',
    },
    {
      id: 'funk_disco',
      title: 'Funk / Disco',
    },
    {
      id: 'afro_deep_house',
      title: 'House / Afro House',
    },
  ];

  const toggleGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter(genreId => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const handleNext = () => {
    // Save selected music preferences if needed
    const selectedMusicList = Array.from(selectedGenres);
    
    // Navigate to the next screen
    navigation.navigate('Signup');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="What's Your Music preferences?"
      subtitle="Select all that apply"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={selectedGenres.length === 0}
      currentStep={6}
      totalSteps={6}
      showBackButton={true}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.genresGrid}>
          {musicGenres.map((genre) => (
            <GenreCard
              key={genre.id}
              title={genre.title}
              selected={selectedGenres.includes(genre.id)}
              onPress={() => toggleGenre(genre.id)}
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
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.xlarge,
    paddingTop: 8,
  },
  genresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
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
    minWidth: '48%',
    flex: 1,
    marginBottom: 4,
  },
  selectedGenreCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  genreTitle: {
    fontSize: 14,
    color: '#666B7A',
    fontWeight: '400',
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  selectedGenreTitle: {
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

export default MusicScreen; 