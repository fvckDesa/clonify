import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// layouts
import AppLayout from "../layouts/AppLayout";
// pages
import { Home } from "./Home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
    </Route>
  )
);
