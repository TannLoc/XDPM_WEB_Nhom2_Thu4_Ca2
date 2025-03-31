import { T_IMAGE } from "./imageType";

export type T_USER_RESPONSE = {
  id: number;
  birthday: Date;
  email: string;
  role: string;
  phoneNumber: string;
  fullName: string;
  avatar?: T_IMAGE;
};

export type T_USER_REQUEST = {
  avatarId?: number;
  birthday?: Date;
  email?: string;
  phoneNumber?: string;
  fullName?: string;
};
