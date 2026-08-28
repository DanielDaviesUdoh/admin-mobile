// const BASE_URL = "https://dev.wirepick.com:8443/adminwpk/locales";
import { BASE_URL } from "@/config/locales";

export const fetchNamespace = async (lng, ns) => {
  console.log({ apiLBASE_URL: BASE_URL });
  try {
    const url = `${BASE_URL}/${lng}/${ns}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to load ${lng}/${ns} (status ${response.status})`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("i18n load error:", lng, ns, error);
    return {};
  }
};
