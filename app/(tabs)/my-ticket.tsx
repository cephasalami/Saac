import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getMyTicket } from '@/services/tickets';

export default function MyTicketScreen() {
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const id = await getMyTicket();
        setTicketId(id);
      } catch (_e) {
        // handle
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : ticketId ? (
        <View style={styles.center}>
          <QRCode value={ticketId} size={220} />
          <ThemedText style={{ marginTop: 16 }}>Show this code at entry</ThemedText>
        </View>
      ) : (
        <ThemedText>Could not load ticket.</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  center: { justifyContent: 'center', alignItems: 'center' },
});
