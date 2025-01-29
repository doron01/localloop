import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockLocalLoopChats, mockPokeChats } from '../../data/mockMessages';

export default function MessagesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('localloops');

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

  const renderPokeItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { userId: item.user.id })}
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
    <SafeAreaView style={styles.container}>
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

      {/* Chat Lists */}
      <FlatList
        data={activeTab === 'localloops' ? mockLocalLoopChats : mockPokeChats}
        renderItem={activeTab === 'localloops' ? renderLocalLoopItem : renderPokeItem}
        keyExtractor={item => item.id}
        style={styles.chatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#007AFF', // Blue color for active tab
    borderRadius: 20,
  },
  inactiveTab: {
    backgroundColor: '#fff', // White color for inactive tab
    borderWidth: 1,
    borderColor: '#007AFF', // Blue border for inactive tab
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff', // White text for active tab
  },
  inactiveTabText: {
    color: '#007AFF', // Blue text for inactive tab
  },
  chatList: {
    flex: 1,
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
}); 