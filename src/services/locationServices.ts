import { locationApi } from "@/utils";

export const locationServices = {
  getCity: () => locationApi.get("", { params: { depth: 1 } }),
  getDistrict: (code: number) =>
    locationApi.get(`p/${code}`, { params: { depth: 2 } }),
  getWard: (code: number) =>
    locationApi.get(`d/${code}`, { params: { depth: 2 } }),
};
