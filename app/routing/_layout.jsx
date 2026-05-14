import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function RoutingLayout() {
  const { auth, isLoading } = useAuth();

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;

  if (!auth?.auth) return <Redirect href="/(auth)" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="countries" />
      <Stack.Screen name="networklist" />
      <Stack.Screen name="preferredprovider" />
      <Stack.Screen name="providernetwork" />
      <Stack.Screen name="designatedprovider" />
      <Stack.Screen name="networkprefix" />
      <Stack.Screen name="providerlongmessagerouting" />
      <Stack.Screen name="routinglog" />
      <Stack.Screen name="senderidreplace" />
    </Stack>
  );
}
