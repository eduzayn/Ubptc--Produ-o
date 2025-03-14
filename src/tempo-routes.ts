import { RouteObject } from "react-router-dom";
import React from "react";
import Home from "./components/home";

const routes: RouteObject[] = [
  {
    path: "/tempobook/*",
    element: React.createElement(Home, null),
  },
  {
    path: "/",
    element: React.createElement(Home, null),
  },
];

export default routes;
