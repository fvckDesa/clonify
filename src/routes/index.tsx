import {
  LoaderFunctionArgs,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
// layouts
import AppLayout from "@/layouts/AppLayout";
// pages
import { Home, loaderHome } from "./Home";
import { Section } from "./Section";
import { Album, loaderAlbum } from "./Album";
import { Login, loaderLogin } from "./Login";
import { Artist, loaderArtist } from "./Artist";
import { Discography, loaderDiscography } from "./Discography";
import { AppearsOn, loaderAppearsOn } from "./AppearsOn";
//
import { spotifyApi } from "@service/spotify";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} loader={loader}>
      <Route index element={<Home />} loader={loaderHome} />
      <Route path="/section/:sectionId" element={<Section />} />
      <Route path="/album/:albumId" element={<Album />} loader={loaderAlbum} />
      <Route path="/artist/:artistId">
        <Route index element={<Artist />} loader={loaderArtist} />
        <Route
          path="discography"
          element={<Discography />}
          loader={loaderDiscography}
        />
        <Route
          path="appears-on"
          element={<AppearsOn />}
          loader={loaderAppearsOn}
        />
      </Route>
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
