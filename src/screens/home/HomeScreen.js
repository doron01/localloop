import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapScreen from './MapScreen';
import { currentUser } from '../../data/mockUsers';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MapScreen />
      
      {/* Header Icons Container */}
      <View style={styles.headerContainer}>
        {/* Profile Avatar Button */}
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image 
            source={{ uri: currentUser.profileImage }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        {/* Messages Button */}
        <TouchableOpacity 
          style={styles.messagesButton}
          onPress={() => navigation.navigate('Messages')}
        >
          <Icon name="chat" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  profileButton: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 25,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  messagesButton: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
