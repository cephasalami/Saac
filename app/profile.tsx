import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getMyProfile, updateProfile, Profile } from '@/services/profile';
import QRCode from 'react-native-qrcode-svg';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile>({ name: '', role: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const p = await getMyProfile();
        setProfile(p);
      } catch (_e) {
        Alert.alert('Error loading profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async () => {
    try {
      await updateProfile(profile);
      Alert.alert('Saved');
    } catch (_e) {
      Alert.alert('Error saving');
    }
  };

  if (loading) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fieldRow}>
        <ThemedText>Name</ThemedText>
        <TextInput style={styles.input} value={profile.name} onChangeText={(t) => setProfile({ ...profile, name: t })} />
      </View>
      <View style={styles.fieldRow}>
        <ThemedText>Role</ThemedText>
        <TextInput style={styles.input} value={profile.role} onChangeText={(t) => setProfile({ ...profile, role: t })} />
      </View>
      <View style={styles.fieldRow}>
        <ThemedText>Phone</ThemedText>
        <TextInput style={styles.input} value={profile.phone} onChangeText={(t) => setProfile({ ...profile, phone: t })} />
      </View>
      <View style={styles.fieldRow}>
        <ThemedText>Email</ThemedText>
        <TextInput style={styles.input} value={profile.email} onChangeText={(t) => setProfile({ ...profile, email: t })} />
      </View>
      <ThemedView style={{ alignSelf: 'center', marginVertical: 20 }}>
        <QRCode value={JSON.stringify(profile)} size={180} />
        <ThemedText style={{ textAlign: 'center', marginTop: 8 }}>My QR</ThemedText>
      </ThemedView>
      <ThemedText style={styles.saveBtn} onPress={save}>
        Save
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  fieldRow: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  saveBtn: {
    backgroundColor: '#0a7ea4',
    color: '#fff',
    padding: 12,
    textAlign: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
