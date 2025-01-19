import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapComponent from './maps/MapView';
import BusinessCard from '../profile/BusinessCard';
import UserProfileScreen from '../profile/UserProfileScreen';
import { businessLocations } from '../../data/mockBusinesses';

export default function MapScreen() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAttendanceStatus, setUserAttendanceStatus] = useState(null);

  const handleMarkerPress = (business) => {
    setSelectedBusiness(business);
    setSelectedUser(null); // Close user profile if open
  };

  const handleCloseCard = () => {
    setSelectedBusiness(null);
  };

  const handleUserPress = (user, attendanceStatus) => {
    setSelectedUser(user);
    setUserAttendanceStatus(attendanceStatus);
    setSelectedBusiness(null); // Close business card when showing user profile
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapComponent 
          onMarkerPress={handleMarkerPress}
          businesses={businessLocations}
        />
      </View>
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