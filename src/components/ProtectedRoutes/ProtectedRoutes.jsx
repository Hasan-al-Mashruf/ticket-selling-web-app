import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getLoaderUpdate, showCurrentUser } from "../../features/api";

const ProtectedRoutes = ({ children }) => {
  //   const user = showCurrentUser();
  //   const loader = getLoaderUpdate();
  //   let location = useLocation();
  //
  //   //   if (loader) {
  //   //     return "Loading......";
  //   //   }
  //
  //   if (!user?.name) {
  //     return <Navigate to="/" state={{ from: location }} replace />;
  //   }
  //   return children;
};

export default ProtectedRoutes;
