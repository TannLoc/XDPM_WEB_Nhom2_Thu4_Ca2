import { GENERIC_PATH } from "@/constants";
import { T_USER_REQUEST } from "@/types";
import { mainApi } from "@/utils";

export const userServices = {
  getInfo: () => mainApi.get(GENERIC_PATH.USER),
  editUser: (data: T_USER_REQUEST) => mainApi.put(`${GENERIC_PATH.USER}`, data),
};