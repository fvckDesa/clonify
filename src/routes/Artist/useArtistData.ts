import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import type { ArtistData } from "./loader";
import type { TrackRow } from "./columns";
import type { WithId } from "@/types/utils";
import type { SectionItem } from "@components/Section";
import { Filter } from "./constants";
import { capitalize } from "@/utils/text";

export function useArtistData(filter: Filter) {
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
      discography
        .filter(({ album_type }) => filter === "all" || album_type === filter)
        .map(({ id, name, release_date, images, album_type }) => ({
          id,
          name,
          description: `${String(release_date.getFullYear())} • ${capitalize(
            album_type
          )}`,
          cover: images[0].url,
          url: `/album/${id}`,
        })),
    [discography, filter]
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
