import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const MapComponent = () => {
  const initialRegion = {
    latitude: -33.8915, // Bondi Beach latitude
    longitude: 151.2767, // Bondi Beach longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true} // Show user's location
      >
        <Marker 
          coordinate={{ latitude: -33.8915, longitude: 151.2767 }} 
          title="Bondi Beach" 
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;