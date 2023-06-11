import { LoaderFunctionArgs } from "react-router-dom";
import { spotifyApi } from "@service/spotify";
import { Album } from "./types";
import { urlSearchParams } from "@utils/url";
import { parseJsonDate } from "@/utils/json";

export interface AlbumData {
  album: Album;
  otherAlbums: Album[];
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<AlbumData> {
  const albumRes = await spotifyApi.request(`albums/${params.albumId}`);

  const album = parseJsonDate<Album>(await albumRes.text(), "release_date");

  const otherAlbumsRes = await spotifyApi.request(
    urlSearchParams`artists/${album.artists[0].id}/albums?${{
      include_groups: ["album", "single"].join(","),
    }}`
  );

  const otherAlbums = parseJsonDate<{ items: Album[] }>(
    await otherAlbumsRes.text(),
    "release_date"
  ).items;

  return { album, otherAlbums };
}
