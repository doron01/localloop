import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

export default function AttributeScreen({ navigation }) {
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const { updateUserData } = useUser();

  const attributes = [
    'Intellectually curious',
    'Compassionate and empathetic',
    'Creative and artistic',
    'Reliable and trustworthy',
    'Witty and humorous',
    'Optimistic and positive',
    'Ambitious and driven'
  ];

  const handleContinue = () => {
    updateUserData({ positiveAttribute: selectedAttribute });
    navigation.navigate('Interests');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Which positive attribute best describes you?</Text>
        <Text style={styles.subtitle}>You can only select one</Text>
        {attributes.map((attribute) => (
          <TouchableOpacity
            key={attribute}
            style={[
              styles.optionButton,
              selectedAttribute === attribute && styles.selectedOption
            ]}
            onPress={() => setSelectedAttribute(attribute)}
          >
            <Text style={[
              styles.optionText,
              selectedAttribute === attribute && styles.selectedOptionText
            ]}>
              {attribute}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={[styles.button, !selectedAttribute && styles.buttonDisabled]}
          disabled={!selectedAttribute}
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
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