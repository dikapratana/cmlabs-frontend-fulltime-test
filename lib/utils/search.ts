export function normalizeQuery(query: string) {
  return query.trim().toLowerCase();
}

export function matchesText(
  values: Array<string | null | undefined>,
  normalizedQuery: string,
) {
  if (!normalizedQuery) {
    return true;
  }

  return values.some((value) =>
    value?.toLowerCase().includes(normalizedQuery),
  );
}
