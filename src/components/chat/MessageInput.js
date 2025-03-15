import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import SendIcon from '../../assets/icons/send.svg';

/**
 * Shared message input component for chat screens
 * @param {Object} props
 * @param {string} props.value - The current input value
 * @param {Function} props.onChangeText - Function called when text changes
 * @param {Function} props.onSend - Function called when send button is pressed
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {string} props.chatType - Type of chat ('localloop' or 'direct')
 */
const MessageInput = ({ 
  value, 
  onChangeText, 
  onSend, 
  placeholder = 'Message...',
  chatType = 'direct'
}) => {
  const isLocalLoop = chatType === 'localloop';
  const customPlaceholder = isLocalLoop ? 'Message the Local Loop...' : placeholder;
  
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={customPlaceholder}
          placeholderTextColor={COLORS.textSecondary}
          multiline
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={onSend}
          disabled={!value.trim()}
        >
          <SendIcon width={20} height={20} style={{ color: COLORS.buttonText }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small + 4, // 12
    borderTopWidth: SPACING.borderWidthRegular,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.primary,
    borderRadius: SPACING.borderRadiusMedium,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small + 4, // 12
    paddingRight: 54, // Make room for the send button
    fontSize: TYPOGRAPHY.sizeMedium,
    color: COLORS.textPrimary,
    minHeight: 48,
    maxHeight: 100,
  },
  sendButton: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageInput; 