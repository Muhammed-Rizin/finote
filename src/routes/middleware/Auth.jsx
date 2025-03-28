import React, { Suspense } from "react";

import AuthLayout from "../../components/AuthLayout";

import { setTitle } from "../../helpers/functions";
import { logout } from "../../service/auth.service";

const AuthMiddleware = (props) => {
  if (!localStorage.getItem("refreshToken")) {
    console.log("Middleware no token");
    logout();
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
