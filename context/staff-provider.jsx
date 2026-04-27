import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

const StaffContext = createContext({});

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const storedStaff = await AsyncStorage.getItem("staff");
        if (storedStaff) {
          setStaff(JSON.parse(storedStaff));
        }
      } catch (err) {
        console.log("Failed to load staff:", err);
      }
    };

    loadStaff();
  }, []);

  useEffect(() => {
    const saveStaff = async () => {
      try {
        if (staff) {
          await AsyncStorage.setItem("staff", JSON.stringify(staff));
        } else {
          await AsyncStorage.removeItem("staff");
        }
      } catch (err) {
        console.log("Failed to save staff:", err);
      }
    };

    saveStaff();
  }, [staff]);

  return (
    <StaffContext.Provider value={{ staff, setStaff }}>
      {children}
    </StaffContext.Provider>
  );
};

export default StaffContext;
