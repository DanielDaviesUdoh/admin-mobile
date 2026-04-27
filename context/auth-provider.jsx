import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
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
