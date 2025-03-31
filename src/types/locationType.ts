export type T_CITY_RESPONSE = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: T_DISTRICT_RESPONSE[];
};

export type T_DISTRICT_RESPONSE = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: T_WARD_RESPONSE[];
};

export type T_WARD_RESPONSE = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
};

export type T_ITEMS_LOCATION = {
  name: string;
  code: number;
};
