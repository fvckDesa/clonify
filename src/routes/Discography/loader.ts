import { LoaderFunctionArgs } from "react-router-dom";
import { spotifyApi } from "@service/spotify";
import { urlSearchParams } from "@utils/url";
import { parseJsonDate } from "@utils/json";
import type { Album } from "@/types/spotify";

export interface DiscographyData {
  discography: Album[];
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<DiscographyData> {
  const discographyRes = await spotifyApi.request(
    urlSearchParams`/artists/${params.artistId}/albums?${{
      include_groups: ["album", "single"].join(","),
    }}`
  );

  const discography = parseJsonDate<{ items: Album[] }>(
    await discographyRes.text(),
    "release_date"
  ).items;

  const albums = (
    await Promise.all(
      discography.map(({ id }) =>
        spotifyApi.request(`/albums/${id}`).then((res) => res.text())
      )
    )
  ).map((album) => parseJsonDate<Album>(album, "release_date"));

  return {
    discography: albums,
  };
}
