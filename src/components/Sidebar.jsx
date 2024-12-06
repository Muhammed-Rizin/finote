import React from "react";
import { useLocation, Link } from "react-router-dom";

import { ReactComponent as DashboardIcon } from "../assets/icons/dashboard.svg";
import { ReactComponent as CategoryIcon } from "../assets/icons/category.svg";
import { ReactComponent as AccountIcon } from "../assets/icons/account.svg";
import { ReactComponent as IncomeExpenseIcon } from "../assets/icons/income-expense.svg";
import { ReactComponent as TransferIcon } from "../assets/icons/transfer.svg";

import "../styles/components/_sidebar.css";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", route: "/", icon: <DashboardIcon /> },
    { name: "Income-Expense", route: "/income-expense", icon: <IncomeExpenseIcon /> },
    { name: "Transfer", route: "/transfer", icon: <TransferIcon /> },
    { name: "Accounts", route: "/accounts", icon: <AccountIcon /> },
    { name: "Category", route: "/category", icon: <CategoryIcon /> },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
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
