import { PICKLIST } from "@/constants";
import { brandClientServices, pickListServices } from "@/services";

export const handleGetBrandCustomer = async () => {
  const res = await brandClientServices.getAll();
  if (res) return res.data.response;
};

export const handleGetGender = async () => {
  const res = await pickListServices.get(PICKLIST.PRODUCT_GENDER);
  if (res) return res.data.response;
};

export const handleGetSize = async () => {
  const res = await pickListServices.get(PICKLIST.PRODUCT_SIZE);
  if (res) return res.data.response;
};

export const handleGetFeature = async () => {
  const res = await pickListServices.get(PICKLIST.PRODUCT_FEATURE);
  if (res) return res.data.response;
};

export const handleGetMovement = async () => {
  const res = await pickListServices.get(PICKLIST.PRODUCT_MOVENMENT);
  if (res) return res.data.response;
};

export const handleGetMarketSegment = async () => {
  const res = await pickListServices.get(PICKLIST.PRODUCT_MARKET_SEGMENT);
  if (res) return res.data.response;
};
