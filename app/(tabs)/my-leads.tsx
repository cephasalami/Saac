import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import api from '@/services/api';

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  captured_at: string;
}

export default function MyLeadsScreen() {
  const [data, setData] = useState<Lead[]>([]);

  useEffect(() => {
    void (async () => {
      const res = await api.get('/wp-json/saac/v1/leads/me');
      setData(res.data);
    })();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <ThemedText style={{ flex: 1 }}>{item.name}</ThemedText>
            <ThemedText>{item.company}</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
});
