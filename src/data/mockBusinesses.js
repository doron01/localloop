import mockUsers from './mockUsers';

export const businessLocations = [
  {
    id: 1,
    name: "Beach Road Hotel",
    coordinate: {
      latitude: -33.8916,
      longitude: 151.2767,
    },
    category: "Bar & Restaurant",
    hereNow: [
      { 
        user: mockUsers[0],
        avatar: mockUsers[0].profileImage 
      },
      { 
        user: mockUsers[1],
        avatar: mockUsers[1].profileImage 
      }
    ],
    comingLater: [
      { 
        user: mockUsers[2],
        avatar: mockUsers[2].profileImage 
      },
      { 
        user: mockUsers[3],
        avatar: mockUsers[3].profileImage 
      }
    ]
  },
  {
    id: 2,
    name: "Bondi Coffee Shop",
    coordinate: {
      latitude: -33.8895,
      longitude: 151.2744,
    },
    category: "Café",
    hereNow: [
      { 
        user: mockUsers[2],
        avatar: mockUsers[2].profileImage 
      },
      { 
        user: mockUsers[3],
        avatar: mockUsers[3].profileImage 
      }
    ],
    comingLater: [
      { 
        user: mockUsers[0],
        avatar: mockUsers[0].profileImage 
      },
      { 
        user: mockUsers[1],
        avatar: mockUsers[1].profileImage 
      }
    ]
  }
]; 