import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LocationPermissionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enable Location</Text>
        <Text style={styles.subtitle}>
          LocalLoop needs your location to help you discover and connect with people nearby
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            // Here you would typically request location permissions
            console.log('Request location permissions');
            navigation.navigate('Signup'); // Navigate to Signup screen
          }}
        >
          <Text style={styles.buttonText}>Enable Location</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => {
            // Skip and navigate to Signup screen
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.skipButtonText}>Not Now</Text>
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
    alignItems: 'center',
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
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
  },
}); 