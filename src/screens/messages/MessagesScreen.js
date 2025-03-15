import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockLocalLoopChats, mockPokeChats } from '../../data/mockMessages';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import { COLORS } from '../../constants/theme';

// Import shared components
import ChatHeader from '../../components/chat/ChatHeader';
import TabSwitch from '../../components/chat/TabSwitch';
import { LocalLoopList, PokeList } from '../../components/chat/ChatLists';

/**
 * MessagesScreen - Main entry point for messages, showing a tabbed list of 
 * LocalLoop chats (business-based) and Poke chats (direct messages)
 */
export default function MessagesScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('localloops'); // Set to localloops to match screenshot

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSearchPress = () => {
    // Handle search action
    console.log('Search pressed');
  };

  const handleMenuPress = () => {
    // Handle menu action
    console.log('Menu pressed');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Use the shared ChatHeader component */}
        <ChatHeader 
          title="Messages" 
          onSearchPress={handleSearchPress}
          onMenuPress={handleMenuPress}
        />

        {/* Use the shared TabSwitch component */}
        <TabSwitch 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Render the appropriate list based on the active tab */}
        {activeTab === 'localloops' ? (
          <LocalLoopList data={mockLocalLoopChats} navigation={navigation} />
        ) : (
          <PokeList data={mockPokeChats} navigation={navigation} />
        )}
      </SafeAreaView>

      {/* Use the original BottomNavigation component */}
      <View style={styles.bottomNavContainer}>
        <BottomNavigation activeTab="messages" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary, // Match grey background for the entire container
  },
  safeArea: {
    flex: 1,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
}); 
