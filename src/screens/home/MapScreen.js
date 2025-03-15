import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  Keyboard, 
  Platform, 
  StatusBar,
  LogBox
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import MapComponent from '../../components/map/MapComponent';
// Uncomment the line below if you want to use the MapDebug component in development
// import MapDebug from '../../components/map/MapDebug';
import BusinessCard from '../profile/BusinessCard';
import UserProfileScreen from '../profile/UserProfileScreen';
import { businessLocations } from '../../data/mockBusinesses';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
// Import custom SVG icons
import SearchIcon from '../../assets/icons/search.svg';
import RecenterIcon from '../../assets/icons/recenter.svg';
// Import QuickFilters component
import QuickFilters from '../../components/map/QuickFilters';

// Ignore specific warnings (optional, for development troubleshooting)
LogBox.ignoreLogs(['Warning: ...']); // Add specific warnings if needed

export default function MapScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAttendanceStatus, setUserAttendanceStatus] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Force set the header to hidden whenever this screen is focused
  useEffect(() => {
    if (isFocused) {
      navigation.setOptions({
        headerShown: false,
        // The following ensures any parent navigator doesn't apply safe area
        headerStyle: { 
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
      });
      
      // Debug insets values
      console.log('SafeArea insets:', insets);
    }

    // Cleanup function
    return () => {
      // If needed, restore navigation defaults when unmounting
      // navigation.setOptions({ headerShown: true });
    };
  }, [navigation, isFocused, insets]);

  // Keyboard listeners
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

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    // Here you would normally filter the markers/businesses based on the selected filters
    console.log('Filters applied:', filters);
  };

  // Calculate search bar positioning
  const searchBarTopOffset = Platform.OS === 'ios' 
    ? insets.top + 5 // iOS: Just a tiny bit below status bar
    : (StatusBar.currentHeight || 0) + 5; // Android: Just below status bar

  // This triggers when the map is ready to display
  const handleMapReady = () => {
    setMapReady(true);
  };

  return (
    // Using a plain View without SafeAreaView to avoid any automatic insets
    <View style={styles.mainContainer}>
      {/* Status bar translucent to allow content behind it */}
      <StatusBar 
        translucent={true} 
        backgroundColor="transparent" 
        barStyle="dark-content" 
      />
      
      {/* Map component with explicit positioning parameters */}
      <MapComponent 
        style={[styles.mapStyle, { 
          // Explicit negative top margin to counter any remaining insets
          marginTop: -Math.max(insets.top, 0),
          // Extra height to cover any gap
          height: Dimensions.get('window').height + Math.max(insets.top, 0),
        }]}
        onMarkerPress={handleMarkerPress}
        businesses={businessLocations}
        RecenterIcon={RecenterIcon}
        onMapReady={handleMapReady}
      />

      {/* The rest of the UI is positioned with absolute positioning */}
      <View style={[styles.topContainer, { top: searchBarTopOffset }]}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <View style={styles.searchIconContainer}>
              <SearchIcon width={18} height={18} />
            </View>
            <View style={styles.separator} />
            <TextInput
              style={styles.searchInput}
              placeholder="Colosseum, Rome"
              placeholderTextColor="#666"
              returnKeyType="search"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
        </View>
        
        {/* Quick Filters below search bar */}
        <View style={styles.filtersContainer}>
          <QuickFilters onFilterChange={handleFilterChange} />
        </View>
      </View>

      {/* Business Card Overlay */}
      {selectedBusiness && (
        <View style={[styles.overlayContainer, { 
          maxHeight: '50%', 
          paddingBottom: insets.bottom 
        }]}>
          <BusinessCard 
            business={selectedBusiness} 
            initialExpanded={false}
            onClose={handleCloseCard}
            onUserPress={handleUserPress}
          />
        </View>
      )}

      {/* User Profile Overlay */}
      {selectedUser && (
        <View style={[styles.overlayContainer, { 
          maxHeight: '70%', 
          paddingBottom: insets.bottom 
        }]}>
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
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden', // Important to prevent content bleeding outside bounds
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0, // Ensure map is behind everything
  },
  topContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it's above map and other elements
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 10, // Increased spacing between search bar and filters
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIconContainer: {
    marginRight: 12,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0D162F',
    padding: 0,
  },
  filtersContainer: {
    marginTop: 4,
    paddingBottom: 4,
    zIndex: 20, // Higher than other UI elements to ensure dropdowns appear on top
    backgroundColor: 'transparent', // Ensure background is transparent
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 30, // Above everything else
  }
}); 