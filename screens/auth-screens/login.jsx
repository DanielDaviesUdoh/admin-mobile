import CustomAlert from "@/components/custom-alert";
import InputField from "@/components/input-field";
import { colors } from "@/constants/colors";
import { useResponsive } from "@/hooks/useResponsive";
import useStaff from "@/hooks/useStaff";
import api from "@/services/api";
import { STAFF_LOGIN } from "@/services/routingEndpoints";
import { useLoginStyles } from "@/styles/loginStyles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function LoginScreen({ setAccessCode }) {
  const { setStaff } = useStaff();
  const styles = useLoginStyles();
  const { isTablet, isSmallPhone } = useResponsive();

  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Mutate function for login
  const loginMutation = useMutation({
    mutationFn: async ({ staffId, password }) => {
      const res = await api.post(STAFF_LOGIN, { staffId, password });
      return res.data;
    },
    onSuccess: (data) => {
      const staff = data.response;
      setStaff((prevStaff) => ({ ...prevStaff, ...staff }));

      if (staff?.staffId === staffId) {
        setAccessCode(true);
      }
    },
    onError: (error) => {
      setAccessCode(false);
      setErrorStatus(error.message);
      setShowAlert(true);
    },
  });

  const isDisabled =
    !staffId.trim() || !password.trim() || loginMutation.isPending;

  const handleSubmit = () => {
    loginMutation.mutate({ staffId, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcont}>
        <View style={styles.icon}>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={isTablet ? 28 : isSmallPhone ? 24 : 26}
            color="#fff"
          />
        </View>
        <View style={styles.inputCont}>
          <InputField
            placeholder="Staff Id"
            value={staffId}
            onChangeText={setStaffId}
            iconName="account"
            warnType="staffId"
          />
        </View>
        <View style={styles.inputCont}>
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            iconName="lock"
            warnType="password"
          />
        </View>

        {loginMutation.isPending && (
          <View style={styles.spinCont}>
            <ActivityIndicator
              color={colors.header_bgclr}
              size={isTablet ? 26 : 24}
            />
            <Text style={styles.spinText}>Securely logging in...</Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? colors.btn_pressed : colors.btn_bg,
              opacity: isDisabled ? 0.65 : 1,
            },
          ]}
          onPress={handleSubmit}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
      <CustomAlert
        visible={showAlert}
        title="Login Failed"
        message={errorStatus}
        onClose={() => setShowAlert(false)}
      />
    </View>
  );
}
