import { useMemo } from "react";
import { useRouteLoaderData } from "react-router-dom";
import type { DiscographyData } from "./loader";
import type { AlbumWithTrackRow } from "./types";
import type { Filter } from "./constants";
import type { SectionItem } from "@components/Section";
import { RouterId } from "../constants";

export function useDiscographyData(filter: Filter) {
  const { discography } = useRouteLoaderData(
    RouterId.discography
  ) as DiscographyData;

  const formattedDiscography = useMemo<AlbumWithTrackRow[]>(
    () =>
      discography
        .filter(({ album_type }) => filter === "all" || album_type === filter)
        .map((album) => ({
          ...album,
          tracks: {
            items: album.tracks.items.map(
              ({ id, name, artists, duration_ms }) => ({
                id,
                title: {
                  name,
                  authors: artists.map((artist) => ({
                    id: artist.id,
                    name: artist.name,
                  })),
                },
                duration: duration_ms,
              })
            ),
          },
        })),
    [discography, filter]
  );

  const discographyItems = useMemo<SectionItem[]>(
    () =>
      discography
        .filter(({ album_type }) => filter === "all" || album_type === filter)
        .map(({ id, name, release_date, images }) => ({
          id,
          name,
          description: String(release_date.getFullYear()),
          cover: images[0].url,
          url: `/album/${id}`,
        })),
    [discography, filter]
  );

  return {
    discography: formattedDiscography,
    discographyItems,
  };
}
