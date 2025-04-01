import { GENERIC_PATH } from "@/constants";
import { T_PICKLIST_REQUEST } from "@/types";
import { mainApi } from "@/utils";

export const pickListServices = {
  get: (type: string) =>
    mainApi(GENERIC_PATH.PICKLIST, {
      params: {
        type: type,
        pageSize: 100,
      },
    }),
  create: (data: T_PICKLIST_REQUEST) => mainApi(GENERIC_PATH.PICKLIST, data),
};
