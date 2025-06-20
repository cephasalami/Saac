import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getLeaderboard } from '@/services/points';
import { usePoints } from '@/contexts/PointsContext';

export default function LeaderboardScreen() {
  const [data, setData] = useState<{ user: string; points: number }[]>([]);
  const { points } = usePoints();

  useEffect(() => {
    void (async () => {
      const lb = await getLeaderboard();
      setData(lb);
    })();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText type="title" style={styles.title}>
        Leaderboard
      </ThemedText>
      <ThemedText style={{ textAlign: 'center', marginBottom: 12 }}>Your points: {points}</ThemedText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.user}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <ThemedText style={{ width: 30 }}>{index + 1}</ThemedText>
            <ThemedText style={{ flex: 1 }}>{item.user}</ThemedText>
            <ThemedText>{item.points}</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: { textAlign: 'center', marginVertical: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
