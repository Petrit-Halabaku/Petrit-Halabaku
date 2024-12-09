// import React from "react";
import { RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";
import { Terms } from "../pages/Terms";
import { Privacy } from "../pages/Privacy";
import { NotFound } from "../pages/NotFound";
// Import other pages as needed

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/terms", element: <Terms /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "*", element: <NotFound /> },
  // Add more routes as needed
];
