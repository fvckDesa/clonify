import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import type { AppearsOnData } from "./loader";
import type { SectionItem } from "@components/Section";

export function useAppearsOnData() {
  const { appearsOn } = useLoaderData() as AppearsOnData;

  const formattedAppearsOn = useMemo<SectionItem[]>(
    () =>
      appearsOn.map(({ id, name, artists, images }) => ({
        id,
        name,
        description: artists,
        cover: images[0].url,
        url: `/album/${id}`,
      })),
    [appearsOn]
  );

  return {
    appearsOn: formattedAppearsOn,
  };
}
