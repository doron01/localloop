import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { currentUser } from '../../data/mockUsers';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from '../../components/navigation/BottomNavigation';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = currentUser;

  const handleBack = () => {
    navigation.navigate('ProfileDashboard');
  };

  const handleEditSection = (screen) => {
    navigation.navigate(screen);
  };

  const handleMemojiSelect = (memojiKey) => {
    // Update your user state here
    console.log('Selected memoji:', memojiKey);
    // Example update:
    // setCurrentUser(prev => ({...prev, memojiKey}));
  };

  const SectionHeader = ({ title, onboardingScreen }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity 
        onPress={() => handleEditSection(onboardingScreen)}
        style={styles.editButton}
      >
        <Icon name="edit" size={20} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileCard}>
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          <Text style={styles.gender}>{user.gender}</Text>
          <Text style={styles.occupation}>{user.workAs}</Text>

          {/* Attributes Section */}
          <Section 
            header={<SectionHeader title="Attributes" onboardingScreen="AttributeScreen" />}
          >
            {user.attributes.map((attribute, index) => (
              <Text key={index} style={styles.tag}>{attribute}</Text>
            ))}
          </Section>

          {/* Industry Section */}
          <Section 
            header={<SectionHeader title="Industry" onboardingScreen="IndustryScreen" />}
          >
            {user.industry.map((ind, index) => (
              <Text key={index} style={styles.tag}>{ind}</Text>
            ))}
          </Section>

          {/* Connection Preferences */}
          <Section 
            header={<SectionHeader title="Looking for" onboardingScreen="ConnectionPrefsScreen" />}
          >
            {user.connectionType.map((type, index) => (
              <Text key={index} style={styles.tag}>{type}</Text>
            ))}
          </Section>

          {/* Languages */}
          <Section 
            header={<SectionHeader title="Languages" onboardingScreen="LanguagesScreen" />}
          >
            {user.languages.map((language, index) => (
              <Text key={index} style={styles.tag}>{language}</Text>
            ))}
          </Section>

          {/* Music Preferences */}
          <Section 
            header={<SectionHeader title="Music Taste" onboardingScreen="MusicScreen" />}
          >
            {user.music.map((genre, index) => (
              <Text key={index} style={styles.tag}>{genre}</Text>
            ))}
          </Section>

          {/* Hobbies */}
          <Section 
            header={<SectionHeader title="Hobbies" onboardingScreen="HobbiesScreen" />}
          >
            {user.hobbies.map((hobby, index) => (
              <Text key={index} style={styles.tag}>{hobby}</Text>
            ))}
          </Section>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <BottomNavigation activeTab="profile" onTabPress={(tabName) => {
          if (tabName !== 'profile') {
            navigation.navigate(tabName === 'explore' ? 'Home' : 'Messages');
          }
        }} />
      </View>
    </View>
  );
};

// Updated Section component to accept custom header
const Section = ({ header, children }) => (
  <View style={styles.section}>
    {header}
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24, // To balance the back button
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 120, // Increased padding to account for bottom navigation
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 16,
  },
  occupation: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 4,
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    color: '#007AFF',
  },
  bio: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  gender: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default ProfileScreen; 