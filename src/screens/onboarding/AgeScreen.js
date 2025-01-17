import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../../context/UserContext';

export default function AgeScreen({ navigation }) {
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('0');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const { updateUserData } = useUser();

  const handleContinue = () => {
    const dateOfBirth = new Date(year, month, day);
    updateUserData({ dateOfBirth });
    navigation.navigate('Gender');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>What's your date of birth?</Text>
          <Text style={styles.subtitle}>Make sure your age is correct. You won't be able to change it later.</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={day}
            style={styles.picker}
            onValueChange={(itemValue) => setDay(itemValue)}
          >
            {[...Array(31).keys()].map(i => (
              <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>

          <Picker
            selectedValue={month}
            style={styles.picker}
            onValueChange={(itemValue) => setMonth(itemValue)}
          >
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
              <Picker.Item key={index} label={month} value={`${index}`} />
            ))}
          </Picker>

          <Picker
            selectedValue={year}
            style={styles.picker}
            onValueChange={(itemValue) => setYear(itemValue)}
          >
            {[...Array(100).keys()].map(i => (
              <Picker.Item key={i} label={`${new Date().getFullYear() - i}`} value={`${new Date().getFullYear() - i}`} />
            ))}
          </Picker>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
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
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 150,
    width: '33%',
  },
  footer: {
    width: '100%',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 