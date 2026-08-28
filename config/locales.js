import Constants from "expo-constants";

const JSON_SERVER_PORT = 4000;
const PROD_URL = "https://dev.wirepick.com:8443/adminwpk/locales";

const appEnv = Constants.expoConfig?.extra?.appEnv ?? "production";

function getDevBaseUrl() {
  if (process.env.EXPO_PUBLIC_LOCALES_URL)
    return process.env.EXPO_PUBLIC_LOCALES_URL;

  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.manifest2?.extra?.expoClient?.hostUri;

  if (hostUri) {
    const host = hostUri.split(":")[0]; // strip Metro's :8081
    console.log({ hostUri, host });
    return `http://${host}:${JSON_SERVER_PORT}`;
  }
  return `http://10.0.2.2:${JSON_SERVER_PORT}`; // Android emulator fallback
}

export const BASE_URL = appEnv === "development" ? getDevBaseUrl() : PROD_URL;
