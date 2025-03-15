import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * ProfileHeader - A common header component for profile screens
 */
const ProfileHeader = ({ title, titleStyle, showBackButton, onBackPress, rightIcon, onRightIconPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#0D162F" />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightButton}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEBED',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0D162F',
    fontFamily: 'System',
  },
  rightButton: {
    padding: 4,
  },
});

export default ProfileHeader; 