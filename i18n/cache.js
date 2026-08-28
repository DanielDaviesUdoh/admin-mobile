import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_PREFIX = "i18n:";

export const getCachedNamespace = async (lng, ns, maxAgeMs) => {
  const key = `${CACHE_PREFIX}${lng}:${ns}`;
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;

  try {
    const entry = JSON.parse(raw);
    const isStale = Date.now() - entry.ts > maxAgeMs;
    return { data: entry.data, isStale };
  } catch {
    // corrupted cache entry — treat as missing
    await AsyncStorage.removeItem(key);
    return null;
  }
};

export const setCachedNamespace = async (lng, ns, data) => {
  const key = `${CACHE_PREFIX}${lng}:${ns}`;
  const entry = { data, ts: Date.now() };
  await AsyncStorage.setItem(key, JSON.stringify(entry));
};

export const clearCachedNamespace = async (lng, ns) => {
  const key = `${CACHE_PREFIX}${lng}:${ns}`;
  await AsyncStorage.removeItem(key);
};

// used by changeLanguage() if you ever want to force a totally clean refetch
export const clearAllCache = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const i18nKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
  if (i18nKeys.length) await AsyncStorage.multiRemove(i18nKeys);
};
