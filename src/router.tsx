import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./Pages/Home"))
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
])

export default router;