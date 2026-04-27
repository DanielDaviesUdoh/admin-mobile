import OutletWrap from "@/components/outlet-wrap";
import { setCurrentPath } from "@/constants/routeStore";
import { useLogout } from "@/hooks/useLogout";
import { setupInterceptors } from "@/services/api";
import { Stack, usePathname } from "expo-router";
import { useEffect } from "react";

export default function AppContent({ colorscheme }) {
  const pathname = usePathname();
  const handleLogout = useLogout();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const cleanup = setupInterceptors(handleLogout);
    return () => cleanup();
  }, [handleLogout]);

  return (
    <OutletWrap>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="routing">
        <Stack.Screen name="routing" />
        <Stack.Screen name="testmessage" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </OutletWrap>
  );
}
