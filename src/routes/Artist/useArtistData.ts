import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import type { ArtistData } from "./loader";
import type { TrackRow } from "./columns";
import type { WithId } from "@/types/utils";
import type { SectionItem } from "@components/Section";

export function useArtistData() {
  const { artist, topTracks, discography, appearsOn, relatedArtists } =
    useLoaderData() as ArtistData;

  const formattedTopTracks = useMemo<WithId<TrackRow>[]>(
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

  const formattedDiscography = useMemo<SectionItem[]>(
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

  const formattedAppearsOn = useMemo<SectionItem[]>(
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

  const formattedRelatedArtists = useMemo<SectionItem[]>(
    () =>
      relatedArtists.map(({ id, name, images }) => ({
        id,
        name,
        description: "Artist",
        cover: images[0].url,
        url: `/artist/${id}`,
        type: "artist",
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
