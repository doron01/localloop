import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import BusinessCard from '../profile/BusinessCard';

const MapScreen = () => {
  // Sample business data
  const sampleBusiness = {
    name: "Beach rd Hotel",
    category: "Bar",
    hereNow: [
      { id: 1, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 2, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: 3, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { id: 4, avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    ],
    comingLater: [
      { id: 5, avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
      { id: 6, avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
      { id: 7, avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
      { id: 8, avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
    ]
  };

  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const handleExpand = () => {
    console.log('Expanding business details');
    // Navigation will be implemented later
  };

  return (
    <View style={styles.container}>
      {/* Temporary button to show/hide business card */}
      <TouchableOpacity 
        style={styles.showCardButton}
        onPress={() => setSelectedBusiness(selectedBusiness ? null : sampleBusiness)}
      >
        <Text style={styles.buttonText}>
          {selectedBusiness ? 'Hide Business Card' : 'Show Business Card'}
        </Text>
      </TouchableOpacity>

      {/* Gray box representing map placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>Map Placeholder</Text>
      </View>

      {/* Business Card */}
      {selectedBusiness && (
        <View style={styles.cardContainer}>
          <BusinessCard 
            business={selectedBusiness}
            onExpand={handleExpand}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  showCardButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});

export default MapScreen; 