import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import mockUsers from '../../data/mockUsers';
import { mockChatMessages } from '../../data/mockMessages';

/**
 * DirectChatScreen - Handles one-on-one chat between the current user and another user
 * Receives userId via route.params to determine which user to chat with
 */
export default function DirectChatScreen({ navigation, route }) {
  // Get userId from route params, default to '2' if not provided (for testing)
  const { userId = '2' } = route.params || {};
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  
  const currentUser = mockUsers.find(user => user.id === '1'); // Current user
  const chatPartner = mockUsers.find(user => user.id === userId); // Chat partner based on userId
  
  // Load messages for this specific chat partner
  useEffect(() => {
    // In a real app, you would fetch messages for this specific user from an API
    // For now, we'll just filter the mock messages to show only those between these two users
    const relevantMessages = mockChatMessages.filter(msg => 
      (msg.senderId === currentUser.id && msg.receiverId === userId) || 
      (msg.senderId === userId && msg.receiverId === currentUser.id)
    );
    
    setMessages(relevantMessages);
  }, [userId]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: String(Date.now()), // Use timestamp for unique ID
      senderId: currentUser.id,
      receiverId: chatPartner.id,
      text: newMessage.trim(),
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
    
    // Scroll to bottom after sending message
    flatListRef.current?.scrollToEnd();
    
    // In a real app, you would send this message to an API
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.senderId === currentUser.id;

    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.timestampText,
          isCurrentUser ? styles.currentUserTimestamp : styles.otherUserTimestamp
        ]}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  // If chat partner doesn't exist, show error
  if (!chatPartner) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.errorText}>User not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.headerProfile}>
          <Image 
            source={{ uri: chatPartner.profileImage }} 
            style={styles.profileImage} 
          />
          <Text style={styles.headerTitle}>{chatPartner.name}</Text>
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Input Footer */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Message..."
          placeholderTextColor="#999"
          multiline
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Icon name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 20,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  currentUserText: {
    color: '#fff',
  },
  otherUserText: {
    color: '#000',
  },
  timestampText: {
    fontSize: 12,
  },
  currentUserTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
  },
  otherUserTimestamp: {
    color: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 