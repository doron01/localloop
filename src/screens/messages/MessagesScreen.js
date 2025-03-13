import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockLocalLoopChats, mockPokeChats } from '../../data/mockMessages';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../../components/navigation/BottomNavigation';

/**
 * MessagesScreen - Main entry point for messages, showing a tabbed list of 
 * LocalLoop chats (business-based) and Poke chats (direct messages)
 */
export default function MessagesScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('localloops');

  // Renders a local loop chat item
  const renderLocalLoopItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('LocalLoopChat', { 
        businessId: parseInt(item.id) // Convert string id to number
      })}
    >
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  // Renders a direct chat (poke) item
  const renderPokeItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('DirectChat', { userId: item.user.id })}
    >
      <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.user.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Messages</Text>
        
        {/* Tab Slider */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'localloops' ? styles.activeTab : styles.inactiveTab
            ]}
            onPress={() => setActiveTab('localloops')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'localloops' ? styles.activeTabText : styles.inactiveTabText
            ]}>
              Localloops
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'pokes' ? styles.activeTab : styles.inactiveTab
            ]}
            onPress={() => setActiveTab('pokes')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'pokes' ? styles.activeTabText : styles.inactiveTabText
            ]}>
              Pokes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chat Lists - Shows either local loop chats or direct chats based on active tab */}
        <FlatList
          data={activeTab === 'localloops' ? mockLocalLoopChats : mockPokeChats}
          renderItem={activeTab === 'localloops' ? renderLocalLoopItem : renderPokeItem}
          keyExtractor={item => item.id}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
        />
      </SafeAreaView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <BottomNavigation activeTab="messages" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  inactiveTab: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#007AFF',
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingBottom: 100, // Add padding to account for bottom navigation
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    marginLeft: 10,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: 'transparent',
  },
}); 