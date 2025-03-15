import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

// Custom SVG icons
import MessagesIcon from '../../assets/icons/messages.svg';
import ExploreIcon from '../../assets/icons/explore.svg';
import ProfileIcon from '../../assets/icons/profile.svg';

const BottomNavigation = ({ activeTab, onTabPress }) => {
  const navigation = useNavigation();

  const handleTabPress = (tabName) => {
    // If onTabPress is provided, call it to update parent component state
    if (onTabPress) {
      onTabPress(tabName);
    }
    
    // Also handle navigation if needed
    switch (tabName) {
      case 'explore':
        navigation.navigate('Home');
        break;
      case 'messages':
        navigation.navigate('Messages');
        break;
      case 'profile':
        navigation.navigate('ProfileDashboard');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.tabContainer}>
      {/* Explore Tab */}
      <TouchableOpacity
        style={[styles.tab, activeTab === 'explore' && styles.activeTab]}
        onPress={() => handleTabPress('explore')}
      >
        <View style={styles.iconContainer}>
          <ExploreIcon
            width={14}
            height={14}
            color={activeTab === 'explore' ? COLORS.bottomNavActive : COLORS.bottomNavInactive}
            style={styles.icon}
          />
        </View>
        <Text style={[styles.tabText, activeTab === 'explore' && styles.activeTabText]}>
          Explore
        </Text>
      </TouchableOpacity>

      {/* Messages Tab */}
      <TouchableOpacity
        style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
        onPress={() => handleTabPress('messages')}
      >
        <View style={styles.iconContainer}>
          <MessagesIcon
            width={14}
            height={14}
            color={activeTab === 'messages' ? COLORS.bottomNavActive : COLORS.bottomNavInactive}
            style={styles.icon}
          />
        </View>
        <Text style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>
          Messages
        </Text>
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
        onPress={() => handleTabPress('profile')}
      >
        <View style={styles.iconContainer}>
          <ProfileIcon
            width={14}
            height={14}
            color={activeTab === 'profile' ? COLORS.bottomNavActive : COLORS.bottomNavInactive}
            style={styles.icon}
          />
        </View>
        <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
          My profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.bottomNavBackground,
    width: '100%',
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: 'rgba(21, 14, 55, 0.1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 10,
    justifyContent: 'space-around',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 9,
    gap: 6,
    minWidth: 112,
    height: 36,
  },
  activeTab: {
    backgroundColor: 'rgba(102, 102, 255, 0.16)',
  },
  iconContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizeXSmall,
    lineHeight: 15,
    color: COLORS.bottomNavInactiveText,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: TYPOGRAPHY.weightRegular,
    textTransform: 'uppercase',
  },
  activeTabText: {
    color: COLORS.bottomNavActive,
    fontWeight: TYPOGRAPHY.weightSemiBold,
  },
});
