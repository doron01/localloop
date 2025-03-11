import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, TextInput, Image, Keyboard } from 'react-native';
import MapComponent from './maps/MapView';
import BusinessCard from '../profile/BusinessCard';
import UserProfileScreen from '../profile/UserProfileScreen';
import { businessLocations } from '../../data/mockBusinesses';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { currentUser } from '../../data/mockUsers';

export default function MapScreen() {
  const navigation = useNavigation();
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAttendanceStatus, setUserAttendanceStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('explore');
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
      {/* Search Bar and Profile */}
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
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image 
              source={{ uri: currentUser.profileImage }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapComponent 
          onMarkerPress={handleMarkerPress}
          businesses={businessLocations}
        />
      </View>

      {/* Only show tabs if keyboard is not visible */}
      {!isKeyboardVisible && (
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'explore' && styles.activeTab]}
            onPress={() => setActiveTab('explore')}
          >
            <Text style={[styles.tabText, activeTab === 'explore' && styles.activeTabText]}>
              Explore
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
            onPress={() => navigation.navigate('Messages')}
          >
            <Text style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>
              Messages
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  profileButton: {
    marginLeft: 10,
  },
  mapContainer: {
    flex: 1,
  },
  tabContainer: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -100 }],
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: 'white',
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