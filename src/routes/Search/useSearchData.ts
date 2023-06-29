import { useLoaderData } from "react-router-dom";
import type { SearchData } from "./loader";
import { useMemo } from "react";
import { SectionItem } from "@components/Section";
import { TrackRow } from "./columns";
import { WithId } from "@/types/utils";

export function useSearchData() {
  const { tracks, artists, albums, playlists } = useLoaderData() as SearchData;

  const formattedTracks = useMemo<WithId<TrackRow>[]>(
    () =>
      tracks.map(({ id, name, album, artists, duration_ms }) => ({
        id,
        title: { name, albumCover: album.images[0].url, authors: artists },
        duration: duration_ms,
      })),
    [tracks]
  );

  const formattedArtists = useMemo<SectionItem[]>(
    () =>
      artists.map(({ id, name, images }) => ({
        id,
        name,
        description: "Artist",
        cover: images[0]?.url ?? "",
        url: `/artist/${id}`,
        type: "artist",
      })),
    [artists]
  );

  const formattedAlbums = useMemo<SectionItem[]>(
    () =>
      albums.map(({ id, name, images, artists, release_date }) => ({
        id,
        name,
        description: `${String(release_date.getFullYear())} • ${
          artists[0].name
        }`,
        cover: images[0].url,
        url: `/album/${id}`,
      })),
    [albums]
  );

  const formattedPlaylists = useMemo<SectionItem[]>(
    () =>
      playlists.map(({ id, name, images, owner }) => ({
        id,
        name,
        description: `By ${owner.display_name}`,
        cover: images[0].url,
        url: `/playlist/${id}`,
      })),
    [playlists]
  );

  return {
    artists: formattedArtists,
    albums: formattedAlbums,
    playlists: formattedPlaylists,
    tracks: formattedTracks,
  };
}
