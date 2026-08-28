import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./index";

export const changeLanguage = async (lang) => {
  await i18n.changeLanguage(lang); // fires the "languageChanged" listener above
  await AsyncStorage.setItem("lang", lang);
};
