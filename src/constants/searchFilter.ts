import type { Filter } from "@components/Filters";

export type FilterValue = "all" | "tracks" | "artists" | "albums" | "playlists";

export const filters: Filter<FilterValue>[] = [
  { label: "all", value: "all" },
  { label: "tracks", value: "tracks" },
  { label: "artists", value: "artists" },
  { label: "albums", value: "albums" },
  { label: "playlists", value: "playlists" },
];
