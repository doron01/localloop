import React, { useState, useRef } from 'react';
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
import { mockLocalLoopMessagesData } from '../../data/mockLocalLoopMessages';
import mockUsers from '../../data/mockUsers';

export default function LocalLoopChatScreen({ navigation, route }) {
  const { businessId } = route.params;
  
  // Debug the received businessId
  console.log('Received businessId:', businessId);
  
  const localLoopData = mockLocalLoopMessagesData.find(data => {
    console.log('Comparing:', data.businessId, businessId);
    return data.businessId === businessId;
  });

  // Debugging: Check if localLoopData is found
  console.log('Local Loop Data:', localLoopData);

  // Handle case where localLoopData is undefined
  if (!localLoopData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.errorText}>No chat data found for this business.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const [messages, setMessages] = useState(localLoopData.messages);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  
  const currentUser = mockUsers[0]; // Using first user as current user

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: String(messages.length + 1),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.profileImage,
      text: newMessage.trim(),
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
    
    flatListRef.current?.scrollToEnd();
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.senderId === currentUser.id;

    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        {!isCurrentUser && (
          <View style={styles.messageHeader}>
            <Image source={{ uri: item.senderAvatar }} style={styles.avatar} />
            <Text style={styles.senderName}>{item.senderName}</Text>
          </View>
        )}
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{localLoopData.businessName}</Text>
          <Text style={styles.headerTitle}>Local Loop Chat</Text>
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
          placeholder="Message the Local Loop..."
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
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
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
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
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
  },
  currentUserText: {
    color: '#fff',
  },
  otherUserText: {
    color: '#000',
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
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
}); 