import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// layouts
import AppLayout from "../layouts/AppLayout";
// pages
import { Home } from "./Home";
import { Section } from "./Section";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="/section/:sectionId" element={<Section />} />
    </Route>
  )
);
