import { useLoaderData } from "react-router-dom";
import type { RelatedData } from "./loader";

export function useRelatedData() {
  return useLoaderData() as RelatedData;
}
