import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

const NicknameScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState('');

  const handleNext = () => {
    if (nickname.trim()) {
      navigation.navigate('PersonalInfo', { nickname });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose your nickname</Text>
        <Text style={styles.subtitle}>
          This is how you'll appear to others in the app
        </Text>
        
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Enter your nickname"
          placeholderTextColor={COLORS.textSecondary}
          autoCapitalize="words"
          autoFocus
        />
        
        <TouchableOpacity 
          style={[
            styles.button,
            !nickname.trim() && styles.buttonDisabled
          ]}
          onPress={handleNext}
          disabled={!nickname.trim()}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.xlarge,
    justifyContent: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.sizeXXLarge,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xlarge,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.background,
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusMedium,
    fontSize: TYPOGRAPHY.sizeMedium,
    marginBottom: SPACING.xlarge,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    color: COLORS.textPrimary,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  button: {
    backgroundColor: COLORS.buttonDefault,
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusXLarge,
    ...COLORS.buttonShadow,
  },
  buttonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
}); 