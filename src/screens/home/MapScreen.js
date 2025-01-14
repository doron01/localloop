import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapComponent from './maps/MapView'; // Import the MapView component

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 