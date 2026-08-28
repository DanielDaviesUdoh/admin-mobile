import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { reloadNamespacesForLanguage } from "./loadNamespaces";

const getStoredLanguage = async () => {
  const lang = await AsyncStorage.getItem("lang");
  return lang || Localization.getLocales()[0]?.languageCode || "en";
};

export const initI18n = async () => {
  const lng = await getStoredLanguage();

  await i18n.use(initReactI18next).init({
    lng,
    fallbackLng: "en",
    supportedLngs: ["en", "fr", "pt"],
    ns: [], // lazy loaded per-screen via useI18nNamespaces
    defaultNS: "home",
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  // whenever language changes, re-fetch whatever namespaces were already
  // loaded, under the new language — fixes already-mounted screens not
  // updating their text on a language switch
  i18n.on("languageChanged", (newLng) => {
    reloadNamespacesForLanguage(newLng);
  });

  return i18n;
};

export default i18n;
