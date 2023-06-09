export type AlbumType = "album" | "single" | "compilation";

export interface Artist {
  type: "artist";
  id: string;
  name: string;
}

export interface Image {
  width: number;
  height: number;
  url: string;
}

export interface Track {
  type: "track";
  artists: Artist[];
  duration_ms: number;
  id: string;
  name: string;
  track_number: number;
}

export interface Album {
  type: "album";
  album_type: AlbumType;
  artists: Artist[];
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  total_tracks: number;
  tracks: {
    items: Track[];
  };
}
