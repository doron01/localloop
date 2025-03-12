import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingLayout from '../../components/common/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

// Import SVG icons
import HikingIcon from '../../assets/icons/hiking.svg';
import FishingIcon from '../../assets/icons/fishing.svg';
import RockClimbingIcon from '../../assets/icons/rock-climbing.svg';
import SkiingIcon from '../../assets/icons/skiing.svg';
import SurfingIcon from '../../assets/icons/surfing.svg';
import KayakingIcon from '../../assets/icons/kayaking.svg';
import BasketballIcon from '../../assets/icons/basketball.svg';
import SoccerIcon from '../../assets/icons/soccer.svg';
import TennisIcon from '../../assets/icons/tennis.svg';
import VolleyballIcon from '../../assets/icons/volleyball.svg';
import SwimmingIcon from '../../assets/icons/swimming.svg';
import RunningIcon from '../../assets/icons/running.svg';
import YogaIcon from '../../assets/icons/yoga.svg';
import PilatesIcon from '../../assets/icons/pilates.svg';
import PaintingIcon from '../../assets/icons/painting.svg';
import DrawingIcon from '../../assets/icons/drawing.svg';
import PhotographyIcon from '../../assets/icons/photography.svg';
import SculptingIcon from '../../assets/icons/sculpting.svg';
import KnittingIcon from '../../assets/icons/knitting.svg';
import WoodworkingIcon from '../../assets/icons/woodworking.svg';
import JewelryIcon from '../../assets/icons/jewelry.svg';

