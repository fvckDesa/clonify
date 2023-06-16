interface Image {
  width: number;
  height: number;
  url: string;
}

export interface Artist {
  type: "artist";
  id: string;
  name: string;
  followers: {
    total: number;
  };
  images: Image[];
  popularity: number;
}

export type SimpleArtist = Omit<Artist, "followers" | "images" | "popularity">;

export interface Track {
  type: "track";
  album: Omit<Album, "tracks">;
  artists: SimpleArtist[];
  duration_ms: number;
  id: string;
  name: string;
  track_number: number;
  popularity: number;
}

type AlbumType = "album" | "single" | "compilation";

export interface Album {
  type: "album";
  album_type: AlbumType;
  artists: SimpleArtist[];
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  total_tracks: number;
  tracks: {
    items: Omit<Track, "album" | "popularity">[];
  };
}
