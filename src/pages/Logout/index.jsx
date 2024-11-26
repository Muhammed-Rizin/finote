import React from "react";
import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";

const Logout = () => {
  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  return <Navigate to="/login" />;
};

export default Logout;
