import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileTagItem from '../../components/profile/ProfileTagItem';

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
                color="#6666FF" 
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#6666FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.profileImagePlaceholder}>
            <Icon name="person" size={60} color="#6666FF" />
          </View>
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          <Text style={styles.gender}>{user.gender}</Text>
          <Text style={styles.occupation}>{user.workAs}</Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>

        {/* Expanded Content */}
        {isExpanded && (
          <ScrollView style={styles.expandedContent}>
            <View style={styles.section}>
              <SectionHeader title="Attributes" />
              <View style={styles.sectionContent}>
                {user.attributes.map((attribute, index) => (
                  <ProfileTagItem 
                    key={index}
                    text={attribute} 
                    icon={<Icon name="check" size={16} color="#6666FF" />}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <SectionHeader title="Industry" />
              <View style={styles.sectionContent}>
                {user.industry.map((ind, index) => (
                  <ProfileTagItem 
                    key={index}
                    text={ind} 
                    icon={<Icon name="business" size={16} color="#6666FF" />}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <SectionHeader title="Looking for" />
              <View style={styles.sectionContent}>
                {user.connectionType.map((type, index) => (
                  <ProfileTagItem 
                    key={index}
                    text={type} 
                    icon={<Icon name="people" size={16} color="#6666FF" />}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <SectionHeader title="Languages" />
              <View style={styles.sectionContent}>
                {user.languages.map((language, index) => (
                  <ProfileTagItem 
                    key={index}
                    text={language} 
                    icon={<Icon name="language" size={16} color="#6666FF" />}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <SectionHeader title="Music Taste" />
              <View style={styles.sectionContent}>
                {user.music.map((genre, index) => (
                  <ProfileTagItem 
                    key={index}
                    text={genre} 
                    icon={<Icon name="music-note" size={16} color="#6666FF" />}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <SectionHeader title="Hobbies" />
              <View style={styles.sectionContent}>
                {user.hobbies.map((hobby, index) => (
                  <ProfileTagItem 
                    key={index}
                    text={hobby} 
                    icon={<Icon name="favorite" size={16} color="#6666FF" />}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: 'rgba(21, 14, 55, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 10,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  expandedContent: {
    marginTop: 20,
  },
  profileImagePlaceholder: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: 'rgba(102, 102, 255, 0.13)',
    borderWidth: 4,
    borderColor: '#6666FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#0D162F',
    marginBottom: 4,
  },
  gender: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'System',
    marginBottom: 4,
  },
  occupation: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'System',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#797B8B',
    fontFamily: 'System',
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: '#6666FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
  },
  expandButton: {
    padding: 8,
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECEBED',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D162F',
    fontFamily: 'System',
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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