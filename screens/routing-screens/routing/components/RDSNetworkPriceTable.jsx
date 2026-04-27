import { useResponsive } from "@/hooks/useResponsive";
import { useRoutingPriceByMCCMNC } from "@/hooks/useRoutingShared";
import React from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import RoutingNetworkPriceTable from "./RoutingNetworkPriceTable";

export default function RDSNetworkPriceTable({
  linkTextNPT,
  closeModalNPT,
  openNPT,
}) {
  const { isLoading: nPDataLoading, data: nPData } =
    useRoutingPriceByMCCMNC(linkTextNPT);
  const { isTablet } = useResponsive();

  return (
    <Modal
      visible={openNPT}
      animationType="slide"
      onRequestClose={closeModalNPT}
      transparent
    >
      <Pressable style={styles.overlay} onPress={closeModalNPT}>
        <View
          style={[
            styles.modalBox,
            {
              width: isTablet ? "60%" : "90%",
              maxWidth: isTablet ? 600 : 500,
            },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable>
              <RoutingNetworkPriceTable
                nPDataLoading={nPDataLoading}
                nPData={nPData}
              />
            </Pressable>
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    minWidth: 280,
    maxHeight: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
});
