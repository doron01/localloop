import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

export default function InterestsScreen({ navigation }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { updateUserData } = useUser();

  const interests = [
    { id: 'sports', label: 'Sports' },
    { id: 'music', label: 'Music' },
    { id: 'art', label: 'Art' },
    { id: 'technology', label: 'Technology' },
    { id: 'food', label: 'Food' },
    { id: 'travel', label: 'Travel' },
    { id: 'reading', label: 'Reading' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'photography', label: 'Photography' }
  ];

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Interests</Text>
        <Text style={styles.subtitle}>
          Choose at least 3 interests to help us find your community
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.interestsGrid}>
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestButton,
                selectedInterests.includes(interest.id) && styles.selectedInterest
              ]}
              onPress={() => toggleInterest(interest.id)}
            >
              <Text style={[
                styles.interestText,
                selectedInterests.includes(interest.id) && styles.selectedInterestText
              ]}>
                {interest.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.button,
            selectedInterests.length < 3 && styles.buttonDisabled
          ]}
          disabled={selectedInterests.length < 3}
          onPress={() => {
            updateUserData({ interests: selectedInterests });
            navigation.navigate('Industry');
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  interestsGrid: {
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  selectedInterest: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  interestText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedInterestText: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
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