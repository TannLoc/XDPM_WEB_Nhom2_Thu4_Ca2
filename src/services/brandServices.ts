import { GENERIC_PATH } from "@/constants";
import { mainApi } from "@/utils";

export const brandClientServices = {
  getAll: () =>
    mainApi.get(GENERIC_PATH.BRAND, {
      params: {
        pageSize: 100,
      },
    }),
  getOne: (id: number) => mainApi.get(`${GENERIC_PATH.BRAND}/${id}`),
};
