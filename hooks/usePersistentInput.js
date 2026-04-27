import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function usePersistentInput(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(storedValue);
        }
      } catch (error) {
        console.error("Failed to load value:", error);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [key]);

  useEffect(() => {
    if (!isLoaded) return;

    (async () => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error("Failed to save value:", error);
      }
    })();
  }, [key, value, isLoaded]);

  return [value, setValue];
}
