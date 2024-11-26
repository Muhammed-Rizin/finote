import React from "react";

import AllRoutes from "./routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/base/_globals.css";

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <AllRoutes />
    </React.Fragment>
  );
};

export default App;
