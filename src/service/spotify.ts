const BASE_API_URL = "https://api.spotify.com/v1";
const ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token";

interface AccessTokenInfo {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

class SpotifyApi {
  private token: AccessTokenInfo | null = null;

  public constructor() {
    this.token = JSON.parse(
      sessionStorage.getItem("token") ?? "null"
    ) as AccessTokenInfo | null;
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

    return fetch(`${BASE_API_URL}/${path}`, {
      ...request,
      headers,
    });
  }

  public async setAccessToken(code: string): Promise<void> {
    const res = await fetch(ACCESS_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_SPOTIFY_ID,
        client_secret: import.meta.env.VITE_SPOTIFY_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:5173/login",
      }),
    });

    if (!res.ok) {
      console.log(await res.json());
      throw new Error(`Access token request failed! Status: ${res.status}`);
    }

    this.token = (await res.json()) as AccessTokenInfo;

    sessionStorage.setItem("token", JSON.stringify(this.token));
  }

  public get authUrl() {
    return `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_SPOTIFY_ID,
      scope: ["user-read-private", "user-read-email"].join(" "),
      redirect_uri: "http://localhost:5173/login",
    }).toString()}`;
  }

  public get hasToken(): boolean {
    return !!this.token;
  }
}

export const spotifyApi = new SpotifyApi();
