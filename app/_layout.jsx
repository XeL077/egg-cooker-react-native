import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SettingsProvider, useSettings } from '../src/context/SettingsContext';
import SplashScreen from '../src/components/SplashScreen';

function RootLayoutNav() {
  const { isLoading } = useSettings();

  if (isLoading) {
    return <SplashScreen isLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <RootLayoutNav />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
