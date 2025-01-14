import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

export default function RelationshipScreen({ navigation }) {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { updateUserData } = useUser();

  const statusOptions = [
    { id: 'single', label: 'Single' },
    { id: 'relationship', label: 'In a Relationship' },
    { id: 'preferNotToSay', label: 'Prefer not to say' }
  ];

  const handleContinue = () => {
    updateUserData({ relationshipStatus: selectedStatus });
    navigation.navigate('Languages'); // Navigate to Languages screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Relationship Status</Text>
        
        {statusOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedStatus === option.id && styles.selectedOption
            ]}
            onPress={() => setSelectedStatus(option.id)}
          >
            <Text style={[
              styles.optionText,
              selectedStatus === option.id && styles.selectedOptionText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={[styles.button, !selectedStatus && styles.buttonDisabled]}
          disabled={!selectedStatus}
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
    marginBottom: 30,
    textAlign: 'center',
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
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