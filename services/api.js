import { getCurrentPath } from "@/constants/routeStore";
import axios from "axios";
import { router } from "expo-router";

export const BASE_URL = "https://dev.wirepick.com/wpkadmin-api-1.3.5";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isLoggingOut = false;

export const setupInterceptors = (handleLogout) => {
  const requestIntercept = api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  const responseIntercept = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response?.status === 401 ||
        error.response?.data?.statusCode === "ACCESS_DENIED"
      ) {
        if (!isLoggingOut) {
          isLoggingOut = true;

          try {
            await handleLogout?.();
          } catch (e) {
            console.error("Logout failed:", e);
          } finally {
            isLoggingOut = false;
          }
        }
        const currentPath = getCurrentPath();

        router.replace({
          pathname: "/(auth)",
          params: { redirect: currentPath },
        });
      }

      return Promise.reject(error);
    },
  );

  return () => {
    api.interceptors.request.eject(requestIntercept);
    api.interceptors.response.eject(responseIntercept);
  };
};

export default api;
