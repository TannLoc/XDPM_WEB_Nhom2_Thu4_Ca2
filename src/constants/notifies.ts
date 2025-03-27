export enum SUCCESS {
  LOGIN = "Login successful",
  REGISTER = "Register successful",
}

export enum ERROR {
  LOGIN = "Login failed",
  REGISTER = "Register failed",
  EMAIL = "Invalid email",
  PHONE_NUMBER = "Phone number must be 10 characters long",
  PASSWORD = "Password must be at least 6 characters",
  RE_ENTER_PASSWORD = "Invalid password re-entered",
}

export enum WARNING {
  FIELD_IS_NOT_NULL = "Please enter complete information",
}

export enum INFO {
  IS_REDIRECTING = "Is redirecting...",
}