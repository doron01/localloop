import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import SearchIcon from '../../assets/icons/search.svg';
import ElipseIcon from '../../assets/icons/elipse.svg';

/**
 * Shared header component for chat screens
 * @param {Object} props
 * @param {string} props.title - The title to display in the header
 * @param {Function} props.onBackPress - Optional function to call when back button is pressed
 * @param {Function} props.onSearchPress - Function to call when search button is pressed
 * @param {Function} props.onMenuPress - Function to call when menu button is pressed
 */
const ChatHeader = ({ title, onBackPress, onSearchPress, onMenuPress }) => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onSearchPress}
          >
            <SearchIcon width={20} height={20} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onMenuPress}
          >
            <ElipseIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    backgroundColor: COLORS.backgroundSecondary,
  },
  title: {
    fontSize: TYPOGRAPHY.sizeXXLarge,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: SPACING.borderRadiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.border,
    marginLeft: SPACING.small,
  },
});

export default ChatHeader; 