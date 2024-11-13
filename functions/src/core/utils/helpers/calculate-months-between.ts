// src/core/helpers/calculate-months-between.ts

export function calculateMonthsBetween(startDate: Date, endDate: Date): number {
  const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
  const monthsDifference = endDate.getMonth() - startDate.getMonth();

  // Total months difference considering years and months
  return yearsDifference * 12 + monthsDifference;
}
