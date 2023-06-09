import {
  LoaderFunctionArgs,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
// layouts
import { AppLayout, SearchLayout } from "@/layouts";
// pages
import { Home, loaderHome } from "./Home";
import { Album, loaderAlbum } from "./Album";
import { Login, loaderLogin } from "./Login";
import { Artist, loaderArtist } from "./Artist";
import { Discography, loaderDiscography } from "./Discography";
import { AppearsOn, loaderAppearsOn } from "./AppearsOn";
import { Related, loaderRelated } from "./Related";
import { Playlist, loaderPlaylist } from "./Playlist";
import { Search, loaderSearch } from "./Search";
import { SearchHistory } from "./SearchHistory";
//
import { spotifyApi } from "@service/spotify";
import { RouterId } from "./constants";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
      loader={loader}
      shouldRevalidate={({ nextUrl }) => shouldRedirect(nextUrl)}
    >
      <Route index element={<Home />} loader={loaderHome} />
      <Route path="/search" element={<SearchLayout />}>
        <Route index element={<SearchHistory />} />
        <Route
          path=":query"
          id={RouterId.search}
          element={<Search />}
          loader={loaderSearch}
        >
          <Route index element={<Search />} />
          <Route path=":filter" element={<Search />} />
        </Route>
      </Route>
      <Route path="/album/:albumId" element={<Album />} loader={loaderAlbum} />
      <Route path="/artist/:artistId">
        <Route index element={<Artist />} loader={loaderArtist} />
        <Route
          path="discography"
          id={RouterId.discography}
          loader={loaderDiscography}
        >
          <Route index element={<Discography />} />
          <Route path="all" element={<Discography filter="all" />} />
          <Route path="album" element={<Discography filter="album" />} />
          <Route path="single" element={<Discography filter="single" />} />
        </Route>
        <Route
          path="appears-on"
          element={<AppearsOn />}
          loader={loaderAppearsOn}
        />
        <Route path="related" element={<Related />} loader={loaderRelated} />
      </Route>
      <Route
        path="/playlist/:playlistId"
        element={<Playlist />}
        loader={loaderPlaylist}
      />
      <Route path="/login" element={<Login />} loader={loaderLogin} />
    </Route>
  )
);

function loader({ request }: LoaderFunctionArgs): Response {
  const url = new URL(request.url);

  if (shouldRedirect(url)) {
    sessionStorage.setItem("redirect-page", url.pathname);
    return redirect("/login");
  }

  return new Response();
}

function shouldRedirect({ pathname }: URL): boolean {
  return !spotifyApi.hasToken && pathname !== "/login";
}
