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
    return Promise.reject(error);
  }
);