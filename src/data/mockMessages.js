import mockUsers from './mockUsers';
import { businessLocations } from './mockBusinesses';

// Create LocalLoop chats from business locations
export const mockLocalLoopChats = businessLocations.map(business => ({
  id: business.id.toString(),
  name: business.name,
  lastMessage: 'Latest activity in the loop!',
  timestamp: new Date(),
  unread: Math.random() > 0.5,
}));

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