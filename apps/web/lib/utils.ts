export function formatDateForSchema(
  dateString: string | null | undefined
): string | undefined {
  if (!dateString) return undefined;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return undefined;

  return date.toISOString();
}
