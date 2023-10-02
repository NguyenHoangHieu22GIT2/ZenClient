import { DateOptions } from "./DateOptions";

export function DateConverter(date: Date = new Date()): string {
  const dateConverted = new Date(date).toLocaleDateString("en-US", DateOptions);
  return dateConverted;
}
