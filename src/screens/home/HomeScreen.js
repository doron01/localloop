import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapScreen from './MapScreen';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
