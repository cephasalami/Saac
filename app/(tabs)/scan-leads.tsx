import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { saveLead } from '@/services/leads';
import { addPoint } from '@/services/points';

export default function ScanLeadsScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    try {
      await saveLead({ attendee_id: data });
      await addPoint('scan_lead');
      Alert.alert('Lead saved');
    } catch (_e) {
      Alert.alert('Error saving lead');
    } finally {
      setTimeout(() => setScanned(false), 1500);
    }
  };

  if (hasPermission === null) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }
  if (hasPermission === false) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>No camera permission.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && (
        <ThemedView style={styles.centerOverlay}>
          <ThemedText>Saved!</ThemedText>
        </ThemedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  centerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
