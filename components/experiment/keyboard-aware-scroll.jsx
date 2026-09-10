//import { KeyboardProvider } from "react-native-keyboard-controller"; must be done at root level
//for KeyboardAwareScrollView to work in children components.

import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function KeyboardTestScreen() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [topValue, setTopValue] = useState("");
  const [bottomValue, setBottomValue] = useState("");

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      style={styles.flexFill}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bottomOffset={20}
    >
      <View
        style={[
          styles.banner,
          { backgroundColor: keyboardVisible ? "#2e7d32" : "#c62828" },
        ]}
      >
        <Text style={styles.bannerText}>
          Keyboard: {keyboardVisible ? "OPEN" : "CLOSED"}
        </Text>
      </View>

      <Text style={styles.label}>Top input (should always stay visible)</Text>
      <TextInput
        style={styles.input}
        placeholder="Tap me first"
        value={topValue}
        onChangeText={setTopValue}
      />

      <View style={styles.spacer} />

      <Text style={styles.label}>
        Bottom input (the real test — this is the one that gets covered if
        KeyboardAvoidingView isn't working)
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Tap me second"
        value={bottomValue}
        onChangeText={setBottomValue}
      />

      <View style={styles.spacerSmall} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  // Applied to KeyboardAvoidingView itself — must be flex: 1 so it
  // actually has room to shrink/grow when the keyboard appears.
  flexFill: {
    flex: 1,
  },

  // contentContainerStyle on ScrollView, NOT style. This is what makes
  // the content scrollable instead of being clipped by a fixed-height View.
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fafafa",
  },

  banner: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: "center",
  },

  bannerText: {
    color: "#fff",
    fontWeight: "700",
  },

  label: {
    marginBottom: 6,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },

  // Pushes the bottom input far enough down the screen that it would
  // realistically end up under the keyboard on most devices if
  // KeyboardAvoidingView + ScrollView weren't handling it.
  spacer: {
    height: 400,
  },

  spacerSmall: {
    height: 300,
  },
});
