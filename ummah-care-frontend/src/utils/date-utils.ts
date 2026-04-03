import {
  format,
  formatDistanceToNow,
  isPast,
  isToday,
  isTomorrow,
} from "date-fns";

export function formatExpiryDate(date: string | Date) {
  const d = new Date(date);

  if (isPast(d)) {
    return `Expired ${formatDistanceToNow(d, { addSuffix: true })}`;
  }

  if (isToday(d)) {
    return `Today at ${format(d, "hh:mm a")}`;
  }

  if (isTomorrow(d)) {
    return `Tomorrow at ${format(d, "hh:mm a")}`;
  }

  return `${formatDistanceToNow(d)} left`;
}
