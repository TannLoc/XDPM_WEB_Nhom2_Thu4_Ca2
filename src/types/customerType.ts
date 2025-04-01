export type T_CUSTOMER_RESPONSE = {
  id: number;
  role: string;
  fullName: string;
  birthday: Date | null;
  username: string | null;
  email: string;
  phoneNumber: string;
  password: string;
  refreshToken: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
