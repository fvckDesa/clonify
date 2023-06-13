import { spotifyApi } from "@service/spotify";
import { parseJsonDate } from "@utils/json";
import type { Album } from "@/types/spotify";

export interface HomeData {
  followedAlbums: Album[];
  recentlyPlayed: Album[];
  newReleases: Album[];
}

export async function loader(): Promise<HomeData> {
  const [followedAlbumsRes, recentlyPlayedRes, newReleasesRes] =
    await Promise.all([
      spotifyApi.request("/me/albums"),
      spotifyApi.request("/me/player/recently-played"),
      spotifyApi.request("/browse/new-releases"),
    ]);

  const followedAlbums = parseJsonDate<{ items: { album: Album }[] }>(
    await followedAlbumsRes.text(),
    "release_date"
  ).items.map(({ album }) => album);

  const recentlyPlayed = parseJsonDate<{
    items: { track: { album: Album } }[];
  }>(await recentlyPlayedRes.text(), "release_date").items.map(
    ({ track }) => track.album
  );

  const newReleases = parseJsonDate<{
    albums: { items: Album[] };
  }>(await newReleasesRes.text(), "release_date").albums.items;

  return {
    followedAlbums,
    recentlyPlayed,
    newReleases,
  };
}
