import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import type { Album } from "./types";
import type { TrackRow } from "./columns";
import type { WithId } from "@/types/utils";

export function useAlbum() {
  const album = useLoaderData() as Album;

  console.log(album);

  const tracks = useMemo<WithId<TrackRow>[]>(
    () =>
      [...album.tracks.items]
        .sort((a, b) => a.track_number - b.track_number)
        .map(({ id, name, artists, duration_ms }) => ({
          id,
          title: {
            name,
            authors: artists.map((artist) => artist.name),
          },
          duration: duration_ms,
        })),
    [album]
  );

  const duration = useMemo(
    () =>
      album.tracks.items.reduce(
        (duration, track) => duration + track.duration_ms,
        0
      ),
    [album]
  );

  return {
    album,
    tracks,
    duration,
  };
}
