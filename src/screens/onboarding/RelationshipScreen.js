import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING } from '../../constants/theme';

// Import icons
import SingleIcon from '../../assets/icons/single.svg';
import RelationshipIcon from '../../assets/icons/relationship.svg';
import PreferNotIcon from '../../assets/icons/prefer-not.svg';

const ProgressBar = () => (
  <View style={styles.progressContainer}>
    {[...Array(5)].map((_, index) => (
      <View 
        key={index} 
        style={[
          styles.progressSegment,
          index <= 1 && styles.progressSegmentActive
        ]} 
      />
    ))}
  </View>
);

const RelationshipButton = ({ icon: Icon, label, selected, onPress }) => (
  <TouchableOpacity 
    style={[styles.relationshipButton, selected && styles.relationshipButtonSelected]} 
    onPress={onPress}
  >
    <View style={styles.relationshipContent}>
      <Icon 
        width={24} 
        height={24} 
        color={selected ? COLORS.primary : '#0D162F'}
        stroke={selected ? COLORS.primary : '#0D162F'}
        fill="none"
        strokeWidth={1.5}
      />
      <Text style={[styles.relationshipLabel, selected && styles.relationshipLabelSelected]}>
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

const RelationshipScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected) {
      navigation.navigate('Languages');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>2/5</Text>
      </View>

      <ProgressBar />
      
      <View style={styles.content}>
        <Text style={styles.title}>Relationship{'\n'}status</Text>
        
        <View style={styles.relationshipOptionsWrapper}>
          <View style={styles.relationshipOptions}>
            <RelationshipButton
              icon={SingleIcon}
              label="Single"
              selected={selected === 'single'}
              onPress={() => setSelected('single')}
            />
            <RelationshipButton
              icon={RelationshipIcon}
              label="In a relationship"
              selected={selected === 'relationship'}
              onPress={() => setSelected('relationship')}
            />
            <RelationshipButton
              icon={PreferNotIcon}
              label="Prefer not to say"
              selected={selected === 'prefer-not'}
              onPress={() => setSelected('prefer-not')}
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
  relationshipOptionsWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  relationshipOptions: {
    gap: 16,
  },
  relationshipButton: {
    height: 72,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    shadowColor: 'rgba(30, 44, 86, 0.08)',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 1,
    shadowRadius: 92,
    elevation: 5,
  },
  relationshipButtonSelected: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: 'rgba(102, 102, 255, 0.1)',
    shadowOffset: {
      width: 0,
      height: 46,
    },
    shadowRadius: 92,
  },
  relationshipContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  relationshipLabel: {
    fontSize: 15,
    color: '#797B8B',
  },
  relationshipLabelSelected: {
    fontWeight: '600',
    color: COLORS.primary,
  },
  checkmark: {
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
    marginTop: -1,
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

export default RelationshipScreen; 