import { GENERIC_PATH } from "@/constants";
import { mainApi } from "@/utils";

export const dashboardServices = {
    getAll: () =>mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.DASHBOARD}`)
}