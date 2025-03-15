import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import BackArrow from '../../assets/icons/back-arrow.svg';
import ElipseIcon from '../../assets/icons/elipse.svg';

/**
 * Renders the time progress circle around a business icon
 * @param {string} timeAgo - Time ago in hours
 * @returns {Object} Style object for the progress circle
 */
const renderTimeProgress = (timeAgo) => {
  // Ensure timeAgo is a number or numeric string, default to 0 if not
  const timeValue = typeof timeAgo === 'string' || typeof timeAgo === 'number' 
    ? parseInt(timeAgo || 0, 10) 
    : 0;
  
  // Calculate progress percentage based on 24-hour timeline
  const progress = 1 - (timeValue / 24);
  
  // Create styles for progress circle
  return {
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: COLORS.primary,
    borderRightColor: progress > 0.25 ? COLORS.primary : 'transparent',
    borderBottomColor: progress > 0.5 ? COLORS.primary : 'transparent',
    borderLeftColor: progress > 0.75 ? COLORS.primary : 'transparent',
    transform: [{ rotate: `-${progress * 360}deg` }],
  };
};

/**
 * Shared header component for chat detail screens
 * @param {Object} props
 * @param {Function} props.onBackPress - Function to call when back button is pressed
 * @param {Function} props.onMenuPress - Function to call when menu button is pressed
 * @param {Object} props.chatInfo - Information about the chat (user or business)
 * @param {string} props.chatType - Type of chat ('localloop' or 'direct')
 */
const ChatDetailHeader = ({ 
  onBackPress, 
  onMenuPress,
  chatInfo,
  chatType = 'localloop' // Default to localloop chat
}) => {
  const isLocalLoop = chatType === 'localloop';
  
  // Extract the correct timeAgo based on data structure
  // If we have businessId, it's coming from mockLocalLoopMessagesData, otherwise from mockLocalLoopChats
  const chatTimeAgo = isLocalLoop 
    ? (chatInfo.timeAgo || 
       (chatInfo.businessId ? getTimeAgoFromBusiness(chatInfo.businessId) : '5')) 
    : null;
  
  return (
    <View style={styles.header}>
      {/* Top row with back button and menu */}
      <View style={styles.headerTopRow}>
        <TouchableOpacity 
          onPress={onBackPress}
          style={styles.backButton}
        >
          <BackArrow width={18} height={18} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <ElipseIcon width={18} height={18} />
        </TouchableOpacity>
      </View>
      
      {/* Profile info section */}
      <View style={styles.profileSection}>
        {isLocalLoop ? (
          <View style={styles.profileContentRow}>
            {/* Left side - icon with time circle */}
            <View style={styles.iconColumn}>
              <View style={styles.iconContainer}>
                <View style={[styles.progressCircle, renderTimeProgress(chatTimeAgo)]} />
                <Image 
                  source={chatInfo.icon} 
                  style={styles.businessIcon} 
                />
              </View>
              <View style={styles.timeIndicator}>
                <Icon name="time-outline" size={11} color={COLORS.primary} />
                <Text style={styles.timeText}>{chatTimeAgo} hr</Text>
              </View>
            </View>
            
            {/* Right side - business name */}
            <View style={styles.nameContainer}>
              <Text style={styles.businessName}>{chatInfo.businessName || chatInfo.name}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.profileContentRow}>
            {/* For direct chats - simple profile image and name */}
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: chatInfo.profileImage }} 
                style={styles.profileImage} 
              />
            </View>
            
            <View style={styles.nameContainer}>
              <Text style={styles.headerTitle}>{chatInfo.name}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

/**
 * Helper function to get timeAgo from a business ID
 * This simulates looking up the business in the main chat list data
 */
const getTimeAgoFromBusiness = (businessId) => {
  // This would typically fetch from state/context/redux
  // For now, we'll use a simple mapping based on the mockLocalLoopChats data
  const timeMap = {
    1: '5',   // Beachfront Bliss Resort
    2: '11',  // Restaurant Menu & Reservations
    3: '16',  // parenting pup
    4: '20',  // FitZone Gym
    5: '22',  // Art Atudio
  };
  
  return timeMap[businessId] || '5'; // Default to 5 if not found
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingBottom: SPACING.small + 4, // 12
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.small + 4, // 12
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: SPACING.borderRadiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.border,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: SPACING.borderRadiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.border,
  },
  profileSection: {
    paddingHorizontal: SPACING.large,
  },
  profileContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconColumn: {
    alignItems: 'center',
    marginRight: SPACING.medium,
    width: 60, // Fixed width for consistent spacing
  },
  iconContainer: {
    width: 48,
    height: 48,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xsmall,
  },
  progressCircle: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
  },
  businessIcon: {
    width: 40,
    height: 40,
    borderRadius: SPACING.small,
  },
  nameContainer: {
    flex: 1,
  },
  businessName: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    color: COLORS.textPrimary,
  },
  timeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(230, 230, 255, 0.6)',
    paddingHorizontal: SPACING.xsmall + 2, // 6
    paddingVertical: SPACING.xsmall / 2, // 2
    borderRadius: SPACING.borderRadiusSmall,
  },
  timeText: {
    fontSize: 11,
    color: COLORS.primary,
    marginLeft: SPACING.xsmall / 2, // 2
    fontWeight: TYPOGRAPHY.weightMedium,
  },
  profileImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: SPACING.medium,
    backgroundColor: COLORS.avatarBackground,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    color: COLORS.textPrimary,
  },
});

export default ChatDetailHeader; 