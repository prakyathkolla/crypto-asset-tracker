import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (value >= 1e9) {
    return formatter.format(value / 1e9) + "B";
  } else if (value >= 1e6) {
    return formatter.format(value / 1e6) + "M";
  } else if (value >= 1e3) {
    return formatter.format(value / 1e3) + "K";
  }

  return formatter.format(value);
}