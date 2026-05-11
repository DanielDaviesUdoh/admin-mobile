import React from "react";
import { StyleSheet, View } from "react-native";
import RNModal from "react-native-modal";

import { useResponsive } from "@/hooks/useResponsive";

export default function MuiDialogSlide({
  component,
  isModalOpen,
  handleClose,
}) {
  const { isTablet } = useResponsive();

  return (
    <RNModal
      coverScreen={true}
      isVisible={isModalOpen}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      useNativeDriver
      propagateSwipe
      hideModalContentWhileAnimating
      avoidKeyboard
      style={styles.modalWrapper}
    >
      <View
        style={[
          styles.modalBox,
          {
            width: isTablet ? "60%" : "90%",
            maxWidth: isTablet ? 600 : 500,
          },
        ]}
      >
        {component}
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0, // IMPORTANT: full-screen backdrop
  },

  modalBox: {
    minWidth: 280,
    maxHeight: "80%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
});
