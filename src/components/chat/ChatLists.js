import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { LocalLoopChatItem, PokeChatItem, ChatDivider } from './ChatListItem';

/**
 * LocalLoopList - Component for rendering a list of LocalLoop chats
 */
export const LocalLoopList = ({ data, navigation }) => {
  const renderItem = ({ item, index }) => (
    <View>
      <LocalLoopChatItem 
        item={item} 
        onPress={() => navigation.navigate('LocalLoopChat', { 
          businessId: parseInt(item.id)
        })} 
      />
      {index < data.length - 1 && <ChatDivider isLocalLoop={true} />}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Disappearing Messages info line - in the grey header section */}
      <View style={styles.disappearingMessageContainer}>
        <View style={styles.disappearingMessage}>
          <Icon name="information-circle-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.disappearingText}>Disappearing Messages</Text>
        </View>
      </View>
      
      {/* White background for messages list */}
      <View style={styles.whiteContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
        />
      </View>
    </View>
  );
};

/**
 * PokeList - Component for rendering a list of Poke chats
 */
export const PokeList = ({ data, navigation }) => {
  const renderItem = ({ item, index }) => (
    <View>
      <PokeChatItem 
        item={item} 
        onPress={() => navigation.navigate('DirectChat', { 
          userId: item.user.id
        })} 
      />
      {index < data.length - 1 && <ChatDivider isLocalLoop={false} />}
    </View>
  );

  return (
    <View style={styles.whiteContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.pokeList}
        contentContainerStyle={styles.pokeListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  disappearingMessageContainer: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingBottom: SPACING.xsmall + 1, // 5
  },
  disappearingMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.small,
  },
  disappearingText: {
    marginLeft: SPACING.small,
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textSecondary,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SPACING.large,
    borderTopRightRadius: SPACING.large,
    overflow: 'hidden',
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.medium,
    paddingBottom: 100, // Space for bottom nav
  },
  pokeList: {
    flex: 1,
  },
  pokeListContent: {
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.medium,
    paddingBottom: 100, // Space for bottom nav
  },
}); 