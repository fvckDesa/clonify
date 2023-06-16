import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { HomeData } from "./loader";
import { Album } from "@/types/spotify";

export function useHomeData() {
  const { followedAlbums, recentlyPlayed, newReleases } =
    useLoaderData() as HomeData;

  const formattedFollowedAlbums = useMemo(
    () => followedAlbums.map(formatAlbum),
    [followedAlbums]
  );

  const filteredRecentlyPlayed = useMemo(() => {
    const map = new Map<string, Album>();
    for (const album of recentlyPlayed) {
      if (!map.has(album.id)) {
        map.set(album.id, album);
      }
    }

    return [...map.values()];
  }, [recentlyPlayed]);

  const formattedNewReleases = useMemo(
    () => newReleases.map(formatAlbum),
    [newReleases]
  );

  return {
    followedAlbums: formattedFollowedAlbums,
    recentlyPlayed: filteredRecentlyPlayed,
    newReleases: formattedNewReleases,
  };
}

function formatAlbum({ id, name, artists, images }: Album) {
  return {
    id,
    name,
    description: artists,
    cover: images[0].url,
    url: `/album/${id}`,
  };
}
