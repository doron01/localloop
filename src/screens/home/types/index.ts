export interface UserLocation {
  id: string;
  latitude: number;
  longitude: number;
  user: {
    id: string;
    nickname: string;
    avatar: string;
    interests: string[];
  };
  isCheckedIn: boolean;
  lastActive: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  maxAttendees?: number;
  venue?: Venue;
  creator: {
    id: string;
    nickname: string;
  };
}

export interface Venue {
  id: string;
  name: string;
  type: 'coffee' | 'gym' | 'park' | 'restaurant' | 'other';
  latitude: number;
  longitude: number;
  address: string;
  rating?: number;
  currentUsers?: string[];
}

export interface HeatmapPoint {
  latitude: number;
  longitude: number;
  weight: number;
  type: 'sports' | 'music' | 'art' | 'technology' | string;
} 