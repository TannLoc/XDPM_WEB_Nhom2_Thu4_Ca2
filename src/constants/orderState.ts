export enum ORDER_STATE_GENERIC {
  WAITING_CONFIRM = "WAITING_CONFIRM",
  CONFIRMED = "CONFIRMED",
  DELIVERING = "DELIVERING",
  CANCELED = "CANCELED",
  RECEIVED = "RECEIVED",
  RETURNED = "RETURNED",
}

export const ORDER_STATE = [
  {
    state: ORDER_STATE_GENERIC.WAITING_CONFIRM,
    color: "text-yellow",
    title: "Waiting for confirmation",
  },
  {
    state: ORDER_STATE_GENERIC.CANCELED,
    color: "text-red",
    title: "Canceled",
  },
  {
    state: ORDER_STATE_GENERIC.CONFIRMED,
    color: "text-green",
    title: "Confirmed",
  },
  {
    state: ORDER_STATE_GENERIC.DELIVERING,
    color: "text-blue",
    title: "Delivering",
  },
  {
    state: ORDER_STATE_GENERIC.RECEIVED,
    color: "text-green",
    title: "Received",
  },
  {
    state: ORDER_STATE_GENERIC.RETURNED,
    color: "text-blue",
    title: "Returned",
  },
];
