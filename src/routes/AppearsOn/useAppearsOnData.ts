import { useLoaderData } from "react-router-dom";
import type { AppearsOnData } from "./loader";

export function useAppearsOnData() {
  return useLoaderData() as AppearsOnData;
}
