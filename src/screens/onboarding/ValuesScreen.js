import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

export default function ValuesScreen({ navigation }) {
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const { updateUserData } = useUser();

  const attributes = [
    'Authenticity and being true to oneself',
    'Continuous personal growth and lifelong learning',
    'Empathy and understanding others\' perspectives',
    'Equality and fairness for all',
    'Family and close relationships',
    'Financial stability and security',
    'Forgiveness and letting go of grudges',
    'Gratitude and appreciation for life',
    'Humility and being grounded',
    'Independence and self-reliance',
    'Optimism and positive thinking',
    'Patience and perseverance',
    'Respect for nature and the environment',
    'Self-discipline and self-control',
    'Service to others and making a difference',
    'Simplicity and living minimally',
    'Spirituality and connection to something greater',
    'Tolerance and acceptance of differences',
    'Work-life balance and enjoying the journey',
  ];

  const handleAttributePress = (attribute) => {
    if (selectedAttributes.includes(attribute)) {
      setSelectedAttributes(selectedAttributes.filter(attr => attr !== attribute));
    } else if (selectedAttributes.length < 5) {
      setSelectedAttributes([...selectedAttributes, attribute]);
    }
  };

  const handleContinue = () => {
    updateUserData({ positiveAttributes: selectedAttributes });
    navigation.navigate('Music');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Values Most Important to You</Text>
        <Text style={styles.subtitle}>You can select up to 5 values</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {attributes.map((attribute) => (
          <TouchableOpacity
            key={attribute}
            style={[
              styles.optionButton,
              selectedAttributes.includes(attribute) ? styles.selectedOption : styles.defaultOption
            ]}
            onPress={() => handleAttributePress(attribute)}
          >
            <Text style={[
              styles.optionText,
              selectedAttributes.includes(attribute) && styles.selectedOptionText
            ]}>
              {attribute}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity 
        style={[styles.button, selectedAttributes.length !== 5 && styles.buttonDisabled]}
        disabled={selectedAttributes.length !== 5}
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