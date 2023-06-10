import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { spotifyApi } from "@service/spotify";

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const page: string = sessionStorage.getItem("redirect-page") ?? "/";

  if (code) {
    await spotifyApi.setAccessToken(code);
    sessionStorage.removeItem("redirect-page");
    return redirect(page);
  }

  if (searchParams.get("error")) {
    throw new Error(`Access Error: ${searchParams.get("error")}`);
  }

  return new Response();
}
