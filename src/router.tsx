import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import NotFound from "./Pages/NotFound";

const Home = lazy(() => import("./Pages/Home"))
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
}
])

export default router;