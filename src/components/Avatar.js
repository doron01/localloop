import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Avatar({ seed, size = 40, style }) {
  // Using Dicebear's Micah style (Memoji-like)
  const avatarUrl = `https://api.dicebear.com/7.x/micah/png?seed=${seed}&size=${size * 2}`;

  return (
    <Image
      source={{ uri: avatarUrl }}
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
        style
      ]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#fff',
  },
}); 