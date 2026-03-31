export type RawQueryParams = Record<string, string | string[] | undefined>;

export const buildQueryString = (params: RawQueryParams): string =>
  Object.entries(params)
    .flatMap(([key, value]) => {
      if (value === undefined) return [];

      if (Array.isArray(value)) {
        return value.map(
          (v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`,
        );
      }

      return [`${encodeURIComponent(key)}=${encodeURIComponent(value)}`];
    })
    .join("&");
