import { GENERIC_PATH } from "@/constants";
import { T_PAGINATION, T_SHIPMENT_REQUEST } from "@/types";
import { mainApi } from "@/utils";

export const shipmentServices = {
  getAll: (params?: T_PAGINATION) =>
    mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.SHIPMENT}`, {
      params: {
        page: params?.page,
        pageSize: params?.pageSize,
      },
    }),
  getOne: (id: number) =>
    mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.SHIPMENT}/${id}`),
  create: (data: T_SHIPMENT_REQUEST) =>
    mainApi.post(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.SHIPMENT}`, data),
  edit: (id: number, data: T_SHIPMENT_REQUEST) =>
    mainApi.put(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.SHIPMENT}/${id}`, data),
  delete: (id: number) =>
    mainApi.delete(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.SHIPMENT}/${id}`),
};