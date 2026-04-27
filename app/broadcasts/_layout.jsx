import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function BroadcastsLayout() {
  const { auth, isLoading } = useAuth();

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;

  if (!auth?.auth) return <Redirect href="/(auth)" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
