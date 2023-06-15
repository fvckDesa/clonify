import { LoaderFunctionArgs } from "react-router-dom";
import { Artist, Track, Album } from "@/types/spotify";
import { spotifyApi } from "@service/spotify";
import { urlSearchParams } from "@utils/url";
import { parseJsonDate } from "@/utils/json";

export interface ArtistData {
  artist: Artist;
  topTracks: Track[];
  discography: Album[];
  appearsOn: Album[];
  relatedArtists: Artist[];
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<ArtistData> {
  const [
    artistRes,
    topTracksRes,
    discographyRes,
    appearsOnRes,
    relatedArtistsRes,
  ] = await Promise.all([
    spotifyApi.request(`/artists/${params.artistId}`),
    spotifyApi.request(
      urlSearchParams`/artists/${params.artistId}/top-tracks?${{
        market: "IT",
      }}`
    ),
    spotifyApi.request(
      urlSearchParams`/artists/${params.artistId}/albums?${{
        include_groups: ["album", "single"].join(","),
      }}`
    ),
    spotifyApi.request(
      urlSearchParams`/artists/${params.artistId}/albums?${{
        include_groups: "appears_on",
      }}`
    ),
    spotifyApi.request(`/artists/${params.artistId}/related-artists`),
  ]);

  const artist = await artistRes.json();
  const topTracks = parseJsonDate<{ tracks: Track[] }>(
    await topTracksRes.text(),
    "release_date"
  ).tracks;
  const discography = parseJsonDate<{ items: Album[] }>(
    await discographyRes.text(),
    "release_date"
  ).items;
  const appearsOn = parseJsonDate<{ items: Album[] }>(
    await appearsOnRes.text(),
    "release_date"
  ).items;
  const relatedArtists = parseJsonDate<{ artists: Artist[] }>(
    await relatedArtistsRes.text()
  ).artists;

  return {
    artist,
    topTracks,
    discography,
    appearsOn,
    relatedArtists,
  };
}
