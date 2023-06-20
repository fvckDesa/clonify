import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import type { TrackRow } from "./columns";
import type { WithId } from "@/types/utils";
import type { AlbumData } from "./loader";
import type { SectionItem } from "@components/Section";

export function useAlbumData() {
  const { album, otherAlbums } = useLoaderData() as AlbumData;

  const tracks = useMemo<WithId<TrackRow>[]>(
    () =>
      [...album.tracks.items]
        .sort((a, b) => a.track_number - b.track_number)
        .map(({ id, name, artists, duration_ms }) => ({
          id,
          title: {
            name,
            authors: artists.map((artist) => ({
              id: artist.id,
              name: artist.name,
            })),
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

  const formattedOtherAlbums = useMemo<SectionItem[]>(
    () =>
      otherAlbums
        .filter(({ id }) => id !== album.id)
        .map(({ id, name, release_date, images }) => ({
          id,
          name,
          description: String(release_date.getFullYear()),
          cover: images[0].url,
          url: `/album/${id}`,
        })),
    [otherAlbums, album]
  );

  return {
    album,
    tracks,
    duration,
    otherAlbums: formattedOtherAlbums,
  };
}
