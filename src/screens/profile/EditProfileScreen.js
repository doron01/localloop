import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import SelectionCard from '../../components/common/SelectionCard';
import { useUser } from '../../context/UserContext';

// Import SVG icons for basic UI elements only
import PersonIcon from '../../assets/icons/profile/person_icon.svg';
import EditIcon from '../../assets/icons/profile/edit_icon.svg';
import BackArrowIcon from '../../assets/icons/back-arrow.svg';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { user, isLoading } = useUser();
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey(prevKey => prevKey + 1);
    }, [])
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEditField = (field) => {
    switch(field) {
      case 'Nickname':
        navigation.navigate('Onboarding', { 
          screen: 'NicknameScreen',
          params: { isEditing: true }
        });
        break;
      case 'Gender':
        navigation.navigate('Onboarding', {
          screen: 'GenderScreen',
          params: { isEditing: true }
        });
        break;
      case 'JobTitle':
        navigation.navigate('Onboarding', {
          screen: 'WorkScreen',
          params: { isEditing: true }
        });
        break;
      case 'ConnectionType':
        navigation.navigate('Onboarding', {
          screen: 'ConnectionPrefsScreen',
          params: { isEditing: true }
        });
        break;
      case 'Industry':
        navigation.navigate('Onboarding', {
          screen: 'IndustryScreen',
          params: { isEditing: true }
        });
        break;
      case 'Values':
        navigation.navigate('Onboarding', {
          screen: 'ValuesScreen',
          params: { isEditing: true }
        });
        break;
      case 'Interests':
        navigation.navigate('Onboarding', {
          screen: 'InterestsScreen',
          params: { isEditing: true }
        });
        break;
      case 'Hobbies':
        navigation.navigate('Onboarding', {
          screen: 'HobbiesScreen',
          params: { isEditing: true }
        });
        break;
      case 'Music':
        navigation.navigate('Onboarding', {
          screen: 'MusicScreen',
          params: { isEditing: true }
        });
        break;
      case 'Languages':
        navigation.navigate('Onboarding', {
          screen: 'LanguagesScreen',
          params: { isEditing: true }
        });
        break;
      default:
        console.log(`No handler for editing ${field}`);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading profile data...</Text>
      </View>
    );
  }

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
            {/* Nickname field */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nickname</Text>
              <View style={styles.infoValueContainer}>
                <PersonIcon width={20} height={20} />
                <Text style={styles.infoValue}>{user.name || 'Add nickname'}</Text>
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
                <Text style={styles.infoValue}>{user.gender || 'Add gender'}</Text>
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
                <PersonIcon width={20} height={20} />
                <Text style={styles.infoValue}>{user.workAs || 'Add job title'}</Text>
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
              {user.connectionType && user.connectionType.length > 0 ? (
                user.connectionType.map((type, index) => (
                  <SelectionCard
                    key={index}
                    title={type}
                    selected={true}
                    onPress={() => {}}
                    variant="pill"
                    icon={type.icon}
                    style={styles.selectionCard}
                  />
                ))
              ) : (
                <Text style={styles.placeholderText}>Add what brings you here</Text>
              )}
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
              {user.industry && user.industry.length > 0 ? (
                user.industry.map((industry, index) => (
                  <SelectionCard
                    key={index}
                    title={industry}
                    selected={true}
                    onPress={() => {}}
                    variant="pill"
                    icon={industry.icon}
                    style={styles.selectionCard}
                  />
                ))
              ) : (
                <Text style={styles.placeholderText}>Add your industry</Text>
              )}
            </View>

            {/* Your Values section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Values</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Values')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {user.values && user.values.length > 0 ? (
                user.values.map((value, index) => (
                  <SelectionCard
                    key={index}
                    title={value}
                    selected={true}
                    onPress={() => {}}
                    variant="pill"
                    icon={value.icon}
                    style={styles.selectionCard}
                  />
                ))
              ) : (
                <Text style={styles.placeholderText}>Add your values</Text>
              )}
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
              {user.interests && user.interests.length > 0 ? (
                user.interests.map((interest, index) => (
                  <SelectionCard
                    key={index}
                    title={interest}
                    selected={true}
                    onPress={() => {}}
                    variant="pill"
                    icon={interest.icon}
                    style={styles.selectionCard}
                  />
                ))
              ) : (
                <Text style={styles.placeholderText}>Add your interests</Text>
              )}
            </View>

            {/* You Enjoy section (hobbies) */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You Enjoy</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Hobbies')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {user.hobbies && user.hobbies.length > 0 ? (
                user.hobbies.map((hobby, index) => (
                  <SelectionCard
                    key={index}
                    title={hobby}
                    selected={true}
                    onPress={() => {}}
                    variant="hobby"
                    icon={hobby.icon}
                    style={styles.hobbyCard}
                  />
                ))
              ) : (
                <Text style={styles.placeholderText}>Add your hobbies</Text>
              )}
            </View>

            {/* You Both Listen To section (music) */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You Both Listen To</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Music')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {user.music && user.music.length > 0 ? (
                user.music.map((genre, index) => (
                  <SelectionCard
                    key={index}
                    title={genre}
                    selected={true}
                    onPress={() => {}}
                    variant="pill"
                    icon={genre.icon}
                    style={styles.selectionCard}
                  />
                ))
              ) : (
                <Text style={styles.placeholderText}>Add your music preferences</Text>
              )}
            </View>

            {/* Languages section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Language Speak</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditField('Languages')}>
                <EditIcon width={20} height={20} color="#6666FF" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {user.languages && user.languages.length > 0 ? (
                user.languages.map((language, index) => (
                  <SelectionCard
                    key={index}
                    title={language}
                    selected={true}
                    onPress={() => {}}
                    variant="pill"
                    icon={language.icon}
                    style={styles.selectionCard}
                  />
                ))
              ) : (
                <Text style={styles.placeholderText}>Add languages you speak</Text>
              )}
            </View>

            {/* Save and Cancel buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleBack}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={handleBack}
              >
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
    backgroundColor: COLORS.backgroundSecondary,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.large,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: SPACING.medium,
  },
  infoItem: {
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.small,
    position: 'relative',
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
  selectionCard: {
    marginRight: SPACING.small,
    marginBottom: SPACING.small,
  },
  hobbyCard: {
    marginRight: SPACING.small,
    marginBottom: SPACING.small,
  },
  flagIcon: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.medium,
    fontSize: TYPOGRAPHY.sizeMedium,
    color: COLORS.textSecondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.large,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    marginRight: SPACING.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  saveButton: {
    flex: 1,
    height: 48,
    marginLeft: SPACING.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: COLORS.primary,
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.sizeMedium,
    color: COLORS.textPrimary,
  },
  saveButtonText: {
    fontSize: TYPOGRAPHY.sizeMedium,
    color: 'white',
    fontWeight: TYPOGRAPHY.weightMedium,
  },
});

export default EditProfileScreen; 