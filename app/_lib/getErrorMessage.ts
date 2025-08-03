export function getErrorMessage(errors: string, fieldTitle?: string): string {
  if (errors.includes("required")) {
    return `${fieldTitle || "This field"} is required`;
  }
  if (errors.includes("email")) {
    return "Please enter a valid email address";
  }
  return `Invalid ${fieldTitle?.toLowerCase() || "input"}`;
}
