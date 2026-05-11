import CCheckbox from "@/components/checkbox";
import CustomAlert from "@/components/custom-alert";
import InputFieldOne from "@/components/input-field-one";
import SelectFieldOne from "@/components/select-field-one";
import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { useAuth } from "@/hooks/useAuth";
import useStaff from "@/hooks/useStaff";
import api from "@/services/api";
import { SEND_CODE, STAFF_AUTH } from "@/services/routingEndpoints";
import { useAccessCodeStyles } from "@/styles/accessCodeStyles";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import CodeTimer from "./code-timer";

export default function AccessCodeScreen() {
  const styles = useAccessCodeStyles();
  const { staff } = useStaff();
  const { auth, login, hasRequestedCode, setHasRequestedCode } = useAuth();
  const authorized = auth?.auth;

  const { redirect } = useLocalSearchParams();
  // console.log("redirect type:", typeof redirect);
  // console.log("isArray:", Array.isArray(redirect));
  // console.log("value:", redirect);

  const sendCodeAbortRef = useRef(null);
  const loginAbortRef = useRef(null);

  const [accessCode, setAccessCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [sentCode, setSentCode] = useState(null);
  const [codeSentIsValid, setCodeSentIsValid] = useState(null);
  const [showError, setShowError] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [authErrorMsg, setAuthErrorMsg] = useState(null);

  const mobileOption = staff?.mobilePhone;
  const email = staff?.email;
  const maskedEmail =
    email?.substring(0, 4) + "***" + email?.substring(email.indexOf("@"));

  useEffect(() => {
    if (authorized) {
      router.replace(typeof redirect === "string" ? redirect : "/routing");
    }
  }, [authorized, redirect]);

  const sendCodeMutation = useMutation({
    mutationFn: async () => {
      setSentCode(null);
      setCodeSentIsValid(null);

      if (sendCodeAbortRef.current) {
        sendCodeAbortRef.current.abort();
      }
      sendCodeAbortRef.current = new AbortController();
      const res = await api.post(
        SEND_CODE,
        { email },
        { signal: sendCodeAbortRef.current.signal },
      );
      return res.data.response;
    },
    onSuccess: (data) => {
      const { message, generatedTime, expirationTime } = data;
      const currentTime = new Date(generatedTime.replace(" ", "T")).getTime();
      const expiration = new Date(expirationTime.replace(" ", "T")).getTime();
      const initialRemainingSeconds = Math.floor(
        (expiration - currentTime) / 1000,
      );

      setHasRequestedCode(true);
      setSentCode(message);
      setCodeSentIsValid(initialRemainingSeconds);
    },
    onError: (err) => {
      if (err.name !== "CanceledError") {
        setErrorStatus(err.message);
        setShowError("sendCodeMutation");
        // setTimeout(() => {
        //   setErrorStatus(null);
        //   setShowError(false);
        // }, 5000);
      }
    },
  });

  // const sendCodeMutation = {
  //   // sendCodeMutation for testing
  //   mutate: () => {
  //     setHasRequestedCode(true)
  //     setSentCode("message")
  //   },
  // };

  const loginMutation = useMutation({
    mutationFn: async () => {
      if (loginAbortRef.current) {
        loginAbortRef.current.abort();
      }
      loginAbortRef.current = new AbortController();
      const res = await api.post(
        STAFF_AUTH,
        { email, token: accessCode },
        { signal: loginAbortRef.current.signal },
      );
      return res.data.response;
    },
    onSuccess: (auth) => {
      login({
        auth: auth.auth,
        message: auth.message,
      });
      setAuthErrorMsg(auth.message);
      // setTimeout(() => setAuthErrorMsg(null), 5000);
    },
    onError: (err) => {
      if (err.name !== "CanceledError") {
        setErrorStatus(err.message);
        setShowError("loginMutation");
        // setTimeout(() => {
        //   setErrorStatus(null);
        //   setShowError(false);
        // }, 5000);
      }
    },
  });

  // const loginMutation = {
  //   // loginMutation for testing
  //   mutate: () => {
  //     login({
  //       auth: true,
  //       message: "auth.message",
  //     });
  //   },
  // };

  const isDisabledCancel = !sentCode;
  const isDisabledSendAC = sendCodeMutation.isPending || codeSentIsValid > 0;
  const isDisabledLogin = !accessCode.trim() || loginMutation.isPending;

  const handleCAClose = () => {
    setErrorStatus(null);
    setShowError(null);
  };

  const cAlertVisible = Boolean(
    showError === "sendCodeMutation" || showError === "loginMutation",
  );

  const cAlertTitle =
    showError === "sendCodeMutation"
      ? "Code Sending Failed"
      : showError === "loginMutation" && "Login Failed";

  const handleCancel = () => {
    if (sendCodeAbortRef.current) sendCodeAbortRef.current.abort();
    if (loginAbortRef.current) loginAbortRef.current.abort();
    setSentCode(null);
    setCodeSentIsValid(null);
  };

  const getAccessCode = () => sendCodeMutation.mutate();

  const handleSubmit = () => {
    loginMutation.mutate();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subcont}>
          <View style={styles.title}>
            <Text style={styles.titleText}>ACCESS CODE</Text>
          </View>
          {hasRequestedCode && (
            <View style={styles.info}>
              <Text style={styles.infoName}>ACCESS CODE</Text>
              <View style={styles.infoType}>
                <CCheckbox checkboxContStyle={{ opacity: 0 }} status={mobile} />
                <View style={styles.inputCont}>
                  <InputFieldOne
                    placeholder={"Access Code"}
                    value={accessCode}
                    onChangeText={setAccessCode}
                  />
                </View>
              </View>
            </View>
          )}
          <View style={styles.info}>
            <Text style={styles.infoName}>
              Mobile <Text style={styles.slantText}>#</Text>
            </Text>
            <View style={styles.infoType}>
              <CCheckbox status={mobile} />
              <View style={styles.inputCont}>
                <SelectFieldOne
                  width="100%"
                  selected={mobile}
                  setSelected={(itemValue) => setMobile(itemValue)}
                  item={mobileOption}
                >
                  {mobileOption ? (
                    [
                      <Picker.Item
                        key={"select"}
                        value={""}
                        label="SELECT"
                        style={{
                          fontSize: 16,
                          fontFamily: platformFonts.regular,
                        }}
                      />,
                      <Picker.Item
                        key={mobileOption}
                        value={mobileOption}
                        label={mobileOption}
                        style={{
                          fontSize: 16,
                          fontFamily: platformFonts.regular,
                        }}
                      />,
                    ]
                  ) : (
                    <Picker.Item
                      value={""}
                      label="Nothing to select"
                      color={!mobileOption ? "red" : undefined}
                      style={{
                        fontSize: 16,
                        fontFamily: platformFonts.regular,
                      }}
                    />
                  )}
                </SelectFieldOne>
              </View>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoName}>
              EMAIL <Text style={styles.slantText}>#</Text>
            </Text>
            <View style={styles.infoType}>
              <CCheckbox status={email} />
              <Text style={styles.email}>{maskedEmail}</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <Pressable
              disabled={!sentCode}
              onPress={handleCancel}
              style={({ pressed }) => [
                styles.buttonCont,
                {
                  backgroundColor: pressed
                    ? colors.error_text_pressed
                    : colors.error_text,
                  opacity: isDisabledCancel ? 0.6 : 1,
                },
              ]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={getAccessCode}
              disabled={sendCodeMutation.isPending || codeSentIsValid > 0}
              style={({ pressed }) => [
                styles.buttonCont,
                {
                  backgroundColor: pressed
                    ? colors.green_pressed
                    : colors.green,
                  opacity: isDisabledSendAC ? 0.6 : 1,
                },
              ]}
            >
              <Text style={styles.buttonText}>
                {hasRequestedCode
                  ? sendCodeMutation.isPending
                    ? "Resending..."
                    : "Resend Code"
                  : sendCodeMutation.isPending
                    ? "Sending..."
                    : "Send Access Code"}
              </Text>
            </Pressable>
            {hasRequestedCode && (
              <Pressable
                disabled={!accessCode.trim() || loginMutation.isPending}
                onPress={handleSubmit}
                style={({ pressed }) => [
                  styles.buttonCont,
                  {
                    backgroundColor: pressed
                      ? colors.btn_pressed
                      : colors.btn_bg,
                    opacity: isDisabledLogin ? 0.6 : 1,
                  },
                ]}
              >
                <Text style={[styles.login, styles.buttonText]}>
                  {loginMutation.isPending ? "Logging In..." : "Log In"}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        {hasRequestedCode && (
          <CodeTimer
            key={sentCode}
            codeSentIsValid={codeSentIsValid}
            sentCode={sentCode}
            setCodeSentIsValid={setCodeSentIsValid}
          />
        )}
        <CustomAlert
          visible={cAlertVisible}
          title={cAlertTitle}
          message={errorStatus}
          onClose={handleCAClose}
        />
        <CustomAlert
          visible={Boolean(
            authErrorMsg && authErrorMsg !== "You have Successfully Logged In",
          )}
          title="Authentication Failed"
          message={authErrorMsg}
          onClose={() => setAuthErrorMsg(null)}
        />
      </View>
    </ScrollView>
  );
}
