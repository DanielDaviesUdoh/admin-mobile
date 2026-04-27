import {
  Merriweather_400Regular,
  Merriweather_500Medium,
  Merriweather_600SemiBold,
  useFonts,
} from "@expo-google-fonts/merriweather";
import React, { createContext, useContext } from "react";

const FontContext = createContext({});

export function FontProvider({ children }) {
  const [fontsLoaded] = useFonts({
    Merriweather_400Regular,
    Merriweather_500Medium,
    Merriweather_600SemiBold
  });

  if (!fontsLoaded) return null

  return (
    <FontContext.Provider value={{}}>
      {children}
    </FontContext.Provider>
  );
}

export const useFontsReady = () => useContext(FontContext);
