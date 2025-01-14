import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PersonalInfoScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    relationshipStatus: '',
    languages: '',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Tell us about yourself</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nickname (Optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="How should we call you?"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={(value) => updateField('age', value)}
              placeholder="Your age"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={formData.gender}
              onChangeText={(value) => updateField('gender', value)}
              placeholder="Your gender"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Relationship Status (Optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.relationshipStatus}
              onChangeText={(value) => updateField('relationshipStatus', value)}
              placeholder="Relationship status"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Languages Spoken</Text>
            <TextInput
              style={styles.input}
              value={formData.languages}
              onChangeText={(value) => updateField('languages', value)}
              placeholder="Languages you speak"
            />
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Interests')}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 