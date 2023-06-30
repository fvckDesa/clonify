import { useLoaderData } from "react-router-dom";
import type { SearchData } from "./loader";
import { useMemo } from "react";
import { TrackRow } from "./columns";
import { WithId } from "@/types/utils";

export function useSearchData() {
  const { tracks, artists, albums, playlists } = useLoaderData() as SearchData;

  const formattedTracks = useMemo<WithId<TrackRow>[]>(
    () =>
      tracks.map(({ id, name, album, artists, duration_ms }) => ({
        id,
        title: { name, albumCover: album.images[0].url, authors: artists },
        duration: duration_ms,
      })),
    [tracks]
  );

  return {
    artists,
    albums,
    playlists,
    tracks: formattedTracks,
  };
}
