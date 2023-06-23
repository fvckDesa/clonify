import { useLoaderData } from "react-router-dom";
import { useMemo } from "react";
import type { PlaylistData } from "./loader";
import type { TrackRow } from "./columns";
import { WithId } from "@/types/utils";

export function usePlaylistData() {
  const { playlist } = useLoaderData() as PlaylistData;

  const tracks = useMemo<WithId<TrackRow>[]>(
    () =>
      playlist.tracks.items
        .filter(({ track }) => !track.is_local)
        .map(({ added_at, track }, idx) => ({
          id: `${idx}-${track.id}`,
          title: {
            name: track.name,
            authors: track.artists,
            albumCover: track.album.images[0].url,
          },
          album: { name: track.album.name, id: track.album.id },
          addedAt: added_at,
          duration: track.duration_ms,
        })),
    [playlist]
  );

  const duration = useMemo(
    () =>
      playlist.tracks.items.reduce(
        (total, { track }) => total + track.duration_ms,
        0
      ),
    [playlist]
  );

  return {
    playlist,
    tracks,
    duration,
  };
}
