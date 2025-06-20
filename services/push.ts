import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerForPushToken = async () => {
  if (!Device.isDevice) return null;
  const existing = await AsyncStorage.getItem('expoPushToken');
  if (existing) return existing;
  const { status: currentStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = currentStatus;
  if (currentStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return null;
  const tokenData = await Notifications.getExpoPushTokenAsync();
  const token = tokenData.data;
  await AsyncStorage.setItem('expoPushToken', token);
  try {
    await api.post('/wp-json/saac/v1/device', { token });
  } catch (_e) {}
  return token;
};
