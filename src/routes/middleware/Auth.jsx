import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import AuthLayout from "../../components/AuthLayout";

import { setTitle } from "../../helpers/functions";

const AuthMiddleware = (props) => {
  if (!Cookies.get("refreshToken")) {
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");

    return <Navigate to="/login" />;
  }

  setTitle(props.title);

  return (
    <React.Fragment>
      <AuthLayout>
        <Suspense>{React.cloneElement(props.children)}</Suspense>
      </AuthLayout>
    </React.Fragment>
  );
};

export default AuthMiddleware;
