import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function AuthLayout() {
  const { auth, isLoading } = useAuth();

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;

  if (auth?.auth) return <Redirect href="/routing" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
