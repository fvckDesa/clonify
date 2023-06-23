interface Image {
  width: number;
  height: number;
  url: string;
}

export interface PartialArtist {
  id: string;
  name: string;
}

export interface PartialTrack {
  artists: PartialArtist[];
  duration_ms: number;
  id: string;
  name: string;
  track_number: number;
  is_local: boolean;
}

export interface PartialAlbum {
  album_type: "album" | "single" | "compilation";
  artists: PartialArtist[];
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  total_tracks: number;
}

export interface Artist extends PartialArtist {
  followers: {
    total: number;
  };
  images: Image[];
  popularity: number;
}

export interface Track extends PartialTrack {
  album: PartialAlbum;
  popularity: number;
}

export interface Album extends PartialAlbum {
  tracks: {
    items: PartialTrack[];
  };
}

export interface PlaylistTrack {
  added_at: Date;
  track: Track;
}

export interface Playlist {
  id: string;
  name: string;
  images: Image[];
  public: boolean;
  followers: {
    total: number;
  };
  owner: {
    id: string;
    display_name: string | null;
  };
  tracks: {
    items: PlaylistTrack[];
    total: number;
    next: string | null;
  };
}
