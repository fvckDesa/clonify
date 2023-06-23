import { Album } from "@/types/spotify";
import { parseJsonDate } from "@/utils/json";
import { spotifyApi } from "@service/spotify";
import { urlSearchParams } from "@utils/url";
import { LoaderFunctionArgs } from "react-router-dom";

export interface AppearsOnData {
  appearsOn: Album[];
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<AppearsOnData> {
  const appearsOnRes = await spotifyApi.request(
    urlSearchParams`/artists/${params.artistId}/albums?${{
      include_groups: "appears_on",
    }}`
  );

  const appearsOn = parseJsonDate<{ items: Album[] }>(
    await appearsOnRes.text(),
    "release_date"
  ).items;

  return {
    appearsOn,
  };
}
