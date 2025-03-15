import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MapScreen from './MapScreen';
import ProfileDashboardScreen from '../profile/ProfileDashboardScreen';
import BottomNavigation from '../../components/navigation/BottomNavigation';

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('explore');
  const insets = useSafeAreaInsets();

  // Function to handle tab changes
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Conditionally render the screen based on active tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'explore':
        // Map screen needs to render full screen without top safe area
        return (
          <View style={styles.mapContainer}>
            <MapScreen />
          </View>
        );
      case 'messages':
        // Navigate to Messages screen
        navigation.navigate('Messages');
        return null;
      case 'profile':
        return <ProfileDashboardScreen />;
      default:
        return (
          <View style={styles.mapContainer}>
            <MapScreen />
          </View>
        );
    }
  };

  // Use edges prop to exclude top edge only when showing the map
  const safeAreaEdges = activeTab === 'explore' ? ['right', 'bottom', 'left'] : ['right', 'top', 'bottom', 'left'];

  return (
    <SafeAreaView style={styles.container} edges={safeAreaEdges}>
      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        {renderScreen()}
      </View>
      
      {/* Bottom Navigation */}
      <View style={[styles.bottomNavContainer, { paddingBottom: insets.bottom > 0 ? 0 : 10 }]}>
        <BottomNavigation activeTab={activeTab} onTabPress={handleTabChange} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 100,
  }
});
