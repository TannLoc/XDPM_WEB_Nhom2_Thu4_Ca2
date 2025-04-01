import { T_BRAND_RESPONE } from "./brandType";
import { T_IMAGE } from "./imageType";
import { T_PICKLIST_RESPONSE } from "./picklistType";

export type T_PRODUCT_REQUEST = {
  name: string;
  code: string;
  price: number;
  salesPrice: number;
  featureIds: number[];
  movementId: number;
  brandId: number;
  marketSegmentId: number;
  sizeId: number;
  genderId: number;
  imageId: number | null;
  imageIds?: number[];
};

export type T_PRODUCT_RESPONSE = {
  key?: number;
  id: number;
  name: string;
  code: string;
  price: number;
  salesPrice: number;
  import?: number;
  sold?: number;
  stock: number;
  image: T_IMAGE;
  createAt?: Date;
  updateAt?: Date;
  deletedAt?: Date | null;
};

export type T_ONE_PRODUCT_RESPONSE = {
  id: number;
  name: string;
  image: T_IMAGE;
  images: T_IMAGE[];
  code: string;
  price: number;
  salesPrice: number;
  import: number;
  sold: number;
  stock: number;
  features: T_PICKLIST_RESPONSE[];
  movement: T_PICKLIST_RESPONSE;
  marketSegment: T_PICKLIST_RESPONSE;
  size: T_PICKLIST_RESPONSE;
  brand: T_BRAND_RESPONE;
  gender: T_PICKLIST_RESPONSE;
  createAt: Date;
  updateAt: Date;
};

export type T_PRODUCT_PARAMS = {
  orderBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
  keyword?: string;
  isActive?: boolean;
  fromSalesPrice?: number;
  toSalesPrice?: number;
  featureIds?: number[];
  movementId?: number;
  brandId?: number;
  marketSegmentId?: number;
  sizeId?: number;
  genderId?: number;
};
