import { usePathname } from "expo-router";
import { createContext, useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";

export const OutletContext = createContext({});

const OutletProvider = ({ children }) => {
  const outletRef = useRef(null);
  const pathname = usePathname();
  const [outletNum, setOutletNum] = useState(null);

  useEffect(() => {
    if (outletRef.current) {
      outletRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      });
    }
  }, [pathname, outletNum]);

  return (
    <OutletContext.Provider value={{ setOutletNum }}>
      <ScrollView ref={outletRef} style={{ flex: 1 }}>
        {children}
      </ScrollView>
    </OutletContext.Provider>
  );
};

export default OutletProvider;
