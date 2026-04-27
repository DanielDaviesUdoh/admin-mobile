import axios from "axios";
import { router } from "expo-router";
import { BASE_URL } from "./api";


const apiFiles = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const setupInterceptors = () => {
  const requestIntercept = apiFiles.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  const responseIntercept = apiFiles.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 401 ||
        error.response?.data?.statusCode === "ACCESS_DENIED"
      ) {
        const currentPath = router.getCurrentRoute()?.path ?? "/";
        const redirectUrl = encodeURIComponent(currentPath);

        router.replace(`/login?redirect=${redirectUrl}`);
      }

      return Promise.reject(error);
    }
  );

  return () => {
    apiFiles.interceptors.request.eject(requestIntercept);
    apiFiles.interceptors.response.eject(responseIntercept);
  };
};

export default apiFiles;
