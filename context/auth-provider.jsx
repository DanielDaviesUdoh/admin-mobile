import { useSocket } from "@/services/socket/useSocket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { connect, disconnect } = useSocket();
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRequestedCode, setHasRequestedCode] = useState(false);
  const [hasShownLoginToast, setHasShownLoginToast] = useState(false);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const savedAuth = await AsyncStorage.getItem("auth");
        if (savedAuth) {
          const parsedAuth = JSON.parse(savedAuth);
          setAuth(parsedAuth);
        }
      } catch (err) {
        if (err)
          throw new Error("Error in getAuth from AuthProvider component");
      } finally {
        setIsLoading(false);
      }
    };

    getAuth();
  }, []);

  // useEffect(() => {
  //   if (!auth?.auth) return;
  //   connect();

  //   return () => {
  //     disconnect();
  //   };
  // }, [auth?.auth, connect, disconnect]);

  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      const previousState = appStateRef.current;

      if (
        previousState.match(/inactive|background/) &&
        nextState === "active"
      ) {
        console.log("App has come to foreground");
        if (auth?.auth) {
          connect();
        }
      }

      if (nextState === "background") {
        console.log("App moved to background");
        disconnect();
      }

      appStateRef.current = nextState; // update after comparison
    });

    return () => {
      subscription.remove();
    };
  }, [auth?.auth, connect, disconnect]);

  const login = async (auth) => {
    try {
      await AsyncStorage.setItem("auth", JSON.stringify(auth));
      setAuth(auth);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("auth");
      setAuth(null);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        login,
        logout,
        hasRequestedCode,
        setHasRequestedCode,
        hasShownLoginToast,
        setHasShownLoginToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
