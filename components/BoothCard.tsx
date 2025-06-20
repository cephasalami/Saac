import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface Props {
  booth: { name: string; logo?: string; description?: string };
}

export default function BoothCard({ booth }: Props) {
  return (
    <View style={styles.card}>
      {booth.logo && <Image source={{ uri: booth.logo }} style={styles.logo} />}
      <ThemedText type="subtitle">{booth.name}</ThemedText>
      {booth.description && <ThemedText style={{ marginTop: 4 }}>{booth.description}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },
});
