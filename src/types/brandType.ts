import { T_IMAGE } from "./imageType";

export type T_BRAND_RESPONE = {
  id: number;
  name: string;
  image: T_IMAGE;
  createdAt: Date;
  updatedAt: Date;
};

export type T_BRAND_REQUEST = {
  name?: string;
  imageId?: number | null;
};
