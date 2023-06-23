import { useLoaderData } from "react-router-dom";
import type { RelatedData } from "./loader";
import { useMemo } from "react";
import { SectionItem } from "@/components/Section";

export function useRelatedData() {
  const { relatedArtists } = useLoaderData() as RelatedData;

  const formattedRelatedArtists = useMemo<SectionItem[]>(
    () =>
      relatedArtists.map(({ id, name, images }) => ({
        id,
        name,
        description: "Artist",
        cover: images[0].url,
        url: `/artist/${id}`,
        type: "artist",
      })),
    [relatedArtists]
  );

  return {
    relatedArtists: formattedRelatedArtists,
  };
}
