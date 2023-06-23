import { LoaderFunctionArgs } from "react-router-dom";
import { parseJsonDate } from "@utils/json";
import { spotifyApi } from "@service/spotify";
import type { Artist } from "@/types/spotify";

export interface RelatedData {
  relatedArtists: Artist[];
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<RelatedData> {
  const relatedArtistsRes = await spotifyApi.request(
    `/artists/${params.artistId}/related-artists`
  );

  const relatedArtists = parseJsonDate<{ artists: Artist[] }>(
    await relatedArtistsRes.text()
  ).artists;

  return {
    relatedArtists,
  };
}
