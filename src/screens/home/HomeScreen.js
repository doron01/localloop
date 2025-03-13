import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MapScreen from './MapScreen';
import ProfileScreen from '../profile/ProfileScreen';
import BottomNavigation from '../../components/navigation/BottomNavigation';

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('explore');

  // Conditionally render the screen based on active tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'explore':
        return <MapScreen />;
      case 'messages':
        // Instead of rendering ChatScreen directly, navigate to Messages screen
        navigation.navigate('Messages');
        return null;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <MapScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        {renderScreen()}
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <BottomNavigation activeTab={activeTab} />
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
  bottomNavContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  }
});
