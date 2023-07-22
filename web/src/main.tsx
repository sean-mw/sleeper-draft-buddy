import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import './index.css'
import ErrorPage from './error-page.tsx';
import { Menu } from './routes/menu.tsx';
import { draftLoader } from './routes/loaders.tsx';
import { Draft } from './routes/draft.tsx';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Menu />,
    errorElement: <ErrorPage />,
  },
  {
    path: "draft/:draftId",
    element: <Draft />,
    errorElement: <ErrorPage />,
    loader: draftLoader,
  },
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
