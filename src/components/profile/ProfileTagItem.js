import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * ProfileTagItem - A component for displaying a tag-like item in profile
 */
const ProfileTagItem = ({ text, icon, style }) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 102, 255, 0.13)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 6,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#6666FF',
    fontWeight: '500',
    fontFamily: 'System',
  },
});

export default ProfileTagItem; 