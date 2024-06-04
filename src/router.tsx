import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import DefaultLayout from "./Layouts/DefaultLayout";

const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Pokemon = lazy(() => import("./Pages/Pokemon"));

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <Suspense>
        <DefaultLayout />
      </Suspense>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: `/pokemon/:name`,
        element: <Pokemon />
      },
    ]
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