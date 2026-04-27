import { useSlide } from "@/hooks/useSlide";
import { useOutletWrapStyles } from "@/styles/outletWrapStyles";
import React from "react";
import { View } from "react-native";
import AppFooter from "./app-footer";
import AppHeader from "./app-header";
import SafeAreaViewWrap from "./safe-area-view-wrap";
import SidebarModal from "./sidebar-modal";

export default function OutletWrap({ children }) {
  const styles = useOutletWrapStyles();

  const {
    isVisible,
    closeSidebar,
    toggleSidebar,
    sidebarWidth,
    sidebarTranslateX,
  } = useSlide();

  return (
    <SafeAreaViewWrap>
      <AppHeader toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />
      <View style={styles.outletCont}>
        <SidebarModal
          isVisible={isVisible}
          closeSidebar={closeSidebar}
          sidebarWidth={sidebarWidth}
          sidebarTranslateX={sidebarTranslateX}
        />
        {children}
      </View>
      <AppFooter />
    </SafeAreaViewWrap>
  );
}
