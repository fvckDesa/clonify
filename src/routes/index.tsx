import {
  LoaderFunctionArgs,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
// layouts
import AppLayout from "../layouts/AppLayout";
// pages
import { Home, loaderHome } from "./Home";
import { Section } from "./Section";
import { Album, loaderAlbum } from "./Album";
import { Login, loaderLogin } from "./Login";
import { Artist, loaderArtist } from "./Artist";
//
import { spotifyApi } from "@service/spotify";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} loader={loader}>
      <Route index element={<Home />} loader={loaderHome} />
      <Route path="/section/:sectionId" element={<Section />} />
      <Route path="/album/:albumId" element={<Album />} loader={loaderAlbum} />
      <Route
        path="/artist/:artistId"
        element={<Artist />}
        loader={loaderArtist}
      />
      <Route path="/login" element={<Login />} loader={loaderLogin} />
    </Route>
  )
);

function loader({ request }: LoaderFunctionArgs): Response {
  const { pathname } = new URL(request.url);

  if (pathname !== "/login" && !spotifyApi.hasToken) {
    sessionStorage.setItem("redirect-page", pathname);
    return redirect("/login");
  }

  return new Response();
}
