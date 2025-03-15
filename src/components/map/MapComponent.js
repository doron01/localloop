import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

/**
 * MapComponent - A reusable map component with location tracking and business markers
 * 
 * @param {Object} props
 * @param {Object} props.style - Style object to be applied to the container
 * @param {Function} props.onMarkerPress - Callback function when a marker is pressed
 * @param {Array} props.businesses - Array of business objects with coordinates and details
 * @param {Component} props.RecenterIcon - Custom SVG icon for the recenter button
 * @param {Function} props.onMapReady - Callback function when map is ready
 * @returns {React.Component}
 */
const MapComponent = ({ style, onMarkerPress, businesses = [], RecenterIcon, onMapReady }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: -33.8905,  // Bondi Beach Latitude
    longitude: 151.2743, // Bondi Beach Longitude
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  });
  const [useMockLocation, setUseMockLocation] = useState(false);

  /**
   * Request permission to access the user's location
   */
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Please allow location access to use this feature'
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  /**
   * Get and set the user's current location
   */
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setUseMockLocation(true);
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
        mayShowUserSettingsDialog: true
      });
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
      setUseMockLocation(false);
    } catch (error) {
      console.error('Error getting location:', error);
      // Fall back to default location if we can't get the user's location
      const defaultRegion = {
        latitude: -33.8905,  // Bondi Beach Latitude
        longitude: 151.2743, // Bondi Beach Longitude
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      };
      setRegion(defaultRegion);
      mapRef.current?.animateToRegion(defaultRegion, 1000);
      console.log('Using default location due to error');
      setUseMockLocation(true);
    }
  };

  // Initialize map with user's location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsUserLocation={!useMockLocation}
        showsMyLocationButton={false}
        onMapReady={onMapReady}
      >
        {/* If using mock location, show a marker for the user */}
        {useMockLocation && (
          <Marker
            coordinate={region}
            title="You are here"
            pinColor="blue"
          />
        )}
        {businesses.map((business) => (
          <Marker 
            key={business.id}
            coordinate={business.coordinate}
            title={business.name}
            onPress={() => onMarkerPress(business)}
          />
        ))}
      </MapView>
      
      {RecenterIcon && (
        <TouchableOpacity 
          style={styles.recenterButton}
          onPress={getCurrentLocation}
        >
          <RecenterIcon width={20} height={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MapComponent; 