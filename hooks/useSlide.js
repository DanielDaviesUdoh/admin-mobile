import { SlideContext } from "@/context/slide-provider";
import { useContext } from "react";

export const useSlide = () => {
  const context = useContext(SlideContext);
  if (!context) {
    throw new Error("useSlide must be used within SlideProvider");
  }
  const {
    isVisible,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    sidebarWidth,
    sidebarTranslateX,
  } = context;

  return {
    isVisible,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    sidebarWidth,
    sidebarTranslateX,
  };
};
