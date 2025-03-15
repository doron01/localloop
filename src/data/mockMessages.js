import mockUsers from './mockUsers';
import { businessLocations } from './mockBusinesses';

// Mock data for messages in the Localoop app

export const mockLocalLoopChats = [
  {
    id: '1',
    name: 'Beachfront Bliss Resort',
    icon: require('../assets/icons/beach_resort_icon.svg'),
    lastMessage: "We're delighted to have you here!",
    timeAgo: '5',
    verified: true,
    unreadCount: 0
  },
  {
    id: '2',
    name: 'Restaurant Menu & Reservations',
    icon: require('../assets/icons/restaurant_icon.svg'),
    lastMessage: 'Let us know if you need anything during your stay',
    timeAgo: '11',
    verified: true,
    unreadCount: 2
  },
  {
    id: '3',
    name: 'parenting pup',
    icon: require('../assets/icons/parenting_pup_icon.svg'),
    lastMessage: 'parenting pup',
    timeAgo: '16',
    verified: false,
    unreadCount: 0
  },
  {
    id: '4',
    name: 'FitZone Gym',
    icon: require('../assets/icons/gym_icon.svg'),
    lastMessage: "Hydrate, stretch, and don't forget to breathe properly during lifts!",
    timeAgo: '20',
    verified: true,
    unreadCount: 0
  },
  {
    id: '5',
    name: 'Art Atudio',
    icon: require('../assets/icons/art_studio_icon.svg'),
    lastMessage: "Hi! I'd love to book a painting session",
    timeAgo: '22',
    verified: true,
    unreadCount: 0
  }
];

// Create poke chats from users
export const mockPokeChats = mockUsers.slice(1).map((user, index) => ({
  id: String(index + 1),
  user: {
    id: user.id,
    name: user.name,
    profileImage: user.profileImage,
  },
  lastMessage: 'Hey, how are you?',
  timestamp: new Date(),
  timeAgo: String(Math.floor(Math.random() * 20) + 1), // Random time between 1-20 hours
  unread: index === 0,
}));

export const mockChatMessages = [
  {
    id: '1',
    senderId: '1', // Doron
    text: 'Hey Sarah! How are you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: '2',
    senderId: '2', // Sarah
    text: 'Hi! I am doing great, thanks for asking! How about you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: '3',
    senderId: '1',
    text: 'I am good too! Would you like to grab coffee sometime?',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
  },
]; 