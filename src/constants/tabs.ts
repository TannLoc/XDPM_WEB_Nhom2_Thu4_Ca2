import { OrderClient } from "@/modules/order";
import PersonalInformation from "@/modules/personal-info";

export const TAB_ITEMS = [
  {
    key: "personal-information",
    label: "Personal information",
    children: PersonalInformation,
  },
  {
    key: "order",
    label: "Order",
    children: OrderClient,
  },
];
