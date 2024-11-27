import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout";

import { setTitle } from "../../helpers/functions";

const AuthMiddleware = (props) => {
  if (!localStorage.getItem("refreshToken")) {
    return <Navigate to="/logout" />;
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
