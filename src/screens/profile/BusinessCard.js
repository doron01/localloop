import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";


const BusinessCard = ({ business, initialExpanded = false, onClose, onUserPress }) => {
  const navigation = useNavigation();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [position] = useState(new Animated.Value(0)); // Position of the swipe button
  const [comingLater, setComingLater] = useState([...business.comingLater]); // Track "Coming Later" avatars
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [animation] = useState(new Animated.Value(0));

  const windowHeight = Dimensions.get('window').height;
  const minimizedHeight = windowHeight * 0.5; // Half screen height

  useEffect(() => {
    if (initialExpanded) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, []);

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

  // Add interpolation for header padding
  const headerPadding = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 50] // 20px when minimized, 50px when expanded
  });

  const titlePadding = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 40] // 20px when minimized, 40px when expanded
  });

  const handleUserPress = (userObj, status) => {
    if (onUserPress) {
      onUserPress(userObj.user, status);
    }
  };

  if (!business) return null;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx > 0 && gestureState.dx <= 250) {
        position.setValue(gestureState.dx); // Constrain swipe movement to the right
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 200) {
        // Unlock condition
        setIsCheckedIn(true);

        // Add user's avatar to the "Coming Later" section
        const newUser = {
          name: "You", // Placeholder for the current user
          avatar: "https://via.placeholder.com/150", // Replace with a real avatar URL
        };
        setComingLater((prev) => [...prev, newUser]);

        Animated.timing(position, {
          toValue: 250,
          duration: 200,
          useNativeDriver: false,
        }).start();
      } else {
        // Reset to the starting position
        Animated.spring(position, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: animatedHeight,
        },
      ]}
    >
      <View style={styles.innerContainer}>
        {/* Header Section */}
        <Animated.View style={[styles.header, { paddingTop: headerPadding }]}>
          <View style={styles.titleSection}>
            <Animated.Text style={[styles.title, { paddingTop: titlePadding }]}>
              {business.name}
            </Animated.Text>
            <Text style={styles.category}>{business.category}</Text>
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
        </Animated.View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Here Now Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Here now</Text>
            <View style={styles.avatarRow}>
              {business.hereNow.map((userObj, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleUserPress(userObj, 'present')}
                >
                  <Avatar
                    rounded
                    size="small"
                    source={{ uri: userObj.avatar }}
                    containerStyle={styles.avatar}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Coming Later Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Coming Later</Text>
            <View style={styles.avatarRow}>
              {comingLater.map((userObj, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleUserPress(userObj, 'later')}
                >
                  <Avatar
                    rounded
                    size="small"
                    source={{ uri: userObj.avatar }}
                    containerStyle={styles.avatar}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Swipeable Button or Chat Button */}
        <View style={styles.joinButtonContainer}>
          {isCheckedIn ? (
            <TouchableOpacity style={styles.chatButton}>
              <Text style={styles.chatButtonText}>Open Localloop Chat</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.joinButtonText}>I'll Be There Today</Text>
              <Animated.View
                {...panResponder.panHandlers}
                style={[styles.swipeButton, { transform: [{ translateX: position }] }]}
              >
                <Text style={styles.swipeButtonText}>→</Text>
              </Animated.View>
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
};



const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandButton: {
    padding: 8,
    marginRight: 8,
  },
  closeButton: {
    padding: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 8,
  },
  joinButtonContainer: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    marginTop: 'auto',
    marginBottom: '20',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  swipeButton: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 50,
    height: 50,
    backgroundColor: "#2196f3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  swipeButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  chatButton: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  chatButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

  
      
export default BusinessCard;
