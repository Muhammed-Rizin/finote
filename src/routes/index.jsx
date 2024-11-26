import React from "react";
import { Route, Routes } from "react-router-dom";

import NonAuthLayout from "./middleware/NonAuth";
import AuthMiddleware from "./middleware/Auth";

import { authRoutes, nonAuthRoutes } from "./allRoutes";

const AllRoutes = () => {
  return (
    <Routes>
      {authRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          title={route.title}
          element={<AuthMiddleware title={route.title}>{route.component}</AuthMiddleware>}
          isAuthProtected={true}
          exact
        />
      ))}
      {nonAuthRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          title={route.title}
          element={<NonAuthLayout title={route.title}>{route.component}</NonAuthLayout>}
          isAuthProtected={false}
        />
      ))}
    </Routes>
  );
};

export default AllRoutes;
