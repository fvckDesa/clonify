export const filters = [
  { text: "all", filter: "all" },
  { text: "album", filter: "album" },
  { text: "single and EP", filter: "single" },
] as const;

export type Filter = (typeof filters)[number]["filter"];
