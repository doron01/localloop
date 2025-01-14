import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMap } from '../context/MapContext';

export default function MapDebug() {
  const { activeUsers, heatmapData } = useMap();

  return (
    <View style={styles.container}>
      <Text>Active Users: {activeUsers.length}</Text>
      <Text>Heatmap Points: {heatmapData.length}</Text>
      <Text>Sample User: {JSON.stringify(activeUsers[0], null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
}); 