export function getAlbumType(albumType: string, numTracks: number): string {
  return albumType === "single" && numTracks > 1 ? "EP" : albumType;
}
