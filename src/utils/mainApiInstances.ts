import { ERROR_CODE, GENERIC_PATH } from "@/constants";
import { authAdmin } from "@/services";
import { message } from "antd";
import axios from "axios";

export const mainApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API_URL,
  withCredentials: true,
});

mainApi.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

mainApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { response } = error;

    if (!response) {
      console.error("No response received from the server.");
      return Promise.reject(error);
    }

    const errorCode = response.data.meta?.error?.code;
    const errorMessage = ERROR_CODE[errorCode as keyof typeof ERROR_CODE];

    const { status, statusText } = response;

    if (!errorMessage) {
      message.error(statusText);
    } else {
      message.error(errorMessage);
    }

    switch (status) {
      case 401:
        if (response.data?.meta?.error?.code === "AUTH001") {
          try {
            const res = await mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.AUTH}${GENERIC_PATH.REFRESH_TOKEN}`);
            if (res) {
              return mainApi(error.config);
            }
          } catch (refreshError) {
            authAdmin.logout();
            window.location.href = `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.LOGIN}`;
            return Promise.reject(refreshError);
          }
        } else {
          authAdmin.logout();
          window.location.href = `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.LOGIN}`;
        }
        break;
      case 400:
      case 402:
      case 403:
      case 404:
      case 500:
        break;
      default:
        message.warning("Unhandled status code", status);
        break;
    }

    if (status !== 401) {
      return Promise.reject(error);
    }
  }
);
