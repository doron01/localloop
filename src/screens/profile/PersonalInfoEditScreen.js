import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { currentUser } from '../../data/mockUsers';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import SelectionCard from '../../components/common/SelectionCard';

// Import SVG icons
import PersonIcon from '../../assets/icons/profile/person_icon.svg';
import EditIcon from '../../assets/icons/profile/edit_icon.svg';
import BackArrowIcon from '../../assets/icons/back-arrow.svg';
import FriendshipIcon from '../../assets/icons/friendship.svg';
import PhilosophyIcon from '../../assets/icons/philosophy.svg';
import RockClimbingIcon from '../../assets/icons/rock-climbing.svg';
import SkiingIcon from '../../assets/icons/skiing.svg';

const PersonalInfoEditScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    ...currentUser,
    name: 'Kadin Herwitz', // Using values from screenshot
    gender: 'Male',
    workAs: 'journalist',
    connectionType: ['Friendship'],
    industry: ['Finance & banking'],
    values: [
      'Empathy & understanding other\'s perspectives',
      'Equality & fairness for all',
      'Forgiveness & letting go of grudges'
    ],
    interests: ['Philosophy & deep thinking: Ethics, Metaphysics, Logic, Existentialism.'],
    hobbies: ['Rock Climbing', 'Skiing/Snowboarding'],
    music: ['Rock & alternative', 'Jazz & Blues'],
    languages: ['Spanish']
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Save user data
    console.log('Saving user data:', user);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleEditField = (field) => {
    // Navigate to the specific field edit screen
    console.log(`Editing field: ${field}`);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <BackArrowIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Text style={styles.headerTitle}>Personal information</Text>
            
            {/* Nickname field */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nickname</Text>
              <View style={styles.infoValueContainer}>
                <PersonIcon width={20} height={20} />
                <Text style={styles.infoValue}>{user.name}</Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Nickname')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Gender field */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Gender</Text>
              <View style={styles.infoValueContainer}>
                <PersonIcon width={20} height={20} />
                <Text style={styles.infoValue}>{user.gender}</Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Gender')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Job Title field */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Job Title</Text>
              <View style={styles.infoValueContainer}>
                <Icon name="work" size={20} color="#6666FF" />
                <Text style={styles.infoValue}>{user.workAs}</Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('JobTitle')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* What Brings You Here section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>What Brings You Here?</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('ConnectionType')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              <SelectionCard
                title="Friendship"
                selected={true}
                onPress={() => {}}
                variant="pill"
                icon={FriendshipIcon}
                style={styles.selectionCard}
              />
            </View>

            {/* You Worked On section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You Worked On</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Industry')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              <SelectionCard
                title="Finance & banking"
                selected={true}
                onPress={() => {}}
                variant="pill"
                icon={() => <Icon name="account-balance" size={18} color="#6666FF" />}
                style={styles.selectionCard}
              />
            </View>

            {/* Your Values section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Values</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Values')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.valuesContainer}>
              {user.values.map((value, index) => (
                <SelectionCard
                  key={index}
                  title={value}
                  selected={true}
                  onPress={() => {}}
                  variant="pill"
                  style={styles.selectionCard}
                />
              ))}
            </View>

            {/* Your Interests section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Interests</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Interests')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              <SelectionCard
                title={user.interests[0]}
                selected={true}
                onPress={() => {}}
                variant="pill"
                icon={PhilosophyIcon}
                style={styles.selectionCard}
              />
            </View>

            {/* You Enjoy section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You Enjoy</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Hobbies')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              <SelectionCard
                title="Rock Climbing"
                selected={true}
                onPress={() => {}}
                variant="hobby"
                icon={RockClimbingIcon}
                style={styles.hobbyCard}
              />
              <SelectionCard
                title="Skiing/Snowboarding"
                selected={true}
                onPress={() => {}}
                variant="hobby"
                icon={SkiingIcon}
                style={styles.hobbyCard}
              />
            </View>

            {/* You Both Listen To section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You Both Listen To</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Music')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {user.music.map((genre, index) => (
                <SelectionCard
                  key={index}
                  title={genre}
                  selected={true}
                  onPress={() => {}}
                  variant="pill"
                  icon={() => <Icon name="music-note" size={18} color="#6666FF" />}
                  style={styles.selectionCard}
                />
              ))}
            </View>

            {/* Language Speak section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Language Speak</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Languages')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              <SelectionCard
                title="Spanish"
                selected={true}
                onPress={() => {}}
                variant="pill"
                leftContent={<Text style={styles.flagIcon}>🇪🇸</Text>}
                style={styles.selectionCard}
              />
            </View>
            
            {/* Action buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  headerContainer: {
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    backgroundColor: 'white',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizeXLarge,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.medium,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.large,
    backgroundColor: 'white',
  },
  infoItem: {
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.small,
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.small,
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: TYPOGRAPHY.sizeMedium,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weightMedium,
    marginLeft: SPACING.small,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  editText: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.primary,
    marginLeft: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.medium,
    marginBottom: SPACING.small,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizeMedium,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    color: COLORS.textPrimary,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.medium,
  },
  valuesContainer: {
    marginBottom: SPACING.medium,
  },
  selectionCard: {
    marginRight: SPACING.small,
    marginBottom: SPACING.small,
  },
  hobbyCard: {
    marginRight: SPACING.small,
    marginBottom: SPACING.small,
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.xsmall,
  },
  flagIcon: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xlarge,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.small,
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.sizeMedium,
    color: COLORS.textPrimary,
  },
  saveButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginLeft: SPACING.small,
  },
  saveButtonText: {
    fontSize: TYPOGRAPHY.sizeMedium,
    color: 'white',
    fontWeight: TYPOGRAPHY.weightMedium,
  },
});

export default PersonalInfoEditScreen; 