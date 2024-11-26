import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/components/_authLayout.css";

const AuthLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className={`auth-layout ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`main-content ${isSidebarCollapsed ? "expanded" : ""}`}>
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
