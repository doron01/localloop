import mockUsers from './mockUsers';
import { businessLocations } from './mockBusinesses';

// Create mock messages for each business's local loop chat
export const mockLocalLoopMessagesData = businessLocations.map(business => ({
  businessId: business.id,
  businessName: business.name,
  messages: [
    {
      id: '1',
      senderId: mockUsers[0].id,
      senderName: mockUsers[0].name,
      senderAvatar: mockUsers[0].profileImage,
      text: `Hey everyone! I am at ${business.name} right now`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: '2',
      senderId: mockUsers[1].id,
      senderName: mockUsers[1].name,
      senderAvatar: mockUsers[1].profileImage,
      text: 'Great spot! I will be there in 15',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    },
    {
      id: '3',
      senderId: mockUsers[2].id,
      senderName: mockUsers[2].name,
      senderAvatar: mockUsers[2].profileImage,
      text: 'Save me a spot!',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    },
  ],
})); 