import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

/**
 * A reusable selection card component for onboarding screens
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.description - Optional description text
 * @param {React.ComponentType} props.icon - Optional icon component
 * @param {boolean} props.selected - Whether the card is selected
 * @param {Function} props.onPress - Function to call when card is pressed
 * @param {Object} props.style - Additional styles to apply to the card
 */
const SelectionCard = ({
  title,
  description,
  icon: Icon,
  selected = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.containerSelected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon width={24} height={24} />
          </View>
        )}
        
        <View style={styles.textContainer}>
          <Text 
            style={[
              styles.title, 
              selected && styles.titleSelected
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {description && (
            <Text style={styles.description} numberOfLines={1}>
              {description}
            </Text>
          )}
        </View>
      </View>
      
      <View style={[styles.checkmarkContainer, selected && styles.checkmarkContainerSelected]}>
        {selected && <Text style={styles.checkmarkText}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusMedium,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 72,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(30, 44, 86, 0.08)',
        shadowOffset: { width: 0, height: 30 },
        shadowOpacity: 0.8,
        shadowRadius: 92,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  containerSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.card,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(102, 102, 255, 0.1)',
        shadowOffset: { width: 0, height: 46 },
        shadowOpacity: 0.8,
        shadowRadius: 92,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: SPACING.small,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
    paddingRight: SPACING.small,
  },
  title: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    color: COLORS.textPrimary,
    textTransform: 'capitalize',
  },
  titleSelected: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weightSemiBold,
  },
  description: {
    fontSize: TYPOGRAPHY.sizeXSmall,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    color: COLORS.textSecondary,
    flexWrap: 'wrap',
    flex: 1,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
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
});

export default SelectionCard; 