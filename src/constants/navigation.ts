import { GENERIC_PATH } from "./paths";

export const CUSTOMER_NAV_ITEMS = [
  {
    title: "HOME",
    path: GENERIC_PATH.HOME,
  },
  {
    title: "PRODUCT",
    path: GENERIC_PATH.PRODUCT,
  },
  {
    title: "CONTACT",
    path: GENERIC_PATH.CONTACT,
  },
  {
    title: "ABOUT US",
    path: GENERIC_PATH.ABOUT_US,
  },
];

export const ADMIN_NAV_ITEMS = [
  {
    icon: "bi bi-graph-up",
    title: "Dashboard",
    path: GENERIC_PATH.MANAGEMENT,
  },
  {
    icon: "bi bi-person",
    title: "Customer",
    path: `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.CUSTOMER}`,
  },
  {
    icon: "bi bi-boxes",
    title: "Product",
    path: `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.PRODUCT}`,
  },
  {
    icon: "bi bi-boxes",
    title: "Brand",
    path: `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.BRAND}`,
  },
  {
    icon: "bi bi-boxes",
    title: "Shipment",
    path: `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.SHIPMENT}`,
  },
  {
    icon: "bi bi-receipt-cutoff",
    title: "Order",
    path: `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}`,
  },
];