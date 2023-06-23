import { LoaderFunctionArgs } from "react-router-dom";
import { spotifyApi } from "@service/spotify";
import { Playlist, PlaylistTrack } from "@/types/spotify";
import { parseJsonDate } from "@/utils/json";

export interface PlaylistData {
  playlist: Playlist;
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<PlaylistData> {
  const playlistRes = await spotifyApi.request(
    `/playlists/${params.playlistId}`
  );

  const playlist = parseJsonDate<Playlist>(await playlistRes.text(), [
    "added_at",
    "release_date",
  ]);

  let next = playlist.tracks.next;

  while (next) {
    const tracks = parseJsonDate<{
      items: PlaylistTrack[];
      next: string | null;
    }>(await spotifyApi.request(next, {}, 0).then((res) => res.text()), [
      "added_at",
      "release_date",
    ]);
    next = tracks.next;
    playlist.tracks.items.push(...tracks.items);
    playlist.tracks.next = next;
  }

  return {
    playlist,
  };
}
