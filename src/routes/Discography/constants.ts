export const filters = [
  { text: "all", value: "all" },
  { text: "album", value: "album" },
  { text: "single and EP", value: "single" },
] as const;

export type Filter = (typeof filters)[number]["value"];
