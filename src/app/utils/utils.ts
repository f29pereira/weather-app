/**
 * Formats current date with format: "weakday, month day, year"
 */
export const getDate = (): string => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Returns day of the week in short or long format
 */
export const getDayOfWeek = (
  date: string,
  format: "short" | "long"
): string => {
  return new Date(date).toLocaleDateString("en-US", { weekday: `${format}` });
};

/**
 * Returns hour in AM/PM format
 */
export const getHour = (date: string): string => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};

/**
 * Returns current date and hour with format: "YYYY-MM-DDTHH:00"
 */
export const getDateAndHour = (): string => {
  return new Date().toISOString().slice(0, 13) + ":00";
};
