import { LoaderFunctionArgs } from "react-router-dom";
import { spotifyApi } from "@service/spotify";
import { urlSearchParams } from "@utils/url";
import { PartialAlbum, Artist, PartialPlaylist, Track } from "@/types/spotify";
import { parseJsonDate } from "@/utils/json";

export interface SearchData {
  albums: PartialAlbum[];
  artists: Artist[];
  playlists: PartialPlaylist[];
  tracks: Track[];
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<SearchData> {
  const searchRes = await spotifyApi.request(
    urlSearchParams`/search?${{
      q: params.query,
      type:
        params.filter?.slice(0, -1) ??
        ["album", "artist", "playlist", "track"].join(","),
      limit: params.filter ? 50 : 8,
    }}`
  );

  const search = parseJsonDate<{
    albums: { items: PartialAlbum[] };
    artists: { items: Artist[] };
    playlists: { items: PartialPlaylist[] };
    tracks: { items: Track[] };
  }>(await searchRes.text(), "release_date");

  return {
    albums: search.albums?.items ?? [],
    artists: search.artists?.items ?? [],
    playlists: search.playlists?.items ?? [],
    tracks: search.tracks?.items ?? [],
  };
}
