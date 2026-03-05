import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getFriendlyErrorMessage(err: any): string {
  const message: string = err?.message ?? "";
  const code: string = err?.code ?? "";

  // Duplicate product name / slug
  if (message.includes("products_slug_key") || message.includes("products_name_key")) {
    return "A product with this name already exists. Please use a different name.";
  }

  // Duplicate category name
  if (message.includes("categories_name_key") || message.includes("categories_slug_key")) {
    return "A category with this name already exists. Please use a different name.";
  }

  // Generic unique-constraint violation
  if (code === "23505" || message.includes("unique constraint") || message.includes("duplicate key")) {
    return "This item already exists. Please use a different name and try again.";
  }

  // Foreign key violation
  if (code === "23503") {
    return "This item is linked to other data and cannot be removed or is referencing something that doesn't exist.";
  }

  // Not-null / missing required field
  if (code === "23502") {
    return "A required field is missing. Please fill in all required fields and try again.";
  }

  // Generic network or fetch error
  if (message.toLowerCase().includes("failed to fetch") || message.toLowerCase().includes("network")) {
    return "Could not connect to the server. Please check your internet connection and try again.";
  }

  // Fallback: show the original message if it's short enough, otherwise generic
  return message.length > 0 && message.length < 120
    ? message
    : "Something went wrong. Please try again.";
}
