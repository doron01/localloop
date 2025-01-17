import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

export default function InterestsScreen({ navigation }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { updateUserData } = useUser();

  const interests = [
    { id: 'science_technology', label: 'Science and Technology', subtitle: 'Astronomy, Robotics, AI, Space exploration.' },
    { id: 'politics_current_events', label: 'Politics and Current Events', subtitle: 'Social issues, International relations, Environmental policy.' },
    { id: 'philosophy_deep_thinking', label: 'Philosophy and Deep Thinking', subtitle: 'Ethics, Metaphysics, Logic, Existentialism.' },
    { id: 'psychology_human_behavior', label: 'Psychology and Human Behavior', subtitle: 'Mental health, Personality theories, Developmental psychology.' },
    { id: 'history_culture', label: 'History and Culture', subtitle: 'Ancient civilizations, Art history, Anthropology.' },
    { id: 'literature_poetry', label: 'Literature and Poetry', subtitle: 'Classic literature, Genre fiction, Creative writing.' },
    { id: 'art_design', label: 'Art and Design', subtitle: 'Fine art, Fashion design, Architecture.' },
    { id: 'health_wellness', label: 'Health and Wellness', subtitle: 'Nutrition, Fitness, Mindfulness.' },
    { id: 'environmental_issues', label: 'Environmental Issues', subtitle: 'Conservation, Renewable energy, Sustainable living.' },
    { id: 'business_entrepreneurship', label: 'Business and Entrepreneurship', subtitle: 'Startups, Marketing, Leadership.' },
    { id: 'pop_culture_entertainment', label: 'Pop Culture and Entertainment', subtitle: 'Movies, Music, Viral trends.' },
    { id: 'sports_athletics', label: 'Sports and Athletics', subtitle: 'Fitness trends, Olympic events, Sports journalism.' }
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
              <View style={styles.interestContent}>
                <Text style={styles.categoryTitle}>{interest.label}:</Text>
                <Text style={styles.categorySubtitle}>{interest.subtitle}</Text>
              </View>
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
            navigation.navigate('Hobbies');
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  interestsGrid: {
    padding: 20,
    flexDirection: 'column',
  },
  interestButton: {
    width: '100%',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedInterest: {
    borderColor: '#007AFF',
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    width: '100%',
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
  interestContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
  },
}); 