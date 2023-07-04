import { Filter } from "@components/Filters";

export type FilterValue = "all" | "album" | "single";

export const filters: Filter<FilterValue>[] = [
  { label: "all", value: "all" },
  { label: "album", value: "album" },
  { label: "single and EP", value: "single" },
];
