import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import mockUsers from '../../data/mockUsers';
import { mockChatMessages } from '../../data/mockMessages';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

// Import shared components
import ChatDetailHeader from '../../components/chat/ChatDetailHeader';
import MessageInput from '../../components/chat/MessageInput';

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

  const handleMenuPress = () => {
    // Handle menu press
    console.log('Menu pressed in Direct chat');
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
        <ChatDetailHeader 
          onBackPress={() => navigation.goBack()}
          chatInfo={{ name: "User not found" }}
          chatType="direct"
        />
        <Text style={styles.errorText}>User not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Header */}
      <ChatDetailHeader 
        onBackPress={() => navigation.goBack()}
        onMenuPress={handleMenuPress}
        chatInfo={chatPartner}
        chatType="direct"
      />

      {/* Chat Messages */}
      <View style={styles.whiteContainer}>
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
        >
          <MessageInput 
            value={newMessage}
            onChangeText={setNewMessage}
            onSend={sendMessage}
            chatType="direct"
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SPACING.large,
    borderTopRightRadius: SPACING.large,
    overflow: 'hidden',
    marginTop: SPACING.small + 4, // 12
  },
  messagesContainer: {
    padding: SPACING.large,
    paddingBottom: SPACING.xlarge + 8, // 32
  },
  messageContainer: {
    maxWidth: '70%',
    marginVertical: SPACING.xsmall + 2, // 6
    padding: SPACING.medium,
    borderRadius: SPACING.borderRadiusMedium,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: SPACING.xsmall,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.messageBackground,
    borderBottomLeftRadius: SPACING.xsmall,
  },
  messageText: {
    fontSize: TYPOGRAPHY.sizeMedium,
    lineHeight: 22,
    marginBottom: SPACING.xsmall,
  },
  currentUserText: {
    color: COLORS.buttonText,
  },
  otherUserText: {
    color: COLORS.textPrimary,
  },
  timestampText: {
    fontSize: TYPOGRAPHY.sizeXSmall,
  },
  currentUserTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
  },
  otherUserTimestamp: {
    color: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-start',
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizeMedium,
    color: COLORS.textSecondary,
    marginLeft: SPACING.small + 2, // 10
    padding: SPACING.large,
    textAlign: 'center',
  },
}); 