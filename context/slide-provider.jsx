import { useResponsive } from "@/hooks/useResponsive";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, useWindowDimensions } from "react-native";

export const SlideContext = createContext();

export default function SlideProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const { width } = useWindowDimensions();
  const { isTablet } = useResponsive();

  const slideAnim = useRef(new Animated.Value(0)).current;
  const currentAnimation = useRef(null);

  const sidebarWidth = isTablet ? width * 0.35 : width * 0.7;
  const sidebarTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-sidebarWidth, 0],
  });

  const openSidebar = useCallback(() => {
    currentAnimation.current?.stop();
    setIsVisible(true);

    currentAnimation.current = Animated.timing(slideAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    });

    currentAnimation.current.start(() => {
      currentAnimation.current = null;
    });
  }, [slideAnim, currentAnimation]);

  const closeSidebar = useCallback(() => {
    currentAnimation.current?.stop();

    currentAnimation.current = Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });

    currentAnimation.current.start(() => {
      currentAnimation.current = null;
      setIsVisible(false);
    });
  }, [slideAnim, currentAnimation]);

  const toggleSidebar = useCallback(() => {
    if (isVisible) closeSidebar();
    else openSidebar();
  }, [isVisible, openSidebar, closeSidebar]);

  useEffect(() => {
    return () => {
      currentAnimation.current?.stop();
    };
  }, [currentAnimation]);

  return (
    <SlideContext.Provider
      value={{
        isVisible,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        sidebarWidth,
        sidebarTranslateX,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
}
