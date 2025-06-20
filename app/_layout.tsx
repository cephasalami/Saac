import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { PointsProvider } from '@/contexts/PointsContext';

function LayoutNavigator() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return (
    <Stack>
      {user ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <PointsProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <LayoutNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
      </PointsProvider>
    </AuthProvider>
  );
}
