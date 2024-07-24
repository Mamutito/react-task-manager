import { format } from "date-fns";

export default function formatDate(input: string): string {
  const [datePart, timePart] = input.split(", ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  const date = new Date(year, month - 1, day, hours, minutes, seconds);

  return format(date, "eee, MMM dd, yyyy h:mm a");
}
