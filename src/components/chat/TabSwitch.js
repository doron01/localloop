import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

/**
 * Shared tab switch component for toggling between chat types
 * @param {Object} props
 * @param {string} props.activeTab - The currently active tab
 * @param {Function} props.onTabChange - Function to call when tab is changed
 * @param {Array} props.tabs - Array of tab objects with id and label properties
 */
const TabSwitch = ({ activeTab, onTabChange, tabs = [
  { id: 'localloops', label: 'Localloops' },
  { id: 'pokes', label: 'Pokes' }
] }) => {
  return (
    <View style={styles.tabContainerWrapper}>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity 
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => onTabChange(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainerWrapper: {
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.medium,
    backgroundColor: COLORS.backgroundSecondary,
    paddingTop: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusXLarge,
    padding: SPACING.xsmall - 1, // 3px
    height: 40,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.small,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.borderRadiusXLarge,
  },
  activeTab: {
    backgroundColor: 'rgba(102, 102, 255, 0.12)',
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightMedium,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weightSemiBold,
  },
});

export default TabSwitch; 