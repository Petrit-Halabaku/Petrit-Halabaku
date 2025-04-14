// import React from "react";
import { RouteObject } from "react-router-dom";
import Maintenance from "../pages/Maintenance";
// Import other pages as needed

export const routes: RouteObject[] = [
  { path: "/", element: <Maintenance /> },
  { path: "/terms", element: <Maintenance /> },
  { path: "/privacy", element: <Maintenance /> },
  { path: "/maintenance", element: <Maintenance /> },
  { path: "*", element: <Maintenance /> },
  // Add more routes as needed
];
