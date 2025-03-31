import { GENERIC_PATH } from "@/constants";
import { mainApi } from "@/utils";

export const imageServices = {
  upload: (data: FormData) => mainApi.post(GENERIC_PATH.UPLOAD, data),
};
