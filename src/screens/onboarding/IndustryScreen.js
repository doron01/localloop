import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

// Import icons
import TechnologyIcon from '../../assets/icons/industry/technology.svg';
import HealthcareIcon from '../../assets/icons/industry/healthcare.svg';
import FinanceIcon from '../../assets/icons/industry/finance.svg';
import EducationIcon from '../../assets/icons/industry/education.svg';
import ArtsIcon from '../../assets/icons/industry/arts.svg';
import MarketingIcon from '../../assets/icons/industry/marketing.svg';
import NonProfitIcon from '../../assets/icons/industry/non-profit.svg';
import GovernmentIcon from '../../assets/icons/industry/government.svg';
import RetailIcon from '../../assets/icons/industry/retail.svg';
import HospitalityIcon from '../../assets/icons/industry/hospitality.svg';

const IndustryCard = ({ title, icon: Icon, selected, onPress }) => {
  const Icon2 = Icon || (() => null);
  
  return (
    <TouchableOpacity 
      style={[styles.industryCard, selected && styles.selectedIndustryCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {Icon && <Icon2 width={24} height={24} color={selected ? COLORS.primary : COLORS.textSecondary} />}
      <Text style={[styles.industryTitle, selected && styles.selectedIndustryTitle]}>
        {title}
      </Text>
      <View style={[styles.checkCircle, selected && styles.selectedCheckCircle]}>
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const IndustryScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const industries = [
    {
      id: 'technology',
      title: 'Technology & IT',
      icon: TechnologyIcon
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Medicine',
      icon: HealthcareIcon
    },
    {
      id: 'finance',
      title: 'Finance & Banking',
      icon: FinanceIcon
    },
    {
      id: 'education',
      title: 'Education & Academia',
      icon: EducationIcon
    },
    {
      id: 'arts',
      title: 'Arts & Entertainment',
      icon: ArtsIcon
    },
    {
      id: 'marketing',
      title: 'Marketing & Advertising',
      icon: MarketingIcon
    },
    {
      id: 'nonprofit',
      title: 'Non-Profit & Social Services',
      icon: NonProfitIcon
    },
    {
      id: 'government',
      title: 'Government & Public Service',
      icon: GovernmentIcon
    },
    {
      id: 'retail',
      title: 'Retail & Ecommerce',
      icon: RetailIcon
    },
    {
      id: 'hospitality',
      title: 'Hospitality & Tourism',
      icon: HospitalityIcon
    }
  ];

  const handleNext = () => {
    if (selected) {
      navigation.navigate('Work');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="Select your industry"
      subtitle="Choose an industry that best describes you"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={!selected}
      currentStep={4}
      totalSteps={5}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.gridContainer}>
          {industries.map((industry) => (
            <View key={industry.id} style={styles.gridItem}>
              <IndustryCard
                title={industry.title}
                icon={industry.icon}
                selected={selected === industry.id}
                onPress={() => setSelected(industry.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: SPACING.small,
    paddingBottom: SPACING.large,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.small,
    marginTop: SPACING.small,
    paddingHorizontal: SPACING.xsmall,
  },
  gridItem: {
    width: '48.5%',
    minWidth: 160,
    marginBottom: SPACING.xsmall,
  },
  industryCard: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.borderRadiusMedium,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.small,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.small,
    borderWidth: 1,
    borderColor: 'rgba(30, 44, 86, 0.08)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(30, 44, 86, 0.08)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedIndustryCard: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(102, 102, 255, 0.04)',
  },
  industryTitle: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizeSmall,
    lineHeight: 20,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weightRegular,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  selectedIndustryTitle: {
    fontWeight: TYPOGRAPHY.weightMedium,
  },
  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckCircle: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeXSmall,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    lineHeight: 16,
  },
});

export default IndustryScreen;
