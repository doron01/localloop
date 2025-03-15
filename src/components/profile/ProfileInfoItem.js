import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditIcon from '../../assets/icons/profile/edit_icon.svg';

/**
 * ProfileInfoItem - A component for displaying profile information with an edit button
 */
const ProfileInfoItem = ({ label, value, icon, onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        
        {onEdit && (
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <EditIcon width={18} height={18} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.valueContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'System',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  editText: {
    fontSize: 14,
    color: '#6666FF',
    marginLeft: 4,
    fontFamily: 'System',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 8,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#0D162F',
    fontWeight: '500',
    fontFamily: 'System',
  },
});

export default ProfileInfoItem; 