import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Pokemon = lazy(() => import("./Pages/Pokemon"));

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <Suspense>
        <Home />
      </Suspense>
  },
  {
    path: `/pokemon/:name/:id`,
    element:
      <Suspense>
        <Pokemon />
      </Suspense>,
  },
  {
    path: '*',
    element:
      <Suspense>
        <NotFound />
      </Suspense>
  }
])

export default router;