import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from '../../constants/theme';

/**
 * A reusable selection card component for onboarding screens
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.description - Optional description text
 * @param {React.ComponentType} props.icon - Optional icon component
 * @param {React.ReactNode} props.leftContent - Optional custom left content
 * @param {boolean} props.selected - Whether the card is selected
 * @param {Function} props.onPress - Function to call when card is pressed
 * @param {Object} props.style - Additional styles to apply to the card
 * @param {string} props.variant - Card variant ('default', 'pill', or 'hobby')
 * @param {boolean} props.compact - Whether to use compact styling
 */
const SelectionCard = ({
  title,
  description,
  icon: Icon,
  leftContent,
  selected = false,
  onPress,
  style,
  variant = 'default',
  compact = false,
}) => {
  // Determine container style based on variant
  const containerStyle = [
    styles.container,
    variant === 'pill' && styles.pillContainer,
    variant === 'hobby' && styles.hobbyContainer,
    selected && styles.containerSelected,
    variant === 'pill' && selected && styles.pillContainerSelected,
    variant === 'hobby' && selected && styles.hobbyContainerSelected,
    compact && styles.compactContainer,
    !description && styles.containerNoDescription,
    style,
  ];

  // For hobby variant, we want to show the checkmark first
  const hobbyContent = (
    <>
      {Icon && variant === 'hobby' && !selected && (
        <View style={styles.hobbyIconContainer}>
          <Icon width={20} height={20} />
        </View>
      )}
      {selected && variant === 'hobby' && (
        <View style={styles.hobbyCheckCircle}>
          <Text style={styles.hobbyCheckmark}>✓</Text>
        </View>
      )}
      <Text 
        style={[
          styles.title,
          variant === 'hobby' && styles.hobbyTitle,
          variant === 'hobby' && selected && styles.hobbyTitleSelected,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
    </>
  );

  // Default content layout
  const defaultContent = (
    <>
      <View style={styles.content}>
        {leftContent ? (
          <View style={styles.iconContainer}>
            {leftContent}
          </View>
        ) : Icon && variant !== 'hobby' && (
          <View style={styles.iconContainer}>
            <Icon width={24} height={24} />
          </View>
        )}
        
        <View style={[styles.textContainer, !description && styles.textContainerNoDescription]}>
          <Text 
            style={[
              styles.title, 
              selected && styles.titleSelected,
              variant === 'pill' && styles.pillTitle,
              variant === 'pill' && selected && styles.pillTitleSelected,
            ]}
            numberOfLines={variant === 'pill' ? 2 : 1}
          >
            {title}
          </Text>
          {description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
      </View>
      
      {variant !== 'hobby' && (
        <View style={[
          styles.checkmarkContainer, 
          selected && styles.checkmarkContainerSelected,
          variant === 'pill' && styles.pillCheckmarkContainer,
        ]}>
          {selected && <Text style={styles.checkmarkText}>✓</Text>}
        </View>
      )}
    </>
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {variant === 'hobby' ? hobbyContent : defaultContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusMedium,
    backgroundColor: COLORS.card,
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.border,
    minHeight: 72,
    marginBottom: SPACING.small,
    ...COLORS.cardShadow,
  },
  containerNoDescription: {
    minHeight: 56,
    alignItems: 'center',
  },
  pillContainer: {
    borderRadius: SPACING.borderRadiusXLarge,
    paddingVertical: SPACING.cardPaddingVertical,
    paddingHorizontal: SPACING.cardPaddingHorizontal,
    marginBottom: SPACING.cardMarginBottom,
    minHeight: 64,
  },
  hobbyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.card,
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.border,
    ...COLORS.cardShadow,
  },
  compactContainer: {
    minHeight: 56,
    padding: SPACING.small,
  },
  containerSelected: {
    borderColor: COLORS.primary,
    borderWidth: SPACING.borderWidthSelected,
    ...COLORS.selectedCardShadow,
  },
  pillContainerSelected: {
    backgroundColor: COLORS.card,
  },
  hobbyContainerSelected: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.primary,
    borderWidth: SPACING.borderWidthSelected,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: SPACING.small,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  hobbyIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 4,
    paddingRight: SPACING.medium,
  },
  textContainerNoDescription: {
    justifyContent: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    color: COLORS.textPrimary,
    flexWrap: 'wrap',
    lineHeight: 24,
  },
  pillTitle: {
    fontSize: 15,
    color: COLORS.cardText,
    fontWeight: TYPOGRAPHY.weightRegular,
    lineHeight: 20,
  },
  hobbyTitle: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weightRegular,
    textTransform: 'capitalize',
  },
  titleSelected: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weightSemiBold,
  },
  pillTitleSelected: {
    fontWeight: TYPOGRAPHY.weightMedium,
  },
  hobbyTitleSelected: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weightSemiBold,
  },
  description: {
    fontSize: TYPOGRAPHY.sizeXSmall,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    color: COLORS.textSecondary,
    flexWrap: 'wrap',
  },
  checkmarkContainer: {
    ...LAYOUT.selectionIndicator,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  pillCheckmarkContainer: {
    marginLeft: SPACING.small,
    borderWidth: SPACING.borderWidthSelected,
  },
  checkmarkContainerSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmarkText: {
    fontSize: TYPOGRAPHY.sizeXSmall,
    color: COLORS.buttonText,
    fontWeight: TYPOGRAPHY.weightBold,
  },
  hobbyCheckCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hobbyCheckmark: {
    color: COLORS.buttonText,
    fontSize: 12,
    fontWeight: TYPOGRAPHY.weightBold,
  },
});

export default SelectionCard; 