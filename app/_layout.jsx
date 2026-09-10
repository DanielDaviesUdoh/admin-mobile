import "intl-pluralrules";
import "text-encoding-polyfill";

import { toastConfig } from "@/constants/toast-config";
import AuthProvider from "@/context/auth-provider";
import { ConfirmDialogProvider } from "@/context/confirm-dialogue-provider";
import { FontProvider } from "@/context/font-provider";
import SlideProvider from "@/context/slide-provider";
import { StaffProvider } from "@/context/staff-provider";
import { initI18n } from "@/i18n";
import { SocketProvider } from "@/services/socket/SocketProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Appearance } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import AppContent from "./_appContent";

export default function RootLayout() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const colorScheme = useMemo(() => Appearance.getColorScheme(), []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initI18n();
      setReady(true);
    };
    init();
  }, []);

  if (!ready) return <ActivityIndicator size="large" color="blue" />;

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <AuthProvider>
          <SlideProvider>
            <StaffProvider>
              <FontProvider>
                <SafeAreaProvider>
                  <ConfirmDialogProvider>
                    <AutocompleteDropdownContextProvider>
                      <KeyboardProvider>
                        <AppContent colorscheme={colorScheme} />
                      </KeyboardProvider>
                    </AutocompleteDropdownContextProvider>
                  </ConfirmDialogProvider>
                  <Toast config={toastConfig} />
                  <StatusBar
                    style={colorScheme === "dark" ? "dark" : "light"}
                  />
                </SafeAreaProvider>
              </FontProvider>
            </StaffProvider>
          </SlideProvider>
        </AuthProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
}
