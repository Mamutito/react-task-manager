import { format } from "date-fns";

export default function formatDate(input: string) {
  const [datePart, timePart] = input.split(", ");
  const [day, month, year] = datePart.split("/").map(Number);

  const date = new Date(year, month - 1, day); // Crear un objeto Date

  return format(date, "eee do, MMMM, yyyy"); // Formatear la fecha
}
