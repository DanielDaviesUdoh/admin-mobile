import AutocompleteFieldTwo from "@/components/auto-complete-fieldtwo";
import CustomAlert from "@/components/custom-alert";
import InputField from "@/components/input-field";
import { colors } from "@/constants/colors";
import {
  genClientIdDataSet,
  genCtryDataSet,
  genDataSet,
  genDotDataSet,
  getDataSetForDropdown,
} from "@/constants/menuItems";
import { useResponsive } from "@/hooks/useResponsive";
import useStaff from "@/hooks/useStaff";
import { useI18nNamespaces } from "@/i18n/useI18nNamespaces";
import api from "@/services/api";
import { STAFF_LOGIN } from "@/services/routingEndpoints";
import { useLoginStyles } from "@/styles/loginStyles";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { genCurNetDataSet } from "../routing-screens/provider-long-message-routing/constants/plmrMenuItems";

const genDataSentinel = "GENDATA_SENTINEL";
const SENTINEL = "SENTINEL";

export default function LoginScreen({ setAccessCode }) {
  const ready = useI18nNamespaces(["home"]);
  const { t } = useTranslation("home");

  // const transVal = t("form.login");
  const [transVal, setTransVal] = useState(null);

  const initGenData = genDataSentinel;
  const genDataArray = ["234", "233", "93", "255", 341];

  const initGenDotData = useMemo(
    () => ({ provider: SENTINEL, isDefault: true, sentinel: transVal }),
    [transVal],
  );
  const genDotDataArray = [
    { provider: "bics" },
    { provider: "42Telecom" },
    { provider: "termii" },
  ];

  const initGenCtryData = useMemo(
    () => ({
      name: SENTINEL,
      code: SENTINEL,
      isDefault: true,
      sentinel: transVal,
    }),
    [transVal],
  );
  const genCtryDataArray = [
    { name: "Nigeria", code: 234 },
    { name: "Ghana", code: 233 },
    { name: "Afghanistan", code: 93 },
  ];

  const initGenClientIdData = useMemo(
    () => ({
      country_name: SENTINEL,
      client_id: SENTINEL,
      isDefault: true,
      sentinel: transVal,
    }),
    [transVal],
  );
  const genClientIdDataArray = [
    { country_name: "Benin", client_id: "ablov", client_name: "ABlo" },
    { country_name: "Testctry", client_id: "ctry", client_name: "CTry" },
    {
      country_name: "TestctryOne",
      client_id: "ctryone",
      client_name: "CTryOne",
    },
  ];

  const initGenCurNetData = useMemo(
    () => ({
      mccmnc: SENTINEL,
      network: SENTINEL,
      country_name: SENTINEL,
      isDefault: true,
      sentinel: transVal,
    }),
    [transVal],
  );
  const genCurNetDataArray = [
    { mccmnc: 61131, network: "net1", country_name: "ctry1" },
    { mccmnc: 62232, network: "net2", country_name: "ctry2" },
    { mccmnc: 63333, network: "net3", country_name: "ctry3" },
  ];

  const [genData, setGenData] = useState(initGenData);
  const [genDotData, setGenDotData] = useState(initGenDotData.provider);
  const [genCtryData, setGenCtryData] = useState(initGenCtryData.code);
  const [genClientIdData, setGenClientIdData] = useState(
    initGenClientIdData.client_id,
  );
  const [genCurNetData, setGenCurNetData] = useState(initGenCurNetData.mccmnc);

  const dataSet = getDataSetForDropdown({
    isLoading: false,
    genType: "genDataSet",
    genFunc: genDataSet,
    data: genDataArray,
    initVal: initGenData,
    translatedVal: transVal,
  });

  const dotDataSet = getDataSetForDropdown({
    isLoading: false,
    genType: "genDotDataSet",
    genFunc: genDotDataSet,
    data: genDotDataArray,
    initVal: initGenDotData,
    dot: "provider",
  });

  const ctryDataSet = getDataSetForDropdown({
    isLoading: false,
    genType: "genCtryDataSet",
    genFunc: genCtryDataSet,
    data: genCtryDataArray,
    initVal: initGenCtryData,
    //value can be "code" or "name" depending on value wanted
  });

  const clientIdDataSet = getDataSetForDropdown({
    isLoading: false,
    genType: "genClientIdDataSet",
    genFunc: genClientIdDataSet,
    data: genClientIdDataArray,
    initVal: initGenClientIdData,
    type: 1,
  });

  const curNetDataSet = getDataSetForDropdown({
    isLoading: false,
    genType: "genCurNetDataSet",
    genFunc: genCurNetDataSet,
    data: genCurNetDataArray,
    initVal: initGenCurNetData,
  });

  console.log({ ready, transVal });

  // console.log({
  //   dataSet,
  //   dotDataSet,
  //   ctryDataSet,
  //   clientIdDataSet,
  //   curNetDataSet,
  // });

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
      console.log({ loginErr: error });
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

  useEffect(() => {
    let enable = true;

    if (ready && enable) {
      setTransVal(t("form.login"));
      enable = false;
    }

    return () => (enable = true);
  }, [ready, t]);

  useEffect(() => {
    setGenDotData((prev) => (prev === initGenDotData ? initGenDotData : prev));
    setGenCtryData((prev) =>
      prev === initGenCtryData ? initGenCtryData : prev,
    );
    setGenClientIdData((prev) =>
      prev === initGenClientIdData ? initGenClientIdData : prev,
    );
    setGenCurNetData((prev) =>
      prev === initGenCurNetData ? initGenCurNetData : prev,
    );
  }, [initGenDotData, initGenCtryData, initGenClientIdData, initGenCurNetData]);

  if (!ready) return <ActivityIndicator />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={{ height: 300 }}>
          <ScrollView>
            <View style={{ width: 250, marginVertical: 6 }}>
              <AutocompleteFieldTwo
                dataSet={dataSet}
                placeholder={transVal}
                value={genData}
                onChange={(v) => setGenData(v)}
                isLoading={false}
              />
            </View>
            <View style={{ width: 250, marginVertical: 6 }}>
              <AutocompleteFieldTwo
                dataSet={dotDataSet}
                placeholder={transVal}
                value={genDotData}
                onChange={(v) => setGenDotData(v)}
                isLoading={false}
              />
            </View>
            <View style={{ width: 250, marginVertical: 6 }}>
              <AutocompleteFieldTwo
                dataSet={ctryDataSet}
                placeholder={transVal}
                value={genCtryData}
                onChange={(v) => setGenCtryData(v)}
                isLoading={false}
              />
            </View>
            <View style={{ width: 250, marginVertical: 6 }}>
              <AutocompleteFieldTwo
                dataSet={clientIdDataSet}
                placeholder={transVal}
                value={genClientIdData}
                onChange={(v) => setGenClientIdData(v)}
                isLoading={false}
              />
            </View>
            <View style={{ width: 250, marginVertical: 6 }}>
              <AutocompleteFieldTwo
                dataSet={curNetDataSet}
                placeholder={transVal}
                value={genCurNetData}
                onChange={(v) => setGenCurNetData(v)}
                isLoading={false}
              />
            </View>
          </ScrollView>
        </View>
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
              placeholder={t("form.staffId")}
              value={staffId}
              onChangeText={setStaffId}
              iconName="account"
              warnType="staffId"
            />
          </View>
          <View style={styles.inputCont}>
            <InputField
              placeholder={t("form.password")}
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
              <Text style={styles.spinText}>{t("form.loggingIn")}</Text>
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
            <Text style={styles.buttonText}>{t("form.login")}</Text>
          </Pressable>
        </View>
        <CustomAlert
          visible={showAlert}
          title="Login Failed"
          message={errorStatus}
          onClose={() => setShowAlert(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
