import { GENERIC_PATH } from "./paths";

export const POLICIES = [
  {
    title: "Warranty policy",
    href: GENERIC_PATH.WARRANTY_POLICY,
    datas: [
      {
        item: "Warranty period: 12 months from the date of purchase.",
      },
      {
        item: "Covers manufacturing defects only.",
      },
      {
        item: "Does not cover damages caused by misuse, accidents, or unauthorized repairs.",
      },
      {
        item: "For warranty claims, the original receipt and warranty card are required.",
      },
    ],
  },
  {
    title: "Return policy",
    href: GENERIC_PATH.RETURN_POLICY,
    datas: [
      {
        item: "Returns are accepted within 7 days of purchase.",
      },
      {
        item: "Items must be unused, in original packaging, and accompanied by the receipt.",
      },
      {
        item: "Return reasons include manufacturing defects or incorrect items delivered.",
      },
      {
        item: "Refunds are issued in the same method as the original payment.",
      },
      {
        item: "Shipping fees for returns are non-refundable.",
      },
    ],
  },
  {
    title: "Payment and delivery methods",
    href: GENERIC_PATH.PAYMENT_AND_DELIVERY_METHODS,
    datas: [
      {
        item: "Online payment: Credit/Debit cards.",
      },
      {
        item: "Bank transfer: Payment must be confirmed before shipping.",
      },
      {
        item: "Cash on delivery (COD): Available for orders within specified regions.",
      },
      {
        item: "Standard delivery: 3-5 business days.",
      },
      {
        item: "Express delivery: 1-2 business days (additional fees apply).",
      },
    ],
  },
];
