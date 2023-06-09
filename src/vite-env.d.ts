/// <reference types="vite/client" />

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_ID: string;
  readonly VITE_SPOTIFY_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
