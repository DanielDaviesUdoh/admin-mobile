const renderClientIdTitle = (type, obj) => {
  if (type === 1)
    return `${obj["country_name"]} - ${obj["client_id"]} - ${obj["client_name"]}`;
  if (type === 2) return `${obj["client_id"]} - ${obj["client_name"]}`;
  if (type === 3) return `${obj["country_name"]} -  ${obj["client_name"]}`;
  if (type === 4)
    return `${obj["country_name"]} ${obj["client_name"] && "-"} ${
      obj["client_name"]
    }`;
  if (type === 5)
    return `${obj["client_id"]} ${obj["client_name"] && "-"}${" "}${
      obj["client_name"]
    }`;
};

export const genDataSet = (data = [], initVal, translatedVal) => {
  return data.map((value) => ({
    id: value?.toString(),
    title: value === initVal ? `${translatedVal}` : value?.toString(),
    value: value,
  }));
};

//initVal = {provider: "SENTINEL_VALUE", isDefault: true, sentinel: t("select")}
export const genDotDataSet = (data = [], dot) => {
  return data.map((obj) => ({
    id: obj[dot]?.toString(),
    title: obj?.isDefault ? `${obj.sentinel}` : obj[dot]?.toString(),
    value: obj[dot],
  }));
};

//initVal will look like this for ctry prototype {name: "sentinel", code: "sentinel", isDefault: true, sentinel: t("allCountries")}
export const genCtryDataSet = (data = [], value = "code") => {
  return data.map((obj) => ({
    id: obj.code?.toString(),
    title: obj?.isDefault ? `${obj.sentinel}` : `${obj.name} (${obj.code})`,
    value: value === "code" ? obj.code : obj.name,
  }));
};

//initVal = {client_id: "SENTINEL_VALUE", isDefault: true, sentinel: t("select")}
export const genClientIdDataSet = (data = [], type) => {
  return data.map((obj) => ({
    id: obj["client_id"]?.toString(),
    title: obj?.isDefault ? `${obj.sentinel}` : renderClientIdTitle(type, obj),
    value: obj["client_id"],
  }));
};

export const getDataSetForDropdown = ({
  genType,
  genFunc,
  isLoading,
  isEdit = false,
  data,
  initVal,
  translatedVal,
  dot,
  value,
  type,
}) => {
  if (genType === "genDataSet") {
    if (isLoading) return [];
    if (isEdit && !data) return genFunc([initVal]);
    if (data?.length > 0)
      return genFunc([initVal, ...data], initVal, translatedVal);
    return [];
  }

  if (genType === "genDotDataSet") {
    if (isLoading) return [];
    if (isEdit && !data) return genFunc([initVal]);
    if (data?.length > 0) return genFunc([initVal, ...data], dot);
    return [];
  }

  if (genType === "genCtryDataSet") {
    if (isLoading) return [];
    if (isEdit && !data) return genFunc([initVal]);
    if (data?.length > 0) return genFunc([initVal, ...data], value);
    return [];
  }

  if (genType === "genClientIdDataSet") {
    if (isLoading) return [];
    if (isEdit && !data) return genFunc([initVal]);
    if (data?.length > 0) return genFunc([initVal, ...data], type);
    return [];
  }

  if (genType === "genCurNetDataSet") {
    if (isLoading) return [];
    if (isEdit && !data) return genFunc([initVal]);
    if (data?.length > 0) return genFunc([initVal, ...data]);
    return [];
  }
};
