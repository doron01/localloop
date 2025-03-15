import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import UnreadBadge from './UnreadBadge';

/**
 * Renders the time progress circle around a business icon
 * @param {string} timeAgo - Time ago in hours
 * @returns {Object} Style object for the progress circle
 */
const renderTimeProgress = (timeAgo) => {
  // Calculate progress percentage based on 24-hour timeline
  const progress = 1 - (parseInt(timeAgo) / 24);
  
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
 * LocalLoopChatItem - Component for rendering a LocalLoop chat item
 */
export const LocalLoopChatItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.chatItem} onPress={onPress}>
      <View style={styles.chatContent}>
        {/* Business icon with time progress circle */}
        <View style={styles.iconColumn}>
          <View style={styles.iconContainer}>
            <View style={[styles.progressCircle, renderTimeProgress(item.timeAgo)]} />
            <Image source={{ uri: item.icon }} style={styles.businessIcon} />
          </View>
          
          {/* Time indicator below icon - unique to LocalLoop */}
          <View style={styles.timeIndicator}>
            <Icon name="time-outline" size={11} color={COLORS.primary} />
            <Text style={styles.timeText}>{item.timeAgo} hr</Text>
          </View>
        </View>
        
        {/* Message content */}
        <View style={styles.chatInfo}>
          <Text style={styles.businessName}>{item.name}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        
        {/* Right side - time */}
        <View style={styles.chatItemRight}>
          <UnreadBadge count={item.unreadCount} />
          <Text style={styles.chatTimeAgo}>{item.timeAgo}hr</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * PokeChatItem - Component for rendering a Poke chat item
 */
export const PokeChatItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.pokeItem} onPress={onPress}>
      {/* Circular avatar - unique to Pokes */}
      <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
      
      <View style={styles.pokeContent}>
        <View style={styles.pokeInfo}>
          <View style={styles.pokeHeader}>
            <Text style={styles.pokeName}>{item.user.name}</Text>
          </View>
          <Text style={styles.pokeMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        
        <View style={styles.pokeTimeContainer}>
          <UnreadBadge count={item.unread ? 2 : 0} />
          <Text style={styles.pokeTime}>{item.timeAgo}hr</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * ChatDivider - Simple divider component
 */
export const ChatDivider = ({ isLocalLoop }) => (
  <View style={isLocalLoop ? styles.localLoopDivider : styles.divider} />
);

// Shared styles for both chat types
const styles = StyleSheet.create({
  // LocalLoop styles
  chatItem: {
    paddingVertical: SPACING.small + 4, // 12
  },
  localLoopDivider: {
    height: SPACING.borderWidthRegular,
    backgroundColor: COLORS.divider,
    marginLeft: 75,
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  iconColumn: {
    alignItems: 'center',
    marginRight: SPACING.medium,
    width: 60,
  },
  iconContainer: {
    width: 48,
    height: 48,
    marginBottom: SPACING.xsmall,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
  chatInfo: {
    flex: 1,
    marginRight: SPACING.small + 4, // 12
  },
  businessName: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xsmall,
  },
  lastMessage: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textSecondary,
  },
  chatItemRight: {
    alignItems: 'flex-end',
    minWidth: 40,
    position: 'relative',
    paddingRight: SPACING.xsmall + 1, // 5
  },
  chatTimeAgo: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.xsmall,
  },
  
  // Pokes styles
  pokeItem: {
    flexDirection: 'row',
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: SPACING.medium,
  },
  pokeContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pokeInfo: {
    flex: 1,
  },
  pokeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokeName: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xsmall,
  },
  pokeMessage: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textSecondary,
  },
  pokeTimeContainer: {
    alignItems: 'flex-end',
    minWidth: 40,
  },
  pokeTime: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.xsmall,
  },
  divider: {
    height: SPACING.borderWidthRegular,
    backgroundColor: COLORS.divider,
    marginLeft: 85,
  },
}); 