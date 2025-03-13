# Map Components

This directory contains reusable map-related components for the application.

## Components

### MapComponent

`MapComponent.js` is the core map component that handles:
- Rendering the interactive map using react-native-maps
- Displaying business markers
- Requesting and tracking user location
- Providing a recenter button

#### Usage

```jsx
import MapComponent from '../../components/map/MapComponent';

// Inside your component
const handleMarkerPress = (business) => {
  // Handle business marker press
  console.log('Business selected:', business);
};

// Then in your render method
<MapComponent 
  onMarkerPress={handleMarkerPress}
  businesses={yourBusinessesArray}
/>
```

### MapDebug

`MapDebug.js` is a development tool that displays debugging information about the map, such as:
- Number of active users
- Heatmap data points
- Sample user information

#### Usage

```jsx
import MapDebug from '../../components/map/MapDebug';

// Inside your component's render method (for development only)
{__DEV__ && <MapDebug />}
```

## Implementation Notes

- The MapComponent relies on the `expo-location` package for location services.
- The MapDebug component requires the MapContext to be available as it accesses map-related state through the `useMap` hook.
- Both components are designed to be used in the main MapScreen or other screens that need map functionality. 