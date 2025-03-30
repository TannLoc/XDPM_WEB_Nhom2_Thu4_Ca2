import { T_BRAND_RESPONE } from "./brandType";

export type T_PICKLIST_RESPONSE = {
  id: number;
  label: string;
  color?: string;
  url?: string;
};

export type T_PICKLIST_OPTIONS_CLIENT = {
  brandOptions: T_BRAND_RESPONE[];
  genderOptions: T_PICKLIST_RESPONSE[];
  marketSegmentOptions: T_PICKLIST_RESPONSE[];
  movementOptions: T_PICKLIST_RESPONSE[];
  sizeOptions: T_PICKLIST_RESPONSE[];
  featureOptions: T_PICKLIST_RESPONSE[];
};