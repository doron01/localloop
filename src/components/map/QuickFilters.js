import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

// Define the order of categories to match Figma
const filterCategories = [
  {
    id: 'culture',
    title: 'Culture',
    items: ['Museum', 'Art studio'],
  },
  {
    id: 'education',
    title: 'Education',
    items: ['Library'],
  },
  {
    id: 'natural',
    title: 'Natural Features',
    items: ['Beach', 'Tourist attraction'],
  },
  {
    id: 'food',
    title: 'Food and Drink',
    items: ['Restaurants', 'Take away', 'Coffee shops', 'Bars', 'Nightlife & party venues'],
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    items: ['Bowling alley', 'Casino', 'Dog park', 'Nightclub', 'Movie theater', 'Skate park', 'Video arcade'],
  },
  {
    id: 'health',
    title: 'Health and Wellness',
    items: ['Spa', 'Sauna', 'Massage', 'Wellness center', 'Yoga studio', 'Fitness center', 'Golf course', 'Gym', 'Swimming pool'],
  },
];

export default function QuickFilters({ onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0 });
  const pillRefs = useRef({});

  // Count selected items for each category
  const getSelectedCount = (categoryId) => {
    return selectedFilters[categoryId] ? selectedFilters[categoryId].length : 0;
  };

  // Handle when a category is pressed
  const handleCategoryPress = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      return;
    }

    // Get position of the pressed pill
    pillRefs.current[categoryId]?.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPosition({
        x: pageX,
        y: pageY + height + 4, // 4px gap between pill and dropdown
        width: width // Use exact width of the pill
      });
      setActiveCategory(categoryId);
    });
  };

  // Handle when an item within a category is selected
  const handleItemSelect = (categoryId, item) => {
    setSelectedFilters(prevState => {
      const newFilters = { ...prevState };
      if (!newFilters[categoryId]) {
        newFilters[categoryId] = [];
      }
      
      if (newFilters[categoryId].includes(item)) {
        newFilters[categoryId] = newFilters[categoryId].filter(i => i !== item);
        if (newFilters[categoryId].length === 0) {
          delete newFilters[categoryId];
        }
      } else {
        newFilters[categoryId] = [...newFilters[categoryId], item];
      }
      
      if (onFilterChange) {
        const allSelectedItems = Object.values(newFilters).flat();
        onFilterChange(allSelectedItems);
      }
      
      return newFilters;
    });
  };

  // Render dropdown content
  const renderDropdownContent = (category) => {
    return (
      <View style={styles.dropdownContainer}>
        {category.items.map((item, index) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.itemRow,
              index === category.items.length - 1 && styles.lastItem
            ]}
            onPress={() => handleItemSelect(category.id, item)}
          >
            <Text style={[
              styles.hobbyItemText,
              selectedFilters[category.id]?.includes(item) && styles.hobbySelectedItemText
            ]}>
              {item}
            </Text>
            {selectedFilters[category.id]?.includes(item) && (
              <View style={styles.hobbyCheckCircle}>
                <Text style={styles.hobbyCheckmark}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Render a filter pill
  const renderFilterPill = (category) => {
    const isActive = activeCategory === category.id;
    const selectedCount = getSelectedCount(category.id);
    
    return (
      <View key={category.id} style={styles.categoryWrapper}>
        <TouchableOpacity 
          ref={ref => pillRefs.current[category.id] = ref}
          style={[
            styles.filterPill,
            isActive && styles.filterPillActive
          ]}
          onPress={() => handleCategoryPress(category.id)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.filterText,
            isActive && styles.filterTextActive
          ]}>
            {category.title}
          </Text>
          
          <View style={styles.pillRightContent}>
            {selectedCount > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{selectedCount}</Text>
              </View>
            )}
            <Ionicons
              name={isActive ? "chevron-up" : "chevron-down"}
              size={14}
              color={isActive ? COLORS.primary : COLORS.cardText}
              style={styles.dropdownIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filterCategories.map(category => renderFilterPill(category))}
      </ScrollView>

      <Modal
        visible={!!activeCategory}
        transparent={true}
        animationType="none"
        onRequestClose={() => setActiveCategory(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setActiveCategory(null)}
        >
          {activeCategory && (
            <View 
              style={[
                styles.dropdownWrapper,
                {
                  position: 'absolute',
                  top: dropdownPosition.y,
                  left: dropdownPosition.x,
                }
              ]}
            >
              <TouchableOpacity 
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
                style={{ width: dropdownPosition.width }}
              >
                {renderDropdownContent(filterCategories.find(c => c.id === activeCategory))}
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 10,
  },
  categoryWrapper: {
    position: 'relative',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: SPACING.borderRadiusXLarge,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 100,
    ...COLORS.cardShadow,
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.border,
  },
  filterPillActive: {
    borderColor: COLORS.primary,
    borderWidth: SPACING.borderWidthSelected,
  },
  filterText: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weightRegular,
    flex: 1,
  },
  filterTextActive: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weightSemiBold,
  },
  pillRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 8,
  },
  countBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: COLORS.buttonText,
    fontSize: TYPOGRAPHY.sizeXSmall,
    fontWeight: TYPOGRAPHY.weightBold,
    textAlign: 'center',
  },
  dropdownIcon: {
    marginLeft: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.borderRadiusMedium,
    padding: SPACING.medium,
    maxHeight: 300,
    borderWidth: SPACING.borderWidthRegular,
    borderColor: COLORS.border,
    width: '100%', // Ensure dropdown takes full width of parent
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  hobbyItemText: {
    fontSize: TYPOGRAPHY.sizeSmall,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weightRegular,
  },
  hobbySelectedItemText: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weightSemiBold,
  },
  hobbyCheckCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  hobbyCheckmark: {
    color: COLORS.buttonText,
    fontSize: 12,
    fontWeight: TYPOGRAPHY.weightBold,
  },
}); 