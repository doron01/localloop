import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { mockLocalLoopMessagesData } from '../../data/mockLocalLoopMessages';
import mockUsers from '../../data/mockUsers';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

// Import shared components
import ChatDetailHeader from '../../components/chat/ChatDetailHeader';
import MessageInput from '../../components/chat/MessageInput';

/**
 * LocalLoopChatScreen - Handles group chat for a specific business (Local Loop)
 * Receives businessId via route.params to fetch the correct chat data
 */
export default function LocalLoopChatScreen({ navigation, route }) {
  const { businessId } = route.params;
  
  // Find local loop data based on businessId
  const localLoopData = mockLocalLoopMessagesData.find(
    data => data.businessId === businessId
  );

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  
  // Get current user information
  const currentUser = mockUsers.find(user => user.id === '1');

  // Load messages for this specific business chat
  useEffect(() => {
    if (localLoopData) {
      setMessages(localLoopData.messages);
    }
  }, [localLoopData]);

  // Handle case where localLoopData is undefined
  if (!localLoopData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ChatDetailHeader 
            onBackPress={() => navigation.goBack()}
            chatInfo={{ businessName: "Not Found" }}
            chatType="localloop"
          />
          <Text style={styles.errorText}>No chat data found for this business.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: String(Date.now()),
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

  const handleMenuPress = () => {
    // Handle menu press
    console.log('Menu pressed in LocalLoop chat');
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
        <Text style={[
          styles.timestampText,
          isCurrentUser ? styles.currentUserTimestamp : styles.otherUserTimestamp
        ]}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ChatDetailHeader 
        onBackPress={() => navigation.goBack()}
        onMenuPress={handleMenuPress}
        chatInfo={localLoopData}
        chatType="localloop"
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
            chatType="localloop"
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
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: SPACING.small,
  },
  senderName: {
    fontSize: TYPOGRAPHY.sizeXSmall,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    color: COLORS.textSecondary,
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