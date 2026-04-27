import { useInputFieldStyles } from "@/styles/inputFieldStyles";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function InputField({
  width = "100%",
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  iconName,
  warnType,
}) {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);
  const [emptyWarn, setEmptyWarn] = useState({
    staffId: false,
    password: false,
  });

  const styles = useInputFieldStyles();

  const handleBlur = () => {
    if (!value.trim()) {
      if (warnType === "staffId") {
        setEmptyWarn((prev) => ({ ...prev, staffId: true }));
      } else if (warnType === "password") {
        setEmptyWarn((prev) => ({ ...prev, password: true }));
      }
    }
  };

  const handleKeyPress = () => {
    if (!emptyWarn.staffId && !emptyWarn.password) return;
    setEmptyWarn({
      staffId: false,
      password: false,
    });
  };

  return (
    <>
      <TextInput
        mode="outlined"
        style={[styles.style, { width }]}
        outlineStyle={{ borderRadius: 0 }}
        contentStyle={styles.contentStyle}
        theme={styles.theme}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        secureTextEntry={hidePassword}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        placeholderTextColor="#999"
        cursorColor="#666"
        left={
          <TextInput.Icon
            icon={iconName}
            size={styles.iconSize}
            color={styles.iconColor}
          />
        }
        right={
          secureTextEntry && (
            <TextInput.Icon
              onPress={() => setHidePassword(!hidePassword)}
              icon={hidePassword ? "eye-off" : "eye"}
              size={styles.iconSize}
              color={styles.iconColor}
            />
          )
        }
      />
      {emptyWarn.staffId && (
        <View style={styles.warntypeCont}>
          <Text style={styles.warntype}>You must be a staff</Text>
        </View>
      )}
      {emptyWarn.password && (
        <View style={styles.warntypeCont}>
          <Text style={styles.warntype}>You Should enter a password</Text>
        </View>
      )}
    </>
  );
}
