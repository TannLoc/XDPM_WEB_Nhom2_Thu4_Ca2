import { GENERIC_PATH } from "@/constants";
import { mainApi } from "@/utils";

export const userServices = {
    getInfo: () => mainApi.get(GENERIC_PATH.USER)
}