import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../../service/auth.service";

const Logout = () => {
  useEffect(() => {
    logout();
  }, []);
  return <Navigate to="/login" />;
};

export default Logout;
