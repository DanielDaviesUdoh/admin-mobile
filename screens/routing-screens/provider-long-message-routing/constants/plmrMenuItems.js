export const genCurNetDataSet = (data) => {
  return data.map((obj) => ({
    id: obj?.mccmnc?.toString(),
    title: `${obj?.["mccmnc"]} ${obj?.["network"]} ${obj?.["country_name"]}`,
    value: obj?.mccmnc,
  }));
};
