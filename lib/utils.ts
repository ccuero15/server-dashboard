// lib/utils.ts
export const serializable = (data: unknown): unknown => {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};