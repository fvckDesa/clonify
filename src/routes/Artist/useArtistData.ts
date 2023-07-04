import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import type { ArtistData } from "./loader";
import type { TrackRow } from "./columns";
import type { WithId } from "@/types/utils";

export function useArtistData() {
  const { artist, topTracks, discography, appearsOn, relatedArtists } =
    useLoaderData() as ArtistData;

  const formattedTopTracks = useMemo<WithId<TrackRow>[]>(
    () =>
      topTracks.map(({ id, name, popularity, duration_ms, album }) => ({
        id,
        title: {
          name,
          albumCover: album.images[0],
        },
        popularity,
        duration: duration_ms,
      })),
    [topTracks]
  );

  return {
    artist,
    topTracks: formattedTopTracks,
    discography,
    appearsOn,
    relatedArtists,
  };
}
