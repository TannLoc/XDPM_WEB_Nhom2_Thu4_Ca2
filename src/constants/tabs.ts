import { OrderHistory, PersonalInformation } from "@/modules/profile";

export const TAB_ITEMS = [
  {
    key: "personal-information",
    label: "Personal information",
    children: PersonalInformation,
  },
  {
    key: "order",
    label: "Order",
    children: OrderHistory,
  },
];
