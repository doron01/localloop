import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMap } from '../../context/MapContext';

/**
 * MapDebug - A development tool to display map-related debugging information
 * 
 * Shows information about active users and heatmap data from the Map context.
 * This component should only be used during development.
 * 
 * @returns {React.Component}
 */
export default function MapDebug() {
  const { activeUsers, heatmapData } = useMap();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map Debug Info</Text>
      <Text>Active Users: {activeUsers?.length || 0}</Text>
      <Text>Heatmap Points: {heatmapData?.length || 0}</Text>
      {activeUsers && activeUsers.length > 0 && (
        <Text>Sample User: {JSON.stringify(activeUsers[0], null, 2)}</Text>
      )}
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
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  }
}); 