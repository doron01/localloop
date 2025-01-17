import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

export default function ConnectionPrefsScreen({ navigation }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { updateUserData } = useUser();

  const connectionTypes = [
    'Networking',
    'Friendship',
    'Romantic',
    'Activity Partners'
  ];

  const toggleSelection = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleContinue = () => {
    updateUserData({ connectionPreferences: selectedTypes });
    navigation.navigate('Nickname');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What brings you here?</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>

        {connectionTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.optionButton,
              selectedTypes.includes(type) && styles.selectedOption
            ]}
            onPress={() => toggleSelection(type)}
          >
            <Text style={[
              styles.optionText,
              selectedTypes.includes(type) && styles.selectedOptionText
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={[styles.button, selectedTypes.length === 0 && styles.buttonDisabled]}
          disabled={selectedTypes.length === 0}
          onPress={handleContinue}
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
    marginBottom: 30,
    textAlign: 'center',
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
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