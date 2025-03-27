export type T_LOGIN_ADMIN = {
  username: string;
  password: string;
};

export type T_LOGIN_CUSTOMER = {
  phoneNumber: string;
  password: string;
};

export type T_REGISTER_CUSTOMER = {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  birthDay?: Date;
};
