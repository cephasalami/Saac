import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  title: string;
  speaker: string;
  time: string;
  location?: string;
  bookmarked: boolean;
  onToggleBookmark: () => void;
  onPress: () => void;
}

export default function SessionCard({ title, speaker, time, location, bookmarked, onToggleBookmark, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={{ width: '100%' }}>
      <ThemedView style={styles.card}>
        <View style={styles.row}>
          <ThemedText type="subtitle" style={{ flex: 1 }}>
            {title}
          </ThemedText>
          <Pressable onPress={onToggleBookmark} hitSlop={8}>
            <FontAwesome name={bookmarked ? 'star' : 'star-o'} size={20} color="#f4b400" />
          </Pressable>
        </View>
        <ThemedText>{speaker}</ThemedText>
        <ThemedText>{time}</ThemedText>
        {location && <ThemedText>{location}</ThemedText>}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});


