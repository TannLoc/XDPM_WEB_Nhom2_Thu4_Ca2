import dayjs from "dayjs";

export function formatDate(date: Date, hour?: boolean, minute?: boolean) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  };
  if (hour) options.hour = "2-digit";
  if (minute) options.minute = "2-digit";
  const newDate = new Date(date)
    .toLocaleString("en-GB", options)
    .replace(",", "");
  return newDate;
}

export function convertStringToDate(date: Date) {
  return dayjs(date);
}
