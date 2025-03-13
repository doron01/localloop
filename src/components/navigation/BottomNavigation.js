import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = ({ activeTab }) => {
  const navigation = useNavigation();

  const handleTabPress = (tabName) => {
    switch (tabName) {
      case 'explore':
        navigation.navigate('Home');
        break;
      case 'messages':
        navigation.navigate('Messages');
        break;
      case 'profile':
        navigation.navigate('Profile');
        break;
    }
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'explore' && styles.activeTab]}
        onPress={() => handleTabPress('explore')}
      >
        <Icon name="explore" size={24} color={activeTab === 'explore' ? 'white' : '#666'} />
        <Text style={[styles.tabText, activeTab === 'explore' && styles.activeTabText]}>
          Explore
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
        onPress={() => handleTabPress('messages')}
      >
        <Icon name="chat" size={24} color={activeTab === 'messages' ? 'white' : '#666'} />
        <Text style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>
          Messages
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
        onPress={() => handleTabPress('profile')}
      >
        <Icon name="person" size={24} color={activeTab === 'profile' ? 'white' : '#666'} />
        <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
    width: '90%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activeTabText: {
    color: 'white',
  },
});

export default BottomNavigation; 