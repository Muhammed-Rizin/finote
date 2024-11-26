import React from "react";
import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { setTitle } from "../../helpers/functions";

const NonAuthLayout = (props) => {
  if (Cookies.get("refreshToken")) return <Navigate to="/" />;

  setTitle(props.title);

  return <React.Fragment>{props.children}</React.Fragment>;
};

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default NonAuthLayout;
