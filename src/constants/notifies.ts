export enum SUCCESS {
  LOGIN = "Login successful",
  REGISTER = "Register successful",
  ADD_TO_CART = "Add to cart successful",
  CREATE = "Created successfully",
  EDIT = "Edited successfully",
  DELETE = "Deleted successfully",
  REMOVE = "Removed successfully",
  THUMBNAIL = "Thumbnail setup successful",
  ORDER_COMPLETE = "Order successful, thank you very much",
  SET_STATE = "Set state successfully",
  ADD_ITEM_PICKLIST = "Item has been added",
}

export enum ERROR {
  LOGIN = "Login failed",
  REGISTER = "Register failed",
  EMAIL = "Invalid email",
  PHONE_NUMBER = "Phone number must be 10 characters long",
  PASSWORD = "Password must be at least 6 characters",
  RE_ENTER_PASSWORD = "Invalid password re-entered",
  ADD_ITEM_PICKLIST = "Add item failed",
  THUMBNAIL_IS_NULL = "Please select thumbnail",
}

export enum WARNING {
  ORDER_ITEM_IS_NULL = "You must select at least 1 product",
  CUSTOMER_IS_NOT_lOGIN = "You need to login",
  FIELD_IS_NOT_NULL = "Please enter complete information",
  ITEM_ALREADY_EXISTS = "Item already exists",
}

export enum INFO {
  IS_REDIRECTING = "Is redirecting...",
  LOADING = "Is loading...",
  CAN_NOT_ADD_PRODUCT_TO_CART = "Product is out of stock, can't add to cart",
}
