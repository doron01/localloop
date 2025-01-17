import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

const industries = [
  'Technology and IT',
  'Healthcare and Medicine',
  'Finance and Banking',
  'Education and Academia',
  'Arts and Entertainment',
  'Marketing and Advertising',
  'Non-profit and Social Services',
  'Government and Public Service',
  'Retail and E-commerce',
  'Hospitality and Tourism',
];

export default function IndustryScreen({ navigation }) {
  const { updateUserData } = useUser();

  const handleSelectIndustry = (industry) => {
    updateUserData({ industry });
    navigation.navigate('Work'); 
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.industryButton} onPress={() => handleSelectIndustry(item)}>
      <Text style={styles.industryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Industry</Text>
        <Text style={styles.subtitle}>Choose an industry that best describes you</Text>
      </View>
      <FlatList
        data={industries}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
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
    marginBottom: 20,
  },
  industryButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  industryText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
