import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

const PersonalInfoScreen = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (firstName && lastName && email) {
      navigation.navigate('Age', {
        firstName,
        lastName,
        email,
        nickname: route.params?.nickname,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Personal Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            placeholderTextColor={COLORS.textSecondary}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            placeholderTextColor={COLORS.textSecondary}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          style={[
            styles.button,
            (!firstName || !lastName || !email) && styles.buttonDisabled
          ]}
          onPress={handleNext}
          disabled={!firstName || !lastName || !email}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.xlarge,
  },
  title: {
    fontSize: TYPOGRAPHY.sizeXXLarge,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xlarge,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: SPACING.large,
  },
  label: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    marginBottom: SPACING.small,
    color: COLORS.textPrimary,
  },
  input: {
    backgroundColor: COLORS.background,
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusMedium,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  button: {
    backgroundColor: COLORS.buttonDefault,
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusXLarge,
    marginTop: SPACING.large,
    ...COLORS.buttonShadow,
  },
  buttonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    textAlign: 'center',
  },
}); 