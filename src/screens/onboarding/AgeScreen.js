import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

const AgeScreen = ({ navigation, route }) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
    value: i + 1,
  }));

  const days = Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    label: String(currentYear - i),
    value: currentYear - i,
  }));

  const handleNext = () => {
    if (month && day && year) {
      navigation.navigate('Gender', {
        ...route.params,
        birthdate: `${year}-${month}-${day}`,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>When's your birthday?</Text>
          <Text style={styles.subtitle}>
            Your age will be public
          </Text>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={month}
            onValueChange={setMonth}
          >
            <Picker.Item label="Month" value="" color={COLORS.textSecondary} />
            {months.map(({ label, value }) => (
              <Picker.Item key={value} label={label} value={value} color={COLORS.textPrimary} />
            ))}
          </Picker>

          <Picker
            style={styles.picker}
            selectedValue={day}
            onValueChange={setDay}
          >
            <Picker.Item label="Day" value="" color={COLORS.textSecondary} />
            {days.map(({ label, value }) => (
              <Picker.Item key={value} label={label} value={value} color={COLORS.textPrimary} />
            ))}
          </Picker>

          <Picker
            style={styles.picker}
            selectedValue={year}
            onValueChange={setYear}
          >
            <Picker.Item label="Year" value="" color={COLORS.textSecondary} />
            {years.map(({ label, value }) => (
              <Picker.Item key={value} label={label} value={value} color={COLORS.textPrimary} />
            ))}
          </Picker>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button,
              (!month || !day || !year) && styles.buttonDisabled
            ]}
            onPress={handleNext}
            disabled={!month || !day || !year}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: SPACING.large,
    paddingBottom: SPACING.large,
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
    paddingBottom: SPACING.large,
  },
  button: {
    backgroundColor: COLORS.buttonDefault,
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusXLarge,
    width: '100%',
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

export default AgeScreen; 