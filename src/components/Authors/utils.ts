import type { SeparatorInfo } from "./types";

export function getSeparatorProps(
  separator: string | SeparatorInfo
): SeparatorInfo {
  return typeof separator === "string"
    ? { content: separator, space: 0 }
    : separator;
}
