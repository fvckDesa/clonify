import type { TrackRow } from "./columns";
import type { WithId } from "@/types/utils";
import type { Album } from "@/types/spotify";

export type AlbumWithTrackRow = Omit<Album, "tracks"> & {
  tracks: { items: WithId<TrackRow>[] };
};

export type ViewMode = "list" | "section";
