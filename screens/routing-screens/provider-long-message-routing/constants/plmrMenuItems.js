// initVal = {mccmnc: "SENTINEL_VALUE", isDefault: true, sentinel: t("select")}
export const genCurNetDataSet = (data = []) => {
  return data.map((obj) => ({
    id: obj?.mccmnc?.toString(),
    title: obj?.isDefault
      ? `${obj.sentinel}`
      : `${obj?.["mccmnc"]} ${obj?.["network"]} ${obj?.["country_name"]}`,
    value: obj?.mccmnc,
  }));
};
