import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING } from '../../constants/theme';

// Import gender icons
import MaleIcon from '../../assets/icons/male.svg';
import FemaleIcon from '../../assets/icons/female.svg';
import NonBinaryIcon from '../../assets/icons/nonbinary.svg';

const ProgressBar = () => (
  <View style={styles.progressContainer}>
    {[...Array(5)].map((_, index) => (
      <View 
        key={index} 
        style={[
          styles.progressSegment,
          index === 0 && styles.progressSegmentActive
        ]} 
      />
    ))}
  </View>
);

const GenderButton = ({ icon: Icon, label, selected, onPress }) => (
  <TouchableOpacity 
    style={[styles.genderButton, selected && styles.genderButtonSelected]} 
    onPress={onPress}
  >
    <View style={styles.genderContent}>
      <Icon 
        width={28} 
        height={28} 
        color={selected ? COLORS.primary : '#0D162F'}
        stroke={selected ? COLORS.primary : '#0D162F'}
        fill="none"
        strokeWidth={1.5}
      />
      <Text style={[styles.genderLabel, selected && styles.genderLabelSelected]}>
        {label}
      </Text>
    </View>
    {selected && (
      <View style={styles.checkmark}>
        <Text style={styles.checkmarkText}>✓</Text>
      </View>
    )}
  </TouchableOpacity>
);

const GenderScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected) {
      navigation.navigate('Relationship');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>1/5</Text>
      </View>

      <ProgressBar />
      
      <View style={styles.content}>
        <Text style={styles.title}>What's your{'\n'}gender?</Text>
        
        <View style={styles.genderOptionsWrapper}>
          <View style={styles.genderOptions}>
            <GenderButton
              icon={MaleIcon}
              label="Male"
              selected={selected === 'male'}
              onPress={() => setSelected('male')}
            />
            <GenderButton
              icon={FemaleIcon}
              label="Female"
              selected={selected === 'female'}
              onPress={() => setSelected('female')}
            />
            <GenderButton
              icon={NonBinaryIcon}
              label="No-binary"
              selected={selected === 'non-binary'}
              onPress={() => setSelected('non-binary')}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.nextButton, !selected && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!selected}
      >
        <Text style={styles.nextButtonText}>Next</Text>
        <Text style={styles.nextButtonArrow}>→</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECEBED',
  },
  backText: {
    fontSize: 20,
    color: '#0D162F',
  },
  stepIndicator: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(102, 102, 255, 0.16)',
    borderRadius: 2,
  },
  progressSegmentActive: {
    backgroundColor: 'rgba(102, 102, 255, 0.96)',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.large,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0D162F',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
    lineHeight: 36,
  },
  genderOptionsWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100, // Adjust to center the options vertically
  },
  genderOptions: {
    alignItems: 'center',
    gap: 20,
  },
  genderButton: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(30, 44, 86, 0.08)',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 1,
    shadowRadius: 92,
    elevation: 5,
  },
  genderButtonSelected: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: 'rgba(102, 102, 255, 0.1)',
    shadowOffset: {
      width: 0,
      height: 46,
    },
    shadowRadius: 92,
  },
  genderContent: {
    alignItems: 'center',
    gap: 8,
  },
  genderLabel: {
    fontSize: 14,
    color: '#797B8B',
  },
  genderLabelSelected: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: -1, // Fine-tune checkmark position
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 100,
    marginBottom: 40,
    marginHorizontal: 20,
    gap: 11,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonArrow: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GenderScreen; 