import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function DashboardScreen() {
  const { user } = useAuth();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Hello, {user?.name || 'User'}</ThemedText>
      <ThemedText>You are logged in as: {user?.roles?.join(', ')}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});
