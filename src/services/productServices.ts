import { GENERIC_PATH } from "@/constants";
import { T_PAGINATION, T_PRODUCT_PARAMS, T_PRODUCT_REQUEST } from "@/types";
import { mainApi } from "@/utils";

export const productClientService = {
  getAll: (params?: T_PRODUCT_PARAMS) =>
    mainApi.get(`${GENERIC_PATH.PRODUCT}`, {
      params: {
        orderBy: params?.orderBy,
        sortOrder: params?.sortOrder,
        page: params?.page,
        pageSize: params?.pageSize,
        keyword: params?.keyword,
        isActive: params?.isActive,
        fromSalesPrice: params?.fromSalesPrice,
        toSalesPrice: params?.toSalesPrice,
        featureIds: params?.featureIds?.toString(),
        movementId: params?.movementId,
        brandId: params?.brandId,
        marketSegmentId: params?.marketSegmentId,
        sizeId: params?.sizeId,
        genderId: params?.genderId,
      },
    }),
  getOne: (id: number) => mainApi.get(`${GENERIC_PATH.PRODUCT}/${id}`),
  getByIdBrand: (id: number) =>
    mainApi.get(`${GENERIC_PATH.PRODUCT}`, {
      params: { brandId: id },
    }),
};

export const productAdminService = {
  getAll: (params?: T_PAGINATION) =>
    mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.PRODUCT}`, {
      params: {
        page: params?.page,
        pageSize: params?.pageSize,
      },
    }),
  getOne: (id: number) =>
    mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.PRODUCT}/${id}`),
  create: (data: T_PRODUCT_REQUEST) =>
    mainApi.post(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.PRODUCT}`, data),
  edit: (id: number, data: T_PRODUCT_REQUEST) =>
    mainApi.put(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.PRODUCT}/${id}`, data),
};
