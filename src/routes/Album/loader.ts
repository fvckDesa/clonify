import { LoaderFunctionArgs } from "react-router-dom";
import { spotifyApi } from "@service/spotify";

export async function loader({ params }: LoaderFunctionArgs) {
  return await spotifyApi.request(`albums/${params.albumId}`, {
    method: "GET",
  });
}
