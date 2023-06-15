import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import type { ArtistData } from "./loader";

export function useArtistData() {
  const { artist, topTracks, discography, appearsOn, relatedArtists } =
    useLoaderData() as ArtistData;

  const formattedTopTracks = useMemo(
    () =>
      topTracks.map(({ id, name, popularity, duration_ms, album }) => ({
        id,
        title: {
          name,
          albumCover: album.images[0].url,
        },
        popularity,
        duration: duration_ms,
      })),
    [topTracks]
  );

  const formattedDiscography = useMemo(
    () =>
      discography.map(({ id, name, release_date, images }) => ({
        id,
        name,
        description: String(release_date.getFullYear()),
        cover: images[0].url,
        url: `/album/${id}`,
      })),
    [discography]
  );

  const formattedAppearsOn = useMemo(
    () =>
      appearsOn.map(({ id, name, release_date, images }) => ({
        id,
        name,
        description: String(release_date.getFullYear()),
        cover: images[0].url,
        url: `/album/${id}`,
      })),
    [appearsOn]
  );

  const formattedRelatedArtists = useMemo(
    () =>
      relatedArtists.map(({ id, name, images }) => ({
        id,
        name,
        description: "Artist",
        cover: images[0].url,
        url: `/artist/${id}`,
      })),
    [relatedArtists]
  );

  return {
    artist,
    topTracks: formattedTopTracks,
    discography: formattedDiscography,
    appearsOn: formattedAppearsOn,
    relatedArtists: formattedRelatedArtists,
  };
}
