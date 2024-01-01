import { DateOptions } from "./DateOptions";

export function DateConverter(
  date: Date = new Date(),
  dateOptions: Partial<typeof DateOptions> = DateOptions
): string {
  const dateConverted = new Date(date).toLocaleDateString("en-US", dateOptions);
  return dateConverted;
}
