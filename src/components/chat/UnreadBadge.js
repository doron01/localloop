import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

/**
 * Shared unread badge component for displaying unread message counts
 * @param {Object} props
 * @param {number} props.count - The number of unread messages
 */
const UnreadBadge = ({ count }) => {
  if (!count || count <= 0) return null;
  
  return (
    <View style={styles.unreadBadge}>
      <Text style={styles.unreadCount}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING.borderRadiusSmall,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xsmall - 1, // 3px
  },
  unreadCount: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeXSmall,
    fontWeight: TYPOGRAPHY.weightMedium,
  },
});

export default UnreadBadge; 