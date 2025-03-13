import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, TextInput, Keyboard } from 'react-native';
import MapComponent from '../../components/map/MapComponent';
// Uncomment the line below if you want to use the MapDebug component in development
// import MapDebug from '../../components/map/MapDebug';
import BusinessCard from '../profile/BusinessCard';
import UserProfileScreen from '../profile/UserProfileScreen';
import { businessLocations } from '../../data/mockBusinesses';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function MapScreen() {
  const navigation = useNavigation();
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAttendanceStatus, setUserAttendanceStatus] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleMarkerPress = (business) => {
    setSelectedBusiness(business);
    setSelectedUser(null);
  };

  const handleCloseCard = () => {
    setSelectedBusiness(null);
  };

  const handleUserPress = (user, attendanceStatus) => {
    setSelectedUser(user);
    setUserAttendanceStatus(attendanceStatus);
    setSelectedBusiness(null);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Bar (profile picture removed) */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
            returnKeyType="search"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapComponent 
          onMarkerPress={handleMarkerPress}
          businesses={businessLocations}
        />
      </View>

      {/* Overlays */}
      {selectedBusiness && (
        <View style={styles.overlayContainer}>
          <BusinessCard 
            business={selectedBusiness} 
            initialExpanded={false}
            onClose={handleCloseCard}
            onUserPress={handleUserPress}
          />
        </View>
      )}
      {selectedUser && (
        <View style={styles.overlayContainer}>
          <UserProfileScreen
            user={selectedUser}
            attendanceStatus={userAttendanceStatus}
            onClose={() => setSelectedUser(null)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    position: 'absolute',
    top: 65,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
    height: Dimensions.get('window').height,
  }
}); 