import { useMemo } from "react";
import { useRouteLoaderData } from "react-router-dom";
import type { DiscographyData } from "./loader";
import type { AlbumWithTrackRow } from "./types";
import type { Filter } from "./constants";
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

  return {
    discography,
    discographyList: formattedDiscography,
  };
}
