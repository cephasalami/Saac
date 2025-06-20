import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Booth } from '@/data/booths';

interface Props {
  booth: Booth;
  onPress: (booth: Booth) => void;
  mapWidth: number;
  mapHeight: number;
  highlight?: boolean;
}

export default function BoothOverlay({ 
  booth, 
  onPress, 
  mapWidth, 
  mapHeight, 
  highlight = false
}: Props) {
  const left = (booth.x / 100) * mapWidth;
  const top = (booth.y / 100) * mapHeight;
  const width = (booth.width / 100) * mapWidth;
  const height = (booth.height / 100) * mapHeight;

  return (
    <Pressable
      onPress={() => onPress(booth)}
      style={[
        styles.overlay,
        {
          position: 'absolute',
          left,
          top,
          width,
          height,
        },
        highlight && styles.highlight
      ]}
    >
      <Text style={styles.label}>{booth.id}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    borderColor: '#f4b400',
    backgroundColor: 'rgba(244,180,0,0.15)',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
});
