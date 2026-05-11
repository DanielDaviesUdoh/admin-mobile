import "text-encoding-polyfill";

import { toastConfig } from "@/constants/toast-config";
import AuthProvider from "@/context/auth-provider";
import { ConfirmDialogProvider } from "@/context/confirm-dialogue-provider";
import { FontProvider } from "@/context/font-provider";
import SlideProvider from "@/context/slide-provider";
import { StaffProvider } from "@/context/staff-provider";
import { SocketProvider } from "@/services/socket/SocketProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Appearance } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import AppContent from "./_appContent";

export default function RootLayout() {
  const [queryclient] = useState(new QueryClient());
  const [colorscheme] = useState(Appearance.getColorScheme());

  return (
    <QueryClientProvider client={queryclient}>
      <SocketProvider>
        <AuthProvider>
          <SlideProvider>
            <StaffProvider>
              <FontProvider>
                <SafeAreaProvider>
                  <ConfirmDialogProvider>
                    <AutocompleteDropdownContextProvider>
                      <AppContent colorscheme={colorscheme} />
                    </AutocompleteDropdownContextProvider>
                  </ConfirmDialogProvider>
                  <Toast config={toastConfig} />
                  <StatusBar
                    style={colorscheme === "dark" ? "dark" : "light"}
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