const HobbiesScreen = () => {
  const navigation = useNavigation();
  const [selectedHobbies, setSelectedHobbies] = useState(new Set());

  const categories = [
    {
      title: 'Outdoor activities',
      hobbies: [
        {
          id: 'hiking',
          title: 'Hiking',
          icon: HikingIcon,
        },
        {
          id: 'camping',
          title: 'Camping',
          icon: null,
        },
        {
          id: 'fishing',
          title: 'Fishing',
          icon: FishingIcon,
        },
        {
          id: 'rock-climbing',
          title: 'Rock climbing',
          icon: RockClimbingIcon,
        },
        {
          id: 'skiing',
          title: 'Skiing/Snowboarding',
          icon: SkiingIcon,
        },
        {
          id: 'surfing',
          title: 'Surfing',
          icon: SurfingIcon,
        },
        {
          id: 'kayaking',
          title: 'Kayaking/canoeing',
          icon: KayakingIcon,
        },
      ],
    },
    {
      title: 'Sports',
      hobbies: [
        {
          id: 'basketball',
          title: 'Basketball',
          icon: BasketballIcon,
        },
        {
          id: 'soccer',
          title: 'Soccer',
          icon: SoccerIcon,
        },
        {
          id: 'tennis',
          title: 'Tennis',
          icon: TennisIcon,
        },
        {
          id: 'volleyball',
          title: 'Volleyball',
          icon: VolleyballIcon,
        },
        {
          id: 'golf',
          title: 'Golf',
          icon: null,
        },
        {
          id: 'swimming',
          title: 'Swimming',
          icon: SwimmingIcon,
        },
        {
          id: 'cycling',
          title: 'Cycling',
          icon: null,
        },
        {
          id: 'running',
          title: 'Running',
          icon: RunningIcon,
        },
        {
          id: 'yoga',
          title: 'Yoga',
          icon: YogaIcon,
        },
        {
          id: 'pilates',
          title: 'Pilates',
          icon: PilatesIcon,
        },
      ],
    },
    {
      title: 'Arts and Crafts',
      hobbies: [
        {
          id: 'painting',
          title: 'Painting',
          icon: PaintingIcon,
        },
        {
          id: 'drawing',
          title: 'Drawing',
          icon: DrawingIcon,
        },
        {
          id: 'photography',
          title: 'Photography',
          icon: PhotographyIcon,
        },
        {
          id: 'sculpting',
          title: 'Sculpting',
          icon: SculptingIcon,
        },
        {
          id: 'knitting',
          title: 'Knitting/Crocheting',
          icon: KnittingIcon,
        },
        {
          id: 'woodworking',
          title: 'Woodworking',
          icon: WoodworkingIcon,
        },
        {
          id: 'jewelry',
          title: 'Jewelry Making',
          icon: JewelryIcon,
        },
      ],
    },
    {
      title: 'Music',
      hobbies: [
        {
          id: 'playing-instrument',
          title: 'Playing an Instrument',
          icon: null,
        },
        {
          id: 'singing',
          title: 'Singing',
          icon: null,
        },
        {
          id: 'composing',
          title: 'Composing',
          icon: null,
        },
        {
          id: 'attending-concerts',
          title: 'Attending Concerts',
          icon: null,
        },
        {
          id: 'djing',
          title: 'DJing',
          icon: null,
        },
      ],
    },
    {
      title: 'Reading and Writing',
      hobbies: [
        {
          id: 'fiction',
          title: 'Fiction',
          icon: null,
        },
        {
          id: 'non-fiction',
          title: 'Non-Fiction',
          icon: null,
        },
        {
          id: 'poetry',
          title: 'Poetry',
          icon: null,
        },
        {
          id: 'blogging',
          title: 'Blogging',
          icon: null,
        },
        {
          id: 'journaling',
          title: 'Journaling',
          icon: null,
        },
      ],
    },
    {
      title: 'Gaming',
      hobbies: [
        {
          id: 'video-games',
          title: 'Video Games',
          icon: null,
        },
        {
          id: 'board-games',
          title: 'Board Games',
          icon: null,
        },
        {
          id: 'card-games',
          title: 'Card Games',
          icon: null,
        },
        {
          id: 'role-playing-games',
          title: 'Role-Playing Games',
          icon: null,
        },
        {
          id: 'puzzles',
          title: 'Puzzles',
          icon: null,
        },
      ],
    },
    {
      title: 'Cooking and Baking',
      hobbies: [
        {
          id: 'trying-new-recipes',
          title: 'Trying New Recipes',
          icon: null,
        },
        {
          id: 'meal-planning',
          title: 'Meal Planning',
          icon: null,
        },
        {
          id: 'cooking-for-others',
          title: 'Cooking for Others',
          icon: null,
        },
        {
          id: 'baking-desserts',
          title: 'Baking Desserts',
          icon: null,
        },
        {
          id: 'food-photography',
          title: 'Food Photography',
          icon: null,
        },
      ],
    },
    {
      title: 'Traveling and Exploring',
      hobbies: [
        {
          id: 'road-trips',
          title: 'Road Trips',
          icon: null,
        },
        {
          id: 'international-travel',
          title: 'International Travel',
          icon: null,
        },
        {
          id: 'backpacking',
          title: 'Backpacking',
          icon: null,
        },
        {
          id: 'sightseeing',
          title: 'Sightseeing',
          icon: null,
        },
        {
          id: 'trying-local-cuisines',
          title: 'Trying Local Cuisines',
          icon: null,
        },
      ],
    },
    {
      title: 'Volunteering and Community Service',
      hobbies: [
        {
          id: 'animal-shelters',
          title: 'Animal Shelters',
          icon: null,
        },
        {
          id: 'elderly-care',
          title: 'Elderly Care',
          icon: null,
        },
        {
          id: 'environmental-causes',
          title: 'Environmental Causes',
          icon: null,
        },
        {
          id: 'tutoring',
          title: 'Tutoring',
          icon: null,
        },
        {
          id: 'fundraising-events',
          title: 'Fundraising Events',
          icon: null,
        },
      ],
    },
    {
      title: 'Gardening and Home Improvement',
      hobbies: [
        {
          id: 'indoor-plants',
          title: 'Indoor Plants',
          icon: null,
        },
        {
          id: 'outdoor-gardening',
          title: 'Outdoor Gardening',
          icon: null,
        },
        {
          id: 'diy-projects',
          title: 'DIY Projects',
          icon: null,
        },
        {
          id: 'furniture-restoration',
          title: 'Furniture Restoration',
          icon: null,
        },
        {
          id: 'home-organization',
          title: 'Home Organization',
          icon: null,
        },
      ],
    },
  ];

  const toggleHobby = (id) => {
    const newSelected = new Set(selectedHobbies);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedHobbies(newSelected);
  };

  const handleNext = () => {
    // Save selected hobbies if needed
    const selectedHobbiesList = Array.from(selectedHobbies);
    
    // Navigate to the next screen
    navigation.navigate('Values');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <OnboardingLayout
      title="What are your favorite hobbies?"
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={selectedHobbies.size === 0}
      currentStep={4}
      totalSteps={6}
      showBackButton={true}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categories.map((category, index) => (
          <View key={category.title} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.hobbiesGrid}>
              {category.hobbies.map((hobby) => (
                <SelectionCard
                  key={hobby.id}
                  title={hobby.title}
                  icon={hobby.icon}
                  selected={selectedHobbies.has(hobby.id)}
                  onPress={() => toggleHobby(hobby.id)}
                  style={styles.hobbyCard}
                  variant="hobby"
                  compact
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: SPACING.xlarge,
    paddingHorizontal: SPACING.medium,
  },
  categoryContainer: {
    marginBottom: SPACING.medium,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  hobbiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hobbyCard: {
    minWidth: 100,
    marginBottom: 4,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});

export default HobbiesScreen;
