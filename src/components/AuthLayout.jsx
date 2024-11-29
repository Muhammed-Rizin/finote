import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/components/_authLayout.css";

const AuthLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`auth-layout ${isCollapsed ? "collapsed" : ""}`}>
      <Sidebar isCollapsed={isCollapsed} />
      <div className={`main-content ${isCollapsed ? "expanded" : ""}`}>
        <Header onSidebarToggle={handleSidebarToggle} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
