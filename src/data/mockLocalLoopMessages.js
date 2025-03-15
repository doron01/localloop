import mockUsers from './mockUsers';
import { businessLocations } from './mockBusinesses';

// Mock data for local loop messages

export const mockLocalLoopMessagesData = [
  {
    businessId: 1,
    businessName: 'Beachfront Bliss Resort',
    icon: require('../assets/icons/beach_resort_icon.svg'),
    messages: [
      {
        id: '1',
        senderId: '2',
        senderName: 'Resort Staff',
        senderAvatar: 'https://example.com/avatar1.jpg',
        text: "Welcome to Beachfront Bliss Resort! We're delighted to have you here.",
        timestamp: new Date('2024-03-14T10:00:00'),
      },
      {
        id: '2',
        senderId: '1',
        senderName: 'You',
        senderAvatar: 'https://example.com/avatar2.jpg',
        text: 'Thank you! The view from my room is amazing.',
        timestamp: new Date('2024-03-14T10:05:00'),
      },
    ],
  },
  {
    businessId: 2,
    businessName: 'Restaurant Menu & Reservations',
    icon: require('../assets/icons/restaurant_icon.svg'),
    messages: [
      {
        id: '1',
        senderId: '3',
        senderName: 'Restaurant Host',
        senderAvatar: 'https://example.com/avatar3.jpg',
        text: 'Good evening! Would you like to make a dinner reservation?',
        timestamp: new Date('2024-03-14T11:00:00'),
      },
    ],
  },
  {
    businessId: 3,
    businessName: 'parenting pup',
    icon: require('../assets/icons/parenting_pup_icon.svg'),
    messages: [
      {
        id: '1',
        senderId: '4',
        senderName: 'Pet Care Team',
        senderAvatar: 'https://example.com/avatar4.jpg',
        text: 'Your pup is having a great time at daycare!',
        timestamp: new Date('2024-03-14T12:00:00'),
      },
    ],
  },
  {
    businessId: 4,
    businessName: 'FitZone Gym',
    icon: require('../assets/icons/gym_icon.svg'),
    messages: [
      {
        id: '1',
        senderId: '5',
        senderName: 'Fitness Trainer',
        senderAvatar: 'https://example.com/avatar5.jpg',
        text: "Hydrate, stretch, and don't forget to breathe properly during lifts!",
        timestamp: new Date('2024-03-14T13:00:00'),
      },
    ],
  },
  {
    businessId: 5,
    businessName: 'Art Atudio',
    icon: require('../assets/icons/art_studio_icon.svg'),
    messages: [
      {
        id: '1',
        senderId: '1',
        senderName: 'You',
        senderAvatar: 'https://example.com/avatar2.jpg',
        text: "Hi! I'd love to book a painting session",
        timestamp: new Date('2024-03-14T14:00:00'),
      },
    ],
  },
]; 