import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function ComplexLayout() {
  const { auth, isLoading } = useAuth();

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;

  if (!auth?.auth) return <Redirect href="/(auth)" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="routechange" />
      <Stack.Screen name="providerprofit" />
    </Stack>
  );
}
