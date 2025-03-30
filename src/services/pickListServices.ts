import { GENERIC_PATH } from "@/constants";
import { mainApi } from "@/utils";

export const pickListServices = {
  getPickList: (type: string) =>
    mainApi(GENERIC_PATH.PICKLIST, {
      params: {
        type: type,
        pageSize: 100,
      },
    }),
};
