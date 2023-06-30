import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { HomeData } from "./loader";
import { Album } from "@/types/spotify";

export function useHomeData() {
  const { followedAlbums, recentlyPlayed, newReleases } =
    useLoaderData() as HomeData;

  const filteredRecentlyPlayed = useMemo(() => {
    const map = new Map<string, Album>();
    for (const album of recentlyPlayed) {
      if (!map.has(album.id)) {
        map.set(album.id, album);
      }
    }

    return [...map.values()];
  }, [recentlyPlayed]);

  return {
    followedAlbums,
    recentlyPlayed: filteredRecentlyPlayed,
    newReleases,
  };
}
