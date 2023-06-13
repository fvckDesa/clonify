import { urlSearchParams } from "@utils/url";

const BASE_API_URL = "https://api.spotify.com/v1";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

interface AccessTokenInfo {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

class SpotifyApi {
  private token: AccessTokenInfo | null = null;
  private expired = 0;

  public constructor() {
    this.token = JSON.parse(
      sessionStorage.getItem("token") ?? "null"
    ) as AccessTokenInfo | null;
    this.expired = +(sessionStorage.getItem("expired") ?? "0");
  }

  private setToken(token: AccessTokenInfo) {
    this.token = token;
    this.expired = Date.now() + this.token.expires_in;

    sessionStorage.setItem("token", JSON.stringify(this.token));
    sessionStorage.setItem("expired", String(this.expired));
  }

  private async refresh(): Promise<void> {
    if (!this.token) {
      throw new Error("Refresh token not found");
    }

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlSearchParams`${{
        client_id: import.meta.env.VITE_SPOTIFY_ID,
        client_secret: import.meta.env.VITE_SPOTIFY_SECRET,
        grant_type: "refresh_token",
        refresh_token: this.token.refresh_token,
      }}`,
    });

    if (!res.ok) {
      console.log(await res.json());
      throw new Error(`Refresh token request failed! Status: ${res.status}`);
    }

    const newToken = (await res.json()) as AccessTokenInfo;

    this.setToken({ ...this.token, ...newToken });
  }

  public async request(
    path: string,
    request: RequestInit = {}
  ): Promise<Response> {
    if (!this.token) {
      throw new Error("Set access token before make a request");
    }

    const { token_type, access_token } = this.token;

    const headers = new Headers(request.headers);
    headers.set("Authorization", `${token_type} ${access_token}`);

    const res = await fetch(`${BASE_API_URL}${path}`, {
      ...request,
      headers,
    });

    if (!res.ok) {
      const { error } = (await res.json()) as {
        error: { status: number; message: string };
      };

      if (error.status === 401 && this.expired < Date.now()) {
        await this.refresh();
        return this.request(path, request);
      }

      throw error;
    }

    return res;
  }

  public async setAccessToken(code: string): Promise<void> {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlSearchParams`${{
        client_id: import.meta.env.VITE_SPOTIFY_ID,
        client_secret: import.meta.env.VITE_SPOTIFY_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:5173/login",
      }}`,
    });

    if (!res.ok) {
      console.log(await res.json());
      throw new Error(`Access token request failed! Status: ${res.status}`);
    }

    this.setToken((await res.json()) as AccessTokenInfo);
  }

  public get authUrl() {
    return urlSearchParams`https://accounts.spotify.com/authorize?${{
      response_type: "code",
      client_id: import.meta.env.VITE_SPOTIFY_ID,
      scope: [
        "user-read-private",
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
      ].join(" "),
      redirect_uri: "http://localhost:5173/login",
    }}`;
  }

  public get hasToken(): boolean {
    return !!this.token;
  }
}

export const spotifyApi = new SpotifyApi();
