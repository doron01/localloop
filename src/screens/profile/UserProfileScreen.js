import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserProfileScreen = ({ user, attendanceStatus, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const windowHeight = Dimensions.get('window').height;
  const minimizedHeight = windowHeight * 0.5;

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [minimizedHeight, windowHeight]
  });

  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const Section = ({ header, children }) => (
    <View style={styles.section}>
      {header}
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { height: animatedHeight }]}>
      <View style={styles.innerContainer}>
        {/* Header with Status Badge and Close Button */}
        <View style={styles.header}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {attendanceStatus === 'present' ? '📍 Here Now' : '⏰ Coming Later'}
            </Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
              <Icon 
                name={isExpanded ? "expand-less" : "expand-more"} 
                size={24} 
                color="#007AFF" 
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Image 
            source={{ uri: user.profileImage }} 
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          <Text style={styles.gender}>{user.gender}</Text>
          <Text style={styles.occupation}>{user.workAs}</Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>

        {/* Expanded Content */}
        {isExpanded && (
          <Animated.ScrollView style={styles.expandedContent}>
            <Section header={<SectionHeader title="Attributes" />}>
              {user.attributes.map((attribute, index) => (
                <Text key={index} style={styles.tag}>{attribute}</Text>
              ))}
            </Section>
            <Section header={<SectionHeader title="Industry" />}>
              {user.industry.map((ind, index) => (
                <Text key={index} style={styles.tag}>{ind}</Text>
              ))}
            </Section>
            <Section header={<SectionHeader title="Looking for" />}>
              {user.connectionType.map((type, index) => (
                <Text key={index} style={styles.tag}>{type}</Text>
              ))}
            </Section>
            <Section header={<SectionHeader title="Languages" />}>
              {user.languages.map((language, index) => (
                <Text key={index} style={styles.tag}>{language}</Text>
              ))}
            </Section>
            <Section header={<SectionHeader title="Music Taste" />}>
              {user.music.map((genre, index) => (
                <Text key={index} style={styles.tag}>{genre}</Text>
              ))}
            </Section>
            <Section header={<SectionHeader title="Hobbies" />}>
              {user.hobbies.map((hobby, index) => (
                <Text key={index} style={styles.tag}>{hobby}</Text>
              ))}
            </Section>
          </Animated.ScrollView>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  profileInfo: {
    alignItems: 'center',
  },
  expandedContent: {
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gender: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  occupation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  expandButton: {
    padding: 8,
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default UserProfileScreen; 