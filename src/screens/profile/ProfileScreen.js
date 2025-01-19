import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { currentUser } from '../../data/mockUsers';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = currentUser;

  const handleEditSection = (screen) => {
    navigation.navigate(screen);
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
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        {/* Profile Header */}
        <Image 
          source={{ uri: user.profileImage }} 
          style={styles.profileImage}
        />
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
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