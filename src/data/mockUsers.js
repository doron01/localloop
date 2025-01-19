const mockUsers = [
    {
        id: '1',
        name: 'Doron',
        age: 28,
        gender: 'Male',
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        attributes: ['Ambitious and driven'],
        connectionType: ['Networking', 'Friendship', 'Romantic', 'Activity Partners'],
        hobbies: ['Basketball', 'Soccer', 'Pilates', 'Journaling', 'International travel'],
        industry: ['Technology and IT'],
        workAs: 'AI Product Manager',
        languages: ['English', 'Hebrew'],
        music: ['Techno', 'Hip Hop and Rap'],
        location: 'Bondi Beach, Sydney'
    },
    {
        id: '2',
        name: 'Sarah',
        age: 26,
        gender: 'Female',
        profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        attributes: ['Creative', 'Outgoing'],
        connectionType: ['Networking', 'Friendship'],
        hobbies: ['Photography', 'Yoga', 'Cooking'],
        industry: ['Design'],
        workAs: 'UX Designer',
        languages: ['English', 'Spanish'],
        music: ['Indie', 'Electronic'],
        location: 'Bondi Beach, Sydney'
    },
    {
        id: '3',
        name: 'Mike',
        age: 30,
        gender: 'Male',
        profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
        attributes: ['Adventurous', 'Analytical'],
        connectionType: ['Networking', 'Activity Partners'],
        hobbies: ['Surfing', 'Rock Climbing', 'Coffee Tasting'],
        industry: ['Finance'],
        workAs: 'Investment Analyst',
        languages: ['English', 'Mandarin'],
        music: ['Jazz', 'Classical'],
        location: 'Bondi Beach, Sydney'
    },
    {
        id: '4',
        name: 'Emma',
        age: 27,
        gender: 'Female',
        profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
        attributes: ['Empathetic', 'Organized'],
        connectionType: ['Friendship', 'Networking'],
        hobbies: ['Reading', 'Hiking', 'Meditation'],
        industry: ['Healthcare'],
        workAs: 'Physiotherapist',
        languages: ['English', 'French'],
        music: ['Pop', 'R&B'],
        location: 'Bondi Beach, Sydney'
    }
];

// Export the current user for testing purposes
export const currentUser = mockUsers[0];

// Export all mock users for other testing scenarios
export default mockUsers;
