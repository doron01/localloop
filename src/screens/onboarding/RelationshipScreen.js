import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

// Import icons
import SingleIcon from '../../assets/icons/single.svg';
import RelationshipIcon from '../../assets/icons/relationship.svg';
import PreferNotIcon from '../../assets/icons/prefer-not.svg';

const RelationshipButton = ({ icon: Icon, label, selected, onPress }) => (
  <TouchableOpacity 
    style={[styles.relationshipButton, selected && styles.relationshipButtonSelected]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.relationshipContent}>
      <Icon 
        width={24} 
        height={24} 
        color={selected ? COLORS.primary : COLORS.textSecondary}
      />
      <Text style={[styles.relationshipLabel, selected && styles.relationshipLabelSelected]}>
        {label}
      </Text>
    </View>
    <View style={[styles.checkmark, !selected && styles.checkmarkPlaceholder]}>
      {selected && <Text style={styles.checkmarkText}>✓</Text>}
    </View>
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

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="Relationship status"
      subtitle="Select your current relationship status"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={!selected}
      currentStep={2}
      totalSteps={5}
      showBackButton={true}
    >
      <View style={styles.content}>
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
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.large,
  },
  relationshipOptions: {
    gap: SPACING.medium,
  },
  relationshipButton: {
    height: 72,
    borderRadius: SPACING.borderRadiusXLarge,
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
    borderWidth: 1,
    borderColor: 'rgba(30, 44, 86, 0.08)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(30, 44, 86, 0.08)',
        shadowOffset: {
          width: 0,
          height: 30,
        },
        shadowOpacity: 0.8,
        shadowRadius: 92,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  relationshipButtonSelected: {
    borderColor: COLORS.primary,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(102, 102, 255, 0.1)',
        shadowOffset: {
          width: 0,
          height: 46,
        },
        shadowOpacity: 0.8,
        shadowRadius: 92,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  relationshipContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.small,
  },
  relationshipLabel: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    color: COLORS.textSecondary,
  },
  relationshipLabelSelected: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weightSemiBold,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkPlaceholder: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  checkmarkText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeXSmall,
    fontWeight: TYPOGRAPHY.weightBold,
  },
});

export default RelationshipScreen; 