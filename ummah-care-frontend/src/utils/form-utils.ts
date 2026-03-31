function formatLabel(value: string) {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function createOptions<
  T extends readonly string[] | Record<string, string>,
>(source: T) {
  const values = Array.isArray(source)
    ? source
    : (Object.values(source) as T extends readonly string[]
        ? T[number][]
        : T[keyof T][]);

  return values.map((item) => ({
    label: formatLabel(item),
    value: item,
  }));
}
