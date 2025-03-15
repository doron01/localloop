import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { currentUser } from '../../data/mockUsers';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileSectionItem from '../../components/profile/ProfileSectionItem';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

// Import downloaded SVG icons
import PersonIcon from '../../assets/icons/profile/person_icon.svg';
import SettingsIcon from '../../assets/icons/profile/settings_icon.svg';
import LogoutIcon from '../../assets/icons/profile/logout_icon.svg';
import EditIcon from '../../assets/icons/profile/edit_icon.svg';

const ProfileDashboardScreen = () => {
  const navigation = useNavigation();
  const user = currentUser;

  const handleEditPersonalInfo = () => {
    navigation.navigate('PersonalInfoEditScreen');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile');
  };

  const handleAccountSettings = () => {
    // Navigate to account settings screen
    navigation.navigate('AccountSettingsScreen');
  };

  const handleLogout = () => {
    // Handle logout functionality
    console.log('Logging out...');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header similar to ChatHeader style */}
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>My Profile</Text>
          </View>
        </View>
        
        {/* Profile Information Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Icon name="person" size={40} color="#6666FF" />
            </View>
            <TouchableOpacity style={styles.editImageButton}>
              <EditIcon width={18} height={18} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
        </View>
        
        {/* Options Menu Section */}
        <View style={styles.optionsSection}>
          <ProfileSectionItem 
            icon={<PersonIcon width={24} height={24} />}
            title="View Profile"
            titleStyle={styles.menuItemTitle}
            onPress={handleViewProfile}
          />
          
          <View style={styles.divider} />
          
          <ProfileSectionItem 
            icon={<PersonIcon width={24} height={24} />}
            title="Edit Personal Information"
            titleStyle={styles.menuItemTitle}
            onPress={handleEditPersonalInfo}
          />
          
          <View style={styles.divider} />
          
          <ProfileSectionItem 
            icon={<EditIcon width={24} height={24} />}
            title="Edit Profile"
            titleStyle={styles.menuItemTitle}
            onPress={handleEditProfile}
          />
          
          <View style={styles.divider} />
          
          <ProfileSectionItem 
            icon={<SettingsIcon width={24} height={24} />}
            title="Account Settings"
            titleStyle={styles.menuItemTitle}
            onPress={handleAccountSettings}
          />
          
          <View style={styles.divider} />
          
          <ProfileSectionItem 
            icon={<LogoutIcon width={24} height={24} />}
            title="Log Out"
            titleStyle={styles.menuItemTitle}
            onPress={handleLogout}
          />
        </View>
      </SafeAreaView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <BottomNavigation activeTab="profile" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary, // Gray background
  },
  safeArea: {
    flex: 1,
  },
  headerWrapper: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    backgroundColor: COLORS.backgroundSecondary,
  },
  title: {
    fontSize: TYPOGRAPHY.sizeXXLarge,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.textPrimary,
  },
  profileSection: {
    alignItems: 'center',
    padding: SPACING.xlarge,
    borderRadius: SPACING.borderRadiusMedium,
    marginHorizontal: SPACING.medium,
    marginTop: SPACING.medium,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SPACING.medium,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: 'rgba(102, 102, 255, 0.13)',
    borderWidth: 4,
    borderColor: '#6666FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6666FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  profileName: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  optionsSection: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SPACING.large,
    borderTopRightRadius: SPACING.large,
    overflow: 'hidden',
    marginTop: SPACING.small + 4, // 12
  },
  menuItemTitle: {
    fontWeight: TYPOGRAPHY.weightSemiBold,
    fontSize: TYPOGRAPHY.sizeMedium,
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    width: '100%',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: SPACING.xlarge + 6,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default ProfileDashboardScreen; 