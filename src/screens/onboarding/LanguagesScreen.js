import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

export default function LanguagesScreen({ navigation }) {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const { updateUserData } = useUser();

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Spanish' },
    { id: 'fr', label: 'French' },
    { id: 'de', label: 'German' },
    { id: 'it', label: 'Italian' },
    { id: 'pt', label: 'Portuguese' },
    { id: 'nl', label: 'Dutch' },
    { id: 'pl', label: 'Polish' },
    { id: 'ru', label: 'Russian' },
    { id: 'sv', label: 'Swedish' },
    { id: 'da', label: 'Danish' },
    { id: 'no', label: 'Norwegian' },
    { id: 'fi', label: 'Finnish' },
    { id: 'el', label: 'Greek' },
    { id: 'he', label: 'Hebrew' }
  ];

  const toggleLanguage = (langId) => {
    setSelectedLanguages(prev => 
      prev.includes(langId)
        ? prev.filter(id => id !== langId)
        : [...prev, langId]
    );
  };

  const handleContinue = () => {
    updateUserData({ languages: selectedLanguages });
    navigation.navigate('Interests');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Languages you speak</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.languageButton,
                selectedLanguages.includes(lang.id) && styles.selectedLanguage
              ]}
              onPress={() => toggleLanguage(lang.id)}
            >
              <Text style={[
                styles.languageText,
                selectedLanguages.includes(lang.id) && styles.selectedLanguageText
              ]}>
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, selectedLanguages.length === 0 && styles.buttonDisabled]}
          disabled={selectedLanguages.length === 0}
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
  content: {
    padding: 20,
    paddingTop: 10,
  },
  languageButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  selectedLanguage: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  languageText: {
    fontSize: 18,
    textAlign: 'center',
  },
  selectedLanguageText: {
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