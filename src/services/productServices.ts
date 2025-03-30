import { GENERIC_PATH } from "@/constants";
import { T_PRODUCT_PARAMS } from "@/types";
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
