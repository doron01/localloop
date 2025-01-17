import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

export default function MusicScreen({ navigation }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { updateUserData } = useUser();

  const genres = [
    'R&B and Soul',
    'Classical and Instrumental',
    'Rock and Alternative',
    'Pop and Top 40 hits',
    'Country and Folk',
    'Hip Hop and Rap',
    'House',
    'Jazz and Blues',
    'Indie and Alternative',
    'World Music and International Genres',
    'Techno',
    'Trance',
  ];

  const handleGenrePress = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleContinue = () => {
    updateUserData({ musicPreferences: selectedGenres });
    navigation.navigate('LocationPermission'); // Update with the actual next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What's Your Music Preferences?</Text>
        <Text style={styles.subtitle}>Select all that apply:</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.optionButton,
              selectedGenres.includes(genre) ? styles.selectedOption : styles.defaultOption
            ]}
            onPress={() => handleGenrePress(genre)}
          >
            <Text style={[
              styles.optionText,
              selectedGenres.includes(genre) && styles.selectedOptionText
            ]}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity 
        style={[styles.button, selectedGenres.length === 0 && styles.buttonDisabled]}
        disabled={selectedGenres.length === 0}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  defaultOption: {
    borderColor: '#ddd',
  },
  selectedOption: {
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    margin: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 