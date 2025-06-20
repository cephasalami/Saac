import AsyncStorage from '@react-native-async-storage/async-storage';

export const getJSON = async <T>(key: string, def: T): Promise<T> => {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return def;
    return JSON.parse(raw) as T;
  } catch (_e) {
    return def;
  }
};

export const setJSON = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};
