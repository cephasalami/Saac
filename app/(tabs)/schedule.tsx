import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Modal, View, StyleSheet, Pressable, Linking } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import SessionCard from '@/components/SessionCard';
import api from '@/services/api';
import { getJSON, setJSON } from '@/utils/storage';
import { ThemedText } from '@/components/ThemedText';

interface Resource { url: string; title: string; }
interface Session {
  id: number;
  title: { rendered: string };
  meta: { speaker: string; time: string; location?: string; resources?: Resource[] };
}

const BOOKMARK_KEY = 'bookmarks';
export default function ScheduleScreen() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [selected, setSelected] = useState<Session | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSessions = async () => {
    setRefreshing(true);
    try {
      const res = await api.get('/wp-json/wp/v2/sessions?_embed');
      setSessions(res.data);
    } catch (e) {
      // handle error
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void fetchSessions();
    (async () => {
      const bm = await getJSON<number[]>(BOOKMARK_KEY, []);
      setBookmarks(bm);
    })();
  }, []);

  return (
    <ThemedView>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchSessions} />}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <SessionCard
            title={item.title.rendered}
            speaker={item.meta.speaker}
            time={item.meta.time}
            location={item.meta.location}
            bookmarked={bookmarks.includes(item.id)}
            onToggleBookmark={() => toggleBookmark(item.id)}
            onPress={() => setSelected(item)}
          />
        )}
      />
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View style={styles.backdrop}>
          <View style={styles.modal}>
            <ThemedText type="title">{selected?.title.rendered}</ThemedText>
            <ThemedText>{selected?.meta.speaker}</ThemedText>
            <ThemedText>{selected?.meta.time}</ThemedText>
            {selected?.meta.location && <ThemedText>{selected.meta.location}</ThemedText>}
            {selected?.meta.resources?.length ? (
              <View style={{ marginTop: 12 }}>
                {selected.meta.resources.map((r) => (
                  <Pressable key={r.url} onPress={() => Linking.openURL(r.url)} style={{ marginVertical: 4 }}>
                    <ThemedText style={{ color: '#0a7ea4' }}>{r.title}</ThemedText>
                  </Pressable>
                ))}
              </View>
            ) : null}
            <Pressable onPress={() => setSelected(null)} style={{ marginTop: 16 }}>
              <ThemedText style={{ color: '#0a7ea4' }}>Close</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );

  function toggleBookmark(id: number) {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      void setJSON(BOOKMARK_KEY, next);
      return next;
    });
  }
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '85%',
    maxHeight: '80%',
  },
});
