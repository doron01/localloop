import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../context/UserContext';

export default function HobbiesScreen({ navigation }) {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [categorySelections, setCategorySelections] = useState({});
    const { updateUserData } = useUser();

    const categories = {
        "Outdoor Activities": {
            hobbies: ["Hiking", "Camping", "Fishing", "Rock climbing", 
                      "Skiing/Snowboarding", "Surfing", "Kayaking/Canoeing", 
                      "None of the above"]
        },
        "Sports": {
            hobbies: ["Basketball", "Soccer", "Tennis", "Volleyball", 
                      "Golf", "Swimming", "Cycling", "Running", 
                      "Yoga", "Pilates", "None of the above"]
        },
        "Arts and Crafts": {
            hobbies: ["Painting", "Drawing", "Photography", "Sculpting", 
                      "Knitting/Crocheting", "Woodworking", "Jewelry making", 
                      "None of the above"]
        },
        "Music": {
            hobbies: ["Playing an instrument", "Singing", "Composing", 
                      "Attending concerts", "DJing", "None of the above"]
        },
        "Reading and Writing": {
            hobbies: ["Fiction", "Non-fiction", "Poetry", "Blogging", 
                      "Journaling", "None of the above"]
        },
        "Gaming": {
            hobbies: ["Video games", "Board games", "Card games", 
                      "Role-playing games", "Puzzles", "None of the above"]
        },
        "Cooking and Baking": {
            hobbies: ["Trying new recipes", "Meal planning", "Cooking for others", 
                      "Baking desserts", "Food photography", "None of the above"]
        },
        "Traveling and Exploring": {
            hobbies: ["Road trips", "International travel", "Backpacking", 
                      "Sightseeing", "Trying local cuisines", "None of the above"]
        },
        "Volunteering and Community Service": {
            hobbies: ["Animal shelters", "Elderly care", "Environmental causes", 
                      "Tutoring", "Fundraising events", "None of the above"]
        },
        "Gardening and Home Improvement": {
            hobbies: ["Indoor plants", "Outdoor gardening", "DIY projects", 
                      "Furniture restoration", "Home organization", "None of the above"]
        },
    };

    const toggleHobby = (hobby, category) => {
        const currentSelections = categorySelections[category] || [];
        
        if (hobby === "None of the above") {
            // If selecting "None of the above", clear other selections for this category
            setCategorySelections({
                ...categorySelections,
                [category]: ["None of the above"]
            });
        } else {
            // If selecting a regular hobby
            let newSelections;
            if (currentSelections.includes(hobby)) {
                // Remove the hobby if it's already selected
                newSelections = currentSelections.filter(h => h !== hobby);
            } else {
                // Add the hobby and remove "None of the above" if it exists
                newSelections = [...currentSelections.filter(h => h !== "None of the above"), hobby];
            }
            
            setCategorySelections({
                ...categorySelections,
                [category]: newSelections
            });
        }
    };

    const toggleNextCategory = (currentCategory) => {
        const categoryKeys = Object.keys(categories);
        const currentIndex = categoryKeys.indexOf(currentCategory);
        const nextCategory = categoryKeys[currentIndex + 1];

        if (nextCategory) {
            setExpandedCategory(nextCategory);
        }
    };

    const isLastCategory = (category) => {
        const categoryKeys = Object.keys(categories);
        return categoryKeys[categoryKeys.length - 1] === category;
    };

    const isCategoryValid = (category) => {
        const selections = categorySelections[category] || [];
        return selections.length > 0;
    };

    const isNextCategoryAvailable = (category) => {
        const categoryKeys = Object.keys(categories);
        const currentIndex = categoryKeys.indexOf(category);
        
        // Check if all previous categories are valid
        return categoryKeys.slice(0, currentIndex).every(cat => isCategoryValid(cat));
    };

    const areAllCategoriesValid = () => {
        return Object.keys(categories).every(category => isCategoryValid(category));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>What are your favorite hobbies?</Text>

            <ScrollView style={styles.scrollView}>
                {Object.entries(categories).map(([category, { hobbies }]) => {
                    const isAvailable = isNextCategoryAvailable(category);
                    const selections = categorySelections[category] || [];
                    
                    return (
                        <View key={category} style={styles.categoryContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.categoryButton,
                                    !isAvailable && styles.categoryButtonDisabled,
                                    isCategoryValid(category) && styles.categoryButtonActive
                                ]}
                                onPress={() => {
                                    if (isAvailable) {
                                        setExpandedCategory(
                                            expandedCategory === category ? null : category
                                        );
                                    }
                                }}
                                disabled={!isAvailable}
                            >
                                <Text style={[
                                    styles.categoryTitle,
                                    !isAvailable && styles.categoryTitleDisabled
                                ]}>
                                    {category}
                                </Text>
                                <Text style={[
                                    styles.counterText,
                                    !isAvailable && styles.categoryTitleDisabled
                                ]}>
                                    {selections.includes("None of the above")
                                        ? "None selected"
                                        : selections.length > 0
                                            ? `${selections.length} selected`
                                            : "None selected"}
                                </Text>
                            </TouchableOpacity>

                            {expandedCategory === category && (
                                <View style={styles.hobbiesList}>
                                    {hobbies.map((hobby) => (
                                        <TouchableOpacity
                                            key={hobby}
                                            style={styles.hobbyItem}
                                            onPress={() => toggleHobby(hobby, category)}
                                        >
                                            <Text style={styles.hobbyText}>{hobby}</Text>
                                            <View style={[
                                                styles.checkbox,
                                                selections.includes(hobby) && styles.checkboxSelected
                                            ]} />
                                        </TouchableOpacity>
                                    ))}
                                    {!isLastCategory(category) && (
                                        <TouchableOpacity
                                            style={styles.nextCategoryButton}
                                            onPress={() => toggleNextCategory(category)}
                                        >
                                            <Text style={styles.nextCategoryButtonText}>
                                                Open Next Category
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={[
                        styles.button,
                        !areAllCategoriesValid() && styles.buttonDisabled
                    ]}
                    disabled={!areAllCategoriesValid()}
                    onPress={() => {
                        const selectedHobbies = Object.values(categorySelections).flat();
                        updateUserData({ hobbies: selectedHobbies });
                        navigation.navigate('Values');
                    }}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
        lineHeight: 30,
    },
    scrollView: {
        flex: 1,
    },
    categoryContainer: {
        marginBottom: 10,
    },
    categoryButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        marginHorizontal: 20,
        borderRadius: 10,
    },
    categoryButtonActive: {
        borderColor: '#007AFF',
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        maxWidth: '70%',
    },
    counterText: {
        fontSize: 16,
        color: '#666',
    },
    hobbiesList: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 1,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        padding: 10,
    },
    hobbyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    hobbyText: {
        fontSize: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C4C4C4',
    },
    checkboxSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    footer: {
        padding: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 25,
        width: '100%',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    nextCategoryButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    nextCategoryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    categoryButtonDisabled: {
        backgroundColor: '#f5f5f5',
        borderColor: '#E5E5E5',
    },
    categoryTitleDisabled: {
        color: '#999',
    },
});
