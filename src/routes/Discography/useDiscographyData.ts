import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import type { DiscographyData } from "./loader";
import type { TrackRow } from "./columns";
import type { WithId } from "@/types/utils";
import { Album } from "@/types/spotify";

type AlbumWithTrackRow = Omit<Album, "tracks"> & {
  tracks: { items: WithId<TrackRow>[] };
};

export function useDiscographyData() {
  const { discography } = useLoaderData() as DiscographyData;

  const formattedDiscography = useMemo<AlbumWithTrackRow[]>(
    () =>
      discography.map((album) => ({
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
    [discography]
  );

  return {
    discography: formattedDiscography,
  };
}
