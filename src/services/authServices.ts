import { GENERIC_PATH } from "@/constants";
import { T_LOGIN_ADMIN, T_LOGIN_CUSTOMER, T_REGISTER_CUSTOMER } from "@/types";
import { mainApi } from "@/utils";

export const authCustomer = {
  login: (data: T_LOGIN_CUSTOMER) =>
    mainApi.post(`${GENERIC_PATH.AUTH}${GENERIC_PATH.LOGIN}`, data),
  register: (data: T_REGISTER_CUSTOMER) => mainApi.post(`${GENERIC_PATH.AUTH}${GENERIC_PATH.REGISTER}`, data)
};

export const authAdmin = {
  login: (data: T_LOGIN_ADMIN) => mainApi.post(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.AUTH}${GENERIC_PATH.LOGIN}`, data)
}