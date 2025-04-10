import { GENERIC_PATH } from "@/constants";
import { T_LOGIN_ADMIN, T_LOGIN_CUSTOMER, T_LOGIN_GOOGLE, T_REGISTER_CUSTOMER } from "@/types";
import { mainApi } from "@/utils";

export const authCustomer = {
  login: (data: T_LOGIN_CUSTOMER) =>
    mainApi.post(`${GENERIC_PATH.AUTH}${GENERIC_PATH.LOGIN}`, data),
  loginGoogle: (data: T_LOGIN_GOOGLE) =>
    mainApi.post(`${GENERIC_PATH.AUTH}${GENERIC_PATH.LOGIN}/google`, data),

  register: (data: T_REGISTER_CUSTOMER) =>
    mainApi.post(`${GENERIC_PATH.AUTH}${GENERIC_PATH.REGISTER}`, data),
  logout: () => mainApi.get(`${GENERIC_PATH.AUTH}${GENERIC_PATH.LOGOUT}`),
};

export const authAdmin = {
  login: (data: T_LOGIN_ADMIN) =>
    mainApi.post(
      `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.AUTH}${GENERIC_PATH.LOGIN}`,
      data
    ),
  logout: () =>
    mainApi.get(
      `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.AUTH}${GENERIC_PATH.LOGOUT}`
    ),
};
