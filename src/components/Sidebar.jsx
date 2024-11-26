import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { ReactComponent as AngleRightIcon } from "../assets/icons/angle-right.svg";
import { ReactComponent as AngleLeftIcon } from "../assets/icons/angle-left.svg";

import { ReactComponent as DashboardIcon } from "../assets/icons/dashboard.svg";
import { ReactComponent as CategoryIcon } from "../assets/icons/category.svg";
import { ReactComponent as AccountIcon } from "../assets/icons/account.svg";
import { ReactComponent as IncomeExpenseIcon } from "../assets/icons/income-expense.svg";

import "../styles/components/_sidebar.css";

const Sidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menus = [
    { name: "Dashboard", route: "/", icon: <DashboardIcon /> },
    { name: "Income-Expense", route: "/income-expense", icon: <IncomeExpenseIcon /> },
    { name: "Accounts", route: "/accounts", icon: <AccountIcon /> },
    { name: "Category", route: "/category", icon: <CategoryIcon /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
    onToggle((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        onToggle(true);
      } else {
        setIsCollapsed(false);
        onToggle(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onToggle]);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isCollapsed ? <AngleRightIcon className="icon" /> : <AngleLeftIcon className="icon" />}
      </button>
      <ul className="menu">
        {menus.map((menu, index) => (
          <Link to={menu.route} key={index}>
            <li className={`menu-item ${location.pathname === menu.route ? "active" : ""}`}>
              <div className="menu-icon">{menu.icon}</div>
              {!isCollapsed && <span>{menu.name}</span>}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
